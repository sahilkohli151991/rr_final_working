import { motion } from "framer-motion";
import { LogoTicker } from "./LogoTicker";

export function ProblemSection() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated geometric accent */}
      <motion.div
        className="absolute left-8 top-8 w-28 h-28 bg-gradient-to-br from-blue-200 to-blue-400 opacity-25 rounded-2xl blur-2xl z-0 animate-spin-slow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      />
      <motion.h2
        className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-7 max-w-3xl drop-shadow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ fontFamily: 'Lato, Arial, sans-serif' }}
      >
        Most talented people <span className="text-blue-700">never break into</span> top tech roles—<br className="hidden md:block" />
        not because of skill, but because of <span className="text-blue-700">strategy</span>.
      </motion.h2>
      <motion.p
        className="text-2xl md:text-3xl text-gray-600 text-center max-w-2xl font-light mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        The rules have changed. Resumes and LeetCode aren’t enough. You need a proven system, real mentorship, and insider strategies to stand out and win offers at the world’s best companies.
      </motion.p>
      
      {/* Company logos ticker - integrated within the section */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <LogoTicker />
      </motion.div>
      {/* Decorative geometric accent (optional) */}
      <motion.div
        className="absolute right-12 bottom-8 opacity-20 pointer-events-none hidden md:block"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="10" y="10" width="60" height="60" rx="18" fill="#e0e7ef" /></svg>
      </motion.div>
    </section>
  );
}
