import { useState } from 'react';
import { Zap, Briefcase, Award, Rocket } from 'lucide-react';
import { StripeCheckoutButton } from './ui/StripeCheckoutButton';

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
  const [currency] = useState<'USD' | 'INR'>('USD');

  const plans: Plan[] = [
    {
      id: 'pulse',
      name: 'RaisePulse',
      level: 'Beginner',
      price: { usd: 720, inr: 11500 },
      duration: '3 months',
      features: [
        { text: 'Resume & LinkedIn: 3 reviews', included: true },
        { text: 'Mock Interviews: 6', included: true },
        { text: 'Personalized Mentoring', included: false },
        { text: 'Job Apply Support', included: true },
        { text: 'Guaranteed Referrals: 2', included: true },
        { text: 'Resume Customization', included: false },
      ],
    },
    {
      id: 'power',
      name: 'RaisePower',
      level: 'Intermediate',
      price: { usd: 3600, inr: 55000 },
      duration: '6 months',
      popular: true,
      features: [
        { text: 'Resume & LinkedIn: 5 reviews', included: true },
        { text: 'Mock Interviews: 15', included: true },
        { text: 'Tech Mentoring: 3 sessions', included: true },
        { text: 'Behavioral Mentoring: 3 sessions', included: true },
        { text: 'Job Apply Support: 600+ jobs', included: true },
        { text: 'Guaranteed Referrals: 4', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
    {
      id: 'pinnacle',
      name: 'RaisePinnacle',
      level: 'Advanced',
      price: { usd: 5000, inr: 75000 },
      duration: '6 months',
      features: [
        { text: 'Resume & LinkedIn: 5 reviews', included: true },
        { text: 'Mock Interviews: 25', included: true },
        { text: 'Tech Mentoring: 8 sessions', included: true },
        { text: 'Behavioral Mentoring: 8 sessions', included: true },
        { text: 'Job Apply Support: 1000+ jobs', included: true },
        { text: 'Guaranteed Referrals: 8', included: true },
        { text: 'Resume Customization', included: true },
      ],
    },
    {
      id: 'path',
      name: 'RaisePath',
      level: 'Bootcamp',
      price: { usd: 6250, inr: 95000 },
      duration: '6 months',
      features: [
        { text: 'Resume building included', included: true },
        { text: 'Mock Interviews: 30', included: true },
        { text: 'Tech Mentoring: 10 sessions', included: true },
        { text: 'Behavioral Mentoring: 10 sessions', included: true },
        { text: 'Job Apply Support: 800+ jobs', included: true },
        { text: 'Guaranteed Referrals: 8', included: true },
        { text: 'Resume Customization', included: true },
        { text: '$200 consultation credit before joining', included: true },
      ],
    },
  ];

  const cardContentClass = "flex flex-col h-full";
  const buttonContainerClass = "mt-auto pt-6";

  const getIcon = (index: number) => {
    const icons = [
      <Zap key="zap" className="w-5 h-5" />, 
      <Briefcase key="briefcase" className="w-5 h-5" />, 
      <Award key="award" className="w-5 h-5" />, 
      <Rocket key="rocket" className="w-5 h-5" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Success</h2>
        <p className="text-xl text-gray-600">Invest in your future with our proven mentorship programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`rounded-2xl bg-white p-8 shadow-xl border-2 transition-all duration-200 ${
              plan.popular ? 'border-blue-500 scale-105' : 'border-gray-100'
            }`}
          >
            <div className={cardContentClass}>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      {getIcon(index)}
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
                <StripeCheckoutButton 
                  amount={currency === 'USD' ? plan.price.usd : plan.price.inr} 
                  name={plan.name}
                  description={`${plan.level} - ${plan.duration} program`}
                  className="w-full py-3 px-6 bg-[#635bff] hover:bg-[#3f2b96] text-white font-medium rounded-lg transition-colors duration-200 mt-4"
                />        
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
