const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { sequelize } = require('./database/models/index');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3500).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize.authenticate().then(console.log('Connected to DB'));
});
