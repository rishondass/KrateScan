import { getUser } from "../../../../lib/users";

export async function GET(request: Request,{ params }: { params: { user: string } }) {

  const user = await getUser(params.user);
  console.log(user);
  return Response.json(user, {status: 200}) 
}

export async function POST(req: Request){
  const data = await req.json();
}