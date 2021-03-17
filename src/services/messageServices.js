import Models from '../database/models';

const { Message, Reaction } = Models;

export const createMessage = async (message) => {
  const meaasge = await Message.create(message);
  return meaasge;
};
export const findMessage = async (param) => {
  const message = await Message.findOne({ where: param });
  return message;
};
export const findMessages = async (params) => {
  const messages = await Message.findAll({
    where: params,
    order: [['createdAt', 'DESC']],
  });
  return messages;
};
export const FindAllMessages = async (params) => {
  const messages = await Message.findAll({
    where: params,
    order: [['createdAt', 'DESC']],
    include: [{ model: Reaction, as: 'reactions' }],
  });
  return messages;
};
