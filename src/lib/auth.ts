import { LoginAction } from "@/actions/user/LoginAction";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { LoginUserExternalAction } from "@/actions/user/LoginUserExternalAction";

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (googleClientId == null || googleClientSecret == null) {
    throw new Error("Missing Google credentials");
  }

  return {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export const confereLogado = async (payload: {
  email?: string;
  senha?: string;
  is_profile_complete?: boolean;
  subscription_user?: string;
}) => {
  const subscriptionsUser = (await cookies()).get("subscription")?.value;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  subscriptionsUser != null
    ? (payload.subscription_user = JSON.parse(subscriptionsUser))
    : (payload.subscription_user = "");

  const res = await LoginAction(
    payload?.email,
    payload?.senha,
    payload?.subscription_user,
  );
  if (res.ok) {
    const refreshToken = res.headers?.get("x-refresh-token");
    const token = res.headers?.get("authorization")?.replace("Bearer ", "");

    const { data } = await res.json();
    return {
      ...data,
      token: token,
      refresh_token: refreshToken,
    };
  } else {
    return null;
  }
};

export const loginExterno = async (payload: { provider_user_id?: string }) => {
  const res = await LoginUserExternalAction(payload?.provider_user_id);
  if (res.ok) {
    const refreshToken = res.headers?.get("x-refresh-token");
    const token = res.headers?.get("authorization")?.replace("Bearer ", "");

    const { data } = await res.json();
    return {
      ...data,
      token: token,
      refresh_token: refreshToken,
    };
  } else {
    return null;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
      authorization: {
        params: {
          access_type: "offline",
        },
      },
    }),

    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "exemplo@email.com",
        },
        senha: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          senha: credentials?.senha,
        };

        if (payload.email == null || payload.senha == null) {
          throw new Error("Email ou senha inválido! 🤯");
        }

        const user = await confereLogado(payload);

        if (user != null) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  theme: {
    colorScheme: "auto",
    brandColor: "",
    logo: "/images/logo.png",
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 50, // 50 min
  },

  pages: {
    signIn: "/auth",
  },

  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    jwt: async function ({ token, user, account, trigger, session }) {
      const cookieStore = await cookies();
      if (account != null && user != null) {
        if (account.provider === "google") {
          const payload = {
            provider_user_id: token.sub,
          };

          const userGoogle = await loginExterno(payload);

          if (userGoogle == null) {
            return {
              ...token,
              provider: account.provider,
              provider_user_id: token.sub,
              email: token?.email,
              name: token?.name,
              image: token?.picture,
              is_profile_complete: false,
            };
          }

          // Save the access token and refresh token in the JWT on the initial login
          cookieStore.set({
            name: "token",
            value: userGoogle?.token,
            httpOnly: true,
            maxAge: 60 * 50,
            path: "/",
          });

          cookieStore.set({
            name: "refresh_token",
            value: userGoogle?.refresh_token,
            httpOnly: true,
            maxAge: 60 * 60 * 7,
            path: "/",
          });
          // =====================================================================

          return {
            ...token,
            id: userGoogle?.id,
            provider_user_id: token.sub,
            provider: account.provider,
            id_message: userGoogle?.id_message,
            id_corporation: userGoogle?.id_corporation,
            id_company: userGoogle?.id_company,
            role: userGoogle?.role,
            short_name_corp: userGoogle?.short_name_corp,
            email: userGoogle?.email,
            name: userGoogle?.name,
            image: userGoogle?.image ?? userGoogle?.picture,
            senha: userGoogle?.senha,
            token: userGoogle?.token,
            access_token: userGoogle?.token,
            refresh_token: userGoogle?.refresh_token,
            date_expires_token: userGoogle?.date_expires_token,
            date_creation_token: userGoogle?.date_creation_token,
            expires_at: userGoogle?.date_expires_token,
            is_profile_complete: userGoogle?.is_profile_complete,
            is_notification_enabled: userGoogle?.is_notification_enabled,
          };
        } else {
          // Save the access token and refresh token in the JWT on the initial login
          cookieStore.set({
            name: "token",
            value: user?.token,
            httpOnly: true,
            maxAge: 60 * 50,
            path: "/",
          });

          cookieStore.set({
            name: "refresh_token",
            value: user?.refresh_token,
            httpOnly: true,
            maxAge: 60 * 60 * 7,
            path: "/",
          });
          //= ====================================================================

          return {
            ...token,
            id: user?.id,
            provider_user_id: user.provider_user_id,
            provider: user.provider,
            id_message: user?.id_message,
            id_corporation: user?.id_corporation,
            id_company: user?.id_company,
            email: user?.email,
            role: user?.role,
            short_name_corp: user?.short_name_corp,
            name: user?.name,
            image: user?.image ?? user?.picture,
            senha: user?.senha,
            token: user?.token,
            access_token: user?.token,
            refresh_token: user?.refresh_token,
            date_expires_token: user?.date_expires_token,
            date_creation_token: user?.date_creation_token,
            expires_at: user?.date_expires_token,
            is_profile_complete: user?.is_profile_complete,
            is_notification_enabled: user?.is_notification_enabled,
          };
        }
      }

      if (trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.id = session.id;
        token.id_corporation = session.id_corporation;
        token.is_profile_complete = session.is_profile_complete;
        token.id_company = session.id_company;
        token.name = session.name;
        token.image = session.image || session.picture;
      }

      return token;
    },

    async session({ session, token, newSession, trigger }) {
      session.id = token?.id;
      session.id_message = token?.id_message;
      session.provider_user_id = token.provider_user_id;
      session.provider = token.provider;
      session.id_corporation = token?.id_corporation;
      session.id_company = token?.id_company;
      session.email = token?.email;
      session.role = token?.role;
      session.short_name_corp = token?.short_name_corp;
      session.name = token?.name;
      session.image = token?.image !== "" ? token?.image : token?.picture;
      session.senha = token?.senha;
      session.token = token?.token;
      session.access_token = token?.access_token;
      session.refresh_token = token?.refresh_token;
      session.date_expires_token = token?.date_expires_token;
      session.date_creation_token = token?.date_creation_token;
      session.expires_at = token?.expires_at;
      session.is_profile_complete = token?.is_profile_complete;
      session.is_notification_enabled = token?.is_notification_enabled;

      if (trigger === "update") {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        session.id = newSession.id;
        session.id_corporation = newSession.id_corporation;
        session.id_company = newSession.id_company;
        session.is_profile_complete = newSession.is_profile_complete;
        session.name = newSession.name;
        session.image = newSession.image || newSession.picture;
      }

      return session;
    },
  },
};
