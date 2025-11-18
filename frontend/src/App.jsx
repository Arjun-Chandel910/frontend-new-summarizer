import React from "react";
import ThreeScene from "./scenes/ThreeScene";

function App() {
  return (
    <>
      {/* The Three.js canvas will overlay this entire viewport */}
      <ThreeScene />
      {/* Scrollable container to drive the GSAP ScrollTrigger animation */}
      <div
        id="scroll-section"
        className="h-[500vh] bg-gradient-to-b from-rose-400 via-blue-400 to-green-400"
      />
    </>
  );
}

export default App;
