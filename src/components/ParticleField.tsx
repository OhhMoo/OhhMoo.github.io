"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/particles.vert";
import fragmentShader from "@/shaders/particles.frag";
import { useMousePosition } from "@/hooks/useMousePosition";

const PARTICLE_COUNT_DESKTOP = 12000;
const PARTICLE_COUNT_MOBILE = 3000;

type Props = {
  mode?: "hero" | "contact";
};

export function ParticleField({ mode = "hero" }: Props) {
  const mouseRef = useMousePosition();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const count =
    size.width < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 3;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute(
      "aBasePosition",
      new THREE.BufferAttribute(basePositions, 3)
    );

    const uni = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRepelRadius: { value: mode === "hero" ? 0.25 : 0.15 },
      uColorA: { value: new THREE.Color("#4a9eff") },
      uColorB: { value: new THREE.Color("#2dd4bf") },
    };

    return { geometry: geo, uniforms: uni };
  }, [count, mode]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(
      mouseRef.current[0],
      mouseRef.current[1]
    );
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
