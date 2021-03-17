import Models from '../database/models';

const { Reaction } = Models;

export const createReaction = async (user) => {
  const createdReaction = await Reaction.create(user);
  return createdReaction;
};
export const findReaction = async (param) => {
  const reaction = await Reaction.findOne({ where: param });
  return reaction;
};
export const findReactions = async (params) => {
  const reactions = await Reaction.findAll({
    where: params,
  });
  return reactions;
};
