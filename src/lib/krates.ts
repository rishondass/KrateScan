import {items, krates} from "./db";


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
  // const data = await krates.findOne({id: id},{
  //   projection:{
  //     name: 1,
  //     location: 1,
  //     description: 1,
  //     image: 1,
  //     id: 1,
  //     userID: 1,
  //     _id: 0
  //   }
  // });
  const data = await krates.aggregate([
    {$match: {id:id}},
    {$lookup:{
      from: "items",
      localField: "id",
      foreignField: "krateID",
      as: "items",
      pipeline:[
        {$project:{
          id: 1,
          name: 1,
          description: 1,
          image: 1,
          krateID: 1,
          quantity: 1,
          _id: 0,
        }}
      ]
    }},
    {
      $project:{
        id: 1,
        name: 1,
        location: 1,
        description: 1,
        image: 1,
        userID: 1,
        items: 1,
        _id: 0,
      }
    }
  ]).next();
  
  const res : krateType & {items: itemType[]} = {
    id: data?.id,
    name: data?.name,
    location: data?.location,
    description: data?.description,
    image: data?.image,
    userID: data?.userID,
    items: data?.items
  };
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
  const krate = await krates.deleteOne({id:id});
  const itemAck = await items.deleteMany({krateID: id});
  if(krate.acknowledged && itemAck.acknowledged){
    return true;
  }else{
    return false;
  }
}

// {
//   $map:{
//     input: "$items",
//     as: "item",
//     in: {
//       id: "$$item.id",
//       name: "$$item.name",
//       description: "$$item.description",
//       image: "$$item.image"
//     }
//   }
// }


