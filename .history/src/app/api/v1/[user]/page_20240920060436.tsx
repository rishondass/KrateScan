import { getUsers } from "../../../../../lib/users"
export default async function Page({ params }: { params: { user: string } }) {
  const users = getUsers();
  return <div className="text-white text-4xl">hello {params.user}</div>
}