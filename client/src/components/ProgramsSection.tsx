import { useState } from 'react';
import PricingSection from './PricingSection';
import SlotBookingPopupForm from './SlotBookingPopupForm';
import ConsultationModal from './ConsultationModal';

export function ProgramsSection() {
  const [isSlotFormOpen, setIsSlotFormOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleBookClick = () => setIsSlotFormOpen(true);
  const handleSlotFormClose = () => setIsSlotFormOpen(false);
  const handleCalendlyClose = () => setIsCalendlyOpen(false);
  const handleSlotFormSuccess = () => setIsCalendlyOpen(true);

  return (
    <section id="programs" className="bg-white">
      <PricingSection />
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Not sure which program is right for you?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our career advisors are here to help you choose the best program based on your goals and experience level.
              Schedule a free consultation call to discuss your options.
            </p>
            <button
              onClick={handleBookClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>
      <SlotBookingPopupForm
        isOpen={isSlotFormOpen}
        onClose={handleSlotFormClose}
        onSuccessRedirect={handleSlotFormSuccess}
      />
      <ConsultationModal
        isOpen={isCalendlyOpen}
        onClose={handleCalendlyClose}
      />
    </section>
  );
}
