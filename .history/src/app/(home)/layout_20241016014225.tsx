
import { ReactNode } from 'react'

import {auth} from "@/auth";
const layout = async ({children}:{children:ReactNode}) => {
  return (
    
      {children}
    
  )
}

export default layout