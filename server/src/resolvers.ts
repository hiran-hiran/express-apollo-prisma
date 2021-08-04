import { Context } from './context';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
	Mutation: {
		createUser: async (
			parent: any,
			{
				data: { email, name, password },
			}: { data: { email: string; name: string; password: string } },
			context: Context,
		) => {
			const newUser = await context.prisma.user.create({
				data: {
					name,
					email,
					password: bcrypt.hashSync(password, 3),
				},
			});
			return  { token: jwt.sign(newUser, 'supersecret'), user: newUser };
		},
	},
};
