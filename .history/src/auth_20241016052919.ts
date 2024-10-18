import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from 'next-auth';
declare module 'next-auth' {

    interface AdapterUser{
      role: string;
    }
    
    interface Session {
      user: {
        role: string;
      } & DefaultSession["user"];
    }
  
      user: {
        /** The user's postal address. */
        address: string
        /**
         * By default, TypeScript merges new interface properties and overwrites existing ones.
         * In this case, the default session user properties will be overwritten,
         * with the new ones defined above. To keep the default session user properties,
         * you need to add them back into the newly declared interface.
         */
      } & DefaultSession["user"]
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
      console.log(session, token, user);
      return {
        ...session,
        user:{
          ...session.user,
          
        }
      }
    }
  }
})