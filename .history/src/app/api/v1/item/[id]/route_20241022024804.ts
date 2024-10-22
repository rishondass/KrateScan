import { NextResponse } from "next/server";

export async function PUT(req:Request){
  const data = await req.json();
  

  if(id){
    // update item
    return NextResponse.json({},{status:200});
  } else{
    return NextResponse.json({},{status:404});
  }
}