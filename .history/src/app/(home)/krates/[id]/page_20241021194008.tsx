"use client"
import KrateInfo from "@/components/KrateInfo"
import { useKrates } from "@/lib/globalStates"
const page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates(state=>state.krates);
  const krate = 
  return (
    <KrateInfo id={params.id}/>
  )
}

export default page