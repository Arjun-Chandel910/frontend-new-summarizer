import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./Pages/Hero";
import MidSection from "./Pages/MidSection";
import { Scene } from "./components/Scene";
import Bottom from "./components/Bottom";
function App() {
  return (
    <div className="bg-zinc-900 relative">
      <Scene />
      <Hero />
      <MidSection />
      <Bottom />
    </div>
  );
}

export default App;
