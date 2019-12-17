import { ResolverMap } from './types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, args: { name: string }) => `Hello ${args.name || 'World!'}`,
  },
  Mutation: {
    register: (
      _, args: { email: string, password: string },
    ) => args.email + args.password,
  },
};
