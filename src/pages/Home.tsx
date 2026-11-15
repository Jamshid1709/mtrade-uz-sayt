import { lazy, Suspense } from "react";
import HeroSection from "../sections/HeroSection";
import TickerTape from "../sections/TickerTape";

// Below-the-fold sections — lazy (katta JS kichik chunk'larga bo'linadi)
const WhyChooseSection = lazy(() => import("../sections/WhyChooseSection"));
const VideoSection = lazy(() => import("../sections/VideoSection"));
const CoursesSection = lazy(() => import("../sections/CoursesSection"));
const StatsSection = lazy(() => import("../sections/StatsSection"));
const MentorsSection = lazy(() => import("../sections/MentorsSection"));
const ResultsSection = lazy(() => import("../sections/ResultsSection"));
const TestimonialsSection = lazy(() => import("../sections/TestimonialsSection"));
const FAQSection = lazy(() => import("../sections/FAQSection"));
const CTASection = lazy(() => import("../sections/CTASection"));

const SectionFallback = () => (
  <div
    className="min-h-[20vh] animate-pulse bg-ink-900/40"
    aria-hidden="true"
  />
);

export default function Home() {
  return (
    <>
      {/* Above-the-fold: eager */}
      <HeroSection />
      <TickerTape />
      {/* Below-the-fold: lazy + suspense */}
      <Suspense fallback={<SectionFallback />}>
        <WhyChooseSection />
        <VideoSection />
        <CoursesSection />
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MentorsSection />
        <ResultsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Suspense>
    </>
  );
}
