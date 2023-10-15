import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import {
	signOut,
	userProfileUpdateStart,
	userProfileUpdateSuccess,
	userProfileUpdateFailure,
} from "../redux/user/userSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const [formData, setformData] = useState({});
	const [showListingsError, setshowListingsError] = useState(false);
	const [userListings, setuserListings] = useState([]);
	const navigate = useNavigate();

	console.log(userListings);
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

	//handle show listings
	const handleShowListings = async () => {
		try {
			setshowListingsError(false);

			const res = await fetch(`/api/user/getListings/${currentUser._id}`);

			const data = await res.json();

			if (data.success === false) {
				setshowListingsError(false);
				return;
			}

			setuserListings(data);
		} catch (error) {
			setshowListingsError(error);
		}
	};

	//delete listing item
	const deleteListingItem = async (listingId) => {
		try {
			const res = await fetch(`/api/listing/deleteListing/${listingId}`, {
				method: "DELETE",
			});

			const data = await res.json();

			if (data.success === false) {
				console.log(data.message);
				return;
			}

			// success, now update the userLisitngs
			setuserListings((prevData) => {
				prevData.filter((listingItem) => listingItem._id !== listingId);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className=" max-w-lg mx-auto flex flex-col gap-y-4 p-3 h-screen">
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
					className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
				>
					{loading ? "Loading..." : "Update"}
				</button>
				<Link
					to="/create-listing"
					className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center"
				>
					Create Listing
				</Link>
			</form>
			<div className="flex justify-between items-center text-base text-red-700 px-3 mt-2">
				<span>Delete Account</span>
				<span onClick={handleSignOut} className="cursor-pointer">
					Sign out
				</span>
			</div>
			<button
				className="text-green-700 opacity-85 text-center font-medium text-xl hover:scale-105 hover:opacity-100 transition-all duration-300"
				onClick={handleShowListings}
			>
				Show Listings
			</button>
			{/* show listing error message */}
			<p className="text-sm text-red-700">
				{showListingsError ? "Error showing listings" : " "}
			</p>
			{/* show all the listings */}
			{userListings && userListings.length > 0 && (
				<div className="flex flex-col gap-4">
					<h2 className="font-bold text-2xl text-center mt-7">
						Your Listings
					</h2>

					{userListings.map((listing) => (
						<div
							key={listing._id}
							className="border rounded-lg p-3 flex justify-between items-center gap-4"
						>
							{/* image link */}
							<Link to={`/listing/${listing._id}`}>
								<img
									src={listing.imageUrls[0]}
									alt="listing cover"
									className="h-16 w-16 object-contain aspect-square"
								/>
							</Link>
							{/* listing title link */}
							<Link
								className="text-slate-700 font-semibold  hover:underline truncate flex-1"
								to={`/listing/${listing._id}`}
							>
								<p>{listing.name}</p>
							</Link>

							{/* listing edit/delete link */}

							<div className="flex flex-col  item-center gap-2">
								<button
									className="text-red-700 uppercase"
									onClick={() =>
										deleteListingItem(listing._id)
									}
								>
									Delete
								</button>
								<Link to={`/update-listing/${listing._id}`}>
									<button className="text-green-700 uppercase">
										Edit
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Profile;
