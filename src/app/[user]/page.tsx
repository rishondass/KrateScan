"use client";
import { IoIosAddCircle } from "react-icons/io";
import {useEffect, useState} from "react";
import { useUser } from '@/lib/globalStates';
import {useRouter} from "next/navigation";
import AddKrate from "@/components/AddKrate";
import { useSwipeable } from "react-swipeable";
import clsx from "clsx";
const Page = () => {
  const router = useRouter();
  const user = useUser((state)=>state.user);
  const [toggleAddKrate, setToggleAddKrate] = useState(false);
  const [toggleTransition, setToggleTransition] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft : (eventData) => {
      console.log("User Swiped!", eventData);
      setToggleTransition(true);
    },
    onSwipedRight: (eventData) => {
      console.log("User Swiped!", eventData);
      setToggleTransition(false);
    }
  });
  
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
      <div className="grow flex flex-col gap-3 overflow-y-auto">
        {user.krates.map((krate)=>{
          return <div {...handlers} key={krate.id} className={clsx("min-h-32 bg-gray-300 rounded-md p-1 w-full flex gap-2 transition relative overflow-hidden")} onClick={()=>{router.push('/krates/'+krate.id)}}>
          <div className={clsx("absolute right-0 top-0 bg-prim h-full rounded-r-md w-1/2 transition ease-in-out translate-x-full",toggleTransition?"-translate-x-[0%]":"")}>h</div>
          <div className="bg-gray-600 min-w-[50%] h-full">Images</div>
          <div className="h-full flex flex-col box-border overflow-hidden">
            <div className="font-bold text-xl">{krate.name}</div>
            <div className="font-light text-sm">{krate.location}</div>
            <div className="grow text-sm box-border">
            {krate.description}
            </div>
          </div>
        </div>
        })}
        
        
      </div>
    </div>
  )
}

export default Page;