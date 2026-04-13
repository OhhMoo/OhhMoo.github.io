import dynamic from "next/dynamic";

export const ParticleCanvasDynamic = dynamic(
  () =>
    import("@/components/ParticleCanvas").then((m) => m.ParticleCanvas),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-bg" />,
  }
);
