import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
const page = async() => {
  const session = await auth();
  const krates = await getUserKrates(session?.user.username);
  return (
    <KratePage krates={krates}/>
  )
}

export default page