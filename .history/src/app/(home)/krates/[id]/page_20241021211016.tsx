"use client"
import KrateInfo from "@/components/KrateInfo"
import { useKrates } from "@/lib/globalStates"

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}


const page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates(state=>state.krates);
  const krate = krates.find(krate=>krate.id===params.id);
  return (
    // 
    <div>hi</div>
  )
}

export default page