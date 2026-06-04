import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.contact-info'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        section.querySelectorAll('.contact-link'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact-links'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        section.querySelector('.contact-form'),
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.contact-form'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section ref={sectionRef} id="contact" className="w-full py-20 md:py-[120px] px-4">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          subtitle="GET IN TOUCH"
          title="Let's build something extraordinary together."
        />

        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-16 mt-12">
          {/* Left - Contact Info */}
          <div className="contact-info">
            <p className="font-sans text-base text-text-secondary leading-relaxed max-w-[400px]">
              I'm always open to internship opportunities, research collaborations, and interesting
              engineering projects in embedded systems and VLSI.
            </p>

            <div className="contact-links flex flex-col gap-5 mt-8">
              <a
                href="mailto:sravani11t8@gmail.com"
                className="contact-link flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Mail size={20} className="text-text-muted" />
                <span className="font-medium text-sm">sravani11t8@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/sravani-torlikonda"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Linkedin size={20} className="text-text-muted" />
                <span className="font-medium text-sm">linkedin.com/in/sravani-torlikonda</span>
              </a>

              <a
                href="tel:+917093637271"
                className="contact-link flex items-center gap-3 text-text-primary hover:text-gold transition-colors duration-300"
              >
                <Phone size={20} className="text-text-muted" />
                <span className="font-medium text-sm">+91 70936 37271</span>
              </a>

              <div className="contact-link flex items-center gap-3 text-text-primary">
                <MapPin size={20} className="text-text-muted" />
                <span className="font-medium text-sm">Chennai, India</span>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form glass-card p-8">
            <div className="space-y-5">
              <div>
                <label className="block font-medium text-xs text-text-muted mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-navy-dark border border-[rgba(200,164,94,0.12)] rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-[0_0_8px_rgba(200,164,94,0.15)] transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-xs text-text-muted mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-navy-dark border border-[rgba(200,164,94,0.12)] rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-[0_0_8px_rgba(200,164,94,0.15)] transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-xs text-text-muted mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full bg-navy-dark border border-[rgba(200,164,94,0.12)] rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-[0_0_8px_rgba(200,164,94,0.15)] transition-all"
                />
              </div>

              <div>
                <label className="block font-medium text-xs text-text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={4}
                  className="w-full bg-navy-dark border border-[rgba(200,164,94,0.12)] rounded-lg px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:shadow-[0_0_8px_rgba(200,164,94,0.15)] transition-all resize-none"
                />
              </div>

              <button type="submit" className="gold-glow-btn w-full mt-2">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-card px-5 py-3 text-sm text-text-primary">
          Message feature coming soon!
        </div>
      )}
    </section>
  )
}
