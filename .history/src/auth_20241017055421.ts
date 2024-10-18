import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from 'next-auth';
import { authUser } from "./lib/users";
declare module 'next-auth' {
    
    interface Session {
      user: {
        role: string;
      } & DefaultSession["user"];
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
      },
      authorize: async (credentials) => {
        const user = await authUser(credentials.username as string, credentials.password as string);

        if(user){
          return {email: }
        }
        
        return { id: "1", username: "J Smith", email: "jsmith@example.com",role: "admin"};
      },
    
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks:{
    async session({ session, token, user }){
      // Add logic to customize the session
      console.log(session, token, user);
      return {
        ...session,
        user:{
          ...session.user,
          id: "14"
        }
      }
    }
  }
})