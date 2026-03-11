export const fadeUp = {
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
}

export const slideInLeft = {
  from: { opacity: 0, x: -50 },
  to: { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
}

export const slideInRight = {
  from: { opacity: 0, x: 50 },
  to: { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
}

export const scrollTriggerDefaults = {
  start: 'top 82%',
  toggleActions: 'play none none none' as const,
  fastScrollEnd: true,
  invalidateOnRefresh: true,
}

export const stagger = {
  cards: 0.05,
  pills: 0.03,
  timeline: 0.08,
}

export const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}
