import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function LadyModel(props) {
  const newPaper = useRef();

  const { scene } = useGLTF("/models/newspaper.glb");

  return <primitive ref={newPaper} object={scene} {...props} />;
}
