import type { ReactNode } from "react";
import { pythonLanguage } from "@codemirror/lang-python";
import { highlightCode, tagHighlighter, tags as t } from "@lezer/highlight";

/* Same pastel palette as the PyEditor theme, for static code outside the editor. */
const highlighter = tagHighlighter([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword], class: "text-[#c0a8dd]" },
  { tag: [t.string, t.special(t.string)], class: "text-[#9fc9a2]" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], class: "text-[#9fbbe0]" },
  { tag: t.definition(t.variableName), class: "text-[#dfa88f]" },
  { tag: [t.className, t.typeName], class: "text-[#dfa88f]" },
  { tag: [t.number, t.bool, t.null], class: "text-[#c08532]" },
  { tag: t.comment, class: "italic text-[#807d72]" },
  { tag: [t.operator, t.punctuation], class: "text-[#a8a599]" },
  { tag: t.self, class: "italic text-[#c0a8dd]" },
]);

export interface PyCodeProps { code: string }

export function PyCode({ code }: PyCodeProps) {
  const nodes: ReactNode[] = [];
  let key = 0;
  highlightCode(
    code,
    pythonLanguage.parser.parse(code),
    highlighter,
    (text, classes) => {
      nodes.push(classes ? <span key={key++} className={classes}>{text}</span> : <span key={key++}>{text}</span>);
    },
    () => { nodes.push(<span key={key++}>{"\n"}</span>); }
  );
  return <>{nodes}</>;
}
