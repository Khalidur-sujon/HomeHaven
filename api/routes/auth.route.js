//external imports
import express from "express";
//internal imports
import { SignUp, SignIn, SignOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);
router.get("/sign-out", SignOut);

//export
export default router;
