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

export function isAuth(req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ msg: "No authorization headers." });
  }

  const token_bearer = req.headers.authorization.split(" ");
  if (token_bearer.length != 2) {
    return res.status(401).send({ msg: "Malformed token." });
  }

  const token = token_bearer[1];

  return jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, msg: "Failed to authenticate." });
    }
    req.user = decoded;
    return next();
  });
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).send({ msg: "Failed to authenticate Admin." });
  }
}
