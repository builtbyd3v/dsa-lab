import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UnitPlayer } from "./UnitPlayer";
import type { Unit } from "@/lib/types";

const unit: Unit = {
  id: "u1",
  title: "Test unit",
  watch: [{ state: { nodes: [], arrows: [] }, caption: "Watch me." }],
  ladder: [{
    kind: "predict", prompt: "Next?", steps: [{ state: { nodes: [], arrows: [] }, caption: "S." }],
    options: [{ id: "a", label: "A" }, { id: "b", label: "B" }], correctId: "a",
    explainWrong: { b: "B is wrong because A." },
    revealStep: { state: { nodes: [], arrows: [] }, caption: "It was A." }, reviewStep: 0,
  }],
  recall: [{ id: "u1.c1", prompt: "Q?", options: ["yes", "no"], correctIndex: 0, explainWrong: "Because yes." }],
};

describe("UnitPlayer", () => {
  it("walks watch -> rung -> recall -> complete", () => {
    const onComplete = vi.fn();
    render(<UnitPlayer unit={unit} onComplete={onComplete} onRecallAnswer={vi.fn()} />);
    expect(screen.getByText("Watch me.")).toBeTruthy();
    fireEvent.click(screen.getByText("Start doing"));
    fireEvent.click(screen.getByText("A"));
    fireEvent.click(screen.getByText("Continue"));
    fireEvent.click(screen.getByText("yes"));
    fireEvent.click(screen.getByText("Done"));
    expect(onComplete).toHaveBeenCalled();
    expect(screen.getByText(/Unit complete/)).toBeTruthy();
  });
});
