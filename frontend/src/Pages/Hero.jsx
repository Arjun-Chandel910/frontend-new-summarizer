import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
const Hero = () => {
  return (
    <div>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero;
