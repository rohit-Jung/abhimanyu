import { prisma } from "@abhimanyu/database";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";

// auth.api.getAccessToken(...)
// if (oauth)google access token is expired and we have refresh token then betterAuth automatically
// retries and refreshes token
// better auth also updates the brower's cookie
// so whenever outside the `better-auth` handler the `getAccessToken` is used you must forward cookie too.

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),

  // enable joins
  experimental: { joins: true },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      strategy: "jwe", // 'jwt' or 'jwe' or 'compact'
      refreshCache: true, // enable  stateless refresh
    },
  },

  // you can use redis too ? 
  // secondaryStorage: {}
  account: {
    // there can be cookie or header limits so for large JWT in production `db` is preferred
    storeStateStrategy: "cookie",
    // store provider account data after Oauth flow in `account_data` cookie which is encrypted
    storeAccountCookie: true,
  },
});
