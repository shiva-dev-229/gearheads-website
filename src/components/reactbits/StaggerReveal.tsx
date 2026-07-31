import { useEffect, useRef, type ReactNode } from 'react'
import styled from 'styled-components'

type Variant = 'rise' | 'pop' | 'slide'

interface StaggerRevealProps {
  children: ReactNode | ReactNode[]
  variant: Variant
  stagger?: number
  duration?: number
  distance?: number
  threshold?: number
  inline?: boolean
  className?: string
}

const defaultDuration: Record<Variant, number> = {
  rise:  280,
  pop:   220,
  slide: 240,
}

const defaultDistance: Record<Variant, number> = {
  rise:  24,
  pop:   0,
  slide: 16,
}

function hiddenTransform(variant: Variant, distance: number): string {
  if (variant === 'rise')  return `translateY(${distance}px)`
  if (variant === 'slide') return `translateX(${distance}px)`
  return 'scale(0.85)'
}

const Child = styled.div<{ $variant: Variant; $delay: number; $duration: number; $distance: number; $inline: boolean }>`
  ${({ $inline }) => $inline ? 'display: inline-flex; width: fit-content; flex-shrink: 0;' : ''}

  @media (prefers-reduced-motion: no-preference) {
    opacity: 0;
    transform: ${({ $variant, $distance }) => hiddenTransform($variant, $distance)};
    ${({ $variant }) => $variant === 'pop' ? 'transform-origin: center;' : ''}
    transition: opacity ${({ $duration }) => $duration}ms ease-out, transform ${({ $duration }) => $duration}ms ease-out;
    transition-delay: ${({ $delay }) => $delay}ms;

    &.sr-visible {
      opacity: 1;
      transform: none;
    }
  }
`

export default function StaggerReveal({
  children,
  variant,
  stagger = 80,
  duration,
  distance,
  threshold = 0.1,
  inline = false,
  className,
}: StaggerRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLSpanElement>(null)
  const resolvedDuration = duration ?? defaultDuration[variant]
  const resolvedDistance = distance ?? defaultDistance[variant]

  useEffect(() => {
    // When inline=true the wrapper has display:contents and has no layout box,
    // so observe a zero-size sentinel span that sits at the same position.
    const target = inline ? sentinelRef.current : wrapperRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wrapperRef.current?.querySelectorAll<HTMLElement>('.sr-child').forEach(el => {
            el.classList.add('sr-visible')
          })
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [threshold, inline])

  const items = Array.isArray(children) ? children : [children]

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={inline ? { display: 'contents' } : undefined}
    >
      {inline && <span ref={sentinelRef} style={{ display: 'inline-block', width: 0, height: 0 }} />}
      {items.map((child, i) => (
        <Child
          key={i}
          $variant={variant}
          $delay={i * stagger}
          $duration={resolvedDuration}
          $distance={resolvedDistance}
          $inline={inline}
          className="sr-child"
        >
          {child}
        </Child>
      ))}
    </div>
  )
}
