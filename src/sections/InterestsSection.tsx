import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

interface Interest {
  title: string
  subtitle: string
  description: string
  badge: string
  badgeColor: string
  borderColor: string
}

const interests: Interest[] = [
  {
    title: 'Embedded Systems',
    subtitle: 'Hardware + Software Integration',
    description:
      'Exploring the design and development of embedded systems that bridge hardware and software. Focus on microcontroller programming, sensor integration, and real-time control systems.',
    badge: 'Active Interest',
    badgeColor: 'text-accent-cyan bg-[rgba(34,211,238,0.1)] border-[rgba(34,211,238,0.3)]',
    borderColor: '#22D3EE',
  },
  {
    title: 'VLSI Design',
    subtitle: 'Semiconductor & Chip Design',
    description:
      'Developing foundational knowledge in Very Large Scale Integration design, digital circuit design using Verilog, and semiconductor technologies for next-generation hardware.',
    badge: 'In Progress',
    badgeColor: 'text-gold bg-[rgba(200,164,94,0.1)] border-[rgba(200,164,94,0.3)]',
    borderColor: '#C8A45E',
  },
  {
    title: 'IoT (Internet of Things)',
    subtitle: 'Connected Smart Systems',
    description:
      'Building connected smart systems using IoT frameworks, wireless sensor networks, and cloud integration. Focus on Blynk, ESP platforms, and real-time monitoring applications.',
    badge: 'Exploration',
    badgeColor: 'text-success bg-[rgba(74,222,128,0.1)] border-[rgba(74,222,128,0.3)]',
    borderColor: '#4ADE80',
  },
]

export function InterestsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.interest-card'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.interests-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-navy-mid py-16 md:py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader subtitle="AREAS OF INTEREST" title="Core Interests" />

        <div className="interests-grid grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {interests.map((interest) => (
            <div
              key={interest.title}
              className="interest-card glass-card p-7"
              style={{ borderLeft: `4px solid ${interest.borderColor}` }}
            >
              <h3 className="font-sans font-semibold text-xl text-text-primary">
                {interest.title}
              </h3>
              <p
                className="font-mono text-xs mt-1"
                style={{ color: interest.borderColor }}
              >
                {interest.subtitle}
              </p>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mt-3">
                {interest.description}
              </p>
              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border ${interest.badgeColor}`}
              >
                {interest.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
