import React from 'react'
import { IoIosClose } from "react-icons/io";

type Props = {
  toggle: ()=>void;
}

const AddKrate = ({toggle}:Props) => {
  return (
    <div className='z-10 absolute left-0 top-0 bg-black/60 w-full h-full'>
      <div className='flex justify-center items-center h-full'>
        <div className='bg-white rounded-md h-4/5 w-11/12 p-2'>
          <div className='flex justify-end'>
            <IoIosClose size={42} onClick={toggle}/>
          </div>
          
          <div className='text-3xl font-bold text-center text-sec'>
            Krate
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col'>
              <label htmlFor="name">Name:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2'/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="location">Location:</label>
              <input type="text" className='outline-none bg-gray-200 rounded-md h-10 p-2'/>
            </div>
            <div className='flex flex-col col-span-2'>
              <label htmlFor="location">Description:</label>
              <textarea name="" id="" className='outline-none bg-gray-200 rounded-md h-36 p-2'></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddKrate