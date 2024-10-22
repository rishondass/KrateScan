import { NextResponse } from "next/server";
import {getItems, addItem} from "@/lib/items";
export async function GET({ params }: { params: { id: string } }){
  const items = await getItems(params.id);
  return NextResponse.json(items);
}

export async function POST(req: Request){
  const data = await req.json();
  const add = await addItems(data as item
}