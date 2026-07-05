import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../../../assets/whychooseus/img1.png";
import img2 from "../../../assets/whychooseus/img2.png";
import img4 from "../../../assets/whychooseus/img4.png";
import img5 from "../../../assets/whychooseus/img5.png";
import mobile from "../../../assets/whychooseus/mobile.png";

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
	const sectionRef = useRef(null);
	const firstRowRef = useRef([]);
	const secondRowRef = useRef([]);

	const firstRow = [
		{
			img: img1,
			title: "Holistic Approach",
			desc: "Physical, mental & spiritual health together",
		},
		{
			img: img2,
			title: "Affordable & Accessible",
			desc: "Designed for underserved communities",
		},
		{
			img: img2,
			title: "Licensed Professionals",
			desc: "Certified doctors, therapists, and spiritual guides",
		},
	];

	const secondRow = [
		{
			img: img4,
			title: "Tech-Driven",
			desc: "Simple, user-friendly mobile application",
		},
		{
			img: img5,
			title: "Community Focused",
			desc: "Building healthier futures for families & societies",
		},
	];

	useEffect(() => {
		const firstCards = firstRowRef.current;
		const secondCards = secondRowRef.current;

		// Mobile/tablet: show instantly
		if (window.innerWidth < 1024) {
			[...firstCards, ...secondCards].forEach((card) => {
				if (card) gsap.set(card, { opacity: 1, x: 0 });
			});
			return;
		}

		// Animate first row (slide from left) — play once
		firstCards.forEach((card) => {
			if (!card) return;
			gsap.fromTo(
				card,
				{ x: -100, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.2,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "top 80%",
						toggleActions: "play none none none", // ✅ play only once
						markers: false, // remove or set true to debug
					},
				}
			);
		});

		// Animate second row (slide from right) — play once
		secondCards.forEach((card) => {
			if (!card) return;
			gsap.fromTo(
				card,
				{ x: 100, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.2,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "top 80%",
						toggleActions: "play none none none", // ✅ play only once
						markers: false,
					},
				}
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			className="relative py-12 px-4 bg-[#22B573] overflow-hidden"
		>
			<h2 className="text-4xl font-bold mb-8 text-white">
				Why <br /> Choose Us
			</h2>

			<div className="flex flex-col-reverse justify-center items-center lg:flex-row gap-5">
				<div>
					{/* First row */}
					<div className="flex flex-col lg:flex-row gap-8 items-center mb-8 lg:ml-10">
						{firstRow.map((item, index) => (
							<div
								key={index}
								ref={(el) => (firstRowRef.current[index] = el)}
								className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start p-6 border border-white rounded-3xl shadow-md w-full lg:w-96 opacity-0"
							>
								<img
									src={item.img}
									alt={item.title}
									className="object-contain"
								/>
								<div className="text-white">
									<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
									<p>{item.desc}</p>
								</div>
							</div>
						))}
					</div>

					{/* Second row */}
					<div className="flex flex-col lg:flex-row gap-8 items-center lg:ml-20">
						{secondRow.map((item, index) => (
							<div
								key={index}
								ref={(el) => (secondRowRef.current[index] = el)}
								className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start p-6 border border-white rounded-3xl shadow-md w-full lg:w-96 opacity-0"
							>
								<img
									src={item.img}
									alt={item.title}
									className="object-contain"
								/>
								<div className="text-white">
									<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
									<p>{item.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<img src={mobile} alt="Mobile" className="max-w-xs lg:max-w-md" />
			</div>
		</section>
	);
};

export default WhyChooseUs;
