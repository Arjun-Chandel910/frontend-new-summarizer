import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import NewPaper from "./NewPaper";
const SceneContent = () => {
  const newspaperRef = useRef();
  useEffect(() => {
    if (newspaperRef.current) {
      gsap.set(newspaperRef.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(newspaperRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });

      // Phase 1: Stay at center for 2 seconds
      const tl = gsap.timeline();

      // Phase 2: After 2 seconds, glide to the right smoothly
      tl.to(newspaperRef.current.position, {
        x: -3,
        duration: 2,
        ease: "power2.out",
        delay: 1,
      }).to(
        newspaperRef.current.scale,
        {
          x: 0.7,
          y: 0.7,
          z: 0.7,
          duration: 2,
          ease: "power2.out",
        },
        "-=2"
      ); // Start scale animation at the same time as position
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <group ref={newspaperRef}>
        <NewPaper />
      </group>

      <OrbitControls />
    </>
  );
};

export const Scene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    >
      <SceneContent />
    </Canvas>
  );
};
