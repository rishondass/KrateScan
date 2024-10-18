import KratePage from "@/components/KratePage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";
const page = async() => {
  const session = await auth();
  const krates:any = await getUserKrates(session?.user.username);
  const temp:krateType[] = [...krates]
  console.log(temp);
  return (
    <KratePage krates={temp}/>
  )
}

export default page