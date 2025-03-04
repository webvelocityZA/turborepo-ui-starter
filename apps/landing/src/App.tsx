import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { MotivationSection } from "./components/MotivationSection";

export const App: React.FC = () => {
  return (
    <>
      <HeroSection />
      <MotivationSection />
      <TimelineSection />
    </>
  );
};
