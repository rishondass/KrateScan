import KrateInfo from "@/components/KrateInfo";
import {getKrate} from "@/lib/krates";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
type Props = {
  params:{
    id: string;
  }
}




const Page = async({ params }: Props) => {
  const session = await auth();
  if(session?.user){
    const krate = await getKrate(params.id, session.user.id);
    if(krate){
      return <KrateInfo {...krate}/>
    }
  }
  return 
  


}

export default Page;