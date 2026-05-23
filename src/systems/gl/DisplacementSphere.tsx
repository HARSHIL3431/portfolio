/* eslint-disable react-hooks/immutability */
"use client";

import { useRef, useMemo, RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./shaders/displacement.vert.glsl";
import fragmentShader from "./shaders/displacement.frag.glsl";

import { MotionValue } from "framer-motion";

interface DisplacementSphereProps {
  scrollYProgress: MotionValue<number>;
  mouseRef: RefObject<{ x: number; y: number }>;
}

export function DisplacementSphere({
  scrollYProgress,
  mouseRef,
}: DisplacementSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uStrength: { value: 0.28 },
    }),
    []
  );

  // Smoothed camera position (lerped internally in useFrame)
  const camSmooth = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uScroll.value = scrollYProgress.get();

    // Lerp camera parallax — factor 0.06
    const LERP = 0.06;
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;

    camSmooth.current.x += (mx * 0.8 - camSmooth.current.x) * LERP;
    camSmooth.current.y += (my * 0.5 - camSmooth.current.y) * LERP;

    camera.position.x = camSmooth.current.x;
    camera.position.y = camSmooth.current.y;
    camera.lookAt(0, 0, 0);

    // Imperceptible drift — prevents static feel without being decorative spin
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0006;
      meshRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader as string}
        fragmentShader={fragmentShader as string}
        uniforms={uniforms}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
