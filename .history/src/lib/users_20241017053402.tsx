import { ObjectId } from "mongodb";
import {users} from "../lib/db"
import bcrypt from "bcrypt";
import {uuidv4} from "uuid";
export async function getUser(username:string){
  const data = await users.aggregate([
    {$match: {username:username}},
    {$lookup:{
          from: "krates",
          localField: "id",
          foreignField: "userID",
          as: "krates"
    }},
    {$limit: 1}
  ]).next();
  console.log(data);
  return data;
}

export async function saveUser(user: userType){
  const update = await users.replaceOne({_id: new ObjectId(user.id)},{...user});
  return update.acknowledged;
}

export async function createUser(username:string, password:string){
  const user = await users.insertOne({
    id: UUID.v4();
    username: username,
    password: await bcrypt.hash(password,10),
  })

  return user.acknowledged;
}