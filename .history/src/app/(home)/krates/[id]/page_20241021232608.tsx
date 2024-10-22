"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";




const Page = async() => {
  const krates = useKrates(state=>state.)
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;