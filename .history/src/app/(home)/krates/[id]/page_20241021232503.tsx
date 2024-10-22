"use client"
import KrateInfo from "@/components/KrateInfo";
import useKrates from "@/lib/globalStates"




const Page = async({ params }: Props) => {
  const {id} = params;
  console.log(id);
  const session = await auth();
  
  const krate = 
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;