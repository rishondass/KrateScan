import { getUsers } from "../../../../../lib/users"
export default function Page({ params }: { params: { user: string } }) {
  const 
  return <div className="text-white text-4xl">hello {params.user}</div>
}