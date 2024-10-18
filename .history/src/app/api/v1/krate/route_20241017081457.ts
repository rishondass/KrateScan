import { NextResponse } from "next/server";
import {createKrate} from "../../../../lib/krates";

export async function POST(req: Request){
  const data = await req.json();
  if(await createKrate(data)){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
}

export async function DELETE(req:Requeset)