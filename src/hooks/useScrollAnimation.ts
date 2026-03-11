import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimationConfig {
  from: gsap.TweenVars
  to: gsap.TweenVars
  trigger?: ScrollTrigger.Vars
}

export function useScrollAnimation<T extends HTMLElement>(
  config: AnimationConfig
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(el, config.from, {
      ...config.to,
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none none',
        ...config.trigger,
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return ref
}
