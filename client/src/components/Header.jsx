import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
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
				<from className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input
						type="text"
						id="search"
						placeholder="Search here ... "
						className="bg-transparent w-24 sm:w-64 focus:outline-none placeholder:italic"
					/>
					<FaSearch className="text-slate-600 cursor-pointer ml-2" />
				</from>

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

					<Link to="/sign-in">
						<li className="hidden sm:inline text-slate-700 hover:underline font-medium">
							SignIn
						</li>
					</Link>
				</ul>
			</div>
		</header>
	);
};

export default Header;
