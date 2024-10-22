"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";
import {useEffect} from "react";



const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates(state=>state.krates);
  

  if(krates.length !== 0){
    const krate = krates.find(krate=>krate.id=== params.id);
    return (
      <KrateInfo {...krate}/>
    )
  }else{
    try{
      const krate = await fetch("/api/v1/krate/"+params.id); 
      return <div>Loading...</div>
    }catch(e){
      
    }
    
  }
  

  
}

export default Page;