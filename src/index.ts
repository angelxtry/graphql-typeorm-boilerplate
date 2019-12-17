import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: any) => console.log(`Server ready at ${url}`));
