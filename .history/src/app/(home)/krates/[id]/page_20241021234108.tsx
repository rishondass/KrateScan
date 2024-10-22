"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";
import {useEffect} from "react";



const Page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates(state=>state.krates);

  useEffect(()=>{
    if(krates.lengt)
  },[krates])

  if(krates){
    const krate = krates.find(krate=>krate.id=== params.id);
    return (
      <KrateInfo {...krate}/>
    )
  }{
    return <div>Loading...</div>
  }
  

  
}

export default Page;