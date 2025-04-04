import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CognitoProvider from "next-auth/providers/cognito";
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"];
  }
}

const UserPool = new CognitoUserPool({
  UserPoolId: process.env.AWS_COGNITO_USERPOOL_ID as string,
  ClientId: process.env.AWS_COGNITO_CLIENT_ID as string,
});

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    CognitoProvider({
      id: "cognito",
      name: "Cognito",
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
      allowDangerousEmailAccountLinking: true,
      client: {
        token_endpoint_auth_method: "none",
      },
      checks: ["state", "nonce"],
      issuer: process.env.AWS_COGNITO_ISSUER,
      wellKnown: `${process.env.AWS_COGNITO_ISSUER}/.well-known/openid-configuration`,
      authorization: {
        url: `${process.env.AWS_COGNITO_DOMAIN}/oauth2/authorize`,
        params: {
          response_type: "code",
          client_id: process.env.AWS_COGNITO_CLIENT_ID,
          identity_provider: "Google",
          scope: "openid email phone",
          redirect_uri: process.env.AWS_COGNITO_CALLBACK_URL as string,
        },
      },
      profile(profile, tokens) {
        return {
          id: profile["cognito:username"], // provided id from cognito
          oauthId: profile.sub, // provided id from oauth
          email: profile.email,
          name: profile.name,
          accessToken: tokens.access_token,
        };
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize(credentials) {
        const cognitoUser = new CognitoUser({
          Username: credentials?.email as string,
          Pool: UserPool,
        });

        const authenticationDetails = new AuthenticationDetails({
          Username: credentials?.email as string,
          Password: credentials?.password as string,
        });

        return new Promise((resolve, reject) => {
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
              if (session instanceof CognitoUserSession) {
                const userInfo = {
                  id: session.getIdToken().payload.sub,
                  email: session.getIdToken().payload.email,
                  name: session.getIdToken().payload.name,
                  idToken: session.getIdToken().getJwtToken(),
                  accessToken: session.getAccessToken().getJwtToken(),
                  refreshToken: session.getRefreshToken().getToken(),
                };

                resolve(userInfo);
              }
            },
            onFailure: (error) => {
              if (error) {
                reject(error);
              }
            },
          });
        });
      },
    }),
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id;
        token.image = profile.avatar_url || profile.picture;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        // @ts-ignore
        session.tokens = token;
        session.user.id = String(token.id);
      }
      return session;
    },
    authorized({ auth }) {
      return !!auth?.user; // this ensures there is a logged in user for -every- request
    },
  },
  pages: {
    signIn: "/login", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
});
