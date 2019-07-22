import gql from "graphql-tag";

export default gql`
  type Query {
    me: User
    testMessage: String!
  }

  type Mutation {
    login(username: String!, password: String!): User
    signup(username: String!, password: String!): User
  }

  extend type User {
    username: String!
  }
`;

