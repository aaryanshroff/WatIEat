import * as passport from "passport";
import { Router } from "express";
import { ReqUser } from "../../types";
import db from "../../db";
import { MealTable } from "../../db/models";

const router = Router();

// GET /api/meals
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    try {
      const meals = await db.meals.getAll(req.user.id);
      res.json(meals);
    } catch (err) {
      console.log(err);
    }
  }
);

// POST /api/meals
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    const newMeal: MealTable = req.body;
    newMeal.user_id = req.user.id;
    try {
      const result = await db.meals.insert(newMeal);
      res.json(result);
    } catch (err) {
      console.error(err);
    }
  }
);

// DELETE /api/meals
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: ReqUser, res) => {
    const mealID = req.body.meal_id;
    try {
      const result = await db.meals.getOne(mealID);
      const meal = result[0];
      if (meal && result[0].user_id === req.user.id) {
        await db.meals.remove(meal.id);
        res.status(200).json("Succesfully deleted");
      } else {
        res.status(400).json("Bad Request");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Internal Server Error");
    }
  }
);

export default router;
