import { UserInputError, AuthenticationError } from 'apollo-server';
import { Op } from 'sequelize';
import { Message } from '../../database/models';
import { createUser, findUser, findUsers } from '../../services/userServices';
import { decryptPassword, encryptPassword, signToken } from '../../utils/auth';
import { validateCreate } from '../../validators/userValidator';

export default {
  Query: {
    getUsers: async (_, __, { user }) => {
      try {
        if (!user) throw new AuthenticationError('Unauthenticated');
        // let users = await User.findAll({
        //   attributes: ['username', 'imageUrl', 'createdAt'],
        //   where: { username: { [Op.ne]: user.username } },
        // });
        let users = await findUsers({ username: { [Op.ne]: user.username } });

        const allUserMessages = await Message.findAll({
          where: {
            [Op.or]: [{ from: user.username }, { to: user.username }],
          },
          order: [['createdAt', 'DESC']],
        });

        users = users.map((otherUser) => {
          const latestMessage = allUserMessages.find(
            (m) => m.from === otherUser.username || m.to === otherUser.username,
          );
          otherUser.latestMessage = latestMessage;
          return otherUser;
        });

        return users;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    login: async (_, args) => {
      const { username, password } = args;
      let errors = {};

      try {
        if (username.trim() === '')
          errors.username = 'username must not be empty';
        if (password === '') errors.password = 'password must not be empty';

        if (Object.keys(errors).length > 0) {
          throw new UserInputError('bad input', { errors });
        }

        // const user = await User.findOne({
        //   where: { username },
        // });

        const user = await findUser({ username });

        if (!user) {
          errors.username = 'user not found';
          throw new UserInputError('user not found', { errors });
        }

        // const correctPassword = await bcrypt.compare(password, user.password);
        const correctPassword = decryptPassword(password, user.password);
        if (!correctPassword) {
          errors.password = 'password is incorrect';
          throw new UserInputError('password is incorrect', { errors });
        }

        // const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        //   expiresIn: 60 * 60,
        // });
        const token = signToken({ username });

        return {
          ...user.toJSON(),
          token,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      let { username, email, confirmPassword } = args;
      let errors = {};

      try {
        if (password !== confirmPassword)
          errors.confirmPassword = 'passwords must match';

        const validate = validateCreate(args);
        if (!validate) {
          errors.validate = validate;
        }
        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const password = await encryptPassword(password);
        const user = await createUser({ user, email, password });

        return user;
      } catch (err) {
        console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          err.errors.forEach(
            (e) => (errors[e.path] = `${e.path} is already taken`),
          );
        } else if (err.name === 'SequelizeValidationError') {
          err.errors.forEach((e) => (errors[e.path] = e.message));
        }
        throw new UserInputError('Bad input', { errors });
      }
    },
  },
};
