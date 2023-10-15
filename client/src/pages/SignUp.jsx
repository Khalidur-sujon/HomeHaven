import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
	const [formData, setformData] = useState({});
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(false);

	const navigate = useNavigate();

	const handleOnChange = (e) => {
		setformData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		//data fetching
		try {
			setloading(true);
			seterror(false);

			const res = await fetch("/api/auth/sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			setloading(false);

			if (data.success !== false) {
				navigate("/sign-in");
			}

			if (data.success === false) {
				seterror(true);
				return;
			}
			seterror(false);
		} catch (error) {
			setloading(false);
			seterror(true);
		}
	};

	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3 h-screen">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Sign Up
			</h1>
			<form
				className="flex flex-col gap-4"
				onSubmit={(e) => handleOnSubmit(e)}
			>
				<input
					type="text"
					id="username"
					placeholder="Username"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none placeholder:italic"
					onChange={handleOnChange}
				/>
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
					{loading ? "Loading ... " : "Sign Up"}
				</button>
			</form>
			<p className="flex gap-2">
				<span>Have an account?</span>
				<Link to="/sign-in" className="cursor-pointer">
					<span className="text-blue-700 underline">Sign In</span>
				</Link>
			</p>
			{error ? (
				<span className="text-xs text-red-700  mt-1">
					Some thing went wrong
				</span>
			) : (
				""
			)}
		</div>
	);
};

export default SignUp;
