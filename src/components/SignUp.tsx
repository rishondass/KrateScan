import { useState } from 'react'
import { IoIosClose } from 'react-icons/io';
import {clsx} from 'clsx';
type Props = {
  toggle: ()=>void;
}

const SignUp = ({toggle}:Props) => {
  const [error,setError] = useState("");
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
      const message = await res.json();
      setError(message.message);
    }

  }


  return (
    <div className='z-20 absolute left-0 top-0'>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white rounded-lg h-3/4 w-11/12 p-2'>
          <div className='flex justify-end'>
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          <div className='flex flex-col h-5/6 gap-2'>
          <div className={clsx('p-4 bg-rose-500 rounded-md text-center align-middle text-white',error?"visible":"invisible")}>
            {error}
          </div>
          <div className='text-3xl font-bold text-center text-sec pb-4'>
            Sign Up
          </div>
          <form action={signUp} className='flex flex-col items-center justify-around grow '>
            <input name="username" type="text" placeholder='username' className='outline-none border-b-2 border-gray-200 rounded-md h-10 p-2 mb-4 w-full'/>
            <input name="password" type="password" placeholder='password' className='outline-none border-b-2 border-gray-200 rounded-md h-10 p-2 mb-4 w-full'/>
            <button type="submit" className='bg-sec text-white rounded-md h-12 w-1/3 p-2 font-bold'>
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