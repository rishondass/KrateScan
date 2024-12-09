import { auth } from "@/auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  props: { params: Promise<{ krateID: string, imageID: string }> }
) {
  const params = await props.params;
  const session = await auth();
  const filePath = path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "", params.krateID , params.imageID);
  try {
    // Read the file asynchronously
    const data = await fs.promises.readFile(filePath);

    // Set the appropriate headers to return image data
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "image/png", // Change this if the image format differs
        "Content-Disposition": `inline; filename="${params.imageID}"`, // Optional
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}