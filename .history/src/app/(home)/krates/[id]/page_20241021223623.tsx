import KrateInfo from "@/components/KrateInfo";
import { getUserKrates } from "@/lib/krates";
import { auth} from '@/'

const Page = ({ params }: { params: { id: string } }) => {

  const krates = useKrates(state=>state.krates);
  const krate = krates.find(krate=>krate.id===params.id);
  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;