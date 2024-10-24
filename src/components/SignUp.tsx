import React from 'react'
import { IoIosClose } from 'react-icons/io';

type Props = {
  toggle: ()=>void;
}

const SignUp = ({toggle}:Props) => {

  const signUp = async (formData: FormData)=>{
    const res = await fetch("/api/v1/user/",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: formData.get('username'), password: formData.get('password')}),
    });
    if(res.status === 200){
      toggle();
    }
    else{
      console.error("can't register user")
    }

  }


  return (
    <div className='z-20 absolute left-0 top-0'>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white rounded-lg h-3/4 w-11/12 p-2'>
          <div className='flex justify-end'>
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          <div className='flex justify-center flex-col '>
          <div className='text-3xl font-bold text-center text-sec pb-4'>
            Sign Up
          </div>
          <form action={signUp} className='flex flex-col'>
            <input name="username" type="text" placeholder='username' className='outline-none bg-gray-200 rounded-md h-10 p-2 mb-4'/>
            <input name="password" type="password" placeholder='password' className='outline-none bg-gray-200 rounded-md h-10 p-2 mb-4'/>
            <button type="submit" className='bg-sec text-white rounded-md h-10 p-2'>
              Sign Up
            </button>
          </form>
          
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp