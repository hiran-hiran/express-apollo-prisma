import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { context } from './context';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();
const secretKey = process.env.JWT_SECRETKEY || '';

const getUser = (token: any) => {
  try {
    if (token) {
      return jwt.verify(token, secretKey);
    }
    return null;
  } catch (error) {
    console.log('getUser error', error);
    return null;
  }
};

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => {
      // console.log('headers', req.headers);
      const tokenWithBearer = req.headers.authorization || '';
      const token = tokenWithBearer.split(' ')[1];
      const tokenUser = getUser(token);
      // console.log('context', context);
      return { tokenUser, prisma: context.prisma };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  await app.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
};

startApolloServer().then((data) => {
  // console.log(data);
});
