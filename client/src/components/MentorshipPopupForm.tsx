import React, { useState } from "react";

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz7WCUJqtSoAxLRQGn9ZTVyShW5TccckD840YFEwzPKc1qN-PAlFEVR9Y5C9HZTEdTW/exec";

const initialForm = {
  fullName: "",
  email: "",
  currentRole: "",
  experience: "",
  currentSalary: "",
  targetSalary: "",
};

export default function MentorshipPopupForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Starting form submission...");
    
    try {
      // Create URL with query parameters
      const params = new URLSearchParams();
      params.append('fullName', form.fullName);
      params.append('email', form.email);
      params.append('currentRole', form.currentRole);
      params.append('experience', form.experience);
      params.append('currentSalary', form.currentSalary);
      params.append('targetSalary', form.targetSalary);
      
      const url = `https://script.google.com/macros/s/AKfycbz7WCUJqtSoAxLRQGn9ZTVyShW5TccckD840YFEwzPKc1qN-PAlFEVR9Y5C9HZTEdTW/exec?${params.toString()}`;
      
      console.log("Sending data to:", url);
      
      // Use a simple fetch with GET to avoid CORS issues
      await fetch(url, {
        method: "GET",
        redirect: 'follow',
        mode: 'no-cors'
      });
      
      console.log("Form submitted via GET");
      setShowSuccess(true);
      setForm(initialForm);
      
    } catch (error) {
      console.error("Error details:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <form
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 font-sans"
        style={{
          fontFamily: "'Sora', 'Outfit', 'Inter', sans-serif",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Get Your Personalized Roadmap</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            name="fullName"
            id="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            name="email"
            id="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
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
            required
            value={form.currentRole}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="experience">
            Years of Experience
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            name="experience"
            id="experience"
            type="number"
            min="0"
            required
            value={form.experience}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="currentSalary">
            Current Salary (optional)
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            name="currentSalary"
            id="currentSalary"
            type="number"
            min="0"
            value={form.currentSalary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="targetSalary">
            Target Salary (optional)
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            name="targetSalary"
            id="targetSalary"
            type="number"
            min="0"
            value={form.targetSalary}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md transition transform hover:bg-blue-900 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {isSubmitting ? "Submitting..." : "Get My Roadmap"}
        </button>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-lg font-bold mb-2 text-blue-900">Thanks for your interest!</h3>
              <p className="text-gray-700 mb-4">We'll be in touch soon with your personalized roadmap.</p>
              <button
                className="mt-2 px-6 py-2 bg-blue-700 text-white rounded-md font-semibold hover:bg-blue-900 transition"
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}