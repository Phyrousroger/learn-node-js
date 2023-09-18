const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/user",require("./routes/userRoute"))

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Your port is listening in port number ${port}`);
});
