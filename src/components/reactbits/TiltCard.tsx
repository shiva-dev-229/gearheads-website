import React, { useRef, useCallback, useState } from 'react'
import { motion, useSpring } from 'motion/react'
import styled from 'styled-components'

interface TiltCardProps {
  children: React.ReactNode
  maxTilt?: number
  className?: string
}

const Perspective = styled.div`
  perspective: 1200px;
`

const Inner = styled(motion.div)`
  display: block;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
`

const Glare = styled.div<{ $visible: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 24px;
  overflow: hidden;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--gx) var(--gy),
      rgba(255, 255, 255, 0.06),
      transparent 60%
    );
  }
`

const springConfig = { stiffness: 180, damping: 28, mass: 1 }

export default function TiltCard({ children, maxTilt = 5, className }: TiltCardProps) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const scale = useSpring(1, { stiffness: 200, damping: 30, mass: 1 })

  const glareRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      rotateX.set(-y * maxTilt)
      rotateY.set(x * maxTilt)
      scale.set(1.01)
      if (glareRef.current) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glareRef.current.style.setProperty('--gx', `${gx}%`)
        glareRef.current.style.setProperty('--gy', `${gy}%`)
      }
    },
    [prefersReduced, maxTilt, rotateX, rotateY, scale]
  )

  const handleMouseEnter = useCallback(() => {
    if (prefersReduced) return
    setHovering(true)
  }, [prefersReduced])

  const handleMouseLeave = useCallback(() => {
    if (prefersReduced) return
    setHovering(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }, [prefersReduced, rotateX, rotateY, scale])

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <Perspective className={className}>
      <Inner
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {children}
        <Glare ref={glareRef} $visible={hovering} />
      </Inner>
    </Perspective>
  )
}
