import { OrganicLines } from "@/components/shared/organic-lines";
import { Navbar } from "@/components/nav/navbar";
import { HeroSection } from "@/components/hero/hero-section";

export default function Home() {
  return (
    <main className="relative bg-cream">
      <OrganicLines />
      <Navbar />
      <HeroSection />
      {/* Spacer for scroll testing */}
      <div className="h-screen" />
    </main>
  );
}
