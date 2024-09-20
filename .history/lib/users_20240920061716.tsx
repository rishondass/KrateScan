import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export async function getUsers(){
  const users = client.db('krate-scan').collection('users');
  const user = await users.find({},({
    projection:{
      _id: 0,
      username: 1
    }
  }));
  console.log(user);
  return user;
}