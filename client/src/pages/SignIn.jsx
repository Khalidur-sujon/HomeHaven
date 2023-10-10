import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../redux/user/userSlice";

const SignIn = () => {
	const [formData, setformData] = useState({});
	const { loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		setformData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		//data fetching
		try {
			dispatch(signInStart());

			const res = await fetch("/api/auth/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (data.success !== false) {
				dispatch(signInSuccess(data));
				toast.success("Sign In Successfull");
				navigate("/profile");
			}

			if (data.success === false) {
				toast.error(data.message);
				dispatch(signInFailure(data));
				return;
			}
		} catch (error) {
			toast.error(error);
			dispatch(signInFailure(error));
		}
	};

	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Sign In
			</h1>
			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => handleOnSubmit(e)}
			>
				<input
					type="email"
					id="email"
					placeholder="Email"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none placeholder:italic"
					onChange={handleOnChange}
				/>
				<input
					type="password"
					id="password"
					placeholder="Password"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none placeholder:italic"
					onChange={handleOnChange}
				/>
				<button
					disabled={loading}
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
				>
					{loading ? "Loading ... " : "Sign In"}
				</button>
			</form>
			<p className="flex gap-2">
				<span>Don't have an account?</span>
				<Link to="/sign-up" className="cursor-pointer">
					<span className="text-blue-700 underline">Sign Up</span>
				</Link>
			</p>
			{/* {error ? (
				<span className="text-xs text-red-700  mt-1">
					{error.message || "Some thing went wrong"}
				</span>
			) : (
				""
			)} */}
		</div>
	);
};

export default SignIn;
