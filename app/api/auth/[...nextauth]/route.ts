import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        if (credentials?.email === "test@gmail.com" && credentials?.password === "123456") {
          return { id: "1", name: "Shivam", email: "test@gmail.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
