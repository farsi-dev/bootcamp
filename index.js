require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 5500;

const errorHandler = require("./handlers/error");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/user/:id", postRoute);

app.use((req, res, next) => {
  let error = new Error("Not Found");
  error.status = 404;
  next(error)
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is starting on port ${PORT}`)
});
