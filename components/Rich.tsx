// Renders text with `backtick` spans as inline code chips, so identifiers in
// prompts and captions stand apart from prose.
export interface RichProps { text: string }

export function Rich({ text }: RichProps) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code key={i} className="whitespace-nowrap rounded-md bg-strong px-1.5 py-0.5 font-mono text-[0.85em] text-tl-read">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
