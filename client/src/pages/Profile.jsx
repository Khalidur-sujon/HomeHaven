import { Link } from "react-router-dom";

const Profile = () => {
	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Profile
			</h1>
			<form className="flex flex-col gap-4">
				<input
					type="text"
					id="username"
					placeholder="Username"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none  placeholder:italic"
				/>
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
					Update
				</button>
			</form>
			<div className="flex justify-between items-center text-base text-red-700 px-3 mt-1">
				<span>Delete Account</span>
				<span>Sign out</span>
			</div>
		</div>
	);
};

export default Profile;
