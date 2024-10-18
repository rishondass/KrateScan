import KratePage from "@/components/KratePage"
import {getKrates} from "@/lib/krates";
import {auth} from "@/auth";
const page = async() => {
  const session = await auth();
  const krates = await getKrates(session?.user.username)
  return (
    <KratePage krates={krates}/>
  )
}

export default page