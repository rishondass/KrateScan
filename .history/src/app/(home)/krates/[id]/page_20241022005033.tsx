import KrateInfo from "@/components/KrateInfo";
import {getKrate} from "@/lib/krates";
import {auth} from "@/auth";
type Props = {
  params:{
    id: string;
  }
}




const Page = async({ params }: Props) => {
  const session = await auth();
  if(session?.user){
    const krates = await 
  }

  const krates = useKrates((state) => state.krates);


}

export default Page;