import { Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-navy-mid border-t border-[rgba(200,164,94,0.12)] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-display font-bold text-xl text-text-primary tracking-wide">
          SRAVANI TORLIKONDA
        </h3>
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[0.12em] mt-3">
          ELECTRONICS &middot; VLSI &middot; EMBEDDED SYSTEMS &middot; IOT
        </p>
        <p className="font-display italic text-sm text-text-secondary mt-3">
          &ldquo;Engineering the Future with Innovation and Precision&rdquo;
        </p>

        <div className="flex items-center justify-center gap-5 mt-6">
          <a
            href="https://linkedin.com/in/sravani-torlikonda"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:sravani11t8@gmail.com"
            className="text-text-muted hover:text-gold transition-colors duration-300"
          >
            <Mail size={20} />
          </a>
        </div>

        <p className="text-text-muted text-xs mt-8">
          &copy; 2025 Sravani Torlikonda. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
