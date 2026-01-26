import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CTABoxes from "@/components/CTABoxes";
import NewsSlider from "@/components/NewsSlider";
import ProgramsSection from "@/components/ProgramsSection";
import StatsSection from "@/components/StatsSection";
import ThankYouSection from "@/components/ThankYouSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ChildrenGrid from "@/components/ChildrenGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CTABoxes />
        <ProgramsSection />
        <NewsSlider />
        <ChildrenGrid />
        <StatsSection />
        <TestimonialsSection />
        <ThankYouSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;