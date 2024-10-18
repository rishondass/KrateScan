import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    {children}
    <div>layout</div>
  )
}

export default layout