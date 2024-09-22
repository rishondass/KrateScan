import { getUser,saveUser } from "../../../../lib/users";
import { NextR } from "next";
export async function GET(request: Request,{ params }: { params: { user: string } }) {

  const user = await getUser(params.user);
  console.log(user);
  return Response.json(user, {status: 200}) 
}

export async function POST(req: Request,res:NextApiResponse){
  const data = await req.json();
  console.log(data);
  if(await saveUser(data)){
    res.json({},);
  }else{
    res.status(505);
  }
}