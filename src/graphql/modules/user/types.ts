import gql from "graphql-tag";

export default gql`
  type User {
    _id: ID!
    email: String!
  }

  extend type Query {
    getUsers: [User!]!
  }
`;

export interface User {
  _id: string,
  email: string,
  username?: string
}
