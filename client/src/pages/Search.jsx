import React from "react";

const Search = () => {
	return (
		<div className="flex flex-col gap-3 md:flex-row">
			{/* search options */}
			<div className="border-b-2 p-7 md:border-r-2 md:min-h-screen">
				<form className="flex flex-col gap-y-4">
					{/* search input*/}
					<div className="flex items-center gap-x-2">
						<label className="font-medium">Search Term:</label>
						<input
							type="text"
							className="rounded-lg p-2 focus:outline-none"
							id="searchTerm"
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
							/>
							<label>Rent & Sell</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="rent"
							/>
							<label>Rent</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="sale"
							/>
							<label>Sale</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="offer"
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
							/>
							<label>Parking</label>
						</div>
						<div className="flex items-center gap-x-2">
							<input
								type="checkbox"
								className="rounded-lg p-2 focus:outline-none w-4 h-4"
								id="furnished"
							/>
							<label>Furnished</label>
						</div>
					</div>
					<div className="flex gap-2 items-center">
						<label className="font-semibold">Sort:</label>
						<select
							name="sort_order"
							className="rounded-lg p-3 border focus:outline-none"
						>
							<option>Price High to Low</option>
							<option>Price Low to High</option>
							<option>Latest</option>
							<option>Oldest</option>
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
				<div className="p-7">
					<p className="text-xl text-slate-700">No Listing Found</p>
					<p className="text-xl text-slate-700 text-center w-full">
						Loading ...
					</p>
				</div>
			</div>
		</div>
	);
};

export default Search;
