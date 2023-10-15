import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
	Home,
	About,
	Profile,
	SignIn,
	SignUp,
	CreateListing,
	Listing,
	UpdateListing,
	Search,
} from "./pages";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

const App = () => {
	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/listing/:id" element={<Listing />} />
					<Route path="/search" element={<Search />} />
					<Route element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
						<Route
							path="/create-listing"
							element={<CreateListing />}
						/>
						<Route
							path="/update-listing/:listingId"
							element={<UpdateListing />}
						/>
					</Route>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default App;
