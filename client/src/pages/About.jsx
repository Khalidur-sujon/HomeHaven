import React from "react";

function About() {
	return (
		<div className="bg-gray-100 min-h-screen p-8 px-12">
			<div className="container mx-auto">
				<h1 className="text-3xl font-semibold text-gray-800 mb-6">
					About HomeHeaven
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">
					At HomeHeaven, we believe that your search for the perfect
					home should be an exhilarating adventure, not a cumbersome
					chore. That's why we've dedicated ourselves to crafting a
					platform where dreams and reality effortlessly intertwine.
					We understand that your home isn't just a place; it's an
					embodiment of your aspirations, your sanctuary, and a
					testament to your unique story.
				</p>
				<h2 className="text-2xl font-semibold text-gray-800 my-4">
					Why Choose HomeHeaven?
				</h2>
				<ul className="list-disc pl-8 text-gray-600 text-lg">
					<li>
						Effortless Discovery: Our user-friendly interface and
						powerful search tools make finding your ideal home a
						breeze. Navigate through a vast array of handpicked
						properties with ease, tailored to your preferences.
					</li>
					<li>
						Expert Guidance: Our team of seasoned real estate
						experts is at your disposal. Whether you're a first-time
						buyer, a seasoned investor, or looking to sell your
						property, our knowledgeable professionals are here to
						provide you with personalized support every step of the
						way.
					</li>
					<li>
						Quality Listings: We curate listings with precision,
						ensuring each property featured on our platform meets
						the highest standards of quality and value. We're
						committed to presenting you with the best.
					</li>
					<li>
						Your Dream, Our Mission: Your dreams are our guiding
						force. HomeHeaven is not just a platform; it's your
						trusted companion on the journey to finding your dream
						home. We are dedicated to helping you discover a place
						that reflects your style, aspirations, and vision.
					</li>
				</ul>
				<p className="text-gray-600 text-lg mt-4">
					Your dreams are our guiding force. HomeHeaven is not just a
					platform; it's your trusted companion on the journey to
					finding your dream home. We are dedicated to helping you
					discover a place that reflects your style, aspirations, and
					vision.
				</p>
			</div>
		</div>
	);
}

export default About;
