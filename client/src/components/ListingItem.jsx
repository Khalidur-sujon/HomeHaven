import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
	const {
		_id,
		address,
		bathrooms,
		bedrooms,
		description,
		discountPrice,
		furnished,
		name,
		offer,
		parking,
		regularPrice,
		type,
		imageUrls,
	} = listing;
	return (
		<div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
			<Link to={`/listing/${_id}`}>
				<img
					src={
						imageUrls[0] ||
						"https://media.istockphoto.com/id/506903162/photo/luxurious-villa-with-pool.jpg?s=612x612&w=0&k=20&c=Ek2P0DQ9nHQero4m9mdDyCVMVq3TLnXigxNPcZbgX2E= "
					}
					alt="listing_item_image"
					className="h-[320px] sm:[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
				/>
			</Link>
			{/* content section */}
			<div className="mt-2 p-3 flex flex-col gap-1">
				<p className="truncate text-lg font-semibold text-slate-700">
					{name}
				</p>
				<div className="flex items-center gap-1">
					<MdLocationOn className="w-4 h-4 text-green-700" />
					<p className="truncate text-sm text-gray-600 w-full">
						{address}
					</p>
				</div>
				<p className="text-slate-500 mt-1 font-semibold">
					{offer
						? discountPrice.toLocaleString("en-US")
						: regularPrice.toLocaleString("en-US")}
					{type === "rent" && " / month"}
				</p>
				<div className="flex gap-3 text-slate-700">
					<div className="font-bold text-xs">
						{bedrooms > 1 ? `${bedrooms} beds` : `${bedrooms} bed`}
					</div>
					<div className="font-bold text-xs">
						{bathrooms > 1
							? `${bathrooms} baths`
							: `${bathrooms} bath`}
					</div>
				</div>
				<p className="text-sm text-gray-600">{description}</p>
			</div>
		</div>
	);
};

export default ListingItem;
