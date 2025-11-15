import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

const LadyScene = ({ onLoaded, ladyRef }) => {
  const { scene } = useGLTF("/models/lady.glb");

  React.useEffect(() => {
    if (scene && onLoaded) onLoaded();
  }, [scene]);

  return (
    <primitive object={scene} scale={3} position={[0, -3, -2]} ref={ladyRef} />
  );
};

export default LadyScene;
