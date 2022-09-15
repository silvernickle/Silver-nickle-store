import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import Credentials from 'next-auth/providers/credentials';
import { client } from '../../../lib/client';

const options = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    SanityCredentials(client) // only if you use sign in with credentials
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: SanityAdapter(client),
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/auth/login',  //'api/auth/signin'
  }
};

export default NextAuth(options);