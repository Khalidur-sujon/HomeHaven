//external imports
import express from "express";
//internal imports
import {
	updateProfile,
	getUserListings,
} from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateProfile);
router.get("/getListings/:id", verifyUser, getUserListings);

//export
export default router;
