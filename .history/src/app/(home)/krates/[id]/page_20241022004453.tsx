import KrateInfo from "@/components/KrateInfo";
import {auth} from "@/auth";
type Props = {
  params:{
    id: string;
  }
}




const Page = ({ params }: Props) => {
  const session = await auth();
  if()

  const krates = useKrates((state) => state.krates);


}

export default Page;