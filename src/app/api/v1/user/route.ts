import { getUser, createUser } from "../../../../lib/users";
import { NextResponse } from "next/server";
export async function GET(req:Request, props: { params: Promise<{ user: string }> }) {
  const params = await props.params;
  const user = await getUser(params.user);

  return Response.json(user, {status: 200})
}

export async function POST(req: Request){
  const data = await req.json();
  const res = await createUser(data.username,data.password);
  if(res.status){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({message:res.msg},{status:505});
  }
}