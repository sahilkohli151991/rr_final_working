import React, { useState } from "react";
import "./ProgramsPage.css";

type Program = { name: string; desc: string };
type Track = {
  title: string;
  transitions: string[];
  tech: string[];
  programs: Program[];
};

type Props = { tracks: Track[] };

export default function ProgramsAccordion({ tracks }: Props) {
  const [selected, setSelected] = useState<Track | null>(null);

  // Modal close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelected(null);
  };

  return (
    <>
      <div className="programs-grid">
        {[0,1,2,3,4].map(idx => {
          const track = tracks[idx];
          if (!track) return null;
          const cardClass = `program-card-img card${idx+1}`;
          return (
            <button
              key={track.title}
              className={cardClass}
              onClick={() => setSelected(track)}
              aria-label={`View details for ${track.title}`}
            >
              <span className="program-card-title-img"><span className="cool-card-title">{track.title}</span></span>
              <span className="program-card-arrow-img">&rarr;</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="program-modal-overlay" onClick={handleOverlayClick}>
          <div className="program-modal program-modal-square" onClick={e => e.stopPropagation()}>
            <button className="modal-close-inside" onClick={() => setSelected(null)} aria-label="Close details">&#10006;</button>
            <div className="modal-content-area">
              <h3 className="modal-title modern-font">{selected.title}</h3>
              <table className="modal-table-content">
                <tbody>
                  <tr>
                    <td className="modal-label modern-font">Career Transitions:</td>
                    <td className="modal-value modern-font">
  {Array.isArray(selected.transitions) ? (
    <ul style={{margin:0, paddingLeft:'1.2em'}}>
      {selected.transitions.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  ) : selected.transitions}
</td>
                  </tr>
                  <tr>
                    <td className="modal-label modern-font">Tech Stack & Tools:</td>
                    <td className="modal-value modern-font">
  {Array.isArray(selected.tech) ? (
    <ul style={{margin:0, paddingLeft:'1.2em'}}>
      {selected.tech.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  ) : selected.tech}
</td>
                  </tr>
                  <tr>
                    <td className="modal-label modern-font" style={{verticalAlign: 'top'}}>Programs:</td>
                    <td className="modal-value modern-font">
                      {selected.programs.map((p) => (
                        <div key={p.name} style={{marginBottom: '0.7em'}}>
                          <b>{p.name}</b> <span className="program-desc">{p.desc}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
;

