import React from 'react'
import { IoIosClose } from 'react-icons/io';

type Props = {
  toggle: ()=>void;
}

const ItemMoveModal = ({toggle}:Props) => {
  return (
    <div className="z-20 fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="bg-white rounded-md w-11/12 h-[90%] p-4 sm:w-10/12 md:w-8/12 lg:w-6/12 sm:h-4/5 md:h-3/4 lg:h-2/3 overflow-auto">
          <div className="flex justify-end">
            <IoIosClose size={42} onClick={toggle} />
          </div>
          <div className='text-center'>
            Move To:
          </div>
          <div>
            
          </div>
        </div>
    </div>
  )
}

export default ItemMoveModal