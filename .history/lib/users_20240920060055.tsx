import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const users = client.db('krate-scan').collection('users');

export async function getUsers(){
  const user = await users.
}