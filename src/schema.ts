import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }

  type Mutation {
    register(email: String!, password: String!): String!
  }
`;

export default typeDefs;
