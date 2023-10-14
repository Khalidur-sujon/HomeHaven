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

//API
//ROUTE: /api/listing/get/:id
export const getListing = async (req, res, next) => {
	try {
		const listing = await Listing.findById(req.params.id);

		if (!listing) return next(customError(404, "Listing not found"));
		//if found
		res.status(200).json(listing);
	} catch (error) {
		next(error);
	}
};

//API
//ROUTE: /api/listing/getAllListings
export const getAllListings = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit) || 9;
		const startIndex = parseInt(req.query.startIndex) || 0;

		let offer = req.query.offer;
		if (offer === undefined || offer === "false") {
			offer = { $in: [false, true] };
		}

		let furnished = req.query.furnished;
		if (furnished === undefined || furnished === "false") {
			furnished = { $in: [false, true] };
		}

		let parking = req.query.parking;
		if (parking === undefined || parking === "false") {
			parking = { $in: [false, true] };
		}

		let type = req.query.type;
		if (type === undefined || type === "all") {
			type = { $in: ["sale", "rent"] };
		}

		const searchTerm = req.query.searchTerm || "";

		const sort = req.query.sort || "createdAt";
		const order = req.query.order || "desc";

		//make the search from listing
		const listings = await Listing.find({
			name: { $regex: searchTerm, $options: "i" },
			offer,
			furnished,
			parking,
			type,
		})
			.sort({ [sort]: order })
			.limit(limit)
			.skip(startIndex);

		//return
		return res.status(200).json(listings);
	} catch (error) {
		next(error);
	}
};
