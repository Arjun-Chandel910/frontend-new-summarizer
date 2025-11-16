import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let mixer = null;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // GLB Loader
    const loader = new GLTFLoader();

    // Load chair
    loader.load("/models/chair.glb", (gltf) => {
      gltf.scene.scale.set(2, 2, 2);
      gltf.scene.rotation.y = Math.PI / 2;
      scene.add(gltf.scene);
    });
    loader.load("/models/chair.glb", (gltf) => {
      gltf.scene.scale.set(2, 2, 2);
      gltf.scene.rotation.y = Math.PI / 2;
      scene.add(gltf.scene);
    });

    // newpaper
    loader.load("/models/newspaper.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.7);
      model.position.set(0, 2, 0.1);
      scene.add(model);
    });
    loader.load("/models/woman.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.02, 0.02, 0.02);
      scene.add(model);

      // If model has animations
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
