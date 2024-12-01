import { NextResponse, NextRequest } from "next/server";
import { searchItem } from "@/lib/items";
import {auth} from "@/auth"
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search');
  const session = await auth();
  const data = await searchItem(session?.user.id as string,search as string);
  
  return NextResponse.json(data);
}