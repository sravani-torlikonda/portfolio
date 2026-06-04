import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'IoT', 'Embedded', 'Healthcare']

interface Project {
  id: number
  title: string
  description: string
  category: string
  status: 'ongoing' | 'completed'
  image: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Smart Plant Care and Monitoring System',
    description:
      'Developing a smart plant monitoring system with automatic watering and live monitoring using the Blynk app.',
    category: 'IoT',
    status: 'ongoing',
    image: '/assets/project-plant-care.jpg',
    tags: ['IoT', 'Blynk', 'Embedded', 'Sensors'],
  },
  {
    id: 2,
    title: 'Marine Safety and Monitoring System',
    description:
      'Developing a marine safety system with iceberg detection and tracking the ship to improve navigation safety and prevent crossing restricted marine zones.',
    category: 'IoT',
    status: 'ongoing',
    image: '/assets/project-marine-safety.jpg',
    tags: ['IoT', 'GPS', 'Sensors', 'Embedded'],
  },
  {
    id: 3,
    title: 'Wearable Vehicle Horn Detection and Alert System',
    description:
      'Designing a wearable safety device that detects vehicle horn sounds and provides alert signals to assist hard-of-hearing pedestrians.',
    category: 'Healthcare',
    status: 'ongoing',
    image: '/assets/project-horn-detection.jpg',
    tags: ['Healthcare', 'Embedded', 'IoT', 'Sensors'],
  },
  {
    id: 4,
    title: 'Smart Mattress Warmer (Embedded Control System)',
    description:
      'Developed a safe smart mattress warmer for MRI and healthcare use with controlled heating and electrical protection.',
    category: 'Embedded',
    status: 'completed',
    image: '/assets/project-mattress-warmer.jpg',
    tags: ['Embedded Systems', 'Healthcare', 'Control Systems'],
  },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.filter-tab'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.filter-tabs'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power3.out',
      }
    )
  }, [activeFilter])

  const handleFilter = (cat: string) => {
    if (cat === activeFilter) return
    setActiveFilter(cat)
  }

  return (
    <section ref={sectionRef} id="projects" className="w-full py-20 md:py-[120px] px-4">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader subtitle="FEATURED PROJECTS" title="Featured Projects" />

        {/* Filter Tabs */}
        <div className="filter-tabs flex items-center justify-center gap-3 mt-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`filter-tab px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gold text-navy-dark font-semibold'
                  : 'bg-transparent border border-[rgba(200,164,94,0.12)] text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card overflow-hidden group">
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Status Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider ${
                    project.status === 'ongoing'
                      ? 'bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.3)] text-success'
                      : 'bg-[rgba(34,211,238,0.1)] border border-[rgba(34,211,238,0.3)] text-accent-cyan'
                  }`}
                >
                  {project.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-sans font-semibold text-lg text-text-primary">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                <button className="flex items-center gap-2 mt-4 text-accent-cyan text-[13px] font-medium hover:underline transition-all">
                  <Github size={14} />
                  View on GitHub &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
