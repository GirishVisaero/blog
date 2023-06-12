import axios from "axios";
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(tokenObject: { refresh_token: string }) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(
      process.env.NEXTAUTH_URL + "/api/refresh",
      {
        token: tokenObject.refresh_token,
      }
    );
    console.log(process.env.NEXTAUTH_URL);
    console.log(tokenObject.refresh_token);
    console.log(tokenResponse.data);
    return {
      ...tokenObject,
      accessToken: tokenResponse.data?.access_token,
      accessTokenExpiry: tokenResponse?.data.expires_at,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 3 * 24 * 60 * 60,
    // maxAge: 3,
  },
  jwt: {
    maxAge: 3 * 24 * 60 * 60,
    // maxAge: 3,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/check_credentials`,
          {
            method: "POST",
            headers: {
              // "Content-Type": "application/x-www-form-urlencoded",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        if (!res.ok) return null;

        const data = await res.json();
        if (data) {
          console.log(data);
          return data.user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    verifyRequest: "/",
    // signOut: "/auth/signout",
  },

  logger: {
    error: (code, metadata) => {
      console.error(code, metadata);
    },
    warn: (code) => {
      console.warn(code);
    },
    debug: (code, metadata) => {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    session: ({
      session,
      token,
      user,
    }: {
      session: undefined | any;
      token: any;
      user: any;
    }) => {
      session.user = token;
      session.error = token.error;
      console.log("Session Callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: async ({ token, user }) => {
      console.log("JWT Callback", user, token);
      if (user) {
        const u = user as unknown as any;
        console.log(user);
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          access_token: u.access_token,
          refresh_token: u.refresh_token,
          expires_at: u.expires_at,
          ...u,
        };
      }
      console.log(token.expires_at);
      // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
      const shouldRefreshTime =
        token.expires_at >= Date.now() + 1000 * 60 * 60 * 23;

      console.log(shouldRefreshTime);
      // If the token is still valid, just return it.
      if (shouldRefreshTime) {
        return Promise.resolve(token);
      }

      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      token = await refreshAccessToken(token);
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
