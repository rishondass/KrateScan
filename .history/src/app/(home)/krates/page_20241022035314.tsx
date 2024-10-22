import KratesPage from "@/components/KratesPage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";

const page = async() => {
  const session = await auth();
  const data = await getUserKrates(session?.user.id);
  const krates:krateType[]= data.map(krate=>{{
    id: krate.id,
    name: krate.name,
    description: krate.description,
    image: krate.image,
    user: {
      id: session?.user.id,
      name: session?.user.name,
      email: session?.user.email,
    }
  }});
  console.log(krates);
  return (
    <KratesPage kratesData={krates}/>
  )
}

export default page