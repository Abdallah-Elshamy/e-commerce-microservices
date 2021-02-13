import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../../../config.js";

export async function generatePassword(plainTextPassword) {
  return bcrypt.hash(plainTextPassword, 10);
}

export async function comparePasswords(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash);
}

export async function getToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
}
