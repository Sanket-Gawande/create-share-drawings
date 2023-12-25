import express from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { userModel } from "../Models/userModel.js";
const LoginRouter = express.Router();

LoginRouter.post("/login", async (req, res) => {
  if (!req.body) {
    res.send("Empty  body");
    return;
  }
  const { password, username } = req.body;
  if (!password || !username) {
    res.send({
      status: false,
      msg: "All fields are necessary",
    });
    return;
  }

  const q = await userModel.findOne({ username });
  // checking if user exist
  if (!q) {
    res.send({
      status: false,
      msg: "username is not registered.",
    });
    return;
  }
  // checking password by comparing hash
  const result = bcryptjs.compareSync(password, q.password);
  if (!result) {
    res.send({
      status: false,
      msg: "Wrong password.",
    });
    return;
  }
  q.password = undefined;
  res
    // .cookie("user_project_28", JSON.stringify(q), {
    //   httpOnly: true,
    //   secure: true,
    // })
    .send({
      status: true,
      user: q,
    });
});

LoginRouter.post("/create", async (req, res) => {
  if (!req.body) {
    res.send("Empty  body");
    return;
  }
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) {
    res.send({
      status: false,
      msg: "password do not matches",
    });
    return;
  }
  const hashPass = bcryptjs.hashSync(confirm_password, 10);
  try {
    const akg = await userModel.create({
      ...req.body,
      password: hashPass,
      shared: [],
      paintings: [],
    });
    res.cookie("user_project_28", JSON.stringify(akg), {
      httpOnly: true,
      secure: true,
    });
    res.send({
      status: true,
      user: akg,
    });
  } catch (error) {
    console.log({ error })
    res.send({
      status: false,
      msg: "username already exist",
    });
  }
});


//get all usernames 

LoginRouter.get("/users", async (req, res) => {

  try {
    const akg = await userModel.find({

    }, { username: 1 });

    res.send({
      status: true,
      user: akg,
    });
  } catch (error) {
    res.send({
      status: false,
      msg: "Something went wrong",
    });
  }
});

export default LoginRouter;
