import bcrypt from 'bcryptjs';
import * as yup from 'yup';

import { formatYupError } from '../../utils/formatYupError';
import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';
import { DUPLICATE_EMAIL, TOO_SHORT_EMAIL, INVALID_EMAIL } from './errorMessages';

const schema = yup.object().shape({
  email: yup.string().min(3, TOO_SHORT_EMAIL).max(255).email(INVALID_EMAIL),
  password: yup.string().min(3).max(255),
});

const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }

      const { email, password } = args;
      const userAlreadyExist = await User.findOne({
        where: { email },
        select: ['id'],
      });
      if (userAlreadyExist) {
        return [
          {
            path: 'email',
            message: DUPLICATE_EMAIL,
          },
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword,
      });
      await user.save();
      return null;
    },
  },
};

export default resolvers;
