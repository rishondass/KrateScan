import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {

    interface AdapterUser {} & DefaultSession["user"] {
      role: string; // Add role or any other custom fields you want to extend
    }
    interface Session {
        user?: DefaultUser & { id: string; role: string };
    }
    interface User extends DefaultUser {
        role: string;
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
        //console.log("authorizing",credentials);
        
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
      console.log(session);
      return {
        ...session,
        user:{
          ...session.user,
          
        }
      }
    }
  }
})