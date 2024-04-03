import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { authUser } from "../middleware/authUser.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const router = express.Router();
router.use(cookieParser());

const multerStorage=new multer.memoryStorage();
const upload = multer({ multerStorage});
// const upload = multer({ dest: "images/" });

router.post("/send", authUser, upload.single("imageFile"), sendMessage);

// router.post("/send",authUser,sendMessage);
router.get("/:id", authUser, getMessages);

export default router;
