import { request } from 'graphql-request';

import { INVALID_LOGIN, INCORRECT_PASSWORD } from './errorMessage';

const host = 'http://localhost:4000/graphql';

const email = 'aaa@gmail.com';
const password = 'aaa';

const registerMutation = (e: string, p: string) => `
  mutation {
    register(email: "${e}", password: "${p}") {
      path
      message
    }
  }
`;

const loginMutation = (e:string, p:string) => `
  mutation {
    login(email: "${e}", password: "${p}") {
      path
      message
    }
  }
`;

const loginExpectError = async (e: string, p: string, errorMessage: string) => {
  const response = await request(
      host as string,
      loginMutation(e, p),
  );
  expect(response.login).toEqual([{
    path: 'login',
    message: errorMessage,
  }]);
};

describe('login', () => {
  it('test login - invalid email', async () => {
    await loginExpectError('abc@gmail.com', 'abc', INVALID_LOGIN);
  });

  it('test login - invalid password', async () => {
    const response = await request(
      host as string,
      registerMutation(email, password),
    );
    expect(response).toEqual({ register: null });
    await loginExpectError(email, 'incorrentPassword', INCORRECT_PASSWORD);
  });

  it('test log - login seuccess', async () => {
    const response = await request(
      host as string,
      loginMutation(email, password),
    );
    expect(response).toEqual({ login: null });
  });
});
