import { items } from "./db"

export async function getItems(krateID:string){
  return items.find({krateID: krateID}).toArray();
}

export async function getItem(id:string){
  return await items.findOne({id:id});
}

export async function addItem(item:itemType){
  return await items.insertOne(item);
}

export async function updateItem(item:itemType){
  return await items.updateOne({id: item.id}, {
    $set:{
      name: item.name,
      location: item.location;
      description: string;
      image: string;
      image: item.image,
    }
  });
}


