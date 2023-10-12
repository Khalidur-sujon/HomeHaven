import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import {
	FaShare,
	FaBath,
	FaBed,
	FaChair,
	FaMapMarkerAlt,
	FaParking,
} from "react-icons/fa";

import Contact from "../components/Contact";

const Listing = () => {
	SwiperCore.use([Navigation]);

	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(false);
	const [listing, setlisting] = useState(null);
	const [contact, setcontact] = useState(false);
	const [copied, setcopied] = useState(false);

	const params = useParams();
	const { currentUser } = useSelector((state) => state.user);

	useEffect(() => {
		const fetchListing = async () => {
			try {
				setloading(true);
				seterror(false);

				const res = await fetch(`/api/listing/get/${params.id}`);

				const data = await res.json();
				setloading(false);

				if (data.success === false) {
					seterror(true);
					return;
				}
				setlisting(data);
				seterror(false);
				setloading(false);
			} catch (error) {
				seterror(true);
				setloading(false);
			}
		};

		fetchListing();
	}, [params.id]);

	return (
		<main>
			{loading && (
				<p className="text-center my-7 text-2xl">Loading ... </p>
			)}
			{/* if any error found  */}
			{error && (
				<p className="text-center text-red-700 my-7 text-2xl">
					Something went wrong!{" "}
				</p>
			)}

			{listing && !error && !loading && (
				// make a slider
				<div>
					<Swiper navigation>
						{listing.imageUrls.map((url) => (
							<SwiperSlide key={url}>
								<div
									className="h-[550px]"
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: "cover",
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* link share  */}
					<div className="fixed top-[13%] right-[3%] z-10 bg-slate-100 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer">
						<FaShare
							className="text-slate-500"
							onClick={() => {
								navigator.clipboard.writeText(
									window.location.href
								);
								setcopied(true);
								setTimeout(() => {
									setcopied(false);
								}, 2000);
							}}
						/>
					</div>
					{copied && (
						<p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
							Link copied!
						</p>
					)}
					{/* content area */}
					<div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
						<p className="text-2xl font-semibold">
							{listing.name} - ${" "}
							{listing.offer
								? listing.discountPrice.toLocaleString("en-US")
								: listing.regularPrice.toLocaleString("en-US")}
							{listing.type === "rent" && " / month"}
						</p>
						<p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
							<FaMapMarkerAlt className="text-green-700" />
							{listing.address}
						</p>
						<div className="flex gap-4">
							<p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
								{listing.type === "rent"
									? "For Rent"
									: "For Sale"}
							</p>
							{listing.offer && (
								<p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
									$
									{+listing.regularPrice -
										+listing.discountPrice}{" "}
									OFF
								</p>
							)}
						</div>
						<p className="text-slate-800">
							<span className="font-semibold text-black">
								Description -{" "}
							</span>
							{listing.description}
						</p>
						<ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
							<li className="flex items-center gap-1 whitespace-nowrap ">
								<FaBed className="text-lg" />
								{listing.bedrooms > 1
									? `${listing.bedrooms} beds `
									: `${listing.bedrooms} bed `}
							</li>
							<li className="flex items-center gap-1 whitespace-nowrap ">
								<FaBath className="text-lg" />
								{listing.bathrooms > 1
									? `${listing.bathrooms} baths `
									: `${listing.bathrooms} bath `}
							</li>
							<li className="flex items-center gap-1 whitespace-nowrap ">
								<FaParking className="text-lg" />
								{listing.parking
									? "Parking spot"
									: "No Parking"}
							</li>
							<li className="flex items-center gap-1 whitespace-nowrap ">
								<FaChair className="text-lg" />
								{listing.furnished
									? "Furnished"
									: "Unfurnished"}
							</li>
						</ul>
						{currentUser &&
							listing.userRef !== currentUser._id &&
							!contact && (
								<button
									onClick={() => setcontact(true)}
									className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
								>
									Contact landlord
								</button>
							)}
						{contact && <Contact listing={listing} />}
					</div>
				</div>
			)}
		</main>
	);
};

export default Listing;

//when the page first time mounted, we want to fetch the data
