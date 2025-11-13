import { Text } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import NewPaper from "./NewPaper";
import { OrbitControls } from "@react-three/drei";

const SceneContent = () => {
  const newspaperRef = useRef();
  const text1Ref = useRef();
  const text2Ref = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // === INITIAL STATE ===
    gsap.set(newspaperRef.current.position, { x: 0, y: 0, z: 0 });
    gsap.set(newspaperRef.current.scale, { x: 0.5, y: 0.5, z: 0.5 });
    gsap.set(newspaperRef.current.children[0].material, { opacity: 1 });

    [text1Ref, text2Ref].forEach((ref) => {
      gsap.set(ref.current.position, { x: 0, y: 0, z: -5 });
      gsap.set(ref.current.scale, { x: 0, y: 0, z: 0 }); // start invisible
      gsap.set(ref.current.material, { opacity: 0 });
    });

    // === INTRO ===
    const introTl = gsap.timeline();
    introTl
      .to(newspaperRef.current.position, {
        x: -3,
        duration: 2,
        ease: "power2.out",
        delay: 0.5,
      })
      .to(
        newspaperRef.current.scale,
        { x: 0.6, y: 0.6, z: 0.6, duration: 2, ease: "power2.out" },
        "<"
      );

    // === SCROLL-BASED ANIMATION ===
    introTl.then(() => {
      const scrollTl = gsap.timeline();

      // Newspaper exits and fades
      scrollTl
        .to(newspaperRef.current.position, {
          x: -10,
          duration: 1,
          ease: "power1.inOut",
        })
        .to(
          newspaperRef.current.children[0].material,
          { opacity: 0, duration: 1, ease: "power1.inOut" },
          "<"
        );

      // ---- TEXT 1: zoom-in, appear, fade back ----
      scrollTl
        .fromTo(
          text1Ref.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1.2, y: 1.2, z: 1.2, duration: 1, ease: "back.out(1.7)" },
          ">-0.2"
        )
        .fromTo(
          text1Ref.current.material,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.inOut" },
          "<"
        )
        .to(text1Ref.current.position, {
          z: -6,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.5,
        })
        .to(
          text1Ref.current.material,
          { opacity: 0, duration: 0.8, ease: "power2.inOut" },
          "<"
        )
        .to(
          text1Ref.current.scale,
          { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.inOut" },
          "<"
        );

      // ---- TEXT 2: appears right after TEXT 1 ----
      scrollTl
        .fromTo(
          text2Ref.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1.2, y: 1.2, z: 1.2, duration: 0.8, ease: "back.out(1.7)" },
          ">-0.1"
        )
        .fromTo(
          text2Ref.current.material,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.inOut" },
          "<"
        )
        .to(text2Ref.current.position, {
          z: -6,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.3,
        })
        .to(
          text2Ref.current.material,
          { opacity: 0, duration: 0.8, ease: "power2.inOut" },
          "<"
        )
        .to(
          text2Ref.current.scale,
          { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.inOut" },
          "<"
        );

      // Attach scroll trigger
      ScrollTrigger.create({
        trigger: "#mid-section",
        start: "top center",
        end: "bottom center",
        scrub: true,
        animation: scrollTl,
      });
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      <group ref={newspaperRef}>
        <NewPaper />
      </group>

      <Text
        ref={text1Ref}
        fontSize={0.6}
        color="cyan"
        position={[0, 0, -5]}
        material-transparent
      >
        Are you frustrated with long news?
      </Text>

      <Text
        ref={text2Ref}
        fontSize={0.6}
        color="cyan"
        position={[0, 0, -5]}
        material-transparent
      >
        Don’t worry, we got you covered.
      </Text>

      <OrbitControls />
    </>
  );
};

export default SceneContent;
