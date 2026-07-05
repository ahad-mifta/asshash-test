import { useGSAP } from "@gsap/react";
import img1 from "../../../assets/faq/doc.png";
import gsap from "gsap";
import { useState } from "react";

const faqData = [
	{
		question: "How does the Health Card work?",
		answer:
			"The Health Card is a special card (physical or digital) we issue to users that lets them get discounts on tests and services at our partner hospitals. Each time you use the Health Card, we record which hospital did which test, how much discount was given, and how much commission we’ll get. This helps keep things fair and transparent for everyone (users, hospitals, and Asshash).",
	},
	{
		question: "Can patients without smartphones get help via an agent?",
		answer:
			"Yes! If you don’t have a smartphone or can’t use the app, you can go to a partnered pharmacy (agent) in your bazar. The agent can create an account and book a doctor for you. They will also help you with payments, follow-ups, and any documentation needed. So you still get full access to telemedicine services through your local pharmacy agent.",
	},
	{
		question: "How is privacy protected?",
		answer: [
			"All your health data — chats, prescriptions, and test reports — are stored securely.",
			"Access is restricted: only you and your doctor can see your private medical details.",
			"All connections (video, audio, chat) are encrypted so outsiders can’t intercept them.",
			"We follow best practices and standards for data security (secure servers, regular backups, encrypted storage).",
		],
	},
	{
		question: "Supported payment methods",
		answer: [
			"We accept multiple payment options to make it easy:",
			"Mobile-financial services (bKash, Nagad, Rocket, etc.)",

			" Bank cards (credit/debit)",

			"Cash via agent (especially for rural areas).",
		],
	},
];

const Faq = () => {
	const [openFaqIndex, setOpenFaqIndex] = useState(null);

	const toggleFaq = (index) => {
		setOpenFaqIndex((prev) => (prev === index ? null : index));
	};

	useGSAP(() => {
		gsap.from("#faqCards > div", {
			scrollTrigger: {
				trigger: "#faqCards",
				start: "top 80%",
				toggleActions: "restart none none none",
			},
			y: 100,
			opacity: 0,
			duration: 1,
			stagger: 0.2,
			ease: "power2.out",
		});
	}, []);

	return (
		<div className="relative my-5 lg:my-0 p-4 ">
			<h1 className="text-3xl text-center mb-4">Frequently Asked Questions</h1>
			<div className="container mx-auto p-4 bg-[#D9D9D9] rounded-3xl relative z-10">
				<div className="flex flex-col items-center justify-around lg:flex-row-reverse ">
					<div className="lg:w-52 mt-20">
						<img src={img1} />
					</div>

					<div className="mt-20" id="faqCards">
						{faqData.map((faq, index) => (
							<div key={index} className="mb-5">
								<div
									className={`collapse collapse-arrow border border-base-300 bg-base-100 ${
										openFaqIndex === index
											? "collapse-open [&>div::after]:text-green-500"
											: ""
									}`}
								>
									<div
										className="collapse-title font-semibold cursor-pointer"
										onClick={() => toggleFaq(index)}
									>
										{faq.question}
									</div>

									{openFaqIndex === index && (
										<div className="collapse-content text-sm lg:w-[500px]">
											{Array.isArray(faq.answer) ? (
												<ul className="list-disc ml-5 space-y-1">
													{faq.answer.map((item, i) => (
														<li key={i}>{item}</li>
													))}
												</ul>
											) : (
												<p>{faq.answer}</p>
											)}
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faq;
