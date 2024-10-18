import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
import { useKrates } from "@/lib/globalStates";
const page = async() => {
  const session = await auth();
  const setKrates = useKrates((state)=>state.setKrates)
  const data = await getUserKrates(session?.user.id);
  const krates:krateType[]
  return (
    <KratePage krates={krates as krateType[]}/>
  )
}

export default page