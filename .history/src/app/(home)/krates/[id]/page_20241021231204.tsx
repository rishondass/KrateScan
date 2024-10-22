
import KrateInfo from "@/components/KrateInfo";
import { getUserKrates } from "@/lib/krates";
import {auth} from '@/auth';


type Props = {
  params:{
    id: string;
  }
}


const Page = async({ params }: Props) => {
  const {id} = params;
  // const auth = await auth();
  // const krates = await getUserKrates()

  // const krates = useKrates(state=>state.krates);
  // const krate = krates.find(krate=>krate.id===params.id);
  const session = await auth();
  
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;