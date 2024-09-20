import { MongoClient } from "mongodb";
const client = new MongoClient(process.env., {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});