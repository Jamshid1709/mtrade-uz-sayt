import HeroSection from "../sections/HeroSection";
import TickerTape from "../sections/TickerTape";
import WhyChooseSection from "../sections/WhyChooseSection";
import VideoSection from "../sections/VideoSection";
import CoursesSection from "../sections/CoursesSection";
import StatsSection from "../sections/StatsSection";
import MentorsSection from "../sections/MentorsSection";
import ResultsSection from "../sections/ResultsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import FAQSection from "../sections/FAQSection";
import CTASection from "../sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerTape />
      <WhyChooseSection />
      <VideoSection />
      <CoursesSection />
      <StatsSection />
      <MentorsSection />
      <ResultsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
