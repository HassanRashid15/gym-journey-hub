import { useEffect, useState } from "react";

interface TypingTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
}

/**
 * Cycling typewriter effect with blinking caret. Accessible: exposes the
 * currently visible phrase to screen readers via aria-live and hides the
 * decorative caret from AT.
 */
const TypingText = ({
  phrases,
  className = "",
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1600,
  loop = true,
}: TypingTextProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      if (!loop && index === phrases.length - 1) return;
      const t = window.setTimeout(() => setDeleting(true), pauseMs);
      return () => window.clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = window.setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deletingSpeed : typingSpeed
    );
    return () => window.clearTimeout(t);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseMs, loop]);

  return (
    <span className={className}>
      <span aria-live="polite">{text}</span>
      <span
        aria-hidden
        className="ml-1 inline-block w-[0.08em] h-[0.9em] align-[-0.1em] bg-primary animate-pulse"
      />
    </span>
  );
};

export default TypingText;
