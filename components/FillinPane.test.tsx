import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FillinPane } from "./FillinPane";
import type { FillinRung } from "@/lib/types";

vi.mock("@/lib/engine/pyodide", () => ({
  loadPy: () => Promise.resolve({ runPython: () => undefined }),
}));

const rung: FillinRung = {
  kind: "fillin",
  prompt: "Complete the swap.",
  code: "a = 1\nb = 2\na, b = {{swap}}",
  blanks: [{ id: "swap", placeholder: "___", answer: "b, a", explainWrong: "Swap needs both names, right side first: b, a." }],
  tests: [{ name: "swapped", code: "assert a == 2, 'a should end as 2'" }],
  reviewStep: 1,
};

describe("FillinPane", () => {
  it("wrong blank gives its explanation without running python", async () => {
    render(<FillinPane rung={rung} onPass={vi.fn()} onReview={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("swap"), { target: { value: "a, b" } });
    fireEvent.click(screen.getByLabelText("Run code"));
    await waitFor(() => expect(screen.getByText(/right side first/)).toBeTruthy());
  });
  it("correct blank runs tests and passes", async () => {
    const onPass = vi.fn();
    render(<FillinPane rung={rung} onPass={onPass} onReview={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("swap"), { target: { value: "b, a" } });
    fireEvent.click(screen.getByLabelText("Run code"));
    await waitFor(() => screen.getByText("Continue"));
    fireEvent.click(screen.getByText("Continue"));
    expect(onPass).toHaveBeenCalled();
  });
  it("two failures reveal Review", async () => {
    const onReview = vi.fn();
    render(<FillinPane rung={rung} onPass={vi.fn()} onReview={onReview} />);
    const blank = screen.getByLabelText("swap");
    for (const v of ["x", "y"]) {
      fireEvent.change(blank, { target: { value: v } });
      fireEvent.click(screen.getByLabelText("Run code"));
      await waitFor(() => screen.getByText(/right side first/));
    }
    fireEvent.click(screen.getByText(/Review this concept/));
    expect(onReview).toHaveBeenCalledWith(1);
  });
});
