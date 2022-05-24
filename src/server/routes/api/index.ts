import { Router } from "express";
import mealRouter from "./meals";
import nutrientRouter from "./nutrients";

const router = Router();

router.use("/meals", mealRouter);
router.use("/nutrients", nutrientRouter);

export default router;
