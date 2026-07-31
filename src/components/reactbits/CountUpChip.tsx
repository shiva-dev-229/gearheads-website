import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { chipHover } from '../../styles/mixins'

export interface CountUpChipProps {
  icon: React.ReactNode
  countTo: number
  prefix?: string
  suffix?: string
  duration?: number
}

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  cursor: default;

  svg {
    flex-shrink: 0;
  }

  ${chipHover}
`

const NumberSpan = styled.span`
  font-variant-numeric: tabular-nums;
`

const easeOutExpo = (t: number): number => 1 - Math.pow(2, -10 * t)

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CountUpChip({
  icon,
  countTo,
  prefix = '',
  suffix = '',
  duration = 1400,
}: CountUpChipProps) {
  const [count, setCount] = useState(prefersReducedMotion() ? countTo : 0)
  const chipRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const el = chipRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          observer.disconnect()

          const animate = (timestamp: number) => {
            if (startTimeRef.current === null) startTimeRef.current = timestamp
            const elapsed = timestamp - startTimeRef.current
            const t = Math.min(elapsed / duration, 1)
            const eased = easeOutExpo(t)
            const current = t === 1 ? countTo : Math.round(eased * countTo)
            setCount(current)
            if (t < 1) {
              rafRef.current = requestAnimationFrame(animate)
            }
          }

          rafRef.current = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [countTo, duration])

  return (
    <Chip ref={chipRef}>
      {icon}
      <NumberSpan>
        {prefix}{count}{suffix}
      </NumberSpan>
    </Chip>
  )
}
