"use client";

import React, { ReactNode } from 'react'
import { SessionProvider} from "next-auth/react"
import 
const Layout = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider session={}>
      {children}
    </SessionProvider>
  )
}

export default Layout;