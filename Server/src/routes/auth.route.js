import express from "express";
import { checkUser, signup , login, logout } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router()


router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.put("/update-profile" , protectedRoute, updateProfile)

router.get("/checkAuth", protectedRoute, checkUser)
export default router;