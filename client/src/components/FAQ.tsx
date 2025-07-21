import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const faqs = [
  {
    question: "What if I don't have FAANG experience?",
    answer: "Our clients span 2–15+ years' experience—and we place juniors through directors."
  },
  {
    question: "How soon will I see interviews?",
    answer: "You'll land at least 3 top-tier interviews in 90 days—or we'll refund you."
  },
  {
    question: "Do you work globally?",
    answer: "Yes—US, Canada, UK, Australia, Germany, Brazil & beyond."
  },
  {
    question: "Can't I learn this on YouTube?",
    answer: "Free videos lack our referral network, mock interviews & negotiation support."
  }
];

export function FAQ() {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section 
      id="faq" 
      ref={ref} 
      className={`py-20 bg-white section-fade ${isIntersecting ? 'visible' : ''}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Got Questions? We've Got Answers.</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-xl responsive-card">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="text-2xl text-gray-500">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 font-light">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}