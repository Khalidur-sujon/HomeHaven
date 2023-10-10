//external imports
import express from "express";
//internal imports
import { updateProfile } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateProfile);

//export
export default router;
