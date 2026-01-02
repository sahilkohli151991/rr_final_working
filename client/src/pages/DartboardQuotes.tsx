import React, { useRef, useEffect, useState } from "react";

interface DartboardQuotesProps {
  quotes: string[];
}

const angles = [-18, -6, 8, 20, 32, 44]; // visually spaced, can adjust for 6 quotes
const radii = [120, 105, 110, 120, 105, 115]; // radial distance from center for each quote
const stickColors = ["#2563eb", "#1e293b", "#64748b", "#0ea5e9", "#6366f1", "#334155"];

export const DartboardQuotes: React.FC<DartboardQuotesProps> = ({ quotes }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // A set of slight rotations for human touch
  const rotations = [-2, 1.5, -1, 2, -1.7, 1];
  const pinColors = ["#2563eb", "#0ea5e9", "#f59e42", "#e11d48", "#6366f1", "#059669"];

  // Pin state for each note
  const [pinInArr, setPinInArr] = useState(() => Array(quotes.length).fill(false));

  const handlePinIn = (idx: number, val: boolean) => {
    setPinInArr(arr => {
      const copy = arr.slice();
      copy[idx] = val;
      return copy;
    });
  };

  // Only one note is pinned at a time (hovered/focused)
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div ref={ref} className={`softboard-section${visible ? " visible" : ""}`}>
      <div className="softboard-bg">
        <div className="softboard-notes-row">
          {quotes.map((q, i) => (
            <div
              key={q}
              className={`softboard-note${visible ? " softboard-note-in" : ""}`}
              style={{
                borderColor: pinColors[i % pinColors.length],
                background: `rgba(255,255,255,0.97)`,
                transform: `rotate(${rotations[i % rotations.length] * 0.7}deg) translateY(0)`,
                transitionDelay: visible ? `${i * 0.18 + 0.10}s` : "0s",
              }}
              tabIndex={0}
              onMouseEnter={() => handlePinIn(i, true)}
              onFocus={() => handlePinIn(i, true)}
              onMouseLeave={() => handlePinIn(i, false)}
              onBlur={() => handlePinIn(i, false)}
            >
              <span
                className={`softboard-pin${pinInArr[i] ? " softboard-pin-in" : ""}`}
                style={{ background: pinColors[i % pinColors.length] }}
              />
              <span className="softboard-note-text">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DartboardQuotes;
