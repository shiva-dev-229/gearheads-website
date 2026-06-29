import { useEffect, useRef, type ReactNode } from 'react'
import styled from 'styled-components'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  threshold?: number
  direction?: 'up' | 'none'
  className?: string
}

const Wrapper = styled.div<{
  $duration: number
  $direction: 'up' | 'none'
  $delay: number
}>`
  opacity: 0;
  transform: ${({ $direction }) => ($direction === 'up' ? 'translateY(28px)' : 'none')};
  transition:
    opacity ${({ $duration }) => $duration}ms ease,
    transform ${({ $duration }) => $duration}ms ease;
  transition-delay: ${({ $delay }) => $delay}ms;

  &.rb-visible {
    opacity: 1;
    transform: none;
  }
`

export default function FadeIn({
  children,
  delay = 0,
  duration = 550,
  threshold = 0.12,
  direction = 'up',
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('rb-visible')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Wrapper
      ref={ref}
      $duration={duration}
      $direction={direction}
      $delay={delay}
      className={className}
    >
      {children}
    </Wrapper>
  )
}
