"use client";

import React, { ReactNode } from 'react'
import { SessionProvider} from "next-auth/react"
const Layout = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider session={}>
      {children}
    </SessionProvider>
  )
}

export default Layout;