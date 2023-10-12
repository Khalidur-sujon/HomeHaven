import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

import bcrypt from "bcryptjs";
import customError from "../utils/customError.js";

//API
//ROUTE: /api/user/update/:id
export const updateProfile = async (req, res, next) => {
	if (req.user.id !== req.params.id)
		return next(customError(401, "Unauthorized"));

	try {
		//hashed the new password
		if (req.body.password) {
			const salt = bcrypt.genSaltSync(10);
			req.body.password = bcrypt.hashSync(req.body.password, salt);
		}

		//update info
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
				},
			},
			{ new: true }
		);
		const { password, ...rest } = updatedUser._doc;
		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};

//API
//ROUTE: /api/user/getListing/id
export const getUserListings = async (req, res, next) => {
	if (req.user.id === req.params.id) {
		try {
			const listings = await Listing.find({ userRef: req.params.id });
			res.status(200).json(listings);
		} catch (error) {
			next(error);
		}
	} else {
		next(customError(401, "You can view only your listings"));
	}
};

//API
//ROUTE: /api/user/:id
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return next(customError(404, "User Not Found"));

		//user found
		const { password: pass, ...rest } = user._doc;
		res.status(200).json(rest);
	} catch (error) {
		next(error);
	}
};
