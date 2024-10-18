import React from 'react'
import { IoIosClose } from 'react-icons/io';

type Props = {
  toggle: ()=>void;
}

const SignUp = ({toggle}:Props) => {
  return (
    <div className='z-20 absolute left-0 top-0'>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white rounded-md h-3/4 w-3/4 p-2'>
          <div className='flex justify-end'>
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          <div>
           
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp