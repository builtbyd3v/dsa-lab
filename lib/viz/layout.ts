import type { StructState, VizNode } from "@/lib/types";

export interface PlacedNode extends VizNode { px: number; py: number }
export interface Layout { nodes: PlacedNode[]; width: number; height: number }

export const CELL = 96;
export const NODE_W = 72;
export const NODE_H = 48;

export function layout(state: StructState): Layout {
  const nodes = state.nodes.map((n) => ({ ...n, px: n.x * CELL + CELL / 2, py: n.y * CELL + CELL / 2 }));
  const maxX = Math.max(0, ...state.nodes.map((n) => n.x));
  const maxY = Math.max(0, ...state.nodes.map((n) => n.y));
  return { nodes, width: (maxX + 1) * CELL, height: (maxY + 1) * CELL };
}
