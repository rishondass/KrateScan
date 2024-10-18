"use server";
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth";
const layout = async ({children}:{children:ReactNode}) => {
  
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default layout