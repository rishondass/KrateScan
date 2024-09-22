import { getUser,saveUser } from "../../../../lib/users";

export async function GET(request: Request,{ params }: { params: { user: string } }) {

  const user = await getUser(params.user);
  console.log(user);
  return Response.json(user, {status: 200}) 
}

export async function POST(req: Request,res:Response){
  const data = await req.json();
  console.log(data);
  if(await saveUser(data)){
    res.json({});
  }
}