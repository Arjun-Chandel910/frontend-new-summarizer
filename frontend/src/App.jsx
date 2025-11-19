import React from "react";
import ThreeScene from "./scenes/ThreeScene";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      {/* The Three.js canvas will overlay this entire viewport */}
      <ThreeScene />
      {/* Scrollable container to drive the GSAP ScrollTrigger animation */}
      <div id="scroll-section" className="h-[500vh] " />
    </>
  );
}

export default App;
