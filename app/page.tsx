// app/page.tsx
import About from '@/components/About/about';
import Contact from '@/components/Contact/Contact';
import Experience from '@/components/Experience/Experience';
import Home from '@/components/Home/Home';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skill/skill';

export default function HomePage() {
  return (
    <div className="container-custom section-padding">
      <Home />
      <Skills/>
      <Experience/>
      <Projects />
      <About/>
      <Contact/>
    
    </div>
  );
}