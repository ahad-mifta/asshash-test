import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Replace with your actual images
import img1 from "../assets/intro/logo.png";
import img2 from "../assets/intro/A.png";
import img3 from "../assets/intro/Sha.png";
import img4 from "../assets/intro/S.png";

const images = [img1, img2, img3, img4];

const IntroAnimation = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const containerRef = useRef(null);
  const imgRefs = useRef([]);

  useEffect(() => {
    if (!show) return;

    const validImgRefs = imgRefs.current.filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.5,
          onComplete: () => {
            setShow(false);
            if (onFinish) onFinish();
          },
        });
      },
    });

    // Fade in one by one
    validImgRefs.forEach((img, index) => {
      tl.fromTo(
        img,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        index * 0.5
      );
    });
  }, [show, onFinish]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      style={{ overflow: "visible" }}
    >
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 justify-center items-center">
        {images.map((src, i) => (
          <img
            key={i}
            ref={(el) => (imgRefs.current[i] = el)}
            src={src}
            alt="ASSAS"
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default IntroAnimation;
