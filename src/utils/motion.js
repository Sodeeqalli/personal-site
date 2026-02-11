export const viewport = { once: true, amount: 0.2 }

export const sectionReveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const fadeItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const getReducedVariant = shouldReduceMotion => {
  if (!shouldReduceMotion) return sectionReveal
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  }
}

export const getReducedItem = shouldReduceMotion => {
  if (!shouldReduceMotion) return fadeItem
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  }
}
