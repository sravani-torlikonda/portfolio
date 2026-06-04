import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Bio paragraphs
      gsap.fromTo(
        section.querySelectorAll('.bio-paragraph'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Stats
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Code card
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full py-20 md:py-[120px] px-4"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader subtitle="ABOUT ME" title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 mt-12">
          {/* Left - Bio */}
          <div>
            <p className="bio-paragraph font-sans text-base text-text-secondary leading-[1.7]">
              I am a 2nd-year B.Tech Electronics and Communication Engineering student at{' '}
              <span className="text-accent-cyan font-medium">IIITDM Kancheepuram</span>, exploring
              the convergence of <span className="text-accent-cyan font-medium">Embedded Systems</span>,{' '}
              <span className="text-accent-cyan font-medium">VLSI Design</span>, and{' '}
              <span className="text-accent-cyan font-medium">IoT</span> technologies.
            </p>

            <p className="bio-paragraph font-sans text-base text-text-secondary leading-[1.7] mt-5">
              With foundational knowledge in analog and digital electronics, my academic journey
              bridges hardware design with intelligent systems. I am eager to gain practical
              experience through projects and internships in core electronics and semiconductor
              technologies.
            </p>

            <p className="bio-paragraph font-sans text-base text-text-secondary leading-[1.7] mt-5">
              My work spans smart plant monitoring systems, marine safety devices, wearable alert
              systems for the hearing impaired, and embedded healthcare solutions. I am passionate
              about building innovative systems that solve real-world engineering problems.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-12 mt-12">
              <div>
                <span className="font-display font-bold text-[32px] text-gold">8.29</span>
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-1">
                  CGPA
                </p>
              </div>
              <div>
                <span className="font-display font-bold text-[32px] text-gold">4+</span>
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-1">
                  Projects
                </p>
              </div>
              <div>
                <span className="font-display font-bold text-[32px] text-gold">3</span>
                <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider mt-1">
                  Core Interests
                </p>
              </div>
            </div>
          </div>

          {/* Right - Code Profile Card */}
          <div ref={cardRef} className="glass-card p-6 font-mono text-[13px] leading-relaxed">
            {/* Title bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-text-muted text-xs ml-2">skills.json</span>
            </div>

            <div className="text-text-secondary">
              <span className="text-gold">&gt;</span>{' '}
              <span className="text-accent-cyan">skills.profile</span>
            </div>
            <div className="text-text-secondary">{'{'}</div>
            <div className="pl-4">
              <span className="text-text-secondary">domain: </span>
              <span className="text-accent-cyan">[&quot;Embedded&quot;, &quot;VLSI&quot;, &quot;IoT&quot;]</span>
              <span className="text-text-secondary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-text-secondary">focus: </span>
              <span className="text-accent-cyan">&quot;Hardware + Intelligence&quot;</span>
              <span className="text-text-secondary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-text-secondary">tools: </span>
              <span className="text-accent-cyan">[&quot;C&quot;, &quot;Python&quot;, &quot;Verilog&quot;]</span>
              <span className="text-text-secondary">,</span>
            </div>
            <div className="pl-4">
              <span className="text-text-secondary">current: </span>
              <span className="text-accent-cyan">&quot;Student @ IIITDM Kancheepuram&quot;</span>
            </div>
            <div className="text-text-secondary">{'}'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
