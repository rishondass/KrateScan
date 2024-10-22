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

export async function getKrate(id:string,userID:string){
  const data = krates.find({id: id},{
    projection:{
      name: 1,
      location: 1,
      description: 1,
      image: 1,
      id: 1,
      userID: 1,
      _id: 0
    }
  });
  if(data ){
    console.log(data);
    const res:krateType = {...data};
    if(res.userID === userID){
      return res;
    }else{
      return null;
    }
  }
  

  if(res.userID === userID){
    return res;
  }else{
    return null;
  }
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


