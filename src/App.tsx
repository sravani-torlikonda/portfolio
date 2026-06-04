import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { InterestsSection } from '@/sections/InterestsSection'
import { ContactSection } from '@/sections/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-navy-dark">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <InterestsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
