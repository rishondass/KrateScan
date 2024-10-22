"use client"
import KrateInfo from "@/components/KrateInfo";
import useKrates from "@/lib/globalStates";




const Page = async() => {
  const krates = useKrates()
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;