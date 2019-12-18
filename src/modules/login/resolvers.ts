import bcrypt from 'bcryptjs';

import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';
import { INVALID_LOGIN } from './errorMessage';

const loginErrorResponse = [{
  path: 'login',
  message: INVALID_LOGIN,
}];

const resolvers: ResolverMap = {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return loginErrorResponse;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return loginErrorResponse;
      }

      return null;
    },
  },
};

export default resolvers;
