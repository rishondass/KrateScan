import { NextResponse, NextRequest } from "next/server";
import { searchItem } from "@/lib/items";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search')
  const data = await searchItem(search as string);
  
  return NextResponse.json(data);
}