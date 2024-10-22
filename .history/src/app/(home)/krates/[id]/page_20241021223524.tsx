import KrateInfo from "@/components/KrateInfo";
import {get}

const Page = ({ params }: { params: { id: string } }) => {

  const krates = useKrates(state=>state.krates);
  const krate = krates.find(krate=>krate.id===params.id);
  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;