import * as jwt from "jsonwebtoken";
import config from "../../config";
import db from "../../db";
import { generateHash } from "../../utils/passwords";
import { Router } from "express";
import { UserTable } from "../../db/models";

const router = Router();

router.post("/", async (req, res) => {
  const newUser: UserTable = req.body;
  if (newUser.email && newUser.password) {
    try {
      newUser.password = generateHash(newUser.password);
      const result = await db.users.insert(newUser);
      const token = jwt.sign(
        { id: result[0].id, email: newUser.email },
        config.jwt.secret,
        { expiresIn: config.jwt.expires }
      );
      res.json(token);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

export default router;
