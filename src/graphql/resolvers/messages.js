import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  withFilter,
} from 'apollo-server';
import { Op } from 'sequelize';
import { Reaction } from '../../database/models';
import {
  createMessage,
  findMessage,
  findMessages,
} from '../../services/messageServices';
import { findUser } from '../../services/userServices';

export default {
  Query: {
    getMessages: async (parent, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const otherUser = await findUser({ username: from });
        if (!otherUser) throw new UserInputError('User not found');

        const usernames = [user.username, otherUser.username];

        const messages = await findMessages({
          from: { [Op.in]: usernames },
          to: { [Op.not]: usernames },
        });

        return messages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { to, content }, { user, pubsub }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');

        const recipient = await findUser({ username: to });

        if (!recipient) {
          throw new UserInputError('User not found');
        } else if (recipient.username === user.username) {
          throw new UserInputError('You cant message yourself');
        }

        if (content.trim() === '') {
          throw new UserInputError('Message is empty');
        }

        const message = await createMessage({
          from: user.username,
          to,
          content,
        });

        pubsub.publish('NEW_MESSAGE', { newMessage: message });

        return message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    reactToMessage: async (_, { uuid, content }, { user, pubsub }) => {
      const reactions = ['❤️', '😆', '😯', '😢', '😡', '👍', '👎'];

      try {
        if (!reactions.includes(content)) {
          throw new UserInputError('Invalid reaction');
        }

        const username = user ? user.username : '';
        user = await findUser({ username });
        if (!user) throw new AuthenticationError('Unauthenticated');

        const message = findMessage({ where: { uuid } });
        if (!message) throw new UserInputError('message not found');

        if (message.from !== user.username && message.to !== user.username) {
          throw new ForbiddenError('Unauthorized');
        }

        let reaction = await Reaction.findOne({
          where: { messageId: message.id, userId: user.id },
        });

        if (reaction) {
          reaction.content = content;
          await reaction.save();
        } else {
          reaction = await Reaction.create({
            messageId: message.id,
            userId: user.id,
            content,
          });
        }

        pubsub.publish('NEW_REACTION', { newReaction: reaction });

        return reaction;
      } catch (err) {
        throw err;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub, user }) => {
          if (!user) throw new AuthenticationError('Unauthenticated');
          return pubsub.asyncIterator('NEW_MESSAGE');
        },
        ({ newMessage }, _, { user }) => {
          if (
            newMessage.from === user.username ||
            newMessage.to === user.username
          ) {
            return true;
          }

          return false;
        },
      ),
    },
    newReaction: {
      subscribe: withFilter(
        (_, __, { pubsub, user }) => {
          if (!user) throw new AuthenticationError('Unauthenticated');
          return pubsub.asyncIterator('NEW_REACTION');
        },
        async ({ newReaction }, _, { user }) => {
          const message = await newReaction.getMessage();
          if (message.from === user.username || message.to === user.username) {
            return true;
          }

          return false;
        },
      ),
    },
  },
};
