import React, { useState } from "react";
import "./SlotBookingPopupForm.css";

interface SlotBookingPopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect: () => void;
}

const initialForm = {
  fullName: "",
  email: "",
  currentRole: "",
  targetRole: "",
  experience: "",
  currentSalary: "",
  targetSalary: "",
};

const GOOGLE_FORM_URL =
  "https://script.google.com/macros/s/AKfycbw-vcuihIy6B4T3D0Z6_ods3I7xaqfz9sv0voSnLacCNIzkdcAXTjyzbr6cS1OAxNBtxg/exec";

export default function SlotBookingPopupForm({ isOpen, onClose, onSuccessRedirect }: SlotBookingPopupFormProps) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.append("fullName", form.fullName);
      params.append("email", form.email);
      params.append("currentRole", form.currentRole);
      params.append("targetRole", form.targetRole);
      params.append("experience", form.experience);
      params.append("currentSalary", form.currentSalary);
      params.append("targetSalary", form.targetSalary);
      params.append("formType", "slot_booking");
      const url = `${GOOGLE_FORM_URL}?${params.toString()}`;
      await fetch(url, { method: "GET", mode: "no-cors" });
      setShowSuccess(true);
      setForm(initialForm);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        onSuccessRedirect();
      }, 1200);
    } catch (error) {
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-lg md:max-w-xl p-2 sm:p-6 md:p-8 relative animate-fadeInUp max-h-[90vh] sm:max-h-screen overflow-y-auto mobile-modal-popup">
        {/* Responsive mobile modal styles: nearly full screen, less padding, large tap targets */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close"
        >
          ×
        </button>
        {showSuccess ? (
          <div className="py-12 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you! You'll be redirected shortly.
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Book Your Free Consultation Slot
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                Full Name *
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="fullName"
                id="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email *
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="email"
                id="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentRole">
                Current Role
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="currentRole"
                id="currentRole"
                type="text"
                value={form.currentRole}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="targetRole">
                Target Role
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="targetRole"
                id="targetRole"
                type="text"
                required
                value={form.targetRole}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="experience">
                Years of Experience
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="experience"
                id="experience"
                value={form.experience}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="2-3">2-3 years</option>
                <option value="4-6">4-6 years</option>
                <option value="7+">7+ years</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentSalary">
                Current Salary (optional)
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="currentSalary"
                id="currentSalary"
                value={form.currentSalary}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select range</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-150k">$100k - $150k</option>
                <option value="150k-200k">$150k - $200k</option>
                <option value="200k-250k">$200k - $250k</option>
                <option value="300k+">$300k+</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="targetSalary">
                Target Salary (optional)
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                name="targetSalary"
                id="targetSalary"
                value={form.targetSalary}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select range</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-100k">$50k - $100k</option>
                <option value="100k-150k">$100k - $150k</option>
                <option value="150k-200k">$150k - $200k</option>
                <option value="200k-250k">$200k - $250k</option>
                <option value="300k+">$300k+</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-blue-400/60 focus:shadow-blue-400/80 transition-all duration-200 outline-none ring-0 focus:ring-2 focus:ring-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Book Slot & Continue"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
