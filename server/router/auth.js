const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//require('../db/conn');
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello from router");
});

router.post("/register", (req, res) => {
  //console.log(req.body);
  //res.json({ message: req.body });
  const { name, email, phone, password, confirm_password } = req.body;
  if (!name || !email || !phone || !password || !confirm_password) {
    return res.status(422).json({ error: "Fill the reuired field" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email already exist" });
      } else if (password != confirm_password) {
        return res.status(422).json({ error: "password doesn't match" });
      } else {
        const user = new User({
          name,
          email,
          phone,
          password,
          confirm_password,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({ message: "user registered successfully" });
          })
          .catch((err) =>
            res.status(500).json({ error: "Failed to register" })
          );
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//login route using async
router.post("/signin", async (req, res) => {
  //console.log(req.body);
  //res.json({ message: "awesome" });
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the details" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Data.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Data" });
      } else {
        res.json({ message: "user Signin Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
