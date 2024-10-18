import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import {}
const layout = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
    
  )
}

export default layout