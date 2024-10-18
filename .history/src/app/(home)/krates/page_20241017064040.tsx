import KratePage from "@/components/KratePage"
import {getKrates} from "@/lib/krates";
const page = async() => {
  const krates = await getKrates()
  return (
    <KratePage/>
  )
}

export default page