import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
const page = async() => {
  const session = await auth();

  const krates as Krates = await getUserKrates(session?.user.id);
  const temp:krateType[] = [...krates]
  console.log(krates);
  return (
    <KratePage krates={temp}/>
  )
}

export default page