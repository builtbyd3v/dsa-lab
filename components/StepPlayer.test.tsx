import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepPlayer } from "./StepPlayer";
import type { Step } from "@/lib/types";

const steps: Step[] = [
  { state: { nodes: [{ id: "a", label: "1", x: 0, y: 0 }], arrows: [] }, caption: "First." },
  { state: { nodes: [{ id: "a", label: "2", x: 0, y: 0 }], arrows: [] }, caption: "Second." },
];

describe("StepPlayer", () => {
  it("shows caption, steps forward and back", () => {
    render(<StepPlayer steps={steps} autoPlay={false} />);
    expect(screen.getByText("First.")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Next step"));
    expect(screen.getByText("Second.")).toBeTruthy();
    expect(screen.getByText("2 / 2")).toBeTruthy();
    fireEvent.click(screen.getByLabelText("Previous step"));
    expect(screen.getByText("First.")).toBeTruthy();
  });
  it("fires onFinished at last step and respects startAt", () => {
    const done = vi.fn();
    render(<StepPlayer steps={steps} autoPlay={false} startAt={1} onFinished={done} />);
    expect(screen.getByText("Second.")).toBeTruthy();
    expect(done).toHaveBeenCalled();
  });
});
