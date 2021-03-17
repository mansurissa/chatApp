import { PubSub } from 'apollo-server';
import { verifyToken } from './auth';

const pubsub = new PubSub();

export default (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split('Bearer ')[1];
  }

  if (token) context.user = verifyToken(token);
  context.pubsub = pubsub;
  return context;
};
