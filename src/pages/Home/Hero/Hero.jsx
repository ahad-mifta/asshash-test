import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import downArrow from "../../../assets/hero/down-arrow.png";
import heroImg from "../../../assets/hero/hero-img.png";
import topArrow from "../../../assets/hero/top-arrow.png";

const Hero = () => {
	const titleRef = useRef(null);
	const paraRef = useRef(null);
	const topArrowRef = useRef(null);
	const downArrowRef = useRef(null);

	useGSAP(() => {
		const titleSplit = new SplitText(titleRef.current, { type: "words" });

		// Hero image animation
		gsap.from("#heroImg", {
			scale: 0,
			opacity: 0,
			delay: 0.5,
			duration: 3,
			ease: "power2.out",
		});

		// Title animation
		gsap.from(titleSplit.words, {
			x: -100,
			opacity: 0,
			duration: 1,
			stagger: 0.1,
			delay: 0.8,
		});

		// Paragraph animation
		gsap.from(paraRef.current, {
			x: -100,
			opacity: 0,
			duration: 1.6,
			delay: 1,
		});

		// Top arrow animation
		gsap.from(topArrowRef.current, {
			x: 100,
			opacity: 0,
			duration: 1.5,
			delay: 1.2,
			ease: "power3.out",
		});

		// Down arrow animation
		gsap.from(downArrowRef.current, {
			x: -100,
			opacity: 0,
			duration: 1.5,
			delay: 1.5,
			ease: "power3.out",
		});
	}, []);

	return (
		<div>
			<div className="flex justify-around gap-10 items-center flex-col lg:flex-row-reverse min-h-screen">
				{/* Image Section */}
				<div className="relative w-full md:w-[500px] flex justify-center pb-20 z-0">
					{/* Top Arrow (hidden on small devices, positioned same as your code) */}
					<img
						ref={topArrowRef}
						src={topArrow}
						alt="top-arrow"
						className="hidden md:block absolute -right-1 -top-6 lg:-right-6 lg:-top-4 z-50"
					/>

					{/* Hero Image */}
					<img
						src={heroImg}
						className="relative max-w-[80%] sm:max-w-sm md:max-w-md lg:max-w-2xl rounded-lg z-10"
						id="heroImg"
					/>

					{/* Down Arrow (hidden on small devices, positioned same as your code) */}
					<img
						ref={downArrowRef}
						src={downArrow}
						alt="down-arrow"
						className="hidden md:block absolute -left-0.5 bottom-12 lg:-left-6 lg:bottom-14 z-50"
					/>
				</div>

				{/* Text Section */}
				<div className="md:w-[500px] text-left">
					<h1
						ref={titleRef}
						className="md:text-6xl text-5xl font-montHeavy text-[#22B573] lg:-mb-2"
					>
						Asshash Health
					</h1>
					<p ref={paraRef} className="py-6 font-regular text-3xl lg:-mb-2">
						Your <span className="font-medium">Complete Health & Wellness</span>{" "}
						Partner
					</p>
					<p className="font-medium text-[#0E4E2F]">
						Bridging Physical, Mental & Spiritual Healthcare
					</p>
					<button className="btn bg-[#22B573] mt-5 text-white">
						Book Your First Consultation
					</button>
				</div>
			</div>
			{/* <div className=" mt-10 lg:mt-0">
        <HeroTwo />
      </div> */}
		</div>
	);
};

export default Hero;
