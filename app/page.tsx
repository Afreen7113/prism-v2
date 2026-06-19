import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import LegoSection from "@/components/sections/LegoSection";
import ProblemSection from "@/components/sections/ProblemSection";
import BentoGrid from "@/components/sections/BentoGrid";
import ThemeEngine from "@/components/sections/ThemeEngine";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import MetricsBand from "@/components/sections/MetricsBand";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        <Hero />
        <LogoMarquee />
        <LegoSection />
        <ProblemSection />
        <BentoGrid />
        <ThemeEngine />
        <DeveloperExperience />
        <MetricsBand />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
