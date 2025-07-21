import { StarFilledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Neelabh Dubey",
    role: "Product Manager @ Apptad",
    quote:
      "Being on STEM OPT had its challenges, but with the network and support from RoleRaise, I was able to land my role at Apptad. I'm truly grateful for their guidance.",
    rating: 5,
    image: "/attached_assets/Neelabh_1752003812461_1752651945620.jpeg",
  },
  {
    name: "Pranjal Gupta",
    role: "Lead Data Engineer @ Innovaccer",
    quote:
      "The interview prep and hands-on coaching I received from my mentors were game-changers. Thanks to RoleRaise, I not only cracked the role but also built skills that will last a lifetime.",
    rating: 5,
    image: "/attached_assets/pranjal_1752003812462_1752651967528.jpeg",
  },
  {
    name: "Ratul C.",
    role: "Data Engineer @ Commonwealth Bank of Australia",
    quote:
      "Switching companies is challenging, but the comprehensive support from RoleRaise made all the difference in landing my role at CBA.",
    rating: 5,
    image: "/attached_assets/ratul_1752003812462_1752651958804.jpeg",
  },
  {
    name: "Saurabh Anand",
    role: "Associate Director @ BeOne Medicines",
    quote:
      "The guidance and encouragement from my RoleRaise mentors helped me secure my Associate Director role. I'm extremely grateful for their support.",
    rating: 5,
    image: "/attached_assets/Saurabh_1752003812462_1752652621965.jpeg",
  },
  {
    name: "Sumit Sahagal",
    role: "Product Manager @ NAV USA",
    quote:
      "RoleRaise's mentorship and resources were instrumental in my transition to Product Management at NAV.",
    rating: 5,
    image: "/attached_assets/sumit_1752003812463_1752651985578.jpeg",
  },
  {
    name: "Safal Kumar",
    role: "Program Manager @ Sigmoid India",
    quote:
      "The personalized coaching and industry insights from RoleRaise helped me land my dream role at Sigmoid.",
    rating: 5,
    image: "/attached_assets/safal_1752003812462_1752651958804.jpeg",
  },
  {
    name: "Adam Parry",
    role: "KPMG UK",
    quote:
      "The mentorship and coaching I received were truly transformative. With their expert guidance, I was able to land the perfect role at KPMG UK—something I once thought was out of reach. I can't recommend this program enough for anyone serious about elevating their career!",
    rating: 5,
    image: "/attached_assets/adam parry_1752651930891.jpeg",
  },
];

export function SuccessSection() {
  return (
    <section id="success" className="relative py-16 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white flex flex-col items-center justify-center overflow-hidden">
      {/* Animated geometric accent */}
      <motion.div
        className="absolute left-8 top-8 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-400 opacity-20 rounded-2xl blur-2xl z-0 animate-spin-slow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
      />
      <motion.h2
        className="text-4xl md:text-6xl font-black text-gray-900 text-center mb-10 max-w-3xl drop-shadow"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{ fontFamily: 'Lato, Arial, sans-serif' }}
      >
        Real <span className="text-blue-700">success stories</span>
      </motion.h2>
      <motion.p
        className="text-2xl md:text-3xl text-gray-600 text-center mb-12 max-w-2xl font-light"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        RoleRaise alumni have landed roles at FAANG, unicorns, and fast-growing startups—see what’s possible.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl z-10">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.name}
            className="relative bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between min-h-[340px] border-2 border-gray-100 transition-transform duration-300 hover:scale-105 group overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 + i * 0.13, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Animated floating overlay */}
            <motion.div
              className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-400 opacity-10 rounded-full blur-3xl z-0 animate-pulse"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ repeat: Infinity, duration: 9 + i, ease: 'easeInOut' }}
            />
            <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-lg mb-6 z-10" />
            <h3 className="text-xl font-bold text-gray-900 mb-1 z-10 text-center">{testimonial.name}</h3>
            <span className="text-sm text-blue-700 font-semibold mb-2 z-10 text-center block">{testimonial.role}</span>
            <p className="text-base text-gray-600 mb-0 text-center z-10 break-words flex-1 flex items-center justify-center">{testimonial.quote}</p>
            {/* Subtle animated border for all cards */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.09, 0.17, 0.09, 0], scale: [1, 1.01, 1.03, 1.01, 1] }}
              transition={{ repeat: Infinity, duration: 8 + i, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(135deg, #93c5fd 0%, #e0e7ff 100%)' }}
            />
          </motion.div>
        ))}
      </div>
      {/* Decorative geometric accent */}
      <motion.div
        className="absolute right-16 bottom-8 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-300 opacity-20 rounded-2xl blur-2xl z-0 animate-bounce"
        animate={{ y: [0, -16, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}
      />
    </section>
  );
}
