import { items } from "./db"

export async function getItems(krateID:string){
  return items.find({krateID: krateID}).toArray();
}

export async function addItem()
