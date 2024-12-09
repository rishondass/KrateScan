import KrateInfo from "@/components/KrateInfo";
import {getKrate} from "@/lib/krates";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
type Props = {
  params: Promise<{
    id: string;
  }>
}




const Page = async (props: Props) => {
  const params = await props.params;
  const session = await auth();
  if(session?.user){
    const krate = await getKrate(params.id, session.user.id);
    if(krate){
      return <KrateInfo {...krate}/>
    }
  }
  return redirect("/krates");
}

export default Page;