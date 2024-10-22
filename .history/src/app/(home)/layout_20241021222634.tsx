import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {auth} from "@/auth"
import {redirect, RedirectType} from "next/navigation";
const layout = async ({children}:{children:ReactNode}) => {
  const session = await auth();

  if(!session){
    redirect('/login');
  };

  const data:any = await getUserKrates(session?.user.id);

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default layout