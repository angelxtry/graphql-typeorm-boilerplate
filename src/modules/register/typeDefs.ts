import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    register(email: String!, password: String!): [Error!]
  }
`;

export default typeDefs;
