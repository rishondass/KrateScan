
import KrateInfo from "@/components/KrateInfo";
import { getUserKrates } from "@/lib/krates";
import {auth} from '@/auth';



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