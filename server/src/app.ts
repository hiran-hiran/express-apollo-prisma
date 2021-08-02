import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { context } from './context';

const startApolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context,
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
