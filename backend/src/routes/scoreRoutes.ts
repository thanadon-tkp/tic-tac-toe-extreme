import { Router } from "express";
import {
  getAllScores,
  getUserScores,
  postInsertScore,
} from "../controllers/scoreController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.get("/all", authenticate, getAllScores);
router.get("/me", authenticate, getUserScores);
router.post("/", authenticate, postInsertScore);
export default router;
