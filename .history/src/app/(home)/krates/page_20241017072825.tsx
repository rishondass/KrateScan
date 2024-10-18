import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
import { useKrates } from "@/lib/globalStates";
const page = async() => {
  const session = await auth();
  const setKrates = useKrates((state)=>state.setKrates);
  const krates:any = await getUserKrates(session?.user.id);
  setKrates(krates as krateType[]);
  console.log(krates);
  return (
    <KratePage krates={temp}/>
  )
}

export default page