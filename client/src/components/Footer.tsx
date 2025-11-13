
import logo from '../assets/roleraise_final_logo.png';

export function Footer() {
  return (
    <div>
      {/* Removed trust bar with RoleRaise Logo and Trusted by leaders from */}
      <footer className="bg-gradient-to-br from-[#0a1837] via-blue-900 to-[#1e2746] text-white py-14 px-4 border-t border-blue-900 shadow-2xl relative overflow-hidden group transition-all duration-300">
  {/* Animated glowing border on hover */}
  <div className="absolute inset-0 rounded-t-3xl pointer-events-none z-10 group-hover:shadow-[0_0_0_6px_rgba(99,102,241,0.25)] group-hover:ring-2 group-hover:ring-blue-400/30 transition-all duration-300" />
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-1/3 top-0 w-40 h-40 bg-gradient-to-br from-blue-700 to-blue-400 opacity-20 rounded-full blur-3xl animate-spin-slow" />
          <div className="absolute right-0 bottom-0 w-56 h-56 bg-gradient-to-tr from-blue-400 to-blue-900 opacity-10 rounded-full blur-2xl animate-pulse" />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative">
          <div className="flex flex-col items-center md:items-start">
            <span className="flex items-center mb-2" style={{ fontWeight: 800, fontSize: '2rem', color: '#fff', letterSpacing: '-0.5px', fontFamily: 'inherit' }}>
  <img src={logo} alt="RoleRaise Logo" style={{ maxHeight: 36, width: 'auto', marginRight: 0, verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
  <span style={{ color: '#fff', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', fontFamily: 'inherit', lineHeight: 1, marginLeft: '-2px', position: 'relative', top: '3px' }}>oleraise</span>
</span>
            <span className="text-blue-200 text-sm mb-3"> {new Date().getFullYear()} RoleRaise. All rights reserved.</span>
            <div className="flex gap-4 mt-2">
  {/* Social links open in new tab */}
              <a href="#" className="text-blue-200 hover:text-white text-sm transition" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition" target="_blank" rel="noopener noreferrer">Terms</a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="font-semibold text-lg mb-1">Contact</span>
            <a href="mailto:support@roleraise.com" className="text-blue-100 hover:text-white text-sm transition">support@roleraise.com</a>
            <div className="flex flex-col items-center mt-2">
              <a href="https://www.linkedin.com/company/roleraise/?viewAsMember=true" className="hover:text-blue-400 transition" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.271V1.723C24 .771 23.208 0 22.23 0zM7.08 20.452H3.545V9H7.08v11.452zM5.312 7.633a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM20.452 20.452h-3.533v-5.604c0-1.336-.025-3.058-1.865-3.058-1.867 0-2.153 1.457-2.153 2.963v5.699h-3.533V9h3.393v1.561h.048c.472-.893 1.623-1.834 3.342-1.834 3.574 0 4.233 2.352 4.233 5.411v6.314z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-100 text-xs z-10 relative font-medium">
          This site is not affiliated with Google, Meta, Amazon, or any other company mentioned. All trademarks are property of their respective owners.
        </div>
        {/* Scroll to top button */}
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
    aria-label="Scroll to top"
  >
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
  </button>
</footer>
    </div>
  );
}
