
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth";
const layout = ({children}:{children:ReactNode}) => {
  const sesssion = await auth
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
    
  )
}

export default layout