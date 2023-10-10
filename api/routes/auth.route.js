//external imports
import express from "express";
//internal imports
import { SignUp, SignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);

//export
export default router;
