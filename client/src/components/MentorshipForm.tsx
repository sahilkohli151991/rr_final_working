import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ExperienceLevel = {
  value: string;
  label: string;
};

const experienceLevels: ExperienceLevel[] = [
  { value: '0-2', label: '0–2 years (Entry Level)' },
  { value: '3-5', label: '3–5 years (Junior)' },
  { value: '6-10', label: '6–10 years (Mid-Level)' },
  { value: '11-15', label: '11–15 years (Senior)' },
  { value: '15+', label: '15+ years (Expert/Leadership)' },
];

interface MentorshipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MentorshipForm({ isOpen, onClose }: MentorshipFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentRole: '',
    experience: '',
    currentSalary: '',
    targetSalary: '',
  });
  
  // Default currency to USD
  const currencySymbol = '$';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("fullName", formData.fullName);
      params.append("email", formData.email);
      params.append("currentRole", formData.currentRole);
      params.append("experience", formData.experience);
      params.append("currentSalary", formData.currentSalary);
      params.append("targetSalary", formData.targetSalary);
      const url = `https://script.google.com/macros/s/AKfycbw-vcuihIy6B4T3D0Z6_ods3I7xaqfz9sv0voSnLacCNIzkdcAXTjyzbr6cS1OAxNBtxg/exec?${params.toString()}`;
      await fetch(url, { method: "GET", mode: "no-cors" });
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        currentRole: '',
        experience: '',
        currentSalary: '',
        targetSalary: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally show an error message to the user
    }
  };

  // Salary input with currency symbol
  const renderSalaryInput = (name: string, label: string, placeholder: string) => (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} ({currencySymbol})
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">
            {currencySymbol}
          </span>
        </div>
        <input
          type="number"
          name={name}
          id={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3 px-4 border"
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close form"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                Get Your Free $200K+ Tech Roadmap
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Thanks! Your roadmap is on the way.
                  </h3>
                  <p className="text-gray-600">Check your email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">
                        Current Role
                      </label>
                      <input
                        type="text"
                        id="currentRole"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Engineer, Student, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                        required
                      >
                        <option value="">Select your experience level</option>
                        {experienceLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Current Salary Input */}
                    {renderSalaryInput(
                      'currentSalary',
                      'Current Salary (Optional)',
                      'e.g., 80,000'
                    )}

                    {/* Target Salary Input */}
                    {renderSalaryInput(
                      'targetSalary',
                      'Target Salary (Optional)',
                      'e.g., 200,000'
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-4 px-6 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Get My Free Roadmap
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
