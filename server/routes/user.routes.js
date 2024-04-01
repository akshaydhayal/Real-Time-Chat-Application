import express from "express";
import { authUser } from "../middleware/authUser.js";
import { addFriend, getFriends, getUser, rejectFriendRequest, sendFriendRequest } from "../controllers/user.controller.js";

const router=express.Router();

router.get("/friends", authUser, getFriends);
router.get("/:username", authUser, getUser);
router.post("/friends/:username",authUser,addFriend);
router.post("/friends/add/:username",authUser,sendFriendRequest);
router.post("/friends/reject/:username",authUser,rejectFriendRequest);

export default router;
