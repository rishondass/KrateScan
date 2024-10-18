import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
const layout = ({children}:{children:ReactNode}) => {
  return (
    {children}
  )
}

export default layout