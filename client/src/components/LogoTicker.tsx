import React from "react";
import "./LogoTicker.css";

// Use only attached_assets PNG logos for the ticker
const logos: string[] = [
  "/attached_assets/BeOne_logo.png",
  "/attached_assets/Innovaccer_logo.png",
  "/attached_assets/KPMG_logo.png",
  "/attached_assets/Meta_logo.png",
  "/attached_assets/Netflix_logo.png",
  "/attached_assets/Stripe_Logo.png",
  "/attached_assets/X_logo.png",
  "/attached_assets/amazon_logo.png",
  "/attached_assets/google_logo.png",
];

export function LogoTicker() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-ticker-container">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {duplicatedLogos.map((logo: string, index: number) => (
            <div key={index} className="ticker-item">
              <img src={logo} alt="Logo" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
