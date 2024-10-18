
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth";
const layout = ({children}:{children:ReactNode}) => {
  if(auth.)
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
    
  )
}

export default layout