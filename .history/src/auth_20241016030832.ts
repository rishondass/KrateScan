import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string,
      role: string
    } & DefaultSession["user"]
  }

  
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username:{label: 'username', type:"text"},
        password:{label: 'password', type:"password"},
        id:{}
      },
      authorize: async (credentials) => {
        console.log("authorizing",credentials);
        
        return {id: "123", username: credentials.username};
      },
    
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks:{
    async session({ session, token, user }){
      user.
      // Add logic to customize the session
      return {
        ...session,
        user:{
          ...session.user,
          role: "admin"
        }
      }
    }
  }
})