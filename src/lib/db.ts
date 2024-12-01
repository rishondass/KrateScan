import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});
export const users = client.db('krate-scan').collection('users');
export const krates = client.db('krate-scan').collection('krates');
export const items = client.db('krate-scan').collection('items');
