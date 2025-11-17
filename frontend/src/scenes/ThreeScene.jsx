import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let mixer = null;
    let treeMixer = null;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Group for lady + chair + newspaper
    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({ color: 0x775533 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Loader
    const loader = new GLTFLoader();

    // --- Chair ---
    loader.load("/models/chair.glb", (gltf) => {
      const chair = gltf.scene;
      chair.scale.set(2, 2, 2);
      chair.position.set(0, 0, 0);

      chair.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });

      modelsGroup.add(chair);
    });

    // --- Newspaper ---
    loader.load("/models/newspaper.glb", (gltf) => {
      const paper = gltf.scene;
      paper.scale.set(0.5, 0.5, 0.7);
      paper.position.set(0, 1.7, 0.1);

      paper.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });

      modelsGroup.add(paper);
    });

    // --- Woman ---
    loader.load("/models/woman.glb", (gltf) => {
      const woman = gltf.scene;
      woman.scale.set(0.02, 0.02, 0.02);
      woman.position.set(0, 0, 0.02);

      woman.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });

      modelsGroup.add(woman);

      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(woman);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    });

    // --- Trees (converted model) ---
    loader.load("/models/tree_converted.glb", (gltf) => {
      const tree = gltf.scene;

      tree.scale.set(0.1, 0.1, 0.1);
      tree.position.set(4, -2, -8);

      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          // Ensure all materials are physically lit
          if (
            child.material &&
            (child.material.type === "MeshBasicMaterial" ||
              child.material.type === "MeshLambertMaterial")
          ) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map || null,
              color: child.material.color,
              transparent: child.material.transparent,
              opacity: child.material.opacity,
            });
          }
        }
      });

      scene.add(tree);

      // Wind animation
      if (gltf.animations.length > 0) {
        treeMixer = new THREE.AnimationMixer(tree);
        const windAction = treeMixer.clipAction(gltf.animations[0]);
        windAction.play();
      }
    });

    // Move group
    modelsGroup.position.set(-3, -2, 0);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);
      if (treeMixer) treeMixer.update(delta);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
