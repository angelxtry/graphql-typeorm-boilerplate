import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || 'World!'}`,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: any) => console.log(`Server ready at ${url}`));
