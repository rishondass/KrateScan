import KratePage from "@/components/KratePage"
import {getKrates} from "@/lib/krates";
import {auth} from "@/auth"
const page = async() => {
  const krates = await getKrates()
  return (
    <KratePage/>
  )
}

export default page