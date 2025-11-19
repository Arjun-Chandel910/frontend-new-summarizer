import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const textureLoader = new THREE.TextureLoader();

// scroll handling imports
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let mixer = null;
    let treeMixer = null;

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 3,
      easing: (t) => t * (2 - t),
      smooth: true,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const lenisRaf = (time) => {
      // gsap.ticker time is in seconds
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Scene
    const scene = new THREE.Scene();

    // Day/night background colors
    const morningColor = new THREE.Color(0xa0c8f0); // light blue
    const nightColor = new THREE.Color(0x0b1033); // deep blue
    scene.background = morningColor.clone();

    // Camera
    const fov = window.innerWidth > 768 ? 75 : 90;
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-4, 1, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "100";
    renderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(renderer.domElement);

    // Lighting (day to night capable, but never totally dark)
    const ambientDayColor = new THREE.Color(0xffffff);
    const ambientNightColor = new THREE.Color(0x222244);
    const ambient = new THREE.AmbientLight(ambientDayColor.clone(), 1.0);
    scene.add(ambient);

    const dirLightDayColor = new THREE.Color(0xffffff);
    const dirLightNightColor = new THREE.Color(0x223355);
    const dirLight = new THREE.DirectionalLight(dirLightDayColor.clone(), 1);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();
    controls.azimuthalAngle = -Math.PI / 2;
    controls.update();

    // Group for lady + chair + newspaper
    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);

    // Ground
    const groundTexture = textureLoader.load("/texture/ground.jpeg");
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ map: groundTexture })
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
      chair.rotation.y = Math.PI / 2;

      chair.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });

      modelsGroup.add(chair);
    });

    // --- Newspaper ---
    loader.load("/models/newspaper.glb", (gltf) => {
      const paper = gltf.scene;
      paper.scale.set(0.4, 0.4, 0.7);
      paper.scale.set(0.4, 0.4, 0.7);
      paper.position.set(-2.9, -0.3, 0.3);

      paper.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });
      scene.add(paper);

      // modelsGroup.add(paper);
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

    // Sun and Moon
    const sunGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffee88, // bright warm sun
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const moonGeo = new THREE.SphereGeometry(1, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // pure white
      emissive: 0xffffff, // glow
      emissiveIntensity: 0.9, // brighter moon
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);

    // Initial positions: sun far right so it exits quickly, moon left
    sun.position.set(14, 6, -10); // further right
    moon.position.set(-10, 4, -10); // left, comes in later
    moon.visible = false;

    // Stars (brighter at night)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      const radius = 60;
      positions[i * 3] = (Math.random() - 0.5) * radius * 2; // x
      positions[i * 3 + 1] = Math.random() * radius + 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2; // z
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.35, // bigger = brighter
      transparent: true,
      opacity: 0, // start invisible
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Move group
    modelsGroup.position.set(-3, -2, 0);

    // GSAP ScrollTrigger for day -> night + camera rotation/zoom
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: "#scroll-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;

            // Sun: from further right fully off-screen quickly (0–0.25)
            if (progress <= 0.25) {
              sun.position.x = 14 + 30 * (progress / 0.25); // 14 -> 44
              sun.visible = true;
            } else {
              sun.visible = false;
            }

            // Moon: from left into a visible position (0.35–1)
            if (progress >= 0.35) {
              const t = (progress - 0.35) / 0.65; // 0–1
              moon.position.x = -10 + 16 * t; // -10 -> 6
              moon.visible = true;
            } else {
              moon.visible = false;
            }

            // Background color interpolation
            scene.background = morningColor.clone().lerp(nightColor, progress);

            // Light color & intensity interpolation (never fully dark)
            ambient.color = ambientDayColor
              .clone()
              .lerp(ambientNightColor, progress);
            dirLight.color = dirLightDayColor
              .clone()
              .lerp(dirLightNightColor, progress);
            const minAmbient = 0.55;
            const minDir = 0.5;
            ambient.intensity = Math.max(1.0 - 0.4 * progress, minAmbient);
            dirLight.intensity = Math.max(1.0 - 0.5 * progress, minDir);

            // Stars fade in and get bright during last 40% (0.6–1)
            const nightFactor = THREE.MathUtils.clamp(
              (progress - 0.6) / 0.4,
              0,
              1
            );
            starsMaterial.opacity = nightFactor;

            // Slight scene rotation to the right
            const maxRotation = THREE.MathUtils.degToRad(5); // 5 degrees
            scene.rotation.y = maxRotation * progress;

            // Subtle zoom-out on scroll (move camera slightly back)
            const baseZ = 5;
            const zoomOutZ = 7.5; // a little further
            camera.position.z = baseZ + (zoomOutZ - baseZ) * progress;
          },
        },
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);
      if (treeMixer) treeMixer.update(delta);

      controls.update();
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.fov = window.innerWidth > 768 ? 75 : 90;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
      renderer.dispose();

      gsap.ticker.remove(lenisRaf);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
