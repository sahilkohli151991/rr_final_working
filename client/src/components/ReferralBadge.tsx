import React, { useState } from "react";
import "./referral-badge-animations";

export function ReferralBadge() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="absolute top-20 right-0 z-30 flex items-center select-none">
      <button
        className={`flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-[10px] md:text-xs px-2 py-1 shadow-lg border-2 border-white/60 drop-shadow-lg transition-all duration-300 focus:outline-none`}
        style={{letterSpacing: '0.01em', boxShadow: '0 0 12px 2px #6366f1, 0 0 8px 2px #a78bfa'}}
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-label="Expand referral program details"
      >
        <span className="inline-block align-middle mr-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-blink-slow" style={{boxShadow: '0 0 4px 1px #f472b6'}} />
        {!expanded && (
          <span className="mr-2 font-bold">Refer and Earn</span>
        )}
        <span className={`ml-1 transition-transform duration-200 ${expanded ? 'rotate-90' : ''} animate-arrow-blink`}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
        {expanded && (
          <span className="ml-3 text-xs md:text-sm font-normal text-white transition-all duration-300">
            Referral Program – Invite friends & family into great learning and earn <span className="font-bold text-yellow-200">10–15% rewards</span>!
          </span>
        )}
      </button>
    </div>
  );
}

// Add blinking animation for the dot
const style = document.createElement('style');
style.innerHTML = `
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.1; } }
.animate-blink { animation: blink 1s infinite; }
`;
document.head.appendChild(style);
