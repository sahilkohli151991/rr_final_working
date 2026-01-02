import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { MentorSection } from "@/components/MentorSection";
import { SuccessSection } from "@/components/SuccessSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <ProgramsSection />
      <MentorSection />
      <SuccessSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}