import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

export default typeDefs;
