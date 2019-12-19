import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';

import schema from './schema';
import { createTypeormConn } from './utils/createTypeornConn';

const client = redis.createClient();
const RedisStore = connectRedis(session);

export const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ session: req.session }),
  });

  await createTypeormConn();

  const app = express();
  app.use(
    session({
      store: new RedisStore({ client }),
      name: 'qidqid',
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  const cors = {
    credentials: true,
    origin: true,
  };

  server.applyMiddleware({
    app,
    cors,
  });

  app.listen({ port: 3000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};
