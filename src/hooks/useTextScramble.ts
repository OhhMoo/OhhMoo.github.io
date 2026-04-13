"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]!;
}

interface Options {
  /** Total animation duration in ms. Default 1200. */
  duration?: number;
  /** Delay before starting in ms. Default 120. */
  delay?: number;
  /** Scramble ticks per revealed character. Default 6. */
  ticksPerChar?: number;
}

/**
 * Scrambles `target` on mount: random chars → resolves letter-by-letter.
 * Returns the animated display string.
 */
export function useTextScramble(target: string, options: Options = {}): string {
  const { duration = 1200, delay = 120, ticksPerChar = 6 } = options;

  // Start with the real string so server and client initial renders match (no hydration error).
  // The scramble kicks in only after mount via useEffect.
  const [output, setOutput] = useState<string>(target);

  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let revealed = 0;
    let tick = 0;
    const nonSpaceChars = target.replace(/ /g, "").length;
    const totalTicks = nonSpaceChars * ticksPerChar;
    const interval = (duration - delay) / Math.max(totalTicks, 1);

    const step = () => {
      tick++;

      const newRevealed = Math.floor(tick / ticksPerChar);
      if (newRevealed > revealed) revealed = newRevealed;

      const next = target
        .split("")
        .map((c, i) => {
          if (c === " ") return " ";
          if (i < revealed) return c;
          return randomChar();
        })
        .join("");

      setOutput(next);

      if (revealed < target.length) {
        frameRef.current = setTimeout(step, interval);
      } else {
        setOutput(target);
      }
    };

    // Begin scrambled, then resolve
    setOutput(
      target
        .split("")
        .map((c) => (c === " " ? " " : randomChar()))
        .join("")
    );

    const startTimer = setTimeout(step, delay);

    return () => {
      clearTimeout(startTimer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return output;
}
