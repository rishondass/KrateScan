import { items } from "./db"

export async function getItems(krateID:string){
  return items.find({krateID: krate}).to
}
