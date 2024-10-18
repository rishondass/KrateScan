import {krates} from "./db";


export async function getUserKrates(id:string){
  return await krates.;
}

export async function createKrate (krate: krateType){
  return await krates.insertOne(krate);
}

export async function updateKrate (krate: krateType){
  return await krates.updateOne({id: krate.id}, {
    $set:{
      name: krate.name,
      location: krate.location,
      description: krate.description,
      image: krate.image,
    }
  });
}

export async function deleteKrate (krate: krateType){
  return await krates.deleteOne({id: krate.id});
}

