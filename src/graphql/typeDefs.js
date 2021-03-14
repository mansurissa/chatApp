import { gql } from 'apollo-server';

module.exports = gql`
  type Query {
    getUsers: [User]
    getAdmins: [Admin]
  }
  type User {
    userName: String!
    email: String!
  }
  type Admin {
    admin: String!
  }
`;
