import { useRef, useEffect, type ComponentType } from 'react'
import styled from 'styled-components'
import {
  MdDashboard,
  MdSensors,
  MdTune,
  MdWidgets,
  MdCameraEnhance,
  MdScience,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { theme } from '../../styles/theme'
import FadeIn from '../../components/reactbits/FadeIn'
import innovationsData from '../../data/innovations.json'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  dashboard:     MdDashboard,
  sensors:       MdSensors,
  tune:          MdTune,
  widgets:       MdWidgets,
  cameraEnhance: MdCameraEnhance,
  science:       MdScience,
}

// ─── Shared Layout ────────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 36px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop};
  }
`

const Inner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

// ─── Section Headers ──────────────────────────────────────────────────────────

const SectionLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 12px;
  opacity: 0.8;
`

const SectionHeading = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.8vw, 30px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};
  margin: 0 0 12px;
`

const SectionSubtext = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 660px;
  margin: 0 0 28px;
`

// ─── Bento Grid ───────────────────────────────────────────────────────────────

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.gutter};

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const BentoCard = styled.div<{ $wide: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 30px;
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease;
  transition-delay: var(--bento-delay, 0ms);

  &.bento-visible {
    opacity: 1;
    transform: none;
  }

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }

  @media (min-width: 720px) {
    grid-column: ${({ $wide }) => ($wide ? 'span 2' : 'span 1')};
    flex-direction: ${({ $wide }) => ($wide ? 'row' : 'column')};
    align-items: ${({ $wide }) => ($wide ? 'flex-start' : 'stretch')};
    gap: ${({ $wide }) => ($wide ? '24px' : '16px')};
  }
`

const CardIconWell = styled.div`
  position: relative;
  z-index: 1;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const CardText = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const CardTagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const CardTag = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.85;
`

const CardTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const CardDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function InnovationsSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const observers = cardRefs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('bento-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.08 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <div id="innovations">
      {/* ── 1. Bento Grid ────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>What We've Built</SectionLabel>
            <SectionHeading>Techniques &amp; Tooling</SectionHeading>
            <SectionSubtext>
              Each of these solves a problem we hit on the field — and each one carries forward from
              season to season.
            </SectionSubtext>
          </FadeIn>

          <BentoGrid>
            {innovationsData.innovations.map((item, i) => {
              const Icon = ICON_MAP[item.iconKey] as ComponentType<{ size?: number }>
              return (
                <BentoCard
                  key={item.id}
                  $wide={item.wide}
                  ref={(el) => { cardRefs.current[i] = el }}
                  style={{ '--bento-delay': `${Math.min(i * 60, 260)}ms` } as React.CSSProperties}
                >
                  <CardIconWell>
                    <Icon size={24} />
                  </CardIconWell>
                  <CardText>
                    <CardTagRow>
                      <CardTag>{item.tag}</CardTag>
                    </CardTagRow>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDesc>{item.description}</CardDesc>
                  </CardText>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </Inner>
      </Section>
    </div>
  )
}
