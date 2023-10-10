//external imports
import express from "express";
//internal imports
import { createListing } from "../controllers/listing.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);

//export
export default router;
