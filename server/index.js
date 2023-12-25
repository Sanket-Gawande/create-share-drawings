import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({path :".env.local"});
import LoginRouter from "./routes/login.js";
import workRouter from "./routes/saveWork.js";
import shareRouter from "./routes/sharework.js";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3100;
const app = express();

// applying middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", process.env.CLIENT_URL],
    methods: ["post", "get"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use("/v1/api", LoginRouter);
app.use("/v1/api", workRouter);
app.use("/v1/api", shareRouter);

// connecting
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("connecting to server...");
      app.listen(PORT, (error) => {
        if (error) {
          console.log("error", error);
          return;
        }
        console.log(`connected to server , http://localhost:${PORT}`);
      });
    }
    console.log({connectionError :error});
  }
);
