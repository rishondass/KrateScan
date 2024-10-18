"use client";

import React, { ReactNode } from 'react'
import { SessionProvider, useSession } from "next-auth/react"
const Layout = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Layout;