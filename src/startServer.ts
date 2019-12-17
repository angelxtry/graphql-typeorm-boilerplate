import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import { resolvers } from './resolvers';
import { createTypeormConn } from './utils/createTypeornConn';

export const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  await createTypeormConn();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};
