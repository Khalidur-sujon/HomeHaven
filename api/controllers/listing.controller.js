import Listing from "../models/listing.model.js";

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
