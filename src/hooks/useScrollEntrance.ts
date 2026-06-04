import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollEntranceOptions {
  y?: number
  x?: number
  duration?: number
  stagger?: number
  delay?: number
  start?: string
  ease?: string
  scale?: number
}

export function useScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 30,
      x = 0,
      duration = 0.7,
      stagger = 0.1,
      delay = 0,
      start = 'top 80%',
      ease = 'power3.out',
      scale,
    } = options

    const children = el.children.length > 0 ? Array.from(el.children) : [el]

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y: y,
      x: x,
      ...(scale !== undefined ? { scale } : {}),
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      x: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    }

    gsap.fromTo(children, fromVars, toVars)

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [])

  return ref
}
