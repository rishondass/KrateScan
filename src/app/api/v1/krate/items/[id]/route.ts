import { NextResponse } from "next/server";
import {getItems, addItem} from "@/lib/items";
import {writeFile, existsSync, mkdirSync} from "fs";
import path from 'path';
import {auth} from "@/auth"
export async function GET(request: Request,{ params }: { params: { id: string } }){
  const items = await getItems(params.id);
  return NextResponse.json(items);
}

export async function POST(req: Request){
  const data = await req.json();
  const session = await auth();
  const uploadDir =  path.join(process.cwd(),"src", 'public', 'uploads', session?.user.id || "", data.krateID);
  
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
  const imagePath = data.image;
  const filePath = path.join(uploadDir,imagePath);
  
  if(data.imageUri){
    const matches = data.imageUri.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid image URI');
    }

    // Extract the image extension and the Base64 data
    const base64Data = matches[2];

    // Define the output file path (with extension)
    

    // Write the file
    writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        console.error('Error saving the image:', err);
      } else {
        console.log(`Image saved successfully as ${filePath}`);
      }
    });
  }

  const payload = {
    id: data.id,
    name: data.name,
    quantity: data.quantity,
    description: data.description,
    image:  imagePath,
    krateID: data.krateID,
  }

  const add = await addItem(payload as itemType);

  if(add.acknowledged){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status: 505})
  }
}