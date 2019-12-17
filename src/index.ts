import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';

import typeDefs from './schema';
import { resolvers } from './resolvers';

export const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await createConnection();
  await server.listen();
  console.log('Server ready at http://localhost:4000');
};

startServer();
