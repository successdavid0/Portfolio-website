import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export const Card3D = ({ children, className, intensity = 12 }) => {
  const ref = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springX = useSpring(mouseX, { stiffness: 180, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 180, damping: 22 })

  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity])
  const glowX = useTransform(springX, [0, 1], [0, 100])
  const glowY = useTransform(springY, [0, 1], [0, 100])

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className || ''}`}
    >
      {/* Dynamic radial glow that tracks the mouse */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 1,
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(220,38,38,0.18) 0%, transparent 65%)`
          ),
        }}
      />
      {children}
    </motion.div>
  )
}
