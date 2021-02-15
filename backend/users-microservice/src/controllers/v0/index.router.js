import express from "express";
import { UserRouter } from "./users/routes/user.router.js";

const router = express.Router();

router.use("/users", UserRouter);

router.get("/", async (req, res) => {
  res.send("V0");
});

export const IndexRouter = router;