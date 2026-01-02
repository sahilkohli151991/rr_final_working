import React, { useState } from "react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.append("name", form.name);
      params.append("email", form.email);
      params.append("message", form.message);
      const url = `https://script.google.com/macros/s/AKfycbzTLyFld-ZpDCaIc42VYUBwGNZ5_ggLD0yxqIKrX_HahQkz5JoHh3dLNm7BbujQJTa9yA/exec?${params.toString()}`;
      await fetch(url, { method: "GET", mode: "no-cors" });
      setShowSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-100 px-4 border-b border-gray-100 overflow-hidden">
  {/* Decorative blurred accent */}
  <div className="absolute -top-12 -left-12 w-48 h-48 bg-gradient-to-br from-blue-300 to-blue-100 opacity-30 rounded-full blur-2xl animate-spin-slow z-0" />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight drop-shadow-lg">
          Get in <span className="text-blue-600">Touch</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl mx-auto font-semibold">
          Have questions, want a free consult, or ready to accelerate your career? Fill out the form and our team will get back to you within 24 hours.
        </p>
        {showSuccess ? (
          <div className="bg-green-100 text-green-800 p-6 rounded-xl font-semibold">
            Thank you! Your message has been sent. We'll get back to you soon.
          </div>
        ) : (
          <form className="space-y-6 bg-white/80 rounded-2xl shadow-2xl border border-blue-100 p-8 backdrop-blur-md transition-shadow duration-300 focus-within:shadow-blue-200 hover:shadow-blue-200 animate-fade-in" onSubmit={handleSubmit}>
          <input
            type="text"
              name="name"
            placeholder="Your Name"
            className="w-full px-5 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
            required
              value={form.name}
              onChange={handleChange}
          />
          <input
            type="email"
              name="email"
            placeholder="Your Email"
            className="w-full px-5 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
            required
              value={form.email}
              onChange={handleChange}
          />
          <textarea
              name="message"
            placeholder="Your Message"
            className="w-full px-5 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
            rows={5}
            required
              value={form.message}
              onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-blue-400/60 focus:shadow-blue-400/80 transition-all duration-200 outline-none ring-0 focus:ring-2 focus:ring-blue-300"
              disabled={isSubmitting}
          >
              {isSubmitting ? "Sending..." : "Send Message"}
          </button>
            {error && <div className="text-red-600 font-medium mt-2">{error}</div>}
        </form>
        )}
      </div>
    </section>
  );
}
