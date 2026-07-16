import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecallPane } from "./RecallPane";
import type { Card } from "@/lib/types";

const cards: Card[] = [
  { id: "c1", prompt: "A list index starts at?", options: ["0", "1"], correctIndex: 0, explainWrong: "Python indexes from 0: the first item is item 0." },
  { id: "c2", prompt: "len('abc')?", options: ["2", "3"], correctIndex: 1, explainWrong: "len counts characters: a, b, c is 3." },
];

describe("RecallPane", () => {
  it("wrong shows explanation and records false; flows to done", () => {
    const onAnswer = vi.fn(); const onDone = vi.fn();
    render(<RecallPane cards={cards} onAnswer={onAnswer} onDone={onDone} />);
    fireEvent.click(screen.getByText("1"));
    expect(screen.getByText(/indexes from 0/)).toBeTruthy();
    expect(onAnswer).toHaveBeenCalledWith("c1", false);
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("3"));
    expect(onAnswer).toHaveBeenCalledWith("c2", true);
    fireEvent.click(screen.getByText("Done"));
    expect(onDone).toHaveBeenCalled();
  });
});
