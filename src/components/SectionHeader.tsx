import { useTypewriter } from '@/hooks/useTypewriter'

interface SectionHeaderProps {
  subtitle: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ subtitle, title, description, align = 'left' }: SectionHeaderProps) {
  const subtitleRef = useTypewriter<HTMLSpanElement>(subtitle)

  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span
          ref={subtitleRef}
          className="section-subtitle opacity-0"
          style={{ opacity: 1 }}
        />
        <div className="flex items-center gap-2">
          <div className="w-10 h-px bg-[rgba(200,164,94,0.12)]" />
          <div className="w-1 h-1 rounded-full bg-gold" />
        </div>
      </div>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="text-text-secondary text-base mt-4 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
