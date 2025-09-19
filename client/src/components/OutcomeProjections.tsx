import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const outcomeData = [
  {
    role: "Software Engineer",
    before: "$90K",
    after: "$180K",
    timeToOffer: "6 weeks"
  },
  {
    role: "Data Scientist",
    before: "$95K",
    after: "$185K",
    timeToOffer: "7 weeks"
  },
  {
    role: "Product Manager",
    before: "$100K",
    after: "$190K",
    timeToOffer: "8 weeks"
  },
  {
    role: "UX Designer",
    before: "$80K",
    after: "$160K",
    timeToOffer: "5 weeks"
  },
  {
    role: "Engineering Manager",
    before: "$110K",
    after: "$220K",
    timeToOffer: "6 weeks"
  },
  {
    role: "Growth & Marketing Lead",
    before: "$85K",
    after: "$170K",
    timeToOffer: "6 weeks"
  }
];

export function OutcomeProjections() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      id="outcomes" 
      ref={ref} 
      className={`py-20 bg-gray-50 section-fade ${isIntersecting ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Your Career Jump, Visualized</h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Before → After</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Time to Offer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {outcomeData.map((outcome, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{outcome.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="text-red-500">{outcome.before}</span>
                      <span className="mx-2">→</span>
                      <span className="text-green-500 font-medium">{outcome.after}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{outcome.timeToOffer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-xl text-gray-600 font-light italic">
            "Across functions, our members double their salaries—often in less than two months."
          </p>
        </div>
      </div>
    </section>
  );
}