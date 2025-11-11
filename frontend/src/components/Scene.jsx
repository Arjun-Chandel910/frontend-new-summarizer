import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

import NewsPaper from "./NewsPaper";
function SpinningCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
    // console.log("hi");
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} />
      <OrbitControls />
      <NewsPaper position={[0, 0, 0]} />
      {/* <SpinningCube /> */}
    </>
  );
}

export default Scene;
