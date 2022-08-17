import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URI);

export default async function connect() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    return client.db("bank");
  } catch (e) {
    return e;
  }
}
