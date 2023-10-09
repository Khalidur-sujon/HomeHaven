import { Link } from "react-router-dom";

const SignIn = () => {
	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Sign In
			</h1>
			<form className="flex flex-col gap-4">
				<input
					type="email"
					id="email"
					placeholder="Email"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none  placeholder:italic"
				/>
				<input
					type="password"
					id="password"
					placeholder="Password"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none placeholder:italic"
				/>
				<button className="bg-slate-700 text-white p-3 rounded-lg uppercase">
					Sign In
				</button>
			</form>
			<p className="flex gap-2">
				<span>Don't have an account?</span>
				<Link to="/sign-up" className="cursor-pointer">
					<span className="text-blue-700 underline">Sign Up</span>
				</Link>
			</p>
		</div>
	);
};

export default SignIn;
