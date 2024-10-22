
import { NextResponse } from "next/server";
import {updateKrate, getKrate} from "@/lib/krates"
export async function GET(request: Request,{ params }: { params: { id: string } }) {
  
  const data = await getKrate(params.id);
  if(data){
    return NextResponse.json(data)
  }
  
}

export async function POST(req: Request){
  const data = await req.json();
  if(await updateKrate(data as krateType)){
    return NextResponse.json({},{status: 200})
  }else{
    return NextResponse.json({},{status: 505})
  }

}