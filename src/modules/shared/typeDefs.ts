import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Error {
    path: String!
    message: String!
  }
`;

export default typeDefs;
