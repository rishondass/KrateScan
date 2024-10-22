import KrateInfo from "@/components/KrateInfo";
import {auth} from "@/auth";
type Props = {
  params:{
    id: string;
  }
}




const Page = async({ params }: Props) => {
  const session = await auth();
  if(session?.user){
    const { id } = params;
    const krate = krates.find((krate) => krate.id === id);
    if (krate) {
      return <KrateInfo krate={krate} />;
    } else {
      return <div>Krate not found.</div>;
    }
  }

  const krates = useKrates((state) => state.krates);


}

export default Page;