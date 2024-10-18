
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
const layout = ({children}:{children:ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
    
  )
}

export default layout