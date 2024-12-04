import { NextResponse } from "next/server";
import {createKrate} from "../../../../lib/krates";
import {writeFile, existsSync, mkdirSync} from "fs";
import path from 'path';
export async function POST(req: Request){
  const data = await req.json();

  
  const uploadDir =  path.join(process.cwd(),"src", 'public', 'uploads', data.userID, data.id);
  
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
    location: data.location,
    description: data.description,
    image:  data.imageUri?imagePath:"",
    userID: data.userID,
  }
  if(await createKrate(payload)){
    return NextResponse.json({},{status:200});
  }else{
    return NextResponse.json({},{status:505});
  }
}

