
import { NextResponse } from "next/server";
import {updateKrate, get} from "@/lib/krates"
export async function GET(request: Request,{ params }: { params: { id: string } }) {
  
  const data = await 

  
}

export async function POST(req: Request){
  const data = await req.json();
  if(await updateKrate(data as krateType)){
    return NextResponse.json({},{status: 200})
  }else{
    return NextResponse.json({},{status: 505})
  }

}