import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
//API
//ROUTE:  /api/auth/sign-in
export const SignIn = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const validUser = await User.findOne({ email });

		if (!validUser) return next(customError(404, "User Not Found"));

		//if user is in database, chech the password
		const validPassword = bcrypt.compareSync(password, validUser.password);

		if (!validPassword)
			return next(customError(401, "Invalid Credentials"));

		//if user and password both are valid, then generate the token
		const token = jwt.sign({ id: validUser._id }, process.env.SECRET_CODE);

		const { password: hashedPassword, ...rest } = validUser._doc;

		const expiryDate = new Date(Date.now() + 360000000);

		// pass the token inside cookies
		res.cookie("access_token", token, {
			httpOnly: true,
			expires: expiryDate,
		})
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};

//API
//ROUTE : /api/auth/sign-out
export const SignOut = (req, res) => {
	res.clearCookie("access_token")
		.status(200)
		.json({ message: "Sign Out Success" });
};
