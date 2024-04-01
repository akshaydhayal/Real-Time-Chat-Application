import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import {authUser} from "../middleware/authUser.js";
import cookieParser from "cookie-parser";

const router=express.Router();
router.use(cookieParser());

router.post("/send",authUser,sendMessage);
router.get("/:id",authUser,getMessages);

export default router;