import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

import customError from "../utils/customError.js";

//API
//ROUTE:  /api/auth/sign-up
export const SignUp = async (req, res, next) => {
	const { username, email, password } = req.body;

	//hashed the password
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	try {
		await newUser.save();
		res.status(200).json({ message: "User Created Successfull" });
	} catch (error) {
		next(customError(500, "Internal server error"));
	}
};
