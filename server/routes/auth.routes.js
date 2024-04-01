import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout",logout);
export default router;
