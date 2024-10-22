import { NextResponse } from "next/server";
import { updateItem,deleteItem } from "@/lib/items";
export async function PUT(req:Request){
  const data = await req.json();
  
  const update = await updateItem(data as itemType);

  if(update.acknowledged){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
  
}

export async function DELETE(req:Request){
  const data = await req.json();
  
  const delete = await deleteItem(data);

  if(delete.acknowledged){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
  
}

