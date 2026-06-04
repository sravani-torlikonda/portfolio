import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

interface SkillCategory {
  title: string
  symbol: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    symbol: '<>',
    skills: ['C-Language', 'Python', 'Verilog HDL'],
  },
  {
    title: 'Tools & Software',
    symbol: '◈',
    skills: ['AutoCAD', 'LabVIEW', 'Xilinx Vivado', 'MATLAB'],
  },
  {
    title: 'Core Domains',
    symbol: '◇',
    skills: ['Embedded Systems', 'VLSI Design', 'IoT Development', 'Digital Electronics'],
  },
  {
    title: 'Analog & Digital',
    symbol: '◎',
    skills: ['Analog Electronics', 'Digital Electronics', 'Semiconductor Fundamentals'],
  },
  {
    title: 'Communication',
    symbol: '▣',
    skills: ['English (Advanced)'],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.skill-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.skills-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="w-full py-20 md:py-[120px] px-4">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader subtitle="TECHNICAL SKILLS" title="Technical Skills" />

        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mt-12">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-card glass-card p-6">
              {/* Symbol */}
              <div className="text-gold text-[32px] leading-none font-mono">
                {category.symbol}
              </div>

              {/* Title */}
              <h3 className="font-sans font-semibold text-base text-text-primary mt-4">
                {category.title}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
