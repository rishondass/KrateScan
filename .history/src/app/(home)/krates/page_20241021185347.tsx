import KratePage from "@/components/KratesPage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";

const page = async() => {
  const session = await auth();
  const data:any = await getUserKrates(session?.user.id);
  const krates:krateType[]=[...data];
  console.log(krates);
  return (
    <KratePage kratesData={krates}/>
  )
}

export default page