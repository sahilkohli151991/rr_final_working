import React from "react";
import "./ProgramsBenefitsCard.css";

const FEATURES = [
  {
    icon: "check-circle",
    title: "Real Industry Case Studies",
    desc: "Retail, Healthcare, BFSI, SaaS",
    color: "#2563eb"
  },
  {
    icon: "lightbulb",
    title: "6–30 Mock Interviews",
    desc: "Technical, Behavioral, and Role-specific"
  },
  {
    icon: "shield-star",
    title: "Resume + LinkedIn Optimization",
    desc: "Personalized, ATS-friendly, and recruiter-reviewed"
  },
  {
    icon: "user-group",
    title: "1:1 Mentorship",
    desc: "Technical, Behavioral & Career Strategy"
  }
];

export default function ProgramsBenefitsCard() {
  return (
    <section className="programs-benefits-tree-bg">
      <div className="programs-benefits-tree-root">
        <div className="tree-root-card">
          <span className="tree-root-title">All Programs Include</span>
        </div>
        <div className="tree-lines-vertical" />
        <div className="tree-horizontal-main" />
        <div className="tree-children-row">
          {FEATURES.map((f, i) => (
            <div className="tree-child-col" key={f.title}>
              <div className="tree-child-vertical" />
              <div className="tree-benefit-flip-card" tabIndex={0}>
                <div className="tree-benefit-flip-inner">
                  <div className="tree-benefit-flip-front">
                    <div className={`tree-benefit-icon icon-${f.icon}`}></div>
                    <div className="tree-benefit-title">{f.title}</div>
                  </div>
                  <div className="tree-benefit-flip-back">
                    <div className="tree-benefit-desc">{f.desc}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
