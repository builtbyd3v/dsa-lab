// Visual state drawn by the renderer. One generic node/arrow scene covers
// variables (boxes), lists, stacks, call frames, trees, graphs.
export interface VizNode {
  id: string;
  label: string;        // value shown inside the node
  tag?: string;         // small label above (variable name, "head", "top")
  x: number;            // layout grid column (renderer scales to px)
  y: number;            // layout grid row
  shape?: "box" | "circle" | "frame";
  emphasis?: "active" | "new" | "error" | "dim";
}

export interface VizArrow {
  from: string;         // VizNode id
  to: string;           // VizNode id
  label?: string;
  emphasis?: "active" | "error";
}

export interface StructState {
  nodes: VizNode[];
  arrows: VizArrow[];
}

export interface Step {
  state: StructState;
  caption: string;      // max 2 sentences
}

export interface PredictOption {
  id: string;
  label: string;
}

export interface PredictRung {
  kind: "predict";
  prompt: string;
  steps: Step[];        // shown up to the pause, then question
  options: PredictOption[];
  correctId: string;
  explainWrong: Record<string, string>; // optionId -> why it is wrong
  revealStep: Step;     // the actual next state, shown after answering
  reviewStep: number;   // index into unit.watch to jump to on Review
}

export interface Blank {
  id: string;
  placeholder: string;  // shown in the blank, e.g. "___"
  answer: string;       // exact accepted text (whitespace-trimmed compare)
  explainWrong: string; // shown when filled wrong
}

export interface CodeTest {
  name: string;
  // Python appended after user code; must raise AssertionError with a
  // message on failure. Message is shown verbatim as verbal feedback.
  code: string;
}

export interface FillinRung {
  kind: "fillin";
  prompt: string;
  code: string;         // Python with {{blankId}} markers
  blanks: Blank[];
  tests: CodeTest[];
  vizExpr?: string;     // Python expr evaluated after run; JSON -> StructState via pyToViz
  reviewStep: number;
}

export interface WriteRung {
  kind: "write" | "apply";
  prompt: string;
  starter: string;      // starter Python code
  tests: CodeTest[];
  vizExpr?: string;
  reviewStep: number;
}

export type Rung = PredictRung | FillinRung | WriteRung;

export interface Card {
  id: string;           // globally unique: `${chapterId}.${unitId}.${n}`
  prompt: string;
  options: string[];
  correctIndex: number;
  explainWrong: string;
}

export interface Unit {
  id: string;
  title: string;
  watch: Step[];
  ladder: Rung[];
  recall: Card[];
}

export interface Chapter {
  id: string;
  phase: 1 | 2;
  title: string;
  units: Unit[];
}
