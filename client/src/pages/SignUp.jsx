import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
	const [formData, setformData] = useState({});

	const handleOnChange = (e) => {
		setformData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		//data fetching
		try {
			const res = await fetch("/api/auth/sign-up", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Sign Up
			</h1>
			<form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
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
				<button className="bg-slate-700 text-white p-3 rounded-lg uppercase">
					Sign Up
				</button>
			</form>
			<p className="flex gap-2">
				<span>Have an account?</span>
				<Link to="/sign-in" className="cursor-pointer">
					<span className="text-blue-700 underline">Sign In</span>
				</Link>
			</p>
		</div>
	);
};

export default SignUp;
