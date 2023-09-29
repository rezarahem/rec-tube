import Prisma from '@/libs/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialProvider({
      name: 'credentails',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentails) {
        if (!credentails?.email || !credentails.password) return null;

        const user = await Prisma.user.findUnique({
          where: { email: credentails.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(
          credentails.password,
          user.hashedPassword as string
        );

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          usreId: token.userId,
          userRole: token.userRole,
        },
      };
    },
    jwt: ({ token, user }) => {
      const u = user as unknown as User;
      if (user) {
        return {
          ...token,
          userId: u.id,
          userRole: u.role,
        };
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
