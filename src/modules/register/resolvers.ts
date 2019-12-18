import bcrypt from 'bcryptjs';

import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';

const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: { email: string, password: string }) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = User.create({
        email: args.email,
        password: hashedPassword,
      });
      await user.save();
      return true;
    },
  },
};

export default resolvers;
