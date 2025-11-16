import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function loadGLB(path, scene, onLoad = () => {}) {
  const loader = new GLTFLoader();

  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      onLoad(model);
    },
    undefined,
    (err) => console.error(err)
  );
}
