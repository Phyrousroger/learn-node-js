const { MongoClient } = require("mongodb");
require("dotenv").config();

const dburl = process.env.MONGODB_URL;

const dbName = "crudNoORM-project";
const client = new MongoClient(dburl);

const connectDb = async () => {
  try {
    await client.connect();
    console.log("connected successfully  to server");
    const db = client.db(dbName);
    const collection = db.collection("documents");
    const updateResult = await collection.findOneAndUpdate(
      {
        name: " kaung kaung",
      },
      { $set: { name: "kaung kaung" } }
    );
    console.log("Found documents =>", updateResult);

    return "done.";
  } catch (err) {
    console.log("i found err", err);
  } finally {
    await client.close();
  }
};

// export default connectDb();
module.exports = connectDb;
