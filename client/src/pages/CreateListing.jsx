import { useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
	const [files, setfiles] = useState([]);
	const [formData, setformData] = useState({
		imageUrls: [],
		name: "",
		description: "",
		address: "",
		type: "rent",
		bedrooms: 1,
		bathrooms: 1,
		regularPrice: 50,
		discountPrice: 0,
		offer: false,
		parking: false,
		furnished: false,
	});
	const [imageUploadError, setimageUploadError] = useState(false);
	const [uploading, setuploading] = useState(false);
	const [error, seterror] = useState(false);
	const [loading, setloading] = useState(false);

	const handleImageSubmit = (e) => {
		//check if there is any image and length of image files must be less than 7
		if (files.length > 0 && files.length < 7) {
			setuploading(true);
			setimageUploadError(false);
			const promises = [];

			for (let i = 0; i < files.length; i++) {
				promises.push(storeImage(files[i]));
			}

			Promise.all(promises)
				.then((urls) => {
					setformData({
						...formData,
						imageUrls: formData.imageUrls.concat(urls),
					});
					setimageUploadError(false);
					setloading(false);
				})
				.catch((err) => {
					setimageUploadError(
						"Image upload Failed (2 MB max per image)"
					);
					setuploading(false);
				});
		} else {
			setimageUploadError("You can upload maximum 6 images per listing");
			setuploading(false);
		}
	};

	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const filename = new Date().getTime() + file.name;
			const storageRef = ref(storage, filename);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);
				},
				(error) => {
					reject(error);
				},
				//get the download link
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadUrl) => resolve(downloadUrl)
					);
				}
			);
		});
	};

	//remove listing images
	const handleRemoveImage = (index) => {
		setformData({
			...formData,
			imageUrls: formData.imageUrls.filter((url, i) => i !== index),
		});
	};

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
							onChange={(e) => setfiles(e.target.files)}
						/>

						<button
							type="button"
							disabled={uploading}
							onClick={handleImageSubmit}
							className="border rounded-lg border-green-700 text-green-700 font-normal p-3"
						>
							{uploading ? "Uploading ..." : "Upload"}
						</button>
					</div>
					{/* show error messge */}
					<p className="text-red-700 text-sm">
						{imageUploadError && imageUploadError}
					</p>
					{/* show uploaded image */}
					{formData.imageUrls.length > 0 &&
						formData.imageUrls.map((url, index) => (
							<div
								key={index}
								className="border flex items-center justify-between p-3"
							>
								<img
									src={url}
									alt="lisintg_image"
									className="w-20 h-20 object-contain rounded-lg"
								/>
								<button
									className="p-2 rounded-lg bg-red-700 text-white hover:opacity-75"
									onClick={() => handleRemoveImage(index)}
								>
									Delete
								</button>
							</div>
						))}
					<button
						disabled={loading || uploading}
						className="bg-slate-700 text-white p-3 uppercase rounded-lg"
					>
						{loading ? "Creating ... " : "Create Listing "}
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateListing;
