import express from "express";
import { IndexRouter } from "./controllers/v0/index.router.js"
import cors from "cors";

const app = express();

app.use(cors());

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

