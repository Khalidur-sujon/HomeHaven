import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import customError from "../utils/customError.js";

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
