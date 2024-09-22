import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const users = client.db('krate-scan').collection('users');

export async function getUser(username:string){
  
  const data= await users.findOne({username: username});
  
  const user:userType = {
    id: data?._id.toString() ||"",
    username: data?.username,
    krates: data?.krates || [],

  }
  return user;
}

export async function setUser(user: userType){
  users.updateOne({_id: new ObjectId},{...user})
}