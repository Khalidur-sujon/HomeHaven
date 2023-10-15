import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

const Home = () => {
	const [offerListings, setofferListings] = useState([]);
	const [rentLisitngs, setrentLisitngs] = useState([]);
	const [saleListings, setsaleListings] = useState([]);

	useEffect(() => {
		const fetchOfferListings = async () => {
			try {
				const res = await fetch(`/api/listing/get?offer=true&limit=4`);
				const data = await res.json();
				setofferListings(data);
				fetchRentListings();
			} catch (error) {
				console.log(error);
			}
		};

		const fetchRentListings = async () => {
			try {
				const res = await fetch("/api/listing/get?type=rent&limit=4");
				const data = await res.json();
				setrentLisitngs(data);
				fetchSaleListings();
			} catch (error) {
				console.log(error);
			}
		};

		const fetchSaleListings = async () => {
			try {
				const res = await fetch("/api/listing/get?type=sale&limit=4");
				const data = await res.json();
				setsaleListings(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOfferListings();
	}, []);

	return (
		<div>
			{/* top */}
			<div className="flex flex-col mx-auto max-w-6xl p-28 px-3  gap-6">
				<h1 className="text-3xl lg:text-5xl font-bold text-slate-700 w-full max-w-4xl">
					Effortlessly Navigate Your Way to <br /> the{" "}
					<span className="text-slate-500">Perfect</span> Place for
					You.
				</h1>
				<p className="text-xs sm:text-sm text-gray-400 font-medium ">
					At HomeHeaven, our mission is to make your home search fast,
					easy, and comfortable. Our dedicated team of experts is
					always at your service, ensuring you find your dream home
					with ease and confidence. Discover the perfect place to call
					your own with HomeHeaven by your side.
				</p>
				<Link
					to="/search"
					className="text-xs sm:text-sm text-blue-700 font-bold hover:underline"
				>
					Let's Start Now...{" "}
				</Link>
			</div>
			{/* swiper */}
			{/* lisitngs item */}
			<div className="flex flex-col mx-auto gap-8 my-10 p-3 max-w-6xl">
				{/* display offer listings */}
				{offerListings && offerListings.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent offers
							</h2>
							<Link
								className="text-sm text-blue-800 hover:underline"
								to={"/search?offer=true"}
							>
								Show more offers
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{offerListings.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}

				{/* display rent listings */}
				{rentLisitngs && rentLisitngs.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent Places for Rent
							</h2>
							<Link
								className="text-sm text-blue-800 hover:underline"
								to={"/search?type=rent"}
							>
								Show more places for rent
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{rentLisitngs.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}

				{/* display sale listings */}
				{saleListings && saleListings.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent places for sale
							</h2>
							<Link
								className="text-sm text-blue-800 hover:underline"
								to={"/search?type=sale"}
							>
								Show more places for sale
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{saleListings.map((listing) => (
								<ListingItem
									listing={listing}
									key={listing._id}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
