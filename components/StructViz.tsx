import type { StructState } from "@/lib/types";
import { layout, NODE_W, NODE_H } from "@/lib/viz/layout";

export interface StructVizProps {
  state: StructState;
  className?: string;
  // Fixed drawing bounds (union of all steps) so scale stays constant
  // across an animation. Falls back to this state's own extent.
  bounds?: { width: number; height: number };
}

// State colors follow DESIGN.md timeline pastels (in-product viz only):
// active=pastel blue (read), new=mint (grep), error=semantic error tint.
// Pastel-filled nodes take dark label text; dark-surface nodes take light text.
const nodeColor: Record<string, string> = {
  active: "stroke-tl-read fill-tl-read",
  new: "stroke-tl-grep fill-tl-grep",
  error: "stroke-error fill-[#f3c3d2]",
  dim: "stroke-hairline-strong fill-card opacity-40",
  default: "stroke-hairline-strong fill-card",
};
const nodeText: Record<string, string> = {
  active: "fill-[#26251e]",
  new: "fill-[#26251e]",
  error: "fill-[#26251e]",
  dim: "fill-ink",
  default: "fill-ink",
};
const arrowColor: Record<string, string> = {
  active: "stroke-ink",
  error: "stroke-error",
  default: "stroke-muted",
};

const GLIDE = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";

export function StructViz({ state, className, bounds }: StructVizProps) {
  const l = layout(state);
  const width = bounds?.width ?? l.width;
  const height = bounds?.height ?? l.height;
  const byId = new Map(l.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted" />
        </marker>
      </defs>
      {state.arrows.map((a) => {
        const f = byId.get(a.from); const t = byId.get(a.to);
        if (!f || !t) return null;
        const dx = t.px - f.px; const dy = t.py - f.py;
        const len = Math.hypot(dx, dy) || 1;
        const trim = NODE_W / 2 + 4;
        const x1 = f.px + (dx / len) * trim; const y1 = f.py + (dy / len) * trim;
        const x2 = t.px - (dx / len) * trim; const y2 = t.py - (dy / len) * trim;
        return (
          <g key={`${a.from}-${a.to}-${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}-${Math.round(y2)}`} className="viz-enter">
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} markerEnd="url(#arrow)"
              className={arrowColor[a.emphasis ?? "default"]} />
            {a.label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" className="fill-muted text-xs">{a.label}</text>}
          </g>
        );
      })}
      {l.nodes.map((n) => (
        <g key={n.id} style={{ transform: `translate(${n.px}px, ${n.py}px)`, transition: GLIDE }}>
          <g className="viz-enter">
            {n.shape === "circle" ? (
              <circle cx={0} cy={0} r={NODE_H / 2 + 4} strokeWidth={2}
                className={`${nodeColor[n.emphasis ?? "default"]} transition-[fill,stroke,opacity] duration-500`} />
            ) : (
              <rect x={-NODE_W / 2} y={-NODE_H / 2} width={NODE_W} height={NODE_H} rx={n.shape === "frame" ? 4 : 10}
                strokeWidth={2} className={`${nodeColor[n.emphasis ?? "default"]} transition-[fill,stroke,opacity] duration-500`} />
            )}
            <text x={0} y={5} textAnchor="middle" className={`${nodeText[n.emphasis ?? "default"]} font-mono text-sm`}>{n.label}</text>
            {n.tag && <text x={0} y={-NODE_H / 2 - 8} textAnchor="middle" className="fill-muted text-xs">{n.tag}</text>}
          </g>
        </g>
      ))}
    </svg>
  );
}
