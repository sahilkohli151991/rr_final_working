import { useState, useEffect } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import React from "react";
import { MentorshipForm } from "./MentorshipForm";
import { openCalendlyPopup } from "@/lib/calendly";

// Floating glassmorphism shape component
function FloatingShape({ delay = 0, duration = 20, className = "" }) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/20 ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Typewriter effect hook
function useTypewriter(text: string, speed = 100) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
}

export function Hero() {
  const heroRef = React.useRef(null);
  const headlineRef = React.useRef(null);
  const headlineInView = useInView(headlineRef, { margin: "-100px" });
  const controls = useAnimation();
  const [startTypewriter, setStartTypewriter] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const headlineText = "Unlock $200K+ Tech Careers with Elite Mentorship";
  const toggleForm = () => setIsFormOpen(!isFormOpen);
  const typewriterText = useTypewriter(startTypewriter ? headlineText : "", 80);

  useEffect(() => {
    if (headlineInView) setStartTypewriter(true);
  }, [headlineInView]);

  useEffect(() => {
    if (typewriterText === headlineText) {
      setTypewriterComplete(true);
      setTimeout(() => controls.start("visible"), 500);
    }
  }, [typewriterText, controls]);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 pt-0 pb-0 overflow-hidden">
      {/* Glassmorphism floating shapes background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <FloatingShape delay={0} duration={25} className="w-64 h-64 top-20 left-10 opacity-60" />
        <FloatingShape delay={5} duration={30} className="w-48 h-48 top-40 right-20 opacity-40" />
        <FloatingShape delay={10} duration={20} className="w-32 h-32 bottom-32 left-1/4 opacity-50" />
        <FloatingShape delay={15} duration={35} className="w-56 h-56 bottom-20 right-10 opacity-30" />
        <FloatingShape delay={8} duration={28} className="w-40 h-40 top-1/3 left-1/2 opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent" />
      </div>
      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center mt-8">
        {/* Animated headline with typewriter effect */}
        <motion.div
          ref={headlineRef}
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
            <span className="block mb-2">
              {typewriterText.split(' ').map((word, index) => {
                if (word.includes('$200K+') || word.includes('35LPA+')) {
                  return (
                    <span key={index} className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      {word}{' '}
                    </span>
                  );
                }
                if (word.includes('Elite')) {
                  return (
                    <span key={index} className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent font-extrabold">
                      {word}{' '}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </span>
          </h1>
        </motion.div>
        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-600 text-center mb-12 max-w-3xl font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } } }}
        >
          Break into FAANG & top tech roles—no luck, no gatekeeping, just proven systems and real insider mentorship.
        </motion.p>
        {/* Animated CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.8 } } }}
        >
          <motion.button
            onClick={toggleForm}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get My Free Roadmap</span>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            onClick={openCalendlyPopup}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-700 bg-white border-2 border-blue-700 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Book Free Call</span>
          </motion.button>
        </motion.div>
      </div>
      {/* Mentorship Form Modal */}
      <MentorshipForm isOpen={isFormOpen} onClose={toggleForm} />
    </section>
  );
  return (
    <section ref={heroRef} className="relative min-h-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 pt-0 pb-0 overflow-hidden">
      {/* Glassmorphism floating shapes background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <FloatingShape delay={0} duration={25} className="w-64 h-64 top-20 left-10 opacity-60" />
        <FloatingShape delay={5} duration={30} className="w-48 h-48 top-40 right-20 opacity-40" />
        <FloatingShape delay={10} duration={20} className="w-32 h-32 bottom-32 left-1/4 opacity-50" />
        <FloatingShape delay={15} duration={35} className="w-56 h-56 bottom-20 right-10 opacity-30" />
        <FloatingShape delay={8} duration={28} className="w-40 h-40 top-1/3 left-1/2 opacity-25" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center mt-8">
        {/* Animated headline with typewriter effect */}
        <motion.div
          ref={headlineRef}
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tight">
            <span className="block mb-2">
              {typewriterText.split(' ').map((word, index) => {
                if (word.includes('$200K+') || word.includes('35LPA+')) {
                  return (
                    <span key={index} className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      {word}{' '}
                    </span>
                  );
                }
                if (word.includes('Elite')) {
                  return (
                    <span key={index} className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent font-extrabold">
                      {word}{' '}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </span>
          </h1>
        </motion.div>
        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-600 text-center mb-12 max-w-3xl font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }
          }}
        >
          Break into FAANG & top tech roles—no luck, no gatekeeping, just proven systems and real insider mentorship.
        </motion.p>
        {/* Animated CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.8 } }
          }}
        >
          <motion.button
            onClick={toggleForm}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Get My Free Roadmap</span>
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={openCalendlyPopup}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-700 bg-white border-2 border-blue-700 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Book Free Call</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Mentorship Form Modal */}
      <MentorshipForm 
        isOpen={isFormOpen} 
        onClose={toggleForm}
      />
    </section>
  );
}
