import { Query } from "../";
import { MealTable } from "../models";

const getOne = (meal_id: number) =>
  Query<MealTable>("SELECT * FROM meals WHERE id = $1", [meal_id]);
const getAll = (user_id: number) =>
  Query<MealTable>("SELECT * FROM meals WHERE user_id = $1", [user_id]);
const insert = (newMeal: MealTable) =>
  Query<MealTable>(
    "INSERT INTO meals (name, calories, carbohydrates, protein, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, calories, carbohydrates, protein, timestamp",
    [
      newMeal.name,
      newMeal.calories,
      newMeal.carbohydrates,
      newMeal.protein,
      newMeal.user_id,
    ]
  );
const remove = (meal_id: number) =>
  Query("DELETE FROM meals WHERE id = $1", [meal_id]);

export default {
  getOne,
  getAll,
  insert,
  remove,
};
