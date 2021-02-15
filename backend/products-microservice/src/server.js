import express from "express";
import { IndexRouter } from "./controllers/v0/index.router.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import bodyParser from "body-parser";
import morgan from "morgan";

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());

app.use(morgan("combined"));

app.use(bodyParser.json());

app.use("/api/v0/", IndexRouter);

// Root URI call
app.get("/", async (req, res) => {
  res.send("/api/v0/");
});

// Start the Server
app.listen(5000, () => {
  console.log("server started at http://localhost:5000");
  console.log("press CTRL+C to stop server");
});
