import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type DefaultSession } from 'next-auth';
import { authUser, getUser} from "./lib/users";
declare module 'next-auth' {
    
    interface Session {
      user: {
        id: string;
        username: string;
      } & DefaultSession["user"];
    }
    
}



export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
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
        const id:string = user?.id || "" ;
        if(user){
          const data = {id:id,name: credentials.username as string};
          return data;
          
        }else{
          return null;
        }
        
      },
    
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks:{
    async session({session}){
      // Add logic to customize the session
      const userData = await getUser(session.user.name || "");

      return {
        ...session,
        user:{
          ...session.user,
          id: userData?.id,
          username: userData?.username,
        }
      }
    }
  }
})