"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";




const Page = async() => {
  const krates = useKrates(state=>state.krates);

  if(krates){
    const krate = krates.find(=>)
  }
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;