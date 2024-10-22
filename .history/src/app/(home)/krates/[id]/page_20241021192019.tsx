"use client"
import KrateInfo from "@/components/KrateInfo"
const page = ({ params }: { params: { id: string } }) => {
  return (
    <KrateInfo id={params.id}/>
  )
}

export default page