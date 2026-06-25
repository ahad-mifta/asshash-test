import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import Faq from "./ClientReviews/Faq";
import Hero from "./Hero/Hero";
import HeroThree from "./Hero/HeroThree";
import HeroTwo from "./Hero/HeroTwo";
import OurMission from "./OurMission/OurMission";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import HowItWork from "./HowItWork/HowItWork";
import HeroFour from "../../pages/Home/Hero/HeroFour"
import PsychologicalTestSection from "./PsychologicalTestSection";

const Home = () => {
	return (
		<div>
			<div className="w-full  ">
				<div className="max-w-[1800px] mx-auto p-4">
					<Navbar />
					<Hero />
				</div>
				<HeroTwo />
				<OurMission />
				<WhatWeOffer />
			</div>
			<HeroThree />
			<WhyChooseUs />
			<HowItWork />
      <HeroFour/>
      <PsychologicalTestSection />
		
      
      <Faq/>
      <Footer color="bg-green-900"/>
		</div>
	);
};

export default Home;
