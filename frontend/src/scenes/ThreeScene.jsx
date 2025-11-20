// ThreeScene.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const textureLoader = new THREE.TextureLoader();
import { createTornPaperMesh } from "../utils/createTornPaperMesh";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let mixer = null;
    let treeMixer = null;
    const papers = [];

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
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Scene
    const scene = new THREE.Scene();

    const morningColor = new THREE.Color(0xa0c8f0);
    const nightColor = new THREE.Color(0x0b1033);
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

    // Lighting
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

    // Mouse tracking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const groundY = -2.18;

    // Plane matching ground height: normal (0,1,0), constant = -groundY
    const interactionPlane = new THREE.Plane(
      new THREE.Vector3(0, 1, 0),
      -groundY
    ); // plane.y = groundY [web:97][web:229]
    const mousePoint = new THREE.Vector3();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.ray.intersectPlane(interactionPlane, mousePoint);
      if (!hit) return;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Group for lady + chair + newspaper
    const modelsGroup = new THREE.Group();
    scene.add(modelsGroup);

    // Torn papers
    const paperTexture = textureLoader.load("/texture/newspaper.png");
    for (let i = 0; i < 80; i++) {
      const mesh = createTornPaperMesh(paperTexture);

      const radius = 3;
      const x = (Math.random() - 0.5) * radius * 2;
      const z = -2 + (Math.random() - 0.5) * radius * 2;
      mesh.position.set(x, groundY, z);
      mesh.rotation.y = Math.random() * Math.PI * 2;

      scene.add(mesh);

      papers.push({
        mesh,
        vel: new THREE.Vector3(),
        rotVel: new THREE.Vector3(),
      });
    }

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

    // Chair
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

    // Newspaper GLB (hero paper)
    loader.load("/models/newspaper.glb", (gltf) => {
      const paper = gltf.scene;
      paper.scale.set(0.4, 0.4, 0.7);
      paper.position.set(-2.9, -0.3, 0.3);

      paper.traverse((c) => {
        if (c.isMesh) c.castShadow = true;
      });

      scene.add(paper);
    });

    // Woman
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

    // Trees
    loader.load("/models/tree_converted.glb", (gltf) => {
      const tree = gltf.scene;

      tree.scale.set(0.1, 0.1, 0.1);
      tree.position.set(4, -2, -8);

      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

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

      if (gltf.animations.length > 0) {
        treeMixer = new THREE.AnimationMixer(tree);
        const windAction = treeMixer.clipAction(gltf.animations[0]);
        windAction.play();
      }
    });

    // Sun and Moon
    const sunGeo = new THREE.SphereGeometry(1.5, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffee88 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    const moonGeo = new THREE.SphereGeometry(1, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.9,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);

    sun.position.set(14, 6, -10);
    moon.position.set(-10, 4, -10);
    moon.visible = false;

    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      const radius = 60;
      positions[i * 3] = (Math.random() - 0.5) * radius * 2;
      positions[i * 3 + 1] = Math.random() * radius + 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius * 2;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.35,
      transparent: true,
      opacity: 0,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    modelsGroup.position.set(-3, -2, 0);

    // ScrollTrigger day/night etc.
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

            if (progress <= 0.25) {
              sun.position.x = 14 + 30 * (progress / 0.25);
              sun.visible = true;
            } else {
              sun.visible = false;
            }

            if (progress >= 0.35) {
              const t = (progress - 0.35) / 0.65;
              moon.position.x = -10 + 16 * t;
              moon.visible = true;
            } else {
              moon.visible = false;
            }

            scene.background = morningColor.clone().lerp(nightColor, progress);

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

            const nightFactor = THREE.MathUtils.clamp(
              (progress - 0.6) / 0.4,
              0,
              1
            );
            starsMaterial.opacity = nightFactor;

            const maxRotation = THREE.MathUtils.degToRad(5);
            scene.rotation.y = maxRotation * progress;

            const baseZ = 5;
            const zoomOutZ = 7.5;
            camera.position.z = baseZ + (zoomOutZ - baseZ) * progress;
          },
        },
      }
    );

    // Animation loop with mouse repulsion
    const clock = new THREE.Clock();
    const repulsionRadius = 0.5;
    const repulsionStrength = 1.5;

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);
      if (treeMixer) treeMixer.update(delta);

      papers.forEach((p) => {
        const dist = p.mesh.position.distanceTo(mousePoint);

        if (dist < repulsionRadius) {
          const dir = new THREE.Vector3()
            .subVectors(p.mesh.position, mousePoint)
            .normalize()
            .multiplyScalar(repulsionStrength * (1 - dist / repulsionRadius));

          p.vel.add(dir);
          p.rotVel.x += (Math.random() - 0.5) * 2;
          p.rotVel.z += (Math.random() - 0.5) * 2;
        }

        p.mesh.position.addScaledVector(p.vel, delta);
        p.mesh.rotation.x += p.rotVel.x * delta;
        p.mesh.rotation.y += p.rotVel.y * delta;
        p.mesh.rotation.z += p.rotVel.z * delta;

        p.vel.multiplyScalar(0.96);
        p.rotVel.multiplyScalar(0.96);
      });

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
      window.removeEventListener("mousemove", handleMouseMove);
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
