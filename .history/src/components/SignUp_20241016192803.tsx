import React from 'react'
import { IoIosClose } from 'react-icons/io';

type Props = {
  toggle: ()=>void;
}

const SignUp = ({toggle}:Props) => {
  return (
    <div className='z-20 absolute left-0 top-0'>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white rounded-lg h-3/4 w-3/4 p-2'>
          <div className='flex justify-end'>
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          <div className='flex justify-center flex-col '>
          <div className='text-3xl font-bold text-center text-sec pb-4'>
            Sign Up
          </div>
          <form>
            
          </form>
          
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp