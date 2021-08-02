import { Context } from './context';

export const resolvers = {
	Query: {
		getAllUsers: (parent: any, args: any, context: Context) => {
			return context.prisma.user.findMany();
		},
		getUser: (parent: any, args: { id: number }, context: Context) => {
			// console.log('parent:', parent, 'args:', args, 'context:', context);
			return context.prisma.user.findUnique({
				where: {
					id: args.id,
				},
			});
		},
		// hello: () => 'Hello world!',
		// bye: () => 'Bye!!!',
	},
};
