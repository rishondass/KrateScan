import {krates} from "./db";


export async function getUserKrates(id:string|undefined){
  return krates.find({userID: id},{
    projection:{
      name: 1,
      location: 1,
      description: 1,
      image: 1,
      id: 1,
      _id: 0
    }
  }).toArray();
}

export async function getKrate(id:string){
  return await kra
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

export async function deleteKrate (id:string){
  return await krates.deleteOne({id:id});
}


