import { NextResponse } from "next/server";
import {getItems, addItem} from "@/lib/items";
export async function GET({ params }: { params: { id: string } }){
  const items = await getItems(params.id)
}

export async function POST(){
  
}