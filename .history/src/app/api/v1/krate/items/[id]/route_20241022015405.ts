import { NextResponse } from "next/server";
import {getItems, addItem} from "@/lib/items";
export async function GET(request: Request,{ params }: { params: { id: string } }){
  console.log(params.id)
  const items = await getItems(id);
  return NextResponse.json(items);
}

export async function POST(req: Request){
  const data = await req.json();
  const add = await addItem(data as itemType);

  if(add.acknowledged){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status: 505})
  }
}