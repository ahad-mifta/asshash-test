import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "../../../assets/ourmission/banner.png";

gsap.registerPlugin(ScrollTrigger);

const OurMission = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          leftRef.current,
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.8, // slower
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
              // onEnter, onLeave, onEnterBack, onLeaveBack
              // means: animate in, reverse out, animate in again when scrolling back, reverse out again
            },
          }
        );

        gsap.fromTo(
          rightRef.current,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.8, // slower
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col lg:flex-row overflow-hidden"
    >
      {/* Left: Image */}
      <div ref={leftRef} className="w-full lg:w-1/2">
        <img
          src={img1}
          alt="Our Mission"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Mission Text */}
      <div
        ref={rightRef}
        className="w-full lg:w-1/2 bg-[#22B573] text-white flex items-center"
      >
        <div className="p-10 lg:p-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-base md:text-xl leading-relaxed">
            To make <span className="font-semibold">quality healthcare</span>{" "}
            available <br className="hidden md:block" /> to everyone{" "}
            <span className="italic">anytime, anywhere</span>
            <br className="hidden md:block" /> by integrating{" "}
            <span className="font-semibold">
              physical, mental, and spiritual <br className="hidden md:block" />
            </span>{" "}
            well-being through technology and community driven{" "}
            <br className="hidden md:block" /> solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
