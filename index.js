const express = require("express");
const { MongoClient } = require("mongodb");
const connectDb = require("./config/dbconnection");
// require("dotenv").config();

const app = express();
const PORT = 4000;

connectDb();
app.use(express.json());

app.get("/testRouter", (req, res) => {
  res.end("Hello World server running!");
});

app.listen(PORT, () => {
  console.log(`your server is running on port ${PORT}`);
});
