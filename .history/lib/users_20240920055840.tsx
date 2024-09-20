import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function getUsers(){
  const users = await client.db('krate-scan')
}