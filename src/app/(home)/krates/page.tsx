import KratesPage from "@/components/KratesPage"
import {getUserKrates} from "@/lib/krates";
import {auth} from "@/auth";

const page = async() => {
  const session = await auth();
  const data = await getUserKrates(session?.user.id);
  const krates:krateType[]= data.map((krate)=>({
    id: krate.id,
    name: krate.name,
    description: krate.description,
    location: krate.location,
    userID: krate.userID,
    image: krate.image,
  }));
  //const krates:krateType[]=[...data];
  return (
    <KratesPage kratesData={krates}/>
  )
}

export default page