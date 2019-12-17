import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';

import typeDefs from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

createConnection().then(() => {
  server.listen().then(
    ({ url }: any) => console.log(`Server ready at ${url}`),
  );
});
