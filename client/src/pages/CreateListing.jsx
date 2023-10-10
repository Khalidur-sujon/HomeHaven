const CreateListing = () => {
	return (
		<div className="max-w-4xl p-3 mx-auto">
			<h1 className="font-bold text-3xl text-center my-7">
				Create A Listing
			</h1>
			<form className="flex flex-col gap-5 sm:flex-row">
				{/* content seciton */}
				<div className="flex-1 flex flex-col gap-4">
					<input
						type="text"
						id="name"
						placeholder="Name"
						className="border rounded-lg p-3 placeholder:italic focus:outline-none"
					/>
					<textarea
						type="text"
						id="name"
						rows={4}
						placeholder="Name"
						className="border rounded-lg p-3 placeholder:italic focus:outline-none resize-none"
					/>
					<input
						type="text"
						id="address"
						placeholder="Address"
						className="border rounded-lg p-3 placeholder:italic focus:outline-none"
					/>
					{/* checkbox */}
					<div className="flex gap-6 flex-wrap my-1 p-2">
						<div className="flex gap-2">
							<input type="checkbox" id="sale" className="w-5" />
							<span>Sell</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="rent" className="w-5" />
							<span>Rent</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="parkingSpot"
								className="w-5"
							/>
							<span>Parking Spot</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="furnished"
								className="w-5"
							/>
							<span>Furnished</span>
						</div>
						<div className="flex gap-2">
							<input type="checkbox" id="offer" className="w-5" />
							<span>Offer</span>
						</div>
					</div>

					{/* Options for bed, bath,regular price */}
					<div className="flex gap-6 flex-wrap">
						{/* bed */}
						<div className="flex gap-2 items-center">
							<input
								type="number"
								min="1"
								max="10"
								id="beds"
								required
								className="border p-3 rounded-lg  focus:outline-none"
							/>
							<span className="text-base">Beds</span>
						</div>
						{/* bath */}
						<div className="flex gap-2 items-center">
							<input
								type="number"
								min={1}
								max={10}
								id="baths"
								required
								className="border p-3 rounded-lg focus:outline-none"
							/>
							<span className="text-base">Baths</span>
						</div>
						{/* regular price */}
						<div className="flex gap-2 items-center">
							<input
								type="number"
								min="50"
								max="10000000"
								id="regularPrice"
								required
								className="border p-3 rounded-lg focus:outline-none"
							/>
							<div className="flex flex-col items-center">
								<p>Regular Price</p>
								<span className="text-xs">($/Month)</span>
							</div>
						</div>
						{/* discounted price */}
						<div className="flex gap-2 items-center">
							<input
								type="number"
								min="1"
								max="10"
								id="discountedPrice"
								required
								className="border p-3 rounded-lg focus:outline-none"
							/>
							<div className="flex flex-col items-center">
								<p>Discounted Price</p>
								<span className="text-xs">($/Month)</span>
							</div>
						</div>
					</div>
				</div>
				{/* image section */}
				<div className="flex-1 flex flex-col gap-5">
					<h3 className="text-slate-600">
						<span className="font-bold text-black">Images:</span>{" "}
						The First image will be the cover (max 6)
					</h3>
					<div className="flex gap-3">
						<input
							type="file"
							id="image"
							accept="image/*"
							multiple
							className="cursor-pointer w-full border border-gray-300 p-3 rounded-lg"
						/>

						<button
							type="button"
							className="border rounded-lg border-green-700 text-green-700 font-normal p-3"
						>
							Upload
						</button>
					</div>
					<button className="bg-slate-700 text-white p-3 uppercase rounded-lg">
						Create Listing
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateListing;
