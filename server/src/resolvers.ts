import { Context } from './context';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const secretKey = process.env.JWT_SECRETKEY || '';

export const resolvers = {
  Query: {
    getAllUsers: (parent: any, args: any, context: Context) => {
      // console.log('parent:', parent, 'args:', args, 'context:', context);
      return context.prisma.user.findMany();
    },
    getUser: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    currentUser: (parent: any, args: any, { prisma, tokenUser }: Context) => {
      if (!tokenUser) {
        throw new Error('Not authentication');
      }
      // console.log('tokenUser', tokenUser);
      return prisma.user.findUnique({
        where: {
          id: tokenUser.id,
        },
      });
    },
    login: async (
      parent: any,
      { data: { email, password } }: { data: { email: string; password: string } },
      context: Context,
    ) => {
      const loginUser = await context.prisma.user.findUnique({
        where: {
          email,
        },
      });
      // console.log('loginUser', loginUser);
      if (!loginUser) throw new Error('ユーザーが見つかりません');
      const matchPass = bcrypt.compareSync(password, loginUser.password);
      if (!matchPass) throw new Error('パスワードが違います');
      return { token: jwt.sign(loginUser, secretKey, { expiresIn: '1d' }), user: loginUser };
    },
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
      return { token: jwt.sign(newUser, secretKey, { expiresIn: '1d' }), user: newUser };
    },
  },
};
