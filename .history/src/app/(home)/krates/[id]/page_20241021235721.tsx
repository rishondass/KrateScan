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
      async()=>{
        
      }
      
    }catch(e){
      console.error(e);
      return <div>An error occurred while fetching data.</div>
    }
    
  }
  

  
}

export default Page;