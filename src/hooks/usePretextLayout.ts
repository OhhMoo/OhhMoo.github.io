"use client";

import { useEffect, useState } from "react";
import type { PreparedTextWithSegments } from "@chenglou/pretext";

export function usePretextLayout(text: string, font: string) {
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(
    null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.fonts.ready.then(() => {
      import("@chenglou/pretext").then(({ prepareWithSegments }) => {
        setPrepared(prepareWithSegments(text, font));
      });
    });
  }, [text, font]);

  return prepared;
}
