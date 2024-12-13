import { MongoClient, ServerApiVersion } from "mongodb";
const client = new MongoClient(process.env.MONGO_URL as string || "mongodb://127.0.0.1:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export const users = client.db('krate-scan').collection('users');
export const krates = client.db('krate-scan').collection('krates');
export const items = client.db('krate-scan').collection('items');
