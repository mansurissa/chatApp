import { gql } from 'apollo-server';

export default gql`
  type User {
    userName: String!
    email: String!
    password: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(userName: String!, email: String!, password: String!): User!
  }
`;
