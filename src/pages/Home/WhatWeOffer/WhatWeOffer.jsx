import delivery from "../../../assets/whatweoffer/delivery.png";
import img1 from "../../../assets/whatweoffer/doctor.png";
import spiritual from "../../../assets/whatweoffer/spiritual.png";
import telemedicine from "../../../assets/whatweoffer/telemedicine.png";
import teleMental from "../../../assets/whatweoffer/telemental.png";

const WhatWeOffer = () => {
	const services = [
		{
			title: "Telemedicine",
			desc: ["Consult licensed", "doctors from home"],
			img: telemedicine,
		},
		{
			title: "Tele-mental Health",
			desc: ["Confidential therapy", "& counseling"],
			img: teleMental,
		},
		{
			title: "Spiritual Guidance",
			desc: ["Learn Islamic healing practices like Ruqyah"],
			img: spiritual,
		},
		{
			title: "Medicine Delivery",
			desc: ["Fast, reliable", "home delivery"],
			img: delivery,
		},
	];

	return (
		<section className="w-full flex flex-col lg:flex-row justify-start items-end bg-slate-100 pt-5">
			{/* Left: Doctor Image with Heading */}
			<div className="relative flex flex-col w-full lg:w-auto">
				<h2 className="text-2xl lg:text-3xl font-bold p-6 lg:p-10 text-black">
					What We Offer
				</h2>
				<img
					src={img1}
					alt="Doctor"
					className="w-full lg:w-[500px] lg:h-[600px] object-cover"
				/>
			</div>

			{/* Right: Content */}
			<div className="w-full  bg-[#22B573] flex flex-col justify-start relative lg:h-[500px]">
				<div className="p-8 lg:p-14">
					{/* Services Icons Row */}
					<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-12 lg:absolute -top-32 left-36">
						{services.map((service, index) => (
							<div
								key={index}
								className="bg-gray-200 lg:rounded-b-full shadow-md flex-1 flex flex-col items-center text-center py-7"
							>
								<h3 className="font-bold text-md">{service.title}</h3>
								<p className="text-sm font-medium mt-1">
									{service.desc.map((line, i) => (
										<span key={i}>
											{line}
											<br />
										</span>
									))}
								</p>
								<img
									src={service.img}
									alt={service.title}
									className="w-32 h-32 rounded-full object-cover mt-10"
								/>
							</div>
						))}
					</div>

					{/* Diagnostics Section */}
					<h3 className="text-lg lg:text-3xl font-bold italic mb-2 text-white lg:mt-32">
						Diagnostics & Lab Services
					</h3>
					<p className="text-base lg:text-xl leading-relaxed text-white">
						With Ashshash, getting medical tests done has never been easier. Our
						hassle-free booking system lets you schedule your service in just a
						few clicks, and our team ensures convenient doorstep sample
						collection at your preferred time. No more long waits or unnecessary
						travel—quality healthcare comes right to your home.
					</p>
				</div>
			</div>
		</section>
	);
};

export default WhatWeOffer;
