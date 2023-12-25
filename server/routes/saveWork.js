import express from "express";
import { userModel } from "../Models/userModel.js";
const workRouter = express.Router();

///getWork
workRouter.post("/getWork", async (req, res) => {
  if (!req.body) {
    res.send("EMPTY BODY");
    return;
  }
  const { id } = req.body;
  if (!id) {
    res.send({
      status: false,
      msg: "Invalid user name passed",
    });
    return;
  }
  try {
    const akg = await userModel.findOne(
      { "paintings.id": id },
      { paintings: { $elemMatch: { id } } }
    );

    res.send({ status: true, data: akg });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});

///getWorks
workRouter.post("/getWorks", async (req, res) => {
  if (!req.body) {
    res.send("EMPTY BODY");
    return;
  }
  const { username } = req.body;
  if (!username) {
    res.send({
      status: false,
      msg: "Invalid user name passed",
    });
    return;
  }
  try {
    const akg = await userModel.findOne(
      { username },
      { paintings: 1, shared: 1 }
    );
    res.send({ status: true, data: akg });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});

// createWork
workRouter.post("/createWork", async (req, res) => {
  if (!req.body) {
    res.send("EMPTY BODY");
    return;
  }
  const { username, id, name } = req.body;
  if (!username || !id) {
    res.send({
      status: false,
      msg: "invalid data",
    });
    return;
  }
  try {
    const akg = await userModel.findOneAndUpdate(
      { username },
      {
        $push: {
          paintings: {
            name,
            id,
            owner: username,
          },
        },
      }
    );

    res.send({ status: true, data: akg, id });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});

// update Work
workRouter.post("/updateWork", async (req, res) => {
  if (!req.body) {
    res.send("EMPTY BODY");
    return;
  }
  const { username, id, content } = req.body;
  if (!username || !id) {
    res.send({
      status: false,
      msg: "invalid data",
    });
    return;
  }
  try {
    const akg = await userModel.findOneAndUpdate(
      { username, "paintings.id": id },
      {
        $set: {
          "paintings.$.content": content,
        },
      }
    );

    res.send({ status: true, data: akg, id });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});
export default workRouter;
