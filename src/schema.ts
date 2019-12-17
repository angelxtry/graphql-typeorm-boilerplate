import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
  }
`;

export default typeDefs;
