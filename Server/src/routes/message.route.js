import e from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { generateUserForSideBar } from "../controllers/message.controllers.js";
import { getUserChatHistory } from "../controllers/message.controllers.js";

const router = e.Router()

router.get("/user", protectedRoute , generateUserForSideBar )
router.get("/:id", protectedRoute , getUserChatHistory )

router.post("/send/:id", protectedRoute, )
export default router 