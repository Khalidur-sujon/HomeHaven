//external imports
import express from "express";
//internal imports
import {
	updateProfile,
	getUserListings,
	getUser,
} from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateProfile);
router.get("/getListings/:id", verifyUser, getUserListings);
router.get("/:id", verifyUser, getUser);

//export
export default router;
