export function Footer() {
  return (
    <div>
      {/* Removed trust bar with RoleRaise Logo and Trusted by leaders from */}
      <footer className="bg-gradient-to-br from-[#0a1837] via-blue-900 to-[#1e2746] text-white py-14 px-4 border-t border-blue-900 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-1/3 top-0 w-40 h-40 bg-gradient-to-br from-blue-700 to-blue-400 opacity-20 rounded-full blur-3xl animate-spin-slow" />
          <div className="absolute right-0 bottom-0 w-56 h-56 bg-gradient-to-tr from-blue-400 to-blue-900 opacity-10 rounded-full blur-2xl animate-pulse" />
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-extrabold text-2xl tracking-tight mb-2">RoleRaise</span>
            <span className="text-blue-200 text-sm mb-3"> {new Date().getFullYear()} RoleRaise. All rights reserved.</span>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-blue-200 hover:text-white text-sm transition">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition">Terms</a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="font-semibold text-lg mb-1">Contact</span>
            <a href="mailto:support@roleraise.com" className="text-blue-100 hover:text-white text-sm transition">support@roleraise.com</a>
            <span className="text-blue-200 text-sm">123 Main Street, Bengaluru, India</span>
            <div className="flex gap-3 mt-2">
              <a href="#" className="hover:text-blue-400 transition"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.616 3.184A12 12 0 0 0 12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577 0-.286-.011-1.04-.017-2.042-3.338.726-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.304.762-1.604-2.665-.304-5.467-1.332-5.467-5.932 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.323 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.814 1.104.814 2.227 0 1.608-.015 2.905-.015 3.299 0 .319.216.694.825.576C20.565 21.796 24 17.302 24 12c0-6.628-5.372-12-12-12z"/></svg></a>
              <a href="#" className="hover:text-blue-400 transition"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 2c-2.733 0-4.946 2.21-4.946 4.945 0 .388.044.765.127 1.127C7.728 7.89 4.1 6.13 1.671 3.149c-.427.734-.666 1.584-.666 2.491 0 1.72.875 3.236 2.209 4.122A4.904 4.904 0 0 1 .964 8.1v.062c0 2.404 1.713 4.409 3.977 4.86-.418.113-.858.174-1.312.174-.321 0-.634-.03-.939-.086.635 1.978 2.476 3.417 4.656 3.457A9.867 9.867 0 0 1 0 21.543a13.905 13.905 0 0 0 7.548 2.212c9.057 0 14.009-7.512 14.009-14.009 0-.213-.005-.425-.015-.636A10.012 10.012 0 0 0 24 4.557z"/></svg></a>
              <a href="#" className="hover:text-blue-400 transition"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.77 24h20.459C23.208 24 24 23.229 24 22.271V1.723C24 .771 23.208 0 22.23 0zM7.08 20.452H3.545V9H7.08v11.452zM5.312 7.633a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM20.452 20.452h-3.533v-5.604c0-1.336-.025-3.058-1.865-3.058-1.867 0-2.153 1.457-2.153 2.963v5.699h-3.533V9h3.393v1.561h.048c.472-.893 1.623-1.834 3.342-1.834 3.574 0 4.233 2.352 4.233 5.411v6.314z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-200 text-xs z-10 relative">
          This site is not affiliated with Google, Meta, Amazon, or any other company mentioned. All trademarks are property of their respective owners.
        </div>
      </footer>
    </div>
  );
}
