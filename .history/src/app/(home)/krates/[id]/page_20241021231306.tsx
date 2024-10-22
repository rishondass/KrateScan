
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
  console.log(id);
  const session = await auth();
  
  

  return (
    <KrateInfo {...krate}/>
  )
}

export default Page;