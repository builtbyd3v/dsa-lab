import type { StructState } from "@/lib/types";
import { layout, NODE_W, NODE_H } from "@/lib/viz/layout";

export interface StructVizProps { state: StructState; className?: string }

const nodeColor: Record<string, string> = {
  active: "stroke-teal-400 fill-teal-950",
  new: "stroke-green-400 fill-green-950",
  error: "stroke-red-400 fill-red-950",
  dim: "stroke-zinc-700 fill-zinc-900 opacity-40",
  default: "stroke-zinc-500 fill-zinc-900",
};
const arrowColor: Record<string, string> = {
  active: "stroke-teal-400",
  error: "stroke-red-400",
  default: "stroke-zinc-500",
};

export function StructViz({ state, className }: StructVizProps) {
  const l = layout(state);
  const byId = new Map(l.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${l.width} ${l.height}`} className={className} role="img">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400" />
        </marker>
      </defs>
      {state.arrows.map((a, i) => {
        const f = byId.get(a.from); const t = byId.get(a.to);
        if (!f || !t) return null;
        const dx = t.px - f.px; const dy = t.py - f.py;
        const len = Math.hypot(dx, dy) || 1;
        const trim = NODE_W / 2 + 4;
        const x1 = f.px + (dx / len) * trim; const y1 = f.py + (dy / len) * trim;
        const x2 = t.px - (dx / len) * trim; const y2 = t.py - (dy / len) * trim;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={2} markerEnd="url(#arrow)"
              className={arrowColor[a.emphasis ?? "default"]} />
            {a.label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} textAnchor="middle" className="fill-zinc-400 text-xs">{a.label}</text>}
          </g>
        );
      })}
      {l.nodes.map((n) => (
        <g key={n.id}>
          {n.shape === "circle" ? (
            <circle cx={n.px} cy={n.py} r={NODE_H / 2 + 4} strokeWidth={2} className={nodeColor[n.emphasis ?? "default"]} />
          ) : (
            <rect x={n.px - NODE_W / 2} y={n.py - NODE_H / 2} width={NODE_W} height={NODE_H} rx={n.shape === "frame" ? 4 : 10}
              strokeWidth={2} className={nodeColor[n.emphasis ?? "default"]} />
          )}
          <text x={n.px} y={n.py + 5} textAnchor="middle" className="fill-zinc-100 font-mono text-sm">{n.label}</text>
          {n.tag && <text x={n.px} y={n.py - NODE_H / 2 - 8} textAnchor="middle" className="fill-zinc-400 text-xs">{n.tag}</text>}
        </g>
      ))}
    </svg>
  );
}
