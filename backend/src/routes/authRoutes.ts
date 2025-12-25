import { Router } from "express";
import {
  postSignIn,
  postSignUp,
  postRefreshToken,
  postLogout,
  getUserByToken,
  insertMockUsers
} from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/sign_in", postSignIn);
router.post("/sign_up", postSignUp);
router.post("/refresh_token", postRefreshToken);
router.post("/logout", postLogout);
router.get("/me", authenticate, getUserByToken);
router.post("/insert_mock_users", insertMockUsers);

export default router;
