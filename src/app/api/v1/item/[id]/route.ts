import { NextResponse } from "next/server";
import { updateItem,deleteItem } from "@/lib/items";
import { auth } from "@/auth";
import path from "path";
import { rmSync} from "fs";
import { unlink, writeFile } from "fs/promises";
export async function PUT(req:Request){
  const data = await req.json();
  const session = await auth();

  if(data.imageUri){
    const matches = data.imageUri.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid image URI');
    }

    const oldPath = path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "",  data.krateID, data.image)
    const deletePic = await unlink(oldPath);
    if(deletePic === undefined){
      const newPath = path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "", data.krateID, data.newImage);

      const base64Data = matches[2];

      await writeFile(newPath,  base64Data, 'base64');

      const payload = {
        id: data.id,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        krateID: data.krateID,
        image: data.newImage,
      }
      const update = await updateItem(payload as itemType);

      if(update.acknowledged){
        return NextResponse.json({},{status:200});
      }else{
        return NextResponse.json({},{status:505});
      }

    }
  }


  const update = await updateItem(data as itemType);

  if(update.acknowledged){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
  
}

export async function DELETE(req:Request){
  const data = await req.json();
  const session = await auth();

  const filePath = path.join(process.cwd(), 'src', 'public', 'uploads', session?.user.id || "", data.krateID, data.image);
  const del = await deleteItem(data.id);
  if(del.acknowledged){
    rmSync(filePath,{ recursive: true, force: true });
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
  
}

