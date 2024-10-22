import { NextResponse } from "next/server";
import { updateItem } from "@/lib/items";
export async function PUT(req:Request){
  const data = await req.json();
  
  const update = await updateItem(data as itemType);

  if(update.acknowledged){
    return NextResponse.json{}
  }

  if(id){
    // update item
    
  } else{
    return NextResponse.json({},{status:404});
  }
}