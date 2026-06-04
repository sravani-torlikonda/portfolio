import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

interface TimelineItem {
  category: string
  date: string
  title: string
  description: string
  side: 'left' | 'right'
}

const timelineItems: TimelineItem[] = [
  {
    category: 'EDUCATION',
    date: '2024 – Present',
    title: 'B.Tech in Electronics & Communication Engineering',
    description:
      'Indian Institute of Information Technology Design & Manufacturing Kancheepuram. CGPA: 8.29/10. Focus on analog and digital electronics, VLSI design, embedded systems, and communication technologies.',
    side: 'left',
  },
  {
    category: 'LEADERSHIP',
    date: 'Aug 2025 – Present',
    title: 'Coordinator — System Coding Club',
    description:
      'Coordinated technical events and supported hands-on training sessions at IIITDM Kancheepuram. Developed leadership, teamwork, and problem-solving skills through collaborative club activities.',
    side: 'right',
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power3.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Timeline items
      section.querySelectorAll('.timeline-item').forEach((item, index) => {
        const isLeft = index % 2 === 0
        gsap.fromTo(
          item,
          { opacity: 0, x: isLeft ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: 0.2 + index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Gold dots
      section.querySelectorAll('.timeline-dot').forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            delay: 0.3 + index * 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="w-full bg-navy-mid py-20 md:py-[120px] px-4"
    >
      <div className="max-w-[900px] mx-auto">
        <SectionHeader subtitle="EXPERIENCE & EDUCATION" title="Experience & Education" />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[rgba(200,164,94,0.12)] md:-translate-x-px"
          />

          {/* Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start ${
                  item.side === 'left'
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div
                  className="timeline-dot absolute left-4 md:left-1/2 w-2 h-2 rounded-full bg-gold md:-translate-x-1/2 z-10 mt-6"
                />

                {/* Card */}
                <div
                  className={`timeline-item glass-card p-6 ml-10 md:ml-0 md:w-[380px] ${
                    item.side === 'left' ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-[0.1em] font-medium">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-lg text-text-primary mt-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
