"use client";

import { useEffect } from "react";

let gsapRegistered = false;

export function useGSAP(
  callback: (gsap: typeof import("gsap").gsap) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!mounted) return; // component unmounted before promise resolved

        if (!gsapRegistered) {
          gsap.registerPlugin(ScrollTrigger);
          gsapRegistered = true;
        }

        // gsap.context() tracks all tweens created inside so they can be
        // cleanly reverted on unmount — fixes Strict Mode double-fire
        ctx = gsap.context(() => {
          callback(gsap);
        });

        ScrollTrigger.refresh();
      }
    );

    return () => {
      mounted = false;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
