import { Router } from "express";
import {
  getAllScores,
  getUserScores,
  postInsertScore,
} from "../controllers/scoreController";

const router = Router();

router.get("/all", getAllScores);
router.get("/me", getUserScores);
router.post("/", postInsertScore);
export default router;
