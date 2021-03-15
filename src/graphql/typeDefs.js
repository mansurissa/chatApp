import { gql } from 'apollo-server';

export default gql`
  type User {
    userName: String!
    email: String!
    password: String!
  }
  type Query {
    getUsers: [User]
    getOneUser(id: Int!): User!
    signin(email: String!, password: String): User!
  }
  type Mutation {
    register(userName: String!, email: String!, password: String!): User!
  }
`;
