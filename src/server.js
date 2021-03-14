import '@babel/polyfill';
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3500, console.log(`🚀 Server ready at 3500`));

export default server;
