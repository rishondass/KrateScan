import KrateInfo from "@/components/KrateInfo";
import { getUserKrates } from "@/lib/krates";
import { auth} from '@/auth';

const Page = ({ params }: { params: { id: string } }) => {
  const auth = auth();
  const krates = await getUserKrates()

  const krates = useKrates(state=>state.krates);
  const krate = krates.find(krate=>krate.id===params.id);
  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;