import { motion } from "framer-motion";
import { HiAcademicCap, HiLightBulb, HiUsers, HiCheckCircle } from "react-icons/hi";

export function SolutionSection() {
  const pillars = [
    {
      icon: <HiAcademicCap className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Elite Mentorship",
      desc: "Work 1:1 with real FAANG mentors who’ve sat on both sides of the interview table.",
    },
    {
      icon: <HiLightBulb className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Proven Roadmap",
      desc: "A step-by-step system built from thousands of successful tech career transitions.",
    },
    {
      icon: <HiUsers className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Real Accountability",
      desc: "Weekly check-ins and community support to keep you on track—no more going it alone.",
    },
    {
      icon: <HiCheckCircle className="w-10 h-10 text-blue-600 mb-3" />,
      title: "Results That Matter",
      desc: "Land offers, double your salary, and build a career you love at the world’s best companies.",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated geometric accent */}
      <motion.div
        className="absolute left-10 top-10 w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-400 opacity-20 rounded-2xl blur-2xl z-0 animate-spin-slow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      />
      <motion.h2
        className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-12 max-w-3xl drop-shadow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ fontFamily: 'Lato, Arial, sans-serif' }}
      >
        We turn ambition into <span className="text-blue-700">offers</span>.
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl w-full z-10">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border-0 transition-transform duration-300 hover:scale-105 group relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0.25, 0.12, 0], scale: [1, 1.03, 1.06, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 7 + i, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(135deg, #93c5fd 0%, #e0e7ff 100%)' }}
            />
            {pillar.icon}
            <h3 className="text-xl font-bold text-gray-900 mb-2 z-10">{pillar.title}</h3>
            <p className="text-base text-gray-600 z-10">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>
      {/* Decorative geometric accent */}
      <motion.div
        className="absolute right-10 bottom-6 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-300 opacity-20 rounded-xl blur-xl z-0 animate-bounce"
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
    </section>
  );
}