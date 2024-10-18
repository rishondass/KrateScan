import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth"
import {redirect} from "next/navigation";
const layout = async ({children}:{children:ReactNode}) => {
  const session = await auth();

  if(!session){return null;

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default layout