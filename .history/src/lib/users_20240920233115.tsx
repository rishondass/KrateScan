import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export async function getUser(username:string){
  const users = client.db('krate-scan').collection('users');
  const data= await users.findOne({username: username});
  
  const user:userType = {
    id: data?._id.toString() ||"",
    username: data?.username,
    krates: data?.krates || [],

  }
  return user;
}