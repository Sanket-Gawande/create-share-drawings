import express from "express";
import { userModel } from "../Models/userModel.js";
const shareRouter = express.Router();

// share Work
shareRouter.post("/shareWork", async (req, res) => {
  if (!req.body) {
    res.send("EMPTY BODY");
    return;
  }
  const { username, id, content, shareTo, name } = req.body;
  if (!username || !id || !shareTo || !name) {
    res.send({
      status: false,
      msg: "Required data is missing,try again",
    });
    return;
  }
  if (shareTo === username) {
    res.send({
      status: false,
      msg: "Your are sharing to yourself .",
    });
    return;
  }
  try {
    const checkIfExist = await userModel.findOne({
      "shared.id": id,
    });

    if (checkIfExist) {
      res.send({ status: false, msg: "Already shared one." });
      return;
    }
    const dbres = await userModel.findOneAndUpdate(
      { username: shareTo },
      {
        $push: {
          shared: {
            name,
            id,
            owner: username,
            content,
          },
        },
      },
      {
        new: false,
      }
    );

    if (!dbres) {
      res.send({ status: false, msg: "Username doesnt exist" });
      return;
    }
    res.send({ status: true, data: dbres, id });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});


// get shared works

///getWorks
shareRouter.post("/getShared", async (req, res) => {
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
    const dbres = await userModel.findOne(
      { username },
      { shared: 1 }
    );
    res.send({ status: true, data: dbres });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      msg: "Something went wrong , please try again",
      error,
    });
  }
});
export default shareRouter;
