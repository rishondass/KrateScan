
import { NextResponse } from "next/server";
import {updateKrate, getKrate, deleteKrate} from "@/lib/krates"
import {auth} from "@/auth"
import path from "path";
import { rmSync} from "fs";
import { unlink, writeFile } from "fs/promises";
export async function GET(request: Request,{ params }: { params: { id: string } }) {
  const session = await auth();
  const data = await getKrate(params.id, session?.user.id || "");
  if(data){
    return NextResponse.json(data);
  }else{
    return NextResponse.json({},{status: 404})
  }
  
}

export async function POST(req: Request){
  const session = await auth();
  const data = await req.json();
  
  if(data.imageUri){
    const matches = data.imageUri.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid image URI');
    }

    const oldPath = path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "",  data.id, data.image)
    const deletePic = await unlink(oldPath);
    if(deletePic === undefined){
      const newPath = path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "", data.id, data.newImage);

      const base64Data = matches[2];

      await writeFile(newPath,  base64Data, 'base64');

      const payload = {
        id: data.id,
        name: data.name,
        description: data.description,
        location: data.location,
        userID: data.userID,
        image: data.newImage,
      }
  
      if(await updateKrate(payload as krateType)){
        return NextResponse.json({},{status: 200})
      }else{
        return NextResponse.json({},{status: 505})
      }
    }else{
      return NextResponse.json({},{status: 505});
    }

    
  }


  if(await updateKrate(data as krateType)){
    return NextResponse.json({},{status: 200})
  }else{
    return NextResponse.json({},{status: 505})
  }

}

export async function DELETE(req:Request,{ params }: { params: { id: string } }){
  const session = await auth();
  const filePath = path.join(process.cwd(), 'src', 'public', 'uploads', session?.user.id || "", params.id);

  console.log(filePath)
  const res = await deleteKrate(params.id);
  
  if(res){
    rmSync(filePath,{ recursive: true, force: true });
    return NextResponse.json({},{status:200});
  }
  return NextResponse.json({},{status:505});
}