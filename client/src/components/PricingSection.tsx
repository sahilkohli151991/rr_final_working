import { Zap, Briefcase, Award, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  level: string;
  price: {
    usd: number;
    inr: number;
  };
  duration: string;
  features: Feature[];
  popular?: boolean;
}

const PricingSection = () => {
  const { currency, isIndia } = useCurrency();

  const consultationCredit = isIndia ? '₹5000' : '$200';

  const plans: Plan[] = [
    {
      id: 'flow',
      name: 'RaiseFlow',
      level: 'Starter',
      price: { usd: 199, inr: 8999 },
      duration: 'Monthly',
      popular: true,
      features: [
        { text: 'Resume & LinkedIn: 1 review', included: true },
        { text: 'Resume Customization', included: true },
        { text: 'Mock Interviews: 3', included: true },
        { text: 'Automated job applications to 120+ roles on your behalf.', included: true },
        { text: 'Guaranteed Referrals: 1', included: true },
      ],
    },
    {
      id: 'pulse',
      name: 'RaisePulse',
      level: 'Beginner',
      price: { usd: 720, inr: 18999 },
      duration: '3 months',
      features: [
        { text: 'Resume & LinkedIn: 3 reviews', included: true },
        { text: 'Mock Interviews: 6', included: true },
        { text: 'Personalized Mentoring', included: true },
        { text: 'Automated job applications to 200+ roles on your behalf.', included: true },
        { text: 'Guaranteed Referrals: 2', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
    {
      id: 'power',
      name: 'RaisePower',
      level: 'Intermediate',
      price: { usd: 3600, inr: 49999 },
      duration: '6 months',
      popular: true,
      features: [
        { text: 'Resume & LinkedIn: 5 reviews', included: true },
        { text: 'Mock Interviews: 15', included: true },
        { text: 'Tech Mentoring: 3 sessions', included: true },
        { text: 'Behavioral Mentoring: 3 sessions', included: true },
        { text: 'Automated job applications to 600+ roles on your behalf.', included: true },
        { text: 'Guaranteed Referrals: 4', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
    {
      id: 'pinnacle',
      name: 'RaisePinnacle',
      level: 'Advanced',
      price: { usd: 5000, inr: 79999 },
      duration: '6 months',
      features: [
        { text: 'Resume & LinkedIn: 5 reviews', included: true },
        { text: 'Mock Interviews: 25', included: true },
        { text: 'Tech Mentoring: 8 sessions', included: true },
        { text: 'Behavioral Mentoring: 8 sessions', included: true },
        { text: 'Automated job applications to 600+ roles on your behalf.', included: true },
        { text: 'Guaranteed Referrals: 4', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
    {
      id: 'path',
      name: 'RaisePath',
      level: 'Bootcamp (Break into tech)',
      price: { usd: 6250, inr: 89999 },
      duration: '6 months',
      features: [
        { text: 'Resume building included', included: true },
        { text: 'Mock Interviews: 30', included: true },
        { text: 'Tech Mentoring: 10 sessions', included: true },
        { text: 'Behavioral Mentoring: 10 sessions', included: true },
        { text: 'Automated job applications to 600+ roles on your behalf.', included: true },
        { text: 'Guaranteed Referrals: 6', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
  ];

  const cardContentClass = "flex flex-col h-full";
  const buttonContainerClass = "mt-auto pt-6";

  const getIcon = (planId: string, index: number) => {
    // Custom icons for specific plans
    if (planId === 'flow') {
      return <Rocket key="rocket" className="w-5 h-5" />;
    }
    if (planId === 'path') {
      return <Zap key="zap" className="w-5 h-5" />;
    }
    
    // Default icons for other plans
    const icons = [
      <Zap key="zap" className="w-5 h-5" />, 
      <Briefcase key="briefcase" className="w-5 h-5" />, 
      <Award key="award" className="w-5 h-5" />, 
      <Rocket key="rocket" className="w-5 h-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div id="pricing" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Success</h2>
        <p className="text-xl text-gray-600">Invest in your future with our proven mentorship programs</p>
      </div>

      <div className="space-y-8">
        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.slice(0, 3).map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`rounded-2xl bg-white p-8 shadow-xl border-2 transition-all duration-200 ${
              plan.popular ? 'border-blue-500 scale-105' : 'border-gray-100'
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,91,255,0.12)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={cardContentClass}>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {getIcon(plan.id, index)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  </div>
                  {plan.popular && (
                    <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.level}</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  {currency === 'USD' ? '$' : '₹'}
                  {currency === 'USD' ? plan.price.usd.toLocaleString() : plan.price.inr.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">{plan.duration}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`mt-1 ${feature.included ? 'text-blue-600' : 'text-gray-400'}`}>
                        {feature.included ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={buttonContainerClass}>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-all duration-200 disabled:opacity-50"
                  onClick={async () => {
                    const btn = document.activeElement;
                    if (btn) btn.setAttribute('disabled', 'true');
                    try {
                      const res = await fetch('/api/create-checkout-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          planName: plan.name,
                          amount: currency === 'USD' ? plan.price.usd : plan.price.inr,
                          currency: currency.toLowerCase(),
                        })
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.open(data.url, '_blank', 'noopener,noreferrer');
                      } else {
                        alert('Error creating Stripe Checkout session: ' + (data.error || 'Unknown error'));
                      }
                    } catch (e) {
                      alert('Network error: ' + e);
                    } finally {
                      if (btn) btn.removeAttribute('disabled');
                    }
                  }}
                >
                  Pay with Stripe
                </button>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
        
        {/* Second row - 2 cards centered */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-center gap-8">
              {plans.slice(3).map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`rounded-2xl bg-white p-8 shadow-xl border-2 transition-all duration-200 ${
              plan.popular ? 'border-blue-500 scale-105' : 'border-gray-100'
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 3) * 0.15, duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(99,91,255,0.12)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={cardContentClass}>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {getIcon(plan.id, index + 3)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  </div>
                  {plan.popular && (
                    <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.level}</p>
                <p className="mt-4 text-4xl font-bold text-gray-900">
                  {currency === 'USD' ? '$' : '₹'}
                  {currency === 'USD' ? plan.price.usd.toLocaleString() : plan.price.inr.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">{plan.duration}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`mt-1 ${feature.included ? 'text-blue-600' : 'text-gray-400'}`}>
                        {feature.included ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={buttonContainerClass}>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-all duration-200 disabled:opacity-50"
                  onClick={async () => {
                    const btn = document.activeElement;
                    // @ts-ignore
                    if (btn) btn.blur();
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
