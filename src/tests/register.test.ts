import { request } from 'graphql-request';
import { createConnection } from 'typeorm';

import { User } from '../entity/User';
import { host } from './contants';

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
  await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toEqual(password);
});
