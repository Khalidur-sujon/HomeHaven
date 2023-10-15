import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ListingItem from "../components/ListingItem";

const Search = () => {
	const [sideBarData, setsideBarData] = useState({
		searchTerm: "",
		type: "all",
		parking: false,
		furnished: false,
		offer: false,
		sort: "created_at",
		order: "desc",
	});
	const [loading, setloading] = useState(false);
	const [listings, setlistings] = useState([]);
	const [showMore, setshowMore] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);

		const searchTermFromUrl = urlParams.get("searchTerm");
		const typeFromUrl = urlParams.get("type");
		const parkingFromUrl = urlParams.get("parking");
		const furnishedFromUrl = urlParams.get("furnished");
		const offerFromUrl = urlParams.get("offer");
		const sortFromUrl = urlParams.get("sort");
		const orderFromUrl = urlParams.get("order");

		// if all those query are available/changes, then update those in the sidebarform data
		if (
			searchTermFromUrl ||
			typeFromUrl ||
			parkingFromUrl ||
			furnishedFromUrl ||
			offerFromUrl ||
			sortFromUrl ||
			orderFromUrl
		) {
			setsideBarData({
				searchTerm: searchTermFromUrl || "",
				type: typeFromUrl || "all",
				parking: parkingFromUrl === "true" ? true : false,
				furnished: furnishedFromUrl === "true" ? true : false,
				offer: offerFromUrl === "true" ? true : false,
				sort: sortFromUrl || "created_at",
				order: orderFromUrl || "desc",
			});
		}

		//fetch data using all query
		const fetchData = async () => {
			try {
				setloading(true);
				const searchQuery = urlParams.toString();
				const res = await fetch(`/api/listing/get?${searchQuery}`);

				const data = await res.json();

				if (data.length > 8) {
					setshowMore(true);
				} else {
					setshowMore(false);
				}
				setlistings(data);
				setloading(false);
			} catch (error) {
				console.log(error);
				setloading(false);
			}
		};

		fetchData();
	}, [location.search]);

	//handle change
	const handleChange = (e) => {
		if (
			e.target.id === "all" ||
			e.target.id === "rent" ||
			e.target.id === "sale"
		) {
			setsideBarData({ ...sideBarData, type: e.target.id });
		}
		//search term
		if (e.target.id === "searchTerm") {
			setsideBarData({ ...sideBarData, searchTerm: e.target.value });
		}
		//parking, furnished, offer
		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setsideBarData({
				...sideBarData,
				[e.target.id]:
					e.target.checked || e.target.checked === "true"
						? true
						: false,
			});
		}

		//sort & order
		if (e.target.id === "sort_order") {
			const sort = e.target.value.split("_")[0] || "created_at";

			const order = e.target.value.split("_")[1] || "desc";

			setsideBarData({ ...sideBarData, sort, order });
		}
	};

	//handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		//have to change the urls
		const urlParams = new URLSearchParams();
		urlParams.set("searchTerm", sideBarData.searchTerm);
		urlParams.set("type", sideBarData.type),
			urlParams.set("parking", sideBarData.parking),
			urlParams.set("furnished", sideBarData.furnished),
			urlParams.set("offer", sideBarData.offer),
			urlParams.set("sort", sideBarData.sort),
			urlParams.set("order", sideBarData.order);

		const searchQuery = urlParams.toString();

		//navigate to this link
		navigate(`/search?${searchQuery}`);
	};

	//handle show more
	const handleShowMore = async () => {
		const numberOfListings = listings.length;
		const startIndex = numberOfListings;

		const urlParams = new URLSearchParams(location.search);
		urlParams.set("startIndex", startIndex);

		const searchQuery = urlParams.toString();
		const res = await fetch(`/api/listing/get?${searchQuery}`);

		const data = await res.json();
		if (data.length < 9) {
			setshowMore(false);
		}
		setlistings({ ...listings, ...data });
	};

	return (
		<div className="flex flex-col gap-3 md:flex-row">
			{/* search options */}
			<div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
				<form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
					{/* search input*/}
					<div className="flex items-center gap-x-2 whitespace-nowrap">
						<label className="font-medium ">Search Term:</label>
						<input
							type="text"
							className="rounded-lg p-2 focus:outline-none w-full"
							id="searchTerm"
							value={sideBarData.searchTerm}
							onChange={handleChange}
						/>
					</div>
					{/* checkinput options */}
					<div className="flex gap-x-3 items-center flex-wrap">
						<span className="font-semibold">Type:</span>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="all"
								checked={sideBarData.type === "all"}
								onChange={handleChange}
							/>
							<label>Rent & Sell</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="rent"
								checked={sideBarData.type === "rent"}
								onChange={handleChange}
							/>
							<label>Rent</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="sale"
								checked={sideBarData.type === "sale"}
								onChange={handleChange}
							/>
							<label>Sale</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="offer"
								checked={sideBarData.offer}
								onChange={handleChange}
							/>
							<label>Offer</label>
						</div>
					</div>
					{/* amenities */}
					<div className="flex flex-wrap gap-3">
						<span className="font-semibold">Amenitites:</span>

						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="parking"
								checked={sideBarData.parking}
								onChange={handleChange}
							/>
							<label>Parking</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="furnished"
								checked={sideBarData.furnished}
								onChange={handleChange}
							/>
							<label>Furnished</label>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<label className="font-semibold">Sort:</label>
						<select
							id="sort_order"
							className="rounded-lg p-3 border focus:outline-none"
							defaultValue={"created_at_desc"}
							onChange={handleChange}
						>
							<option value="regularPrice_desc">
								Price High to Low
							</option>
							<option value="regularPrice_asc">
								Price Low to High
							</option>
							<option value="createdAt_desc">Latest</option>
							<option value="createdAt_asc">Oldest</option>
						</select>
					</div>
					<button className="uppercase text-white bg-slate-700 rounded-lg hover:opacity-95 p-3">
						Search
					</button>
				</form>
			</div>

			{/* listing results */}
			<div className="flex-1">
				<h2 className="text-3xl font-semibold border-b p-3 text-center text-slate-700">
					Listing Results
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-7">
					{!loading && listings.length === 0 && (
						<p className="text-xl text-slate-700">
							No Listing Found
						</p>
					)}
					{loading && (
						<p className="text-xl text-slate-700 text-center w-full mx-auto animate-pulse">
							Loading ...
						</p>
					)}
					{/* display listing items */}
					{!loading &&
						listings &&
						listings.map((listing) => (
							<ListingItem key={listing._id} listing={listing} />
						))}

					{/* show more  */}
					{/* {showMore && (
						<button
							className="text-green-700 hover:underline text-center text-sm w-full"
							onClick={handleShowMore}
						>
							Show More
						</button>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default Search;
