import Models from '../database/models';

const { User } = Models;

export const createUser = async (user) => {
  const createduser = await User.create(user);
  return createduser;
};
export const findUser = async (param) => {
  const user = await User.findOne({ where: param });
  return user;
};
export const findUsers = async (params) => {
  const users = await User.findAll({
    attributes: ['username', 'imageUrl', 'createdAt', 'email', 'id'],
    where: params,
  });
  return users;
};
