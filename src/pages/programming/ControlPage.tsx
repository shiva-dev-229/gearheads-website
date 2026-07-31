import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdFlag,
  MdSensors,
  MdCompareArrows,
  MdTune,
  MdBolt,
  MdOutput,
  MdSpeed,
  MdSportsEsports,
  MdLoop,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { theme } from '../../styles/theme'
import FadeIn from '../../components/reactbits/FadeIn'
import controlData from '../../data/control.json'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  flag:          MdFlag,
  sensors:       MdSensors,
  compareArrows: MdCompareArrows,
  tune:          MdTune,
  bolt:          MdBolt,
  settingsMotion: MdOutput,
  speed:         MdSpeed,
  sportsEsports: MdSportsEsports,
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

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

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.outlineVariant}28,
    transparent
  );
  margin: 0;
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

// ─── Control Loop ─────────────────────────────────────────────────────────────

const LoopOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const LoopHint = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.7;
`

const NodesRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 18px 4px;

  &::-webkit-scrollbar { display: none; }
`

const NodeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-width: 54px;

  &:last-child {
    flex: none;
  }
`

const NodeButton = styled.button`
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
`

const NodeCircle = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${({ $active }) =>
    $active
      ? `${theme.shadows.neoInsetSm}, 0 0 0 2px ${theme.colors.primary}70, ${theme.shadows.glowBlue}`
      : theme.shadows.neoRaised};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, $completed }) =>
    $active
      ? theme.colors.primary
      : $completed
      ? `${theme.colors.primary}80`
      : theme.colors.onSurfaceVariant + '50'};
  transition: box-shadow 0.25s, color 0.25s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const NodeLabel = styled.span<{ $active: boolean; $completed: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $active, $completed }) =>
    $active
      ? theme.colors.primary
      : $completed
      ? `${theme.colors.primary}70`
      : theme.colors.onSurfaceVariant + '40'};
  transition: color 0.25s;
  white-space: nowrap;
  text-align: center;
`

const ConnectorBar = styled.div<{ $filled: boolean }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  min-width: 16px;
  position: relative;
  overflow: hidden;
  align-self: flex-start;
  margin: 25px 5px 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 2px;
    background: ${theme.colors.primary};
    width: ${({ $filled }) => ($filled ? '100%' : '0%')};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ $filled }) => ($filled ? `0 0 6px ${theme.colors.primary}80` : 'none')};

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`

const DetailPanel = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  padding: 28px 32px;
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const DetailStageName = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin: 0 0 8px;
`

const DetailTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 14px;
`

const DetailBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  max-width: 760px;
`

// ─── Techniques Grid ──────────────────────────────────────────────────────────

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const TechCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 18px;
  padding: 26px 28px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease;
  transition-delay: var(--tech-delay, 0ms);

  &.tech-visible {
    opacity: 1;
    transform: none;
  }

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }
`

const TechIconWell = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const TechTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const TechDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function ControlSection() {
  const [activeStage, setActiveStage] = useState(0)

  const techRefs = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const observers = techRefs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('tech-visible')
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

  const loop = controlData.controlLoop
  const activeData = loop[activeStage]

  return (
    <div id="control">
      {/* ── 1. The Control Loop ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>The Control Loop</SectionHeading>
            <SectionSubtext>
              Closed-loop control is a cycle that repeats continuously while a mechanism moves.
              Step through each stage to see what happens on every pass.
            </SectionSubtext>
          </FadeIn>

          <LoopOuter>
            <NodesRow>
              {loop.map((stage, i) => {
                const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
                const isActive = i === activeStage
                const isCompleted = i < activeStage
                const isLast = i === loop.length - 1
                return (
                  <NodeWrapper key={stage.id}>
                    <NodeButton
                      onClick={() => setActiveStage(i)}
                      aria-pressed={isActive}
                      aria-label={`Stage: ${stage.label}`}
                    >
                      <NodeCircle $active={isActive} $completed={isCompleted}>
                        <Icon size={22} />
                      </NodeCircle>
                      <NodeLabel $active={isActive} $completed={isCompleted}>
                        {stage.label}
                      </NodeLabel>
                    </NodeButton>
                    {!isLast && <ConnectorBar $filled={activeStage > i} />}
                  </NodeWrapper>
                )
              })}
            </NodesRow>

            <LoopHint>
              <MdLoop size={14} />
              Then repeats every cycle
            </LoopHint>

            <DetailPanel key={activeStage}>
              <DetailStageName>
                Stage {activeStage + 1} of {loop.length}
              </DetailStageName>
              <DetailTitle>{activeData.label} — {activeData.description}</DetailTitle>
              <DetailBody>{activeData.details}</DetailBody>
            </DetailPanel>
          </LoopOuter>
        </Inner>
      </Section>

      <Divider />

      {/* ── 3. Techniques ────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>In Practice</SectionLabel>
            <SectionHeading>Control Techniques</SectionHeading>
            <SectionSubtext>
              The control loop is the foundation. On top of it, these techniques are what make the
              robot's motion smooth, fast, and easy to tune.
            </SectionSubtext>
          </FadeIn>

          <TechGrid>
            {controlData.techniques.map((tech, i) => {
              const Icon = ICON_MAP[tech.iconKey] as ComponentType<{ size?: number }>
              return (
                <TechCard
                  key={tech.id}
                  ref={(el) => { techRefs.current[i] = el }}
                  style={{ '--tech-delay': `${Math.min(i * 70, 280)}ms` } as React.CSSProperties}
                >
                  <TechIconWell>
                    <Icon size={22} />
                  </TechIconWell>
                  <TechTitle>{tech.title}</TechTitle>
                  <TechDesc>{tech.description}</TechDesc>
                </TechCard>
              )
            })}
          </TechGrid>
        </Inner>
      </Section>
    </div>
  )
}
