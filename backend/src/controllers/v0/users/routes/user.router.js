import express from "express";
import User from "../models/user.js";
import { generatePassword, getToken } from "../utils.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: await generatePassword(req.body.password),
  });

  if (user) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status.status(401).send({ msg: "Invalid Email or Password." });
  }
});

export const UserRouter = router;
