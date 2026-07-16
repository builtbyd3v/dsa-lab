import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PredictPane } from "./PredictPane";
import type { PredictRung } from "@/lib/types";

const rung: PredictRung = {
  kind: "predict",
  prompt: "What happens next?",
  steps: [{ state: { nodes: [], arrows: [] }, caption: "Setup." }],
  options: [{ id: "a", label: "x becomes 5" }, { id: "b", label: "x becomes 7" }],
  correctId: "b",
  explainWrong: { a: "x was reassigned after that line, so 5 is overwritten." },
  revealStep: { state: { nodes: [], arrows: [] }, caption: "x is 7." },
  reviewStep: 2,
};

describe("PredictPane", () => {
  it("wrong shows explanation, two wrongs show Review, correct passes", () => {
    const onPass = vi.fn(); const onReview = vi.fn();
    render(<PredictPane rung={rung} onPass={onPass} onReview={onReview} />);
    fireEvent.click(screen.getByText("x becomes 5"));
    expect(screen.getByText(/overwritten/)).toBeTruthy();
    expect(screen.queryByText(/Review this concept/)).toBeNull();
    fireEvent.click(screen.getByText("x becomes 5"));
    fireEvent.click(screen.getByText(/Review this concept/));
    expect(onReview).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByText("x becomes 7"));
    fireEvent.click(screen.getByText("Continue"));
    expect(onPass).toHaveBeenCalled();
  });
});
