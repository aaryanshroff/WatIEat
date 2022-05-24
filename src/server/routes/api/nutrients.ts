import axios from "axios";
import { Router } from "express";
import config from "../../config";
import { ReqNutrients } from "../../types";

const router = Router();

// POST /api/nutrients
router.post("/", async (req, res) => {
  const { query: foodName } = (req as ReqNutrients).body;
  const nutritionixHeaders = {
    "Content-Type": "application/json",
    "x-app-id": config.nutritionix.appID,
    "x-app-key": config.nutritionix.key,
  };
  try {
    const nutritionixRes = await axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      {
        query: foodName,
      },
      {
        headers: nutritionixHeaders,
      }
    );
    res.send(nutritionixRes.data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
