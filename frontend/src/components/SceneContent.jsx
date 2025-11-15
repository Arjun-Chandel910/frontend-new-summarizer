import { Text } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import NewPaper from "./NewPaper";
import { OrbitControls } from "@react-three/drei";
import LadyScene from "./LadyScene";
const SceneContent = () => {
  const newspaperRef = useRef();
  const ladyRef = useRef();
  const text1Ref = useRef();
  const text2Ref = useRef();
  const [ladyLoaded, setLadyLoaded] = useState(false);

  useEffect(() => {
    if (!ladyLoaded) return;
    if (!newspaperRef.current || !ladyRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    // === INITIAL STATE ===
    gsap.set(newspaperRef.current.position, { x: 0, y: -0.8, z: 1.3 });
    gsap.set(newspaperRef.current.scale, { x: 0.8, y: 0.8, z: 0.8 });
    gsap.set(newspaperRef.current.children[0].material, { opacity: 1 });

    gsap.set(ladyRef.current, { opacity: 0 });
    gsap.set(ladyRef.current.scale, { x: 0, y: 0, z: 0 });

    [text1Ref, text2Ref].forEach((ref) => {
      gsap.set(ref.current.position, { x: 0, y: 0, z: -5 });
      gsap.set(ref.current.scale, { x: 0, y: 0, z: 0 }); // start invisible
      gsap.set(ref.current.material, { opacity: 0 });
    });

    // === INTRO ===
    const introTl = gsap.timeline();
    introTl
      .to(newspaperRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 5,
        ease: "power2.out",
        delay: 1,
      })
      .to(
        newspaperRef.current.scale,
        { x: 0.5, y: 0.5, z: 0.5, duration: 2, ease: "power2.out" },
        "<"
      )
      // Lady appears at the same time as newspaper moves up
      .to(ladyRef.current, { opacity: 1, duration: 2, ease: "power2.out" }, "<")
      .to(
        ladyRef.current.scale,
        { x: 3, y: 3.2, z: 3, duration: 1, ease: "back.out(1.7)" },
        "<"
      );

    // === SCROLL-BASED ANIMATION ===
    introTl.then(() => {
      const scrollTl = gsap.timeline();

      // Newspaper moves back to bottom and lady fades away simultaneously
      scrollTl
        .to(newspaperRef.current.position, {
          x: 0,
          y: -0.8,
          z: 2.5,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          ladyRef.current,
          { opacity: 0, duration: 1, ease: "power2.out" },
          "<"
        )
        .to(
          ladyRef.current.scale,
          { x: 0, y: 0, z: 0, duration: 1, ease: "power2.out" },
          "<"
        );

      // ---- TEXT 1: zoom-in, appear, then fade ----
      scrollTl
        .fromTo(
          text1Ref.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1.2, y: 1.2, z: 1.2, duration: 0.8, ease: "back.out(1.7)" },
          ">"
        )
        .fromTo(
          text1Ref.current.material,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "<"
        )
        .to(
          text1Ref.current.material,
          { opacity: 0, duration: 0.6, ease: "power2.out" },
          "+=0.5"
        )
        .to(
          text1Ref.current.scale,
          { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.out" },
          "<"
        );

      // ---- TEXT 2: appears after TEXT 1 has faded ----
      scrollTl
        .fromTo(
          text2Ref.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1.2, y: 1.2, z: 1.2, duration: 0.8, ease: "back.out(1.7)" },
          ">"
        )
        .fromTo(
          text2Ref.current.material,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
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

      // Hide texts when bottom section starts
      ScrollTrigger.create({
        trigger: "#bottom-section",
        start: "top center",
        onEnter: () => {
          gsap.to([text1Ref.current.material, text2Ref.current.material], {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to([text1Ref.current.scale, text2Ref.current.scale], {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });
  }, [ladyLoaded]);

  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight position={[2, 0, 0]} intensity={1.5} castShadow />
      <group ref={newspaperRef}>
        <NewPaper />
      </group>

      <LadyScene ladyRef={ladyRef} onLoaded={() => setLadyLoaded(true)} />
      <Text
        ref={text1Ref}
        fontSize={0.6}
        color="white"
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
