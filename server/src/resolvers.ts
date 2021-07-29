const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const resolvers = {
	Query: {
		allUsers: () => {
			return prisma.user.findMany()
		},
		hello: () => 'Hello world!',
		bye: () => 'Bye!!!',
	},
};

// module.exports = resolvers;
