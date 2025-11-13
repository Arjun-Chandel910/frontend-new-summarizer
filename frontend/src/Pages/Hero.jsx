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
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Newsroom Universe Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Cosmic Background with News Data */}
        <div className="absolute inset-0">
          {/* Stars/News Data Points */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* News Headlines as Constellations */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 text-cyan-400/50 text-xs font-mono transform rotate-12">
              BREAKING • GLOBAL • NEWS
            </div>
            <div className="absolute top-1/3 right-1/3 text-blue-400/50 text-xs font-mono transform -rotate-12">
              WORLD • EVENTS • LIVE
            </div>
            <div className="absolute bottom-1/3 left-1/3 text-purple-400/50 text-xs font-mono transform rotate-45">
              TECH • INNOVATION • NOW
            </div>
            <div className="absolute bottom-1/4 right-1/4 text-green-400/50 text-xs font-mono transform -rotate-45">
              FINANCIAL • MARKETS • UPDATE
            </div>
          </div>

          {/* Data Streams */}
          <div className="absolute inset-0">
            <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
            <div
              className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute left-0 top-3/4 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
        {/* News Portal/Vortex Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer Ring */}
            <div
              className="w-96 h-96 border-2 border-cyan-400/30 rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <div
                className="absolute inset-2 border border-blue-400/20 rounded-full animate-spin"
                style={{
                  animationDuration: "15s",
                  animationDirection: "reverse",
                }}
              >
                <div
                  className="absolute inset-4 border border-purple-400/20 rounded-full animate-spin"
                  style={{ animationDuration: "10s" }}
                >
                  {/* Inner Core */}
                  <div className="absolute inset-8 bg-gradient-radial from-cyan-500/10 via-blue-500/5 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Floating News Icons */}
            <div className="absolute inset-0">
              <div
                className="absolute top-8 left-8 w-6 h-6 border border-cyan-400 rounded animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full m-1.5 animate-pulse"></div>
              </div>
              <div
                className="absolute top-12 right-12 w-6 h-6 border border-blue-400 rounded animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full m-1.5 animate-pulse"></div>
              </div>
              <div
                className="absolute bottom-12 left-12 w-6 h-6 border border-purple-400 rounded animate-bounce"
                style={{ animationDelay: "2s" }}
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full m-1.5 animate-pulse"></div>
              </div>
              <div
                className="absolute bottom-8 right-8 w-6 h-6 border border-green-400 rounded animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full m-1.5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        {/* News Data Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        {/* News Headlines Floating in Space */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 text-cyan-300/70 text-sm font-mono animate-pulse">
            ENTERING NEWS UNIVERSE...
          </div>
          <div
            className="absolute top-20 right-20 text-blue-300/70 text-sm font-mono animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            CONNECTING TO GLOBAL FEED...
          </div>
          <div
            className="absolute bottom-20 left-20 text-purple-300/70 text-sm font-mono animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            LOADING NEWS DIMENSIONS...
          </div>
          <div
            className="absolute bottom-16 right-16 text-green-300/70 text-sm font-mono animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            INITIALIZING BROADCAST...
          </div>
        </div>{" "}
        1{/* Universe Grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        {/* News Portal Title */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text animate-pulse">
            NEWS UNIVERSE
          </h1>
        </div>
        {/* Status Indicators */}
        <div className="absolute bottom-8 left-8 space-y-2">
          <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 border border-cyan-400/30">
            <div className="text-xs text-cyan-400 font-mono">
              CONNECTION • ESTABLISHED
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 border border-blue-400/30">
            <div className="text-xs text-blue-400 font-mono">
              DATA STREAM • ACTIVE
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 space-y-2">
          <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 border border-purple-400/30">
            <div className="text-xs text-purple-400 font-mono">
              REALITY • SYNCED
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-1 border border-green-400/30">
            <div className="text-xs text-green-400 font-mono">
              UNIVERSE • LOADED
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene*/}
    </div>
  );
};

export default Hero;
