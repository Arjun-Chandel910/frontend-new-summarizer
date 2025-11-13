import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
const NewPaper = () => {
  const modelRef = useRef();
  const gltf = useGLTF("/models/newspaper.glb");

  return <primitive ref={modelRef} object={gltf.scene} />;
};

export default NewPaper;
