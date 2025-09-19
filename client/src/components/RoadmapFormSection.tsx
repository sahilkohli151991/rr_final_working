import React, { useRef, useState, useEffect } from "react";
import "./RoadmapFormSection.css";

// Utility: Intersection Observer hook (plays once)
function useOnceInView(ref: React.RefObject<HTMLElement>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.35 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

export function RoadmapFormSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useOnceInView(sectionRef);
  const [assembled, setAssembled] = useState(false);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    currentRole: "",
    experience: "",
    currentSalary: "",
    targetSalary: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Animate pieces in sequence
  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setAssembled(true), 1700);
      return () => clearTimeout(timeout);
    }
  }, [inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.append("fullName", form.fullName);
      params.append("email", form.email);
      params.append("currentRole", form.currentRole);
      params.append("experience", form.experience);
      params.append("currentSalary", form.currentSalary);
      params.append("targetSalary", form.targetSalary);
      const url = `https://script.google.com/macros/s/AKfycbw-vcuihIy6B4T3D0Z6_ods3I7xaqfz9sv0voSnLacCNIzkdcAXTjyzbr6cS1OAxNBtxg/exec?${params.toString()}`;
      await fetch(url, { method: "GET", mode: "no-cors" });
      setShowSuccess(true);
      setForm({
        fullName: "",
        email: "",
        currentRole: "",
        experience: "",
        currentSalary: "",
        targetSalary: "",
      });
    } catch (err) {
      setError("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="roadmap-section" ref={sectionRef}>
      <div className="roadmap-anim-container">
        {/* Torn paper fragments */}
        <div className={`paper-piece piece-top${inView ? " animate" : ""}${assembled ? " done" : ""}`}></div>
        <div className={`paper-piece piece-bottom${inView ? " animate" : ""}${assembled ? " done" : ""}`}></div>
        <div className={`paper-piece piece-left${inView ? " animate" : ""}${assembled ? " done" : ""}`}></div>
        <div className={`paper-piece piece-right${inView ? " animate" : ""}${assembled ? " done" : ""}`}></div>
        {/* Center form reveal */}
        <div className={`roadmap-form-shell${assembled ? " reveal" : ""}`}>
          <h2 className="roadmap-form-title">Get Your Free $200K+ Tech Roadmap</h2>
          {showSuccess ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-xl font-semibold text-center">
              Thank you! Your roadmap request has been received. We'll be in touch soon.
            </div>
          ) : (
            <form className="roadmap-form-fields" onSubmit={handleSubmit}>
            <label className="roadmap-label">
              Full Name *
                <input
                  className="roadmap-input"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                />
            </label>
            <label className="roadmap-label">
              Email Address *
                <input
                  className="roadmap-input"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
            </label>
            <label className="roadmap-label">
              Current Role *
                <input
                  className="roadmap-input"
                  type="text"
                  name="currentRole"
                  placeholder="e.g., Software Engineer, Student, etc."
                  required
                  value={form.currentRole}
                  onChange={handleChange}
                />
            </label>
            <label className="roadmap-label">
              Years of Experience *
                <select
                  className="roadmap-input"
                  name="experience"
                  required
                  value={form.experience}
                  onChange={handleChange}
                >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4-6">4-6 years</option>
                <option value="7-10">7-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </label>
            <label className="roadmap-label">
              Current Salary (Optional)
                <input
                  className="roadmap-input"
                  type="text"
                  name="currentSalary"
                  placeholder="e.g., $80,000"
                  value={form.currentSalary}
                  onChange={handleChange}
                />
            </label>
            <label className="roadmap-label">
              Target Salary (Optional)
                <input
                  className="roadmap-input"
                  type="text"
                  name="targetSalary"
                  placeholder="e.g., $200,000"
                  value={form.targetSalary}
                  onChange={handleChange}
                />
            </label>
              <button className="roadmap-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Get My Free Roadmap"}
              </button>
              {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
