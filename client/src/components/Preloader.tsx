import React, { useEffect, useState } from "react";
import "../index.css";
import "./Preloader.css";

/**
 * Preloader animation: Two 'R's come from left/right, meet at center, create a circle, launch up with smoke.
 * Uses theme colors from :root CSS vars.
 */
const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  // Animation duration for the whole preloader
  const [loading, setLoading] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    // Show bar after logo and text (1.7s), then animate fill
    const showBarTimeout = setTimeout(() => {
      setShowBar(true);
      setTimeout(() => setLoading(true), 120); // slight delay for fill effect
    }, 1700);
    const t = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2600);
    return () => {
      clearTimeout(showBarTimeout);
      clearTimeout(t);
    };
  }, [onComplete]);

  return (
    <div className="preloader-bg roleraise-preloader">
      {/* RoleRaise SVG logo with glow animation */}
      <div className="roleraise-logo-preloader">
        
      </div>
      {/* Roleraise name fade in */}
      <div className="roleraise-name">RoleRaise</div>
      {/* Loading bar below RoleRaise */}
      {showBar && (
        <div className="roleraise-loading-bar-container">
          <div className={`roleraise-loading-bar${loading ? ' fill' : ''}`} />
        </div>
      )}
    </div>
  );
};

export default Preloader;
