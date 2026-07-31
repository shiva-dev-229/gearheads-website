import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface HeroSpotlightProps {
  children: React.ReactNode
  className?: string
}

const Wrapper = styled.div`
  position: relative;
`

const SpotlightLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: radial-gradient(
    600px circle at var(--sx) var(--sy),
    ${theme.colors.primary}0a 0%,
    ${theme.colors.secondary}05 35%,
    transparent 70%
  );
`

const ReducedMotionLayer = styled(SpotlightLayer)`
  --sx: 50%;
  --sy: 40%;
`

export default function HeroSpotlight({ children, className }: HeroSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wrapper = wrapperRef.current
    const layer = layerRef.current
    if (!wrapper || !layer) return

    if (prefersReduced) {
      const onEnter = () => { layer.style.opacity = '1' }
      const onLeave = () => { layer.style.opacity = '0' }
      wrapper.addEventListener('mouseenter', onEnter)
      wrapper.addEventListener('mouseleave', onLeave)
      return () => {
        wrapper.removeEventListener('mouseenter', onEnter)
        wrapper.removeEventListener('mouseleave', onLeave)
      }
    }

    let rafId = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let running = false
    let pendingEvent: MouseEvent | null = null

    const loop = () => {
      if (pendingEvent) {
        const rect = wrapper.getBoundingClientRect()
        targetX = pendingEvent.clientX - rect.left
        targetY = pendingEvent.clientY - rect.top
        pendingEvent = null
      }

      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      layer.style.setProperty('--sx', `${currentX}px`)
      layer.style.setProperty('--sy', `${currentY}px`)

      rafId = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      pendingEvent = e
    }

    const onEnter = () => {
      layer.style.opacity = '1'
      if (!running) {
        running = true
        rafId = requestAnimationFrame(loop)
      }
    }

    const onLeave = () => {
      layer.style.opacity = '0'
      running = false
      cancelAnimationFrame(rafId)
    }

    wrapper.addEventListener('mousemove', onMove)
    wrapper.addEventListener('mouseenter', onEnter)
    wrapper.addEventListener('mouseleave', onLeave)

    return () => {
      wrapper.removeEventListener('mousemove', onMove)
      wrapper.removeEventListener('mouseenter', onEnter)
      wrapper.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const Layer = prefersReduced ? ReducedMotionLayer : SpotlightLayer

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Layer ref={layerRef} />
      {children}
    </Wrapper>
  )
}
