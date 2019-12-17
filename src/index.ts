import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import { resolvers } from './resolvers';
import { createTypeormConn } from './utils/createTypeornConn';

export const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await createTypeormConn();
  await server.listen();
  console.log('Server ready at http://localhost:4000');
};

startServer();
