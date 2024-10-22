import { NextResponse } from "next/server";
import { updateItem } from "@/lib/items";
export async function PUT(req:Request){
  const data = await req.json();
  
  const update = await updateItem(data as )

  if(id){
    // update item
    return NextResponse.json({},{status:200});
  } else{
    return NextResponse.json({},{status:404});
  }
}