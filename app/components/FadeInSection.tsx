'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeInSection({ children, delay = 0, direction = 'up' }: FadeInSectionProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const { x, y } = directionMap[direction]

  const variants = {
    hidden: { opacity: 0, y, x },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  )
}
