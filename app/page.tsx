import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SoftwareStack from "@/components/sections/SoftwareStack";
import Showreel from "@/components/sections/Showreel";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-black">
      <Hero />
      <About />
      <SoftwareStack />
      <Showreel />
      <Experience />
      <Skills />
      <Services />
      <Contact />
    </main>
  );
}
