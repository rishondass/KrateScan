"use client"
import KrateInfo from "@/components/KrateInfo";
import useKrates from "@/lib/globalStates";




const Page = async() => {
  
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;