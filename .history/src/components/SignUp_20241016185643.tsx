import React from 'react'

const SignUp = () => {
  return (
    <div className='z-20 absolute left-0 top-0'>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white rounded-md h-3/4 w-3/4 p-2'>
        <IoIosClose size={42} onClick={toggle}/>
          <div className='text-3xl font-bold text-center text-sec'>
            Sign Up
          </div>
          <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2 mb-4'/>
          <input type="password" className='outline-none bg-gray-200 rounded-md h-10 p-2 mb-4'/>
          <button className='bg-sec text-white rounded-md h-10 p-2'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp