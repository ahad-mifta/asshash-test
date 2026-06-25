import { useRef, useEffect, useState } from "react";

import gsap from "gsap";
// adjust path
import { Outlet } from "react-router";
import IntroAnimation from "../../components/IntroAnimation";

const MainLayout = () => {
  const [showContent, setShowContent] = useState(false);
  const layoutRef = useRef(null);

  useEffect(() => {
    if (showContent && layoutRef.current) {
      gsap.from(layoutRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [showContent]);

  return (
    <>
      {!showContent && <IntroAnimation onFinish={() => setShowContent(true)} />}

      {showContent && (
        <div ref={layoutRef}>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MainLayout;
