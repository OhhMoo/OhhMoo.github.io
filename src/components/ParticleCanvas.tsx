"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "@/components/ParticleField";

type Props = {
  mode?: "hero" | "contact";
  className?: string;
};

export function ParticleCanvas({ mode = "hero", className }: Props) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 3], fov: 60 }}
      gl={{ antialias: false, alpha: false }}
      style={{ background: "#0a0a0f" }}
    >
      <ParticleField mode={mode} />
    </Canvas>
  );
}
