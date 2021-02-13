import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../../../config.js"

export async function generatePassword(plainTextPassword) {
    return bcrypt.hash(plainTextPassword, 10);
}

export async function getToken(user) {
    return jwt.sign(user, config.JWT_SECRET, {
        expiresIn: "48h"
    });
}