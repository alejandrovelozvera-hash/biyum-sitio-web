import { getProjects, getHeroSlides } from "@/lib/wp-storage";
import { demoProjects, demoHeroSlides, demoVideos } from "@/lib/demo-data";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import BrandingProcess from "@/components/BrandingProcess";
import PortfolioGrid from "@/components/PortfolioGrid";
import VideoSection from "@/components/VideoSection";
import ServicesSection from "@/components/ServicesSection";
import InfoSection from "@/components/InfoSection";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import AmbientGlow from "@/components/AmbientGlow";
import BackToTop from "@/components/BackToTop";

async function getProjectsData() {
  const projects = await getProjects();
  return projects && projects.length > 0 ? projects : (demoProjects as any[]);
}

async function getHeroData() {
  const slides = await getHeroSlides();
  return slides && slides.length > 0 ? slides : demoHeroSlides;
}

function Divider({ alt = false }: { alt?: boolean }) {
  return (
    <div className={`flex justify-center py-6 md:py-8 ${alt ? "bg-section-alt" : "bg-background"}`}>
      <div className="w-0.5 h-12 md:h-16 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
    </div>
  );
}

export default async function HomePage() {
  const [projects, heroSlides] = await Promise.all([getProjectsData(), getHeroData()]);

  return (
    <main className="relative bg-background">
      <AmbientGlow />
      <div className="relative z-10">
        <Cursor />
        <Header />
        <HeroSlider slides={heroSlides} />
        <Divider />
        <BrandingProcess />
        <Divider />
        <PortfolioGrid projects={projects} />
        <Divider />
        <VideoSection videos={demoVideos} />
        <Divider alt />
        <ServicesSection />
        <Divider alt />
        <InfoSection />
        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}