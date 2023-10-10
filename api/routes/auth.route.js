//external imports
import express from "express";
//internal imports
import { SignUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", SignUp);

//export
export default router;
