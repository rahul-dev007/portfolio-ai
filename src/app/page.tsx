import Navbar from "@/components/navbar";
import HeroSlider from "@/components/hero-slider";
import SkillsGlobe from "@/components/SkillsGlobe";
import ChatPreview from "@/components/chat-preview";
import ProjectsPage from "./(public)/projects/page";
import Contact from "./(public)/contact/page";
import Footer from "@/components/footer";
import ResumePage from "./(public)/resume/page";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSlider />
        <SkillsGlobe />

        {/* 🔥 lightweight preview instead of full chat */}
        <ChatPreview />

        <ProjectsPage />
        <ResumePage />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
