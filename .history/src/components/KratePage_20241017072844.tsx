"use client";
import { IoIosAddCircle } from "react-icons/io";
import {useState} from "react";
import { useUser } from '@/lib/globalStates';
import KrateCard from "@/components/KrateCard";
import AddKrate from "@/components/KrateModal";
import EditKrate from "@/components/KrateModal";
import { useSession } from "next-auth/react";

type Props = {
  krates: krateType[]
}
const KratePage = () => {
  const user = useUser((state)=>state.user);
  const [toggleAddKrate, setToggleAddKrate] = useState(false);
  const [toggleEditKrate, setToggleEditKrate] = useState<Partial<krateType> | null>(null);
  

  const toggleKrateModal = ()=>{
    setToggleAddKrate(!toggleAddKrate);
  }

  const handleEdit = (id: string, name: string, location: string, description: string, image: string)=>{
    if(id){
      setToggleEditKrate({id, name, location, description, image});
    }else{
      setToggleEditKrate(null);
    }
    
    
  } 

  return (
    <div className='p-2 flex flex-col h-screen gap-3'>
      {toggleEditKrate && <EditKrate id={toggleEditKrate.id} description={toggleEditKrate.description} image={toggleEditKrate.image} name={toggleEditKrate.name} location={toggleEditKrate.location} handleEdit={handleEdit}/>}
      {toggleAddKrate&&<AddKrate toggle={toggleKrateModal}/>}
      <div className='text-sec text-5xl font-bold'>Krates</div>
      <div className="flex items-center justify-center gap-3 pt-3">
        <div className='grow h-full text-black'>
          <input type="text" placeholder='search' className='bg-gray-200 px-2 py-1 rounded-md w-full h-10 outline-none' />
        </div>
        <IoIosAddCircle size={40} className="text-sec cursor-pointer" onClick={toggleKrateModal}/>
      </div>
      <div className="grow flex flex-col gap-3 overflow-y-auto">
        {krates.map((krate)=>{
          return <KrateCard key={krate.id} {...krate} handleEdit={handleEdit}/>
        })}
        
        
      </div>
    </div>
  )
}

export default KratePage;