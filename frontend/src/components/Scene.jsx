import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
export const Scene = () => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        pointerEvents: "none",
        background: "transparent",
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <SceneContent />
    </Canvas>
  );
};
