import React, { useEffect, useRef, useState } from "react";
import "./ProgramsPage.css";

interface Props {
  magnets: string[];
}

const tiltAngles = [1.5, -2.2, 0.8, -1.7, 2.1, -0.9];
const pinColors = ["#2563eb", "#f59e42", "#e11d48", "#059669", "#a21caf", "#0ea5e9"];

const MarketingSoftboard: React.FC<Props> = ({ magnets }) => {
  const [visible, setVisible] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (boardRef.current) observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`softboard-section${visible ? " visible" : ""}`}>
      <div className="softboard-bg" ref={boardRef}>
        <div className="softboard-notes-row">
          {magnets.map((quote, idx) => (
            <div
              className="softboard-note-slot"
              tabIndex={0}
              key={quote}
              style={{ minWidth: 180, maxWidth: 350 }}
            >
              <div
                className={`softboard-note${visible ? " softboard-note-in" : ""}`}
                style={{
                  transform: visible
                    ? `translateY(0) scale(1) rotate(${tiltAngles[idx % tiltAngles.length]}deg)`
                    : undefined,
                  borderColor: pinColors[idx % pinColors.length],
                }}
              >
                <span
                  className={`softboard-pin${visible ? " softboard-pin-in" : ""}`}
                  style={{ background: pinColors[idx % pinColors.length] }}
                />
                <span className="softboard-note-text">{quote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingSoftboard;
