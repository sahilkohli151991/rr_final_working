import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import payalImage from "@assets/payal_1752659516427.jpeg";
import nimishaImage from "@assets/Nimisha Sainaini_1752659516427.jpeg";
import rajatImage from "@assets/Rajat_1752659516427.jpeg";
import akhilImage from "@assets/akhil_1752659516424.jpeg";
import sahilChaudhryImage from "@assets/sahilc_1752659516428.jpeg";
import nickImage from "@assets/Nick Parker_1752659516426.jpeg";
import rajImage from "@assets/Raj_1752659516427.jpeg";
import shubhiImage from "@assets/Shubhi_1752659516428.jpeg";
import alokImage from "@assets/Alok_1752659516425.jpeg";
import sahilKohliImage from "@assets/sahil kohli_1752659516428.jpeg";
import nitilImage from "@assets/Nitil_1752659516427.jpeg";
import kpmgLogo from "@assets/logo1_1752659516425.png";
import googleLogo from "@assets/logo2_1752659516425.png";
import beOneLogo from "@assets/logo3_1752659516426.png";
import amazonLogo from "@assets/logo4_1752659516426.png";
import metaLogo from "@assets/logo5_1752659516426.png";
import stripeLogo from "@assets/logo8_1752659516426.png";

const mentors = [
  {
    name: "Nimisha Sainani",
    role: "Founder @ The Quiet Reset",
    company: "13+ years scaling startups across India and the U.S.",
    image: "/attached_assets/Nimisha Sainaini_1752659516427.jpeg"
  },
  {
    name: "Sahil Kohli",
    role: "Director at Tiger Analytics",
    company: "Ex: Deloitte",
    image: "/attached_assets/sahil kohli_1752659516428.jpeg"
  },
  {
    name: "Nitil D",
    role: "Generative AI & BI Architect at Tiger Analytics",
    company: "Ex: Pepsico",
    image: "/attached_assets/Nitil_1752659516427.jpeg"
  },
  {
    name: "Rajat Kohli",
    role: "Sales Leader at Google",
    company: "Ex: Adobe",
    image: "/attached_assets/Rajat_1752659516427.jpeg"
  },
  {
    name: "Akhil K",
    role: "Senior Program Manager at Nielsen",
    company: "Ex: Microsoft, Walmart",
    image: "/attached_assets/akhil_1752659516424.jpeg"
  },
  {
    name: "Sahil Chaudhry",
    role: "Senior Manager Cloud and DevOps at KPMG Global",
    company: "Ex: Deloitte",
    image: "/attached_assets/sahilc_1752659516428.jpeg"
  },
  {
    name: "Nick Parker",
    role: "Sr. Director Engineering at Fannie Mae",
    company: "Ex: Prudential Financial",
    image: "/attached_assets/Nick Parker_1752659516426.jpeg"
  },
  {
    name: "Raj Kumar",
    role: "Director at Capgemini",
    company: "Ex: Accenture",
    image: "/attached_assets/Raj_1752659516427.jpeg"
  },
  {
    name: "Shubhi Duggal",
    role: "Chartered Accountant | CFA at AIG",
    company: "Ex: Accenture",
    image: "/attached_assets/Shubhi_1752659516428.jpeg"
  },
  {
    name: "Alok Agarwal",
    role: "Data Scientist at Airbnb",
    company: "Ex: Meta, Twitter",
    image: "/attached_assets/Alok_1752659516425.jpeg"
  },
  // New mentors
  {
    name: "Daniel Kravtsov",
    role: "CEO of Improvado - AI Revenue Ecosystem",
    image: "/attached_assets/Daniel Kravtsov.jpeg"
  },
  {
    name: "Ivan Tsybaev",
    role: "Founder & Serial Entrepreneur",
    company: "Y Combinator alum",
    image: "/attached_assets/IvanTsybaev.jpeg"
  }
];

export function MentorSection() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section 
      id="mentors" 
      ref={ref} 
      className={`py-20 bg-gray-50 section-fade ${isIntersecting ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Learn from, engage and network with tech executives</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interact with top innovators from Google, Uber, Facebook, Amazon, Fiverr, Microsoft & more
          </p>
        </div>
        
        {/* Mentor Grid with fixed heights and proper alignment */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mentors.map((mentor, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-2xl shadow p-6 border border-gray-100"
              >
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 mb-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <h3 className="text-lg font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <div className="text-blue-700 text-sm font-semibold mb-1">{mentor.role}</div>
                <div className="text-xs text-gray-500 text-center">{mentor.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
