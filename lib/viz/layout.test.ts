import { describe, it, expect } from "vitest";
import { layout, CELL } from "./layout";

describe("layout", () => {
  it("places nodes at grid centers and sizes canvas", () => {
    const l = layout({
      nodes: [
        { id: "a", label: "7", x: 0, y: 0 },
        { id: "b", label: "3", x: 2, y: 1 },
      ],
      arrows: [{ from: "a", to: "b" }],
    });
    expect(l.nodes[0].px).toBe(CELL / 2);
    expect(l.nodes[1].px).toBe(2 * CELL + CELL / 2);
    expect(l.nodes[1].py).toBe(CELL + CELL / 2);
    expect(l.width).toBe(3 * CELL);
    expect(l.height).toBe(2 * CELL);
  });
  it("empty state yields minimal canvas", () => {
    const l = layout({ nodes: [], arrows: [] });
    expect(l.width).toBeGreaterThan(0);
  });
});
