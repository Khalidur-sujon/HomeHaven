//external imports
import express from "express";
//internal imports
import {
	createListing,
	deleteListingItem,
	updateListingItem,
	getListing,
	getAllListings,
} from "../controllers/listing.controller.js";
import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/deleteListing/:id", verifyUser, deleteListingItem);
router.post("/update/:id", verifyUser, updateListingItem);
router.get("/get/:id", getListing);
router.get("/get", getAllListings);

//export
export default router;
