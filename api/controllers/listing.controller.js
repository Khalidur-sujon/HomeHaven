import Listing from "../models/listing.model.js";
import customError from "../utils/customError.js";

//API
//ROUTE:   /api/listing/create
export const createListing = async (req, res, next) => {
	try {
		const listing = await Listing.create(req.body);
		return res.status(201).json(listing);
	} catch (error) {
		next(error);
	}
};

//API
//ROUTE: /api/listing/deleteListing/:id
export const deleteListingItem = async (req, res, next) => {
	try {
		//find the listing item
		const listing = await Listing.findById(req.params.id);
		if (!listing) {
			return next(customError(404, "Listing not found"));
		}
		// if listing found, then verify the user
		if (req.user.id !== listing.userRef) {
			return next(customError(401, "You can delete only your listing"));
		}
		//if everything goes well then find the item and delete that
		await Listing.findByIdAndDelete(req.params.id);
		res.status(200).json("Delete Successfull");
	} catch (error) {
		next(error);
	}
};

//API
//ROUTE: /api/listing/deleteListing/:id
export const updateListingItem = async (req, res, next) => {
	try {
		//find the listing item
		const listing = await Listing.findById(req.params.id);
		if (!listing) {
			return next(customError(404, "Listing not found"));
		}
		// if listing found, then verify the user
		if (req.user.id !== listing.userRef) {
			return next(customError(401, "You can edit only your listing"));
		}
		//if everything goes well then find the item and edit that
		const updatedListing = await Listing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedListing);
	} catch (error) {
		next(error);
	}
};
