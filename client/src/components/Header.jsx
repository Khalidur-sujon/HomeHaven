import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
	const [searchTerm, setsearchTerm] = useState("");
	const navigate = useNavigate();
	const { currentUser } = useSelector((state) => state.user);

	//handle search
	const handleSubmitHandler = (e) => {
		e.preventDefault();

		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();
		//navigate to search page
		navigate(`/search?${searchQuery}`);
	};

	// logic is , when the serchterm changes, we have to update it in the search box also
	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");

		if (searchTermFromUrl) {
			setsearchTerm(searchTermFromUrl);
		}
	}, [location.search]);

	return (
		<header className="bg-slate-200  shadow-md">
			<div className="max-w-6xl flex items-center justify-between  p-3 mx-auto">
				{/* logo */}
				<Link to="/">
					<h1 className="flex flex-wrap font-bold  text-sm sm:text-xl">
						<span className="text-slate-500">Home</span>
						<span className="text-slate-700">Heaven</span>
					</h1>
				</Link>

				{/* search */}
				<form
					className="bg-slate-100 p-3 rounded-lg flex items-center"
					onSubmit={handleSubmitHandler}
				>
					<input
						type="text"
						id="search"
						placeholder="Search here ... "
						className="bg-transparent w-24 sm:w-64 focus:outline-none placeholder:italic"
						value={searchTerm}
						onChange={(e) => setsearchTerm(e.target.value)}
					/>

					<button>
						<FaSearch className="text-slate-600 cursor-pointer ml-2" />
					</button>
				</form>

				{/* nav links */}
				<ul className="flex gap-4 ">
					<Link to="/">
						<li className="hidden sm:inline text-slate-700 hover:underline font-medium">
							Home
						</li>
					</Link>

					<Link to="/about">
						<li className="hidden sm:inline text-slate-700 hover:underline font-medium">
							About
						</li>
					</Link>

					{currentUser && currentUser.email ? (
						<Link
							to="/profile"
							className="hover:drop-shadow-lg hover:scale-95 transition duration-300"
						>
							<p className="font-normal">
								Hi,
								<span className="font-semibold italic  text-slate-700 ml-2 uppercase">
									{currentUser.username.length > 4
										? currentUser.username.slice(0, 4)
										: currentUser.username.length < 4
										? currentUser.username
										: ""}
								</span>
							</p>
						</Link>
					) : (
						<Link to="/sign-in">
							<li className="hidden sm:inline text-slate-700 hover:underline font-medium">
								SignIn
							</li>
						</Link>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;
