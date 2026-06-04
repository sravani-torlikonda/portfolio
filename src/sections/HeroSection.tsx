import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Linkedin, Mail, Phone, ChevronDown } from 'lucide-react'
import { ParticleNetworkCanvas } from '@/components/ParticleNetworkCanvas'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      el.querySelector('.hero-photo'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        el.querySelector('.hero-name'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.4
      )
      .fromTo(
        el.querySelector('.hero-title'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.5
      )
      .fromTo(
        el.querySelector('.hero-desc'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        0.6
      )
      .fromTo(
        el.querySelector('.hero-buttons'),
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.7
      )
      .fromTo(
        el.querySelectorAll('.hero-social'),
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.1 },
        0.8
      )

    return () => {
      tl.kill()
    }
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <ParticleNetworkCanvas />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center max-w-[700px] px-6 py-20"
      >
        {/* Profile Photo */}
        <div className="hero-photo opacity-0">
          <div
            className="w-[138px] h-[138px] rounded-full overflow-hidden border-2 border-gold"
            style={{ boxShadow: '0 0 20px rgba(200, 164, 94, 0.2)' }}
          >
            <img
              src="/assets/sravani-photo.jpg"
              alt="Sravani Torlikonda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="hero-name opacity-0 font-display font-bold text-4xl md:text-[64px] text-text-primary mt-6 tracking-[0.02em] leading-tight">
          SRAVANI TORLIKONDA
        </h1>

        {/* Title */}
        <p className="hero-title opacity-0 font-sans text-sm text-text-muted uppercase tracking-[0.12em] mt-3">
          Electronics and Communication Engineering | IIITDM Kancheepuram
        </p>

        {/* Description */}
        <p className="hero-desc opacity-0 font-sans text-base text-text-secondary leading-[1.7] mt-5 max-w-[560px]">
          Building innovative embedded systems at the intersection of VLSI Design, IoT, and
          Semiconductor Technologies. Passionate about creating smart solutions that bridge hardware
          and software.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons opacity-0 flex items-center gap-4 mt-8">
          <button onClick={scrollToProjects} className="gold-glow-btn">
            View My Work
          </button>
          <button className="outline-btn">Download Resume</button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-7">
          <a
            href="https://linkedin.com/in/sravani-torlikonda"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social opacity-0 text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:sravani11t8@gmail.com"
            className="hero-social opacity-0 text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Mail size={22} />
          </a>
          <a
            href="tel:+917093637271"
            className="hero-social opacity-0 text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Phone size={22} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown
          size={24}
          className="text-text-muted/50 animate-bounce-scroll"
        />
      </div>
    </section>
  )
}
