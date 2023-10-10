import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
	signOut,
	userProfileUpdateStart,
	userProfileUpdateSuccess,
	userProfileUpdateFailure,
} from "../redux/user/userSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const [formData, setformData] = useState({});
	const navigate = useNavigate();

	const { currentUser, loading, error } = useSelector((state) => state.user);

	const handleOnChange = (e) => {
		setformData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(userProfileUpdateStart());

			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (data.success !== false) {
				dispatch(userProfileUpdateSuccess(data));
				toast.success("Update Successfull");
			}

			if (data.success === false) {
				dispatch(userProfileUpdateFailure(data));
				toast.error(data.message);
				return;
			}
		} catch (error) {
			dispatch(userProfileUpdateFailure(error));
			toast.error(error);
		}
	};

	const handleSignOut = async () => {
		try {
			await fetch("/api/auth/sign-out");
			dispatch(signOut());
			toast.success("Signout Successful.");
			navigate("/sign-in");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3">
			<h1 className="text-3xl font-bold text-center drop-shadow">
				Profile
			</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					defaultValue={currentUser?.username}
					type="text"
					id="username"
					placeholder="Username"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none  placeholder:italic"
					onChange={handleOnChange}
				/>
				<input
					defaultValue={currentUser?.email}
					type="email"
					id="email"
					placeholder="Email"
					autoComplete="false"
					className="text-base p-3 border rounded-lg focus:outline-none  placeholder:italic"
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
					className="bg-slate-700 text-white p-3 rounded-lg uppercase"
				>
					{loading ? "Loading..." : "Update"}
				</button>
			</form>
			<div className="flex justify-between items-center text-base text-red-700 px-3 mt-2">
				<span>Delete Account</span>
				<span onClick={handleSignOut} className="cursor-pointer">
					Sign out
				</span>
			</div>
		</div>
	);
};

export default Profile;
