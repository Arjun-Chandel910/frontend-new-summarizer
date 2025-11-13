import { useTexture } from "@react-three/drei";
import * as THREE from "three";
function Ground() {
  const newspaperTexture = useTexture("/textures/download.jpeg");

  newspaperTexture.wrapS = THREE.RepeatWrapping;
  newspaperTexture.wrapT = THREE.RepeatWrapping;
  newspaperTexture.repeat.set(4, 4);
  return (
    <mesh position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial map={newspaperTexture} roughness={0.8} />
    </mesh>
  );
}
export default Ground;
