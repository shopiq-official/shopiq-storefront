import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


// this function revalidate the data from backend . This is Revalidation using tags. 
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  revalidateTag(tag!);
  return NextResponse.json({
    revalidate: true,
    now: Date.now(),
    request: request,
  });
}
