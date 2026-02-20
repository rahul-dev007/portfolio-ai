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

      <main className="scroll-smooth snap-y snap-mandatory">

        <section id="hero" className="snap-start min-h-screen">
          <HeroSlider />
        </section>

        <section id="skills" className="snap-start min-h-screen">
          <SkillsGlobe />
        </section>

        <section id="chat" className="snap-start ">
          <ChatPreview />
        </section>

        <section id="projects" className="snap-start min-h-screen">
          <ProjectsPage />
        </section>

        <section id="resume" className="snap-start min-h-screen">
          <ResumePage />
        </section>

        <section id="contact" className="snap-start">
          <Contact />
        </section>

        <Footer />

      </main>
    </>
  );
}
