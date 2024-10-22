import { getUser,saveUser, createUser } from "../../../../lib/users";
import { NextResponse } from "next/server";
export async function GET(request: Request,{ params }: { params: { user: string } }) {
  const req= request;
  const user = await getUser(params.user);
  console.log(user);
  return Response.json(user, {status: 200}) 
}

export async function POST(req: Request){
  const data = await req.json();
  console.log(data);
  if(await createUser(data.username,data.password)){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:200});
  }
}