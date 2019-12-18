import { request } from 'graphql-request';

import { User } from '../../entity/User';
import { startServer } from '../../startServer';

const host = 'http://localhost:4000/graphql';

beforeAll(async () => {
  await startServer();
});

const email = 'ccc@gmail.com';
const password = 'ccc';
const mutation = `
  mutation {
    register(email: "${email}", password: "${password}")
  }
`;

test('Register user', async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toEqual(password);
});
