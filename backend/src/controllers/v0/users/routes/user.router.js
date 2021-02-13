import express from "express";
import User from "../models/user.js";
import { generatePassword, comparePasswords, getToken } from "../utils.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).send({ msg: "Invalid Email." });
  }

  const validAuth = await comparePasswords(req.body.password, user.password);

  if (!validAuth) {
    return res.status(401).send({ msg: "Invalid Password." });
  }

  return res.send({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: getToken(user),
  });
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await generatePassword(req.body.password),
  });

  try {
    const newUser = await user.save();
    return res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } catch (e) {
    return res.status(401).send({ msg: "Invalid User Data." });
  }
});

export const UserRouter = router;
