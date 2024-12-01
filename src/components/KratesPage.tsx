"use client";
import { IoIosAddCircle } from "react-icons/io";
import React, {useState, useEffect} from "react";
import KrateCard from "@/components/KrateCard";
import AddKrate from "@/components/KrateModal";
import EditKrate from "@/components/KrateModal";
import { useKrates} from "@/lib/globalStates";
import ItemsSection from "./ItemsSection";
import { RiLogoutBoxLine } from "react-icons/ri";

type Props = {
  kratesData: krateType[]
}
const KratesPage = ({kratesData}:Props) => {
  const setKrates = useKrates((state)=>state.setKrates);
  const krates = useKrates((state)=>state.krates);
  const [queryItems, setQueryItems] = useState<itemType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleAddKrate, setToggleAddKrate] = useState(false);
  const [toggleEditKrate, setToggleEditKrate] = useState<Partial<krateType> | null>(null);
  
  useEffect(()=>{
    if(kratesData && krates.length <= 0)
      setKrates(kratesData);
  },[kratesData])

  

  const onSearchQueryChange = async(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchQuery(e.target.value);
    if(e.target.value.length > 0){
      const res = await fetch("/api/v1/item?search=" + e.target.value);
      const data = await res.json();
      setQueryItems(data as itemType[]);
    }else{
      setQueryItems(null);
    }
  }

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
      <div className="flex items-center justify-between">
        <div className='text-sec text-5xl font-bold'>Krates</div>
        <RiLogoutBoxLine size={40} className="text-rose-600"/>
      </div>
      
      <div className="flex items-center justify-center gap-3 pt-3">
        <div className='grow h-full text-black'>
          <input type="text" placeholder='search' className='bg-[#F1F1F1] px-2 py-1 rounded-md w-full h-10 outline-none' onChange={onSearchQueryChange}/>
        </div>
        <IoIosAddCircle size={40} className="text-sec cursor-pointer" onClick={toggleKrateModal}/>
      </div>
      <div className="grow flex flex-col gap-3 overflow-y-auto">
        {searchQuery?

        <ItemsSection items={queryItems ?? []} add={false}/>
        
        :krates.map((krate)=>{
          return <KrateCard {...krate} key={krate.id}  handleEdit={handleEdit}/>
        })}
        
        
      </div>
    </div>
  )
}

export default KratesPage;