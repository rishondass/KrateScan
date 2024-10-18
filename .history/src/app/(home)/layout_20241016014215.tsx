
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth";
const layout = async ({children}:{children:ReactNode}) => {
  const session = await auth();

  if(session?.user){
    console.log(session.user);
  }
  return (
    
      {children}
    
  )
}

export default layout