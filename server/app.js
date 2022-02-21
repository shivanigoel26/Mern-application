const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));
//middleware
//const User = require("./model/userSchema");
app.use(express.json());
app.use(require("./router/auth")); //link router files

const middleware = (req, res, next) => {
  console.log("middleware");
};
middleware();
app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/register", (req, res) => {
  res.send("First Register here");
});
app.get("/login", (req, res) => {
  res.send("Login your account");
});
app.post("/register", (req, res) => {
  console.log(req.body);
  res.send("xyz");
});
app.listen(3000, () => {
  console.log("server is running");
});
