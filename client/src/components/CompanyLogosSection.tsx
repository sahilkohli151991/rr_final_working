import { motion, useInView } from "framer-motion";
import React from "react";
import "./CompanyLogosSection.css";

// Company logo data with SVG paths
const companyLogos = [
  {
    name: "KPMG",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <rect x="10" y="10" width="30" height="40" fill="#1f4788" stroke="#1f4788" strokeWidth="2"/>
        <rect x="50" y="10" width="30" height="40" fill="#1f4788" stroke="#1f4788" strokeWidth="2"/>
        <rect x="90" y="10" width="30" height="40" fill="#1f4788" stroke="#1f4788" strokeWidth="2"/>
        <rect x="130" y="10" width="30" height="40" fill="#1f4788" stroke="#1f4788" strokeWidth="2"/>
        <text x="25" y="35" fill="white" fontSize="16" fontWeight="bold">K</text>
        <text x="65" y="35" fill="white" fontSize="16" fontWeight="bold">P</text>
        <text x="105" y="35" fill="white" fontSize="16" fontWeight="bold">M</text>
        <text x="145" y="35" fill="white" fontSize="16" fontWeight="bold">G</text>
      </svg>
    )
  },
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <text x="20" y="40" fill="#635bff" fontSize="24" fontWeight="600">stripe</text>
        <rect x="130" y="20" width="20" height="8" fill="#635bff" transform="skewX(-20)"/>
        <rect x="140" y="32" width="20" height="8" fill="#635bff" transform="skewX(-20)"/>
      </svg>
    )
  },
  {
    name: "Meta",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <path d="M20 20 Q30 10 40 20 Q50 10 60 20 Q50 30 40 20 Q30 30 20 20" fill="#1877f2"/>
        <text x="70" y="35" fill="#1c1e21" fontSize="20" fontWeight="600">Meta</text>
      </svg>
    )
  },
  {
    name: "BeOne",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <circle cx="30" cy="30" r="15" fill="#dc2626"/>
        <path d="M15 30 Q30 15 45 30 Q30 45 15 30" fill="white"/>
        <text x="55" y="25" fill="#1e3a8a" fontSize="18" fontWeight="700">Be</text>
        <text x="55" y="45" fill="#dc2626" fontSize="18" fontWeight="700">One</text>
      </svg>
    )
  },
  {
    name: "Amazon",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <text x="20" y="35" fill="#232f3e" fontSize="22" fontWeight="700">amazon</text>
        <path d="M30 45 Q100 50 150 45" stroke="#ff9900" strokeWidth="3" fill="none"/>
        <polygon points="145,42 155,45 145,48" fill="#ff9900"/>
      </svg>
    )
  },
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <text x="20" y="40" fontSize="24" fontWeight="500">
          <tspan fill="#4285f4">G</tspan>
          <tspan fill="#ea4335">o</tspan>
          <tspan fill="#fbbc05">o</tspan>
          <tspan fill="#4285f4">g</tspan>
          <tspan fill="#34a853">l</tspan>
          <tspan fill="#ea4335">e</tspan>
        </text>
      </svg>
    )
  },
  {
    name: "Innovaccer",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <polygon points="20,15 35,15 50,30 35,45 20,45 35,30" fill="#ff69b4"/>
        <polygon points="45,15 60,15 75,30 60,45 45,45 60,30" fill="#ff1493"/>
        <text x="80" y="35" fill="#333" fontSize="16" fontWeight="600">innovaccer</text>
      </svg>
    )
  },
  {
    name: "Netflix",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <text x="20" y="40" fill="#e50914" fontSize="24" fontWeight="700">NETFLIX</text>
      </svg>
    )
  },
  {
    name: "X",
    svg: (
      <svg viewBox="0 0 200 60" className="company-logo">
        <path d="M80 15 L120 45 M120 15 L80 45" stroke="#000" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    )
  }
];

export function CompanyLogosSection() {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="company-logos-section">
      <div className="container">
        {/* Main text */}
        <motion.div
          className="text-content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h2 className="main-heading">
            The rules have changed.
          </h2>
          <p className="sub-text">
            Resumes and LeetCode aren't enough. You need a proven system, real mentorship, 
            and insider strategies to stand out and win offers at the world's best companies.
          </p>
        </motion.div>

        {/* Company logos */}
        <motion.div
          className="logos-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {companyLogos.map((company, index) => (
            <motion.div
              key={company.name}
              className="logo-item"
              variants={logoVariants}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="logo-wrapper">
                {company.svg}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating background elements */}
        <div className="floating-elements">
          <motion.div
            className="floating-circle circle-1"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="floating-circle circle-2"
            animate={{
              y: [0, 15, 0],
              x: [0, -8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      </div>
    </section>
  );
}
