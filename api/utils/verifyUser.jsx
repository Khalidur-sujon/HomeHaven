import jwt from "jsonwebtoken";
import customError from "./customError.js";

const verifyUser = (req, res, next) => {
	//get the token
	const token = req.cookies.access_token;

	if (!token) return next(customError(401, "You are not authorize"));

	//if token is found, then verify that
	jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
		if (err) return next(customError(403, "Token is not valid"));

		req.user = user;
		next();
	});
};
export default verifyUser;
