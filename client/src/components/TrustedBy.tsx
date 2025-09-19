import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const companies = [
  'Google', 'Amazon', 'Meta',
  'Microsoft', 'Netflix', 'Apple',
  'Stripe', 'Airbnb', 'LinkedIn'
];

export function TrustedBy() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      id="trusted-by" 
      ref={ref} 
      className={`py-20 bg-gray-50 section-fade ${isIntersecting ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">We Don't Believe in Failure…And We Can Prove It</h2>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8 items-center">
          {companies.map((company, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-medium text-gray-600">{company}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}