## testing with mongodb without orm

Mongodb is no sql database.I want to know the fundamental of mongodb.so I write mongo db without using orm.

##connecting mongodb localhost

- install mongodb package
- copy connection string from mongo db compass

### to connect database function

```js
const connectDb = async () => {
  try {
    await client.connect();
    console.log("connected successfully  to server");
    const db = client.db(dbName);
    // to update documents data

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
```
