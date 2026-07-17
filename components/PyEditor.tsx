"use client";
import CodeMirror, { EditorView, keymap, Prec } from "@uiw/react-codemirror";
import { useEffect, useRef } from "react";
import { python } from "@codemirror/lang-python";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

/* DESIGN.md dark tokens: canvas-soft pane, orange caret, timeline pastels
   as the syntax palette, hairline-only depth. */
const editorTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#1c1b18",
      color: "#f0efe9",
      fontSize: "13px",
    },
    ".cm-content": {
      fontFamily: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace",
      padding: "14px 0",
      caretColor: "#f54e00",
      lineHeight: "1.6",
    },
    ".cm-line": { padding: "0 16px" },
    "&.cm-focused": { outline: "none" },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#f54e00", borderLeftWidth: "2px" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: "rgba(245, 78, 0, 0.16)",
    },
    ".cm-activeLine": { backgroundColor: "rgba(240, 239, 233, 0.035)" },
    ".cm-gutters": {
      backgroundColor: "#1c1b18",
      color: "#5f5c54",
      border: "none",
      fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
    },
    ".cm-lineNumbers .cm-gutterElement": { minWidth: "38px", padding: "0 12px 0 0" },
    ".cm-matchingBracket": { backgroundColor: "rgba(159, 187, 224, 0.18)" },
  },
  { dark: true }
);

const pythonHighlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword], color: "#c0a8dd" },
  { tag: [t.string, t.special(t.string)], color: "#9fc9a2" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#9fbbe0" },
  { tag: t.definition(t.variableName), color: "#dfa88f" },
  { tag: [t.className, t.typeName], color: "#dfa88f" },
  { tag: [t.number, t.bool, t.null], color: "#c08532" },
  { tag: t.comment, color: "#807d72", fontStyle: "italic" },
  { tag: [t.operator, t.punctuation], color: "#a8a599" },
  { tag: t.self, color: "#c0a8dd", fontStyle: "italic" },
]);

export interface PyEditorProps { value: string; onChange: (value: string) => void; onRun?: () => void }

export function PyEditor({ value, onChange, onRun }: PyEditorProps) {
  // Keep onRun in a ref so the keymap extension (and therefore the extensions
  // array) stays referentially stable across renders — putting onRun directly
  // in the extensions array would force CodeMirror to reconfigure on every
  // parent re-render.
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={editorTheme}
      extensions={[
        python(),
        EditorView.lineWrapping,
        syntaxHighlighting(pythonHighlight),
        Prec.high(
          keymap.of([
            {
              key: "Mod-Enter",
              run: () => {
                onRunRef.current?.();
                return true;
              },
            },
          ])
        ),
      ]}
      minHeight="280px"
      aria-label="Code editor"
      basicSetup={{ foldGutter: false, highlightActiveLineGutter: false }}
      className="animate-fade-up overflow-hidden rounded-xl border border-hairline transition-[border-color,box-shadow] duration-200 focus-within:border-primary/60 focus-within:shadow-[0_0_0_3px_rgba(245,78,0,0.12)]"
    />
  );
}
