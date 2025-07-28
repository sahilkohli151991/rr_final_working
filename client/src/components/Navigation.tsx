import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

import logo from '../assets/roleraise_final_logo.png';
import "./Navigation.css";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-500 ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className={`modern-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="flex items-center justify-between w-full px-8 py-3">
          <span
              className="flex items-center cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <span className="flex items-center" style={{ fontWeight: 800, fontSize: '2rem', color: '#fff', letterSpacing: '-0.5px', fontFamily: 'inherit', marginLeft: '-24px' }}>
  <img src={logo} alt="RoleRaise Logo" style={{ maxHeight: 36, width: 'auto', marginRight: 0, verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
  <span style={{ color: '#fff', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.5px', fontFamily: 'inherit', lineHeight: 1, marginLeft: '-26px', position: 'relative', top: '3px' }}>oleraise</span>
</span>
            </span>
          
          <div className="hidden md:flex items-center space-x-8" style={{ position: 'relative', top: '6px' }}>
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <Link href="/programs" className="nav-link">Programs</Link>
            <button onClick={() => scrollToSection('mentors')} className="nav-link">Mentors</button>
            <button onClick={() => scrollToSection('success')} className="nav-link">Success</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
            {/* TODO: Replace logo_role.png with a transparent PNG for better blending. Current logo has a white background. */}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-blue-300 focus:outline-none p-2 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4">
          <div className="mobile-nav">
            <div className="flex flex-col space-y-3 p-4">
              <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Home</button>
              <Link href="/programs"><button className="mobile-nav-link" onClick={() => setIsOpen(false)}>Programs</button></Link>
              <button onClick={() => scrollToSection('mentors')} className="mobile-nav-link">Mentors</button>
              <button onClick={() => scrollToSection('success')} className="mobile-nav-link">Success</button>
              <button onClick={() => scrollToSection('faq')} className="mobile-nav-link">FAQ</button>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}