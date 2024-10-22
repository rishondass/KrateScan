"use client"
import KrateInfo from "@/components/KrateInfo"
import { useKrates } from "@/lib/globalStates"

const page = ({ params }: { params: { id: string } }) => {
  const krates = useKrates()
  const krate = krates.find(krate=>krate.id===params.id);
  return (
    <KrateInfo {...krate}/>
  )
}

export default page