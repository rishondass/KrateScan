"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";
import {useEffect} from "react";



const Page = async({ params }: { params: { id: string } }) => {
  const krates = useKrates(state=>state.krates);

  useEffect(()=>{},[krates])

  if(krates){
    const krate = krates.find(krate=>krate.id===id);
    return (
      <KrateInfo {...krate}/>
    )
  }
  

  
}

export default Page;