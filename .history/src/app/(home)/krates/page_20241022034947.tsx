import KratesPage from "@/components/KratesPage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";

const page = async() => {
  const session = await auth();
  const data = await getUserKrates(session?.user.id);
  const krates:krateType[]= data.;
  console.log(krates);
  return (
    <KratesPage kratesData={krates}/>
  )
}

export default page