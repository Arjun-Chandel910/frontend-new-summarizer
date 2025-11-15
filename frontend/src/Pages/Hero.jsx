import React, { useRef, useEffect } from "react";
import { Scene } from "../components/Scene";
import { gsap } from "gsap";

const Hero = () => {
  const backgroundRef = useRef();

  useEffect(() => {
    gsap.set(backgroundRef.current, { opacity: 0, y: 50 });

    gsap.to(backgroundRef.current, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
      delay: 2,
    });
  }, []);

  return (
    <div
      id="hero"
      className="relative w-full h-[200vh] overflow-hidden bg-black"
    >
      {/* Newsroom Universe Background */}
      <div ref={backgroundRef} className="absolute inset-0"></div>
    </div>
  );
};

export default Hero;
