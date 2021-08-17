import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  tokenUser?: any;
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};
