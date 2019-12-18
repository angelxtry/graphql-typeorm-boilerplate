import { request } from 'graphql-request';

import { User } from '../../entity/User';
import { startServer } from '../../startServer';
import { DUPLICATE_EMAIL, TOO_SHORT_EMAIL, INVALID_EMAIL } from './errorMessages';

const host = 'http://localhost:4000/graphql';

beforeAll(async () => {
  await startServer();
});

const email = 'ccc@gmail.com';
const password = 'ccc';
const mutation = (e: string, p: string) => `
  mutation {
    register(email: "${e}", password: "${p}") {
      path
      message
    }
  }
`;

describe('Register user', () => {
  it('register success and duplication check', async () => {
    const response = await request(host, mutation(email, password));
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual(email);
    expect(users[0].password).not.toEqual(password);

    const response2 = await request(host, mutation(email, password));
    expect(response2.register).toHaveLength(1);
    expect(response2).toEqual({
      register: [
        {
          path: 'email',
          message: DUPLICATE_EMAIL,
        },
      ],
    });
  });

  it('check bad email', async () => {
    const response3 = await request(host, mutation('c', password));
    expect(response3.register).toEqual([
      { message: TOO_SHORT_EMAIL, path: 'email' },
      { message: INVALID_EMAIL, path: 'email' },
    ]);
  });
});
