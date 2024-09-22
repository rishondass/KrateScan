"use client";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import { useUser } from '@/lib/globalStates';
import {useRouter} from "next/navigation";
import AddKrate from "@/components/AddKrate";

const Page = () => {
  const router = useRouter();
  const user = useUser((state)=>state.user);
  const [toggleAddKrate, setToggleAddKrate] = useState(false);
  
  
  // useEffect(()=>{
  //   if(!user.username){
  //     router.replace("/");
  //   }
  // },[]);

  const toggleKrateModal = ()=>{
    setToggleAddKrate(!toggleAddKrate);
  }

  return (
    <div className='p-2 flex flex-col h-screen gap-3'>
      {toggleAddKrate&&<AddKrate toggle={toggleKrateModal}/>}
      <div className='text-sec text-5xl font-bold'>Krates</div>
      <div className="flex items-center justify-center gap-3 pt-3">
        <div className='grow h-full text-black'>
          <input type="text" placeholder='search' className='bg-gray-200 px-2 py-1 rounded-md w-full h-10 outline-none' />
        </div>
        <IoIosAddCircle size={40} className="text-sec cursor-pointer" onClick={toggleKrateModal}/>
      </div>
      <div className="grow bg-red-300 pt-10">
        <div className="h-32 bg-gray-200 rounded-md p-1 w-full flex">
          <div className="bg-gray-600 w-40 h-full">Image</div>
          <div className="h-full flex flex-col">
            <div className="font-bold">Title</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Page;