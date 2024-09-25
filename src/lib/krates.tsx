import {krates} from "../lib/db";
export async function createKrate (krate: krateType){
  return await krates.insertOne(krate);
}

export async function updateKrate (krate: krateType){
  return await krates.updateOne({id: krate.id}, krate);
}

export async function deleteKrate (krate: krateType){
  return await krates.deleteOne({id: krate.id});
}