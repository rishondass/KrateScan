"use client"
import KrateInfo from "@/components/KrateInfo";
import {useKrates} from "@/lib/globalStates";




const Page = async({params: {id:string}}) => {
  const krates = useKrates(state=>state.krates);

  if(krates){
    const krate = krates.find(krate=>krate)
  }
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;