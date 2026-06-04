import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:flex items-center gap-1 px-7 py-3 rounded-full border ${
          scrolled
            ? 'bg-[rgba(8,11,20,0.95)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-[rgba(8,11,20,0.85)] backdrop-blur-2xl'
        } border-[rgba(200,164,94,0.1)]`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-text-primary font-semibold text-sm mr-4 tracking-wide"
        >
          Sravani T.
        </a>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
              activeSection === link.href
                ? 'text-gold'
                : 'text-text-secondary hover:text-gold'
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 md:hidden flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(8,11,20,0.95)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]'
            : 'bg-[rgba(8,11,20,0.85)] backdrop-blur-2xl'
        } border-[rgba(200,164,94,0.1)]`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-text-primary font-semibold text-sm tracking-wide"
        >
          Sravani T.
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-secondary hover:text-gold transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-navy-dark/95 backdrop-blur-xl pt-20 px-6">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-3 text-lg font-medium transition-colors duration-200 rounded-lg ${
                  activeSection === link.href
                    ? 'text-gold bg-gold/5'
                    : 'text-text-secondary hover:text-gold hover:bg-gold/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
