import KratePage from "@/components/KratePage"
import {getKrates} from "@/lib/krates";
import {auth} from "@/"
const page = async() => {
  const krates = await getKrates()
  return (
    <KratePage/>
  )
}

export default page