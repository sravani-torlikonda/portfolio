import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTypewriter<T extends HTMLElement>(text: string, speed: number = 30) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.textContent = ''
    el.style.opacity = '1'

    const chars = text.split('')
    let currentIndex = 0

    const tween = gsap.to(
      {},
      {
        duration: chars.length * speed / 1000,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: function () {
          const progress = this.progress()
          const index = Math.floor(progress * chars.length)
          if (index > currentIndex && index <= chars.length) {
            el.textContent = chars.slice(0, index).join('')
            currentIndex = index
          }
        },
        onComplete: () => {
          el.textContent = text
        },
      }
    )

    return () => {
      tween.kill()
    }
  }, [text, speed])

  return ref
}
