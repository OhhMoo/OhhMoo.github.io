import type { PreparedTextWithSegments, LayoutCursor } from "@chenglou/pretext";

export type ObstacleRect = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type PositionedLine = {
  text: string;
  y: number;
  x: number;
};

export async function layoutTextAroundObstacles(
  prepared: PreparedTextWithSegments,
  containerWidth: number,
  lineHeight: number,
  obstacles: ObstacleRect[]
): Promise<PositionedLine[]> {
  const { layoutNextLine } = await import("@chenglou/pretext");

  const lines: PositionedLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let y = 0;
  let stuckCount = 0;

  while (stuckCount < 1000) {
    const bandTop = y;
    const bandBottom = y + lineHeight;

    let lineLeft = 0;
    let lineRight = containerWidth;

    for (const obs of obstacles) {
      if (bandTop < obs.bottom && bandBottom > obs.top) {
        const leftWidth = obs.left;
        const rightWidth = containerWidth - obs.right;
        if (rightWidth >= leftWidth) {
          lineLeft = Math.max(lineLeft, obs.right + 8);
        } else {
          lineRight = Math.min(lineRight, obs.left - 8);
        }
      }
    }

    const availableWidth = lineRight - lineLeft;

    if (availableWidth < 60) {
      y += lineHeight;
      stuckCount++;
      continue;
    }

    stuckCount = 0;
    const line = layoutNextLine(prepared, cursor, availableWidth);
    if (line === null) break;

    lines.push({ text: line.text, y, x: lineLeft });
    cursor = line.end;
    y += lineHeight;
  }

  return lines;
}
