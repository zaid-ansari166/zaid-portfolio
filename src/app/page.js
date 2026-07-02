import { About, Contact, Hero, Navbar, Tech, Experience, Education, Works } from "@/components";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <About />
      <Tech />
      <Experience />
      <Education />
      <Works />
      <Contact />
    </main>
  );
}
