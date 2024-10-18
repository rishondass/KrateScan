
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth";
const layout = ({children}:{children:ReactNode}) => {
  const sesssion = 
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
    
  )
}

export default layout