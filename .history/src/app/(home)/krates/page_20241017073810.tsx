import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
import { useKrates } from "@/lib/globalStates";
const page = async() => {
  const session = await auth();
  const setKrates = useKrates((state)=>state.setKrates)
  const data:any = await getUserKrates(session?.user.id);
  const krates:krateType[]=[...data];
  return (
    <KratePage kratesData={krates}/>
  )
}

export default page