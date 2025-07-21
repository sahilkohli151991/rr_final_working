import { useState } from "react";
import { motion } from "framer-motion";

function WaveBackground() {
  // Single smooth wave with softer curves and no sharp edges
  const wavePath = (
    <path 
      d="M0,60 
       C150,90 250,30 400,60 
       C550,90 650,30 800,60 
       C950,90 1050,30 1200,60 
       L1200,120 L0,120 Z" 
      fill="url(#waveGradient)"
    />
  );

  return (
    <div className="absolute inset-0 overflow-hidden z-0 flex items-center justify-center" style={{ bottom: '10px', height: '80%' }}>
      <div className="relative w-full h-full">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '100%',
            transform: 'translateY(-50%)',
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          
          <motion.g
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ display: 'flex' }}
          >
            {/* Render two copies of the wave side by side for seamless looping */}
            <g>{wavePath}</g>
            <g transform="translate(1200,0)">{wavePath}</g>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Who are the mentors?",
    a: "Our mentors are ex-Google, Meta, Amazon, and other FAANG leaders with real hiring experience."
  },
  {
    q: "What is the money-back guarantee?",
    a: "If you don’t land a qualifying offer within the program period, you get a full refund—no questions asked."
  },
  {
    q: "How are sessions delivered?",
    a: "All sessions are 1:1 and remote, scheduled flexibly to fit your calendar."
  },
  {
    q: "How fast can I get results?",
    a: "Most clients land offers in 6–12 weeks, depending on effort and starting point."
  },
  {
    q: "Do you help with referrals?",
    a: "Yes—our mentors provide direct referrals to top companies as part of Premium and Elite programs."
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      <WaveBackground />
      {/* Main Heading */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to know about our mentorship programs and services.</p>
      </div>
      
      {/* FAQ Card */}
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="w-full rounded-2xl shadow-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 lg:p-10 relative overflow-hidden">
          {/* Gradient accent */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-100 opacity-30 blur-2xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-blue-50 opacity-30 blur-2xl"></div>
          
          {/* Avatars & Rating */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <div className="flex -space-x-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/25.jpg" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md z-10">+4</div>
            </div>
            <div className="flex flex-col items-center sm:items-start sm:ml-3">
              <div className="flex items-center gap-1">
                <span className="text-blue-500 text-xl">★</span>
                <span className="text-blue-500 text-xl">★</span>
                <span className="text-blue-500 text-xl">★</span>
                <span className="text-blue-500 text-xl">★</span>
                <span className="text-blue-500 text-xl">★</span>
                <span className="ml-2 text-gray-900 font-semibold text-base">4.5+</span>
              </div>
              <span className="text-sm text-gray-600">From 200+ Users</span>
            </div>
          </div>
          
          {/* FAQ Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`rounded-xl transition-all duration-300 bg-gradient-to-r from-white to-blue-50 border border-gray-200 shadow-sm overflow-hidden hover:shadow-md ${open === i ? "ring-2 ring-blue-400 shadow-lg" : ""} hover:border-blue-100`}>
                <button
                  className="w-full flex items-start justify-between px-4 sm:px-5 py-4 text-left focus:outline-none group"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="text-sm sm:text-base font-medium text-gray-900 pr-3 sm:pr-4 flex-1 leading-relaxed bg-gradient-to-r from-transparent to-transparent bg-clip-text">{faq.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 mt-0.5 ${
                    open === i 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white border-blue-300 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  }`}>
                    ?
                  </span>
                </button>
                {open === i && (
                  <div className="px-4 sm:px-5 pb-4 pt-0">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
