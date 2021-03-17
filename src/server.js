import '@babel/polyfill';
import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { sequelize } from './database/models';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import contextMiddleware from './utils/contextMiddleware';

config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
  subscriptions: { path: '/' },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`);

  sequelize
    .authenticate()
    .then(() => console.log('Database connected!!'))
    .catch((err) => console.log(err));
});
