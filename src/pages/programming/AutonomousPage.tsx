import { useState, type ComponentType } from 'react'
import styled, { css } from 'styled-components'
import {
  MdMyLocation,
  MdTimeline,
  MdRoute,
  MdCameraEnhance,
  MdCheckCircleOutline,
  MdArrowOutward,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { theme } from '../../styles/theme'
import autonomousData from '../../data/autonomous.json'
import FadeIn from '../../components/reactbits/FadeIn'

// ─── Icon + color maps ────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  myLocation:   MdMyLocation,
  timeline:     MdTimeline,
  route:        MdRoute,
  cameraEnhance: MdCameraEnhance,
}

const COLOR_MAP: Record<string, string> = {
  primary:   theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary:  theme.colors.tertiary,
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

// ─── Pipeline Accordion ───────────────────────────────────────────────────────

const StageLabel = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.38;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  letter-spacing: 0.03em;
  transition: opacity 0.2s;
  user-select: none;

  @media (max-width: 767px) {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 11px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    opacity: 0.55;
  }
`

const StagePanel = styled.div<{ $active: boolean }>`
  background: ${theme.colors.background};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  flex: ${({ $active }) => ($active ? '1 1 0%' : '0 0 72px')};
  transition:
    flex-grow 0.44s cubic-bezier(0.4, 0, 0.2, 1),
    flex-basis 0.44s cubic-bezier(0.4, 0, 0.2, 1);

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.04);
  }

  ${({ $active }) => !$active && css`
    &:hover ${StageLabel} { opacity: 0.65; }
  `}

  @media (max-width: 767px) {
    flex: none;
    height: ${({ $active }) => ($active ? '440px' : '52px')};
    transition: height 0.44s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
`

const StageStrip = styled.div`
  width: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 18px;
  z-index: 2;
  position: relative;
  background: ${theme.colors.background};

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    height: 52px;
    padding: 0 20px;
    gap: 14px;
  }
`

const StageIcon = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`

const StageStepNo = styled.span<{ $active: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};

  @media (max-width: 767px) {
    display: none;
  }
`

const Accordion = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  height: 548px;
  border-radius: 20px;
  overflow: hidden;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`

const StageContent = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 72px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.28s ease-out ${({ $visible }) => ($visible ? '0.12s' : '0s')};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 28px 28px;

  @media (min-width: 640px) {
    padding: 34px 40px;
  }

  @media (max-width: 767px) {
    left: 0;
    top: 52px;
    position: absolute;
    overflow-y: auto;
  }
`

const ContentBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: 12px;
`

const ContentName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 8px;
  line-height: 1.15;
`

const ContentTagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;
  line-height: 1.55;
`

const ContentDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
  max-width: 620px;
`

const PointsLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0 0 12px;
`

const PointsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px 28px;
  }
`

const PointItem = styled.li<{ $color: string }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};

  svg {
    color: ${({ $color }) => $color};
    margin-top: 1px;
    flex-shrink: 0;
  }
`

const DocsLink = styled.a<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: 22px;
  padding: 10px 18px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ $color }) => $color};
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaised};
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: ${theme.shadows.neoInsetSm};
    transform: translateY(0);
  }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function AutonomousSection() {
  const [activeStage, setActiveStage] = useState(0)
  const pipeline = autonomousData.pipeline

  return (
    <div id="autonomous">
      {/* ── 1. Navigation Pipeline ───────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>The Pipeline</SectionLabel>
            <SectionHeading>How Autonomous Works</SectionHeading>
            <SectionSubtext>
              Four stages run together every autonomous period. Click a stage to expand it.
            </SectionSubtext>
          </FadeIn>

          <Accordion>
            {pipeline.map((stage, i) => {
              const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
              const color = COLOR_MAP[stage.colorKey] ?? theme.colors.primary
              const isActive = i === activeStage
              return (
                <StagePanel
                  key={stage.id}
                  $active={isActive}
                  onClick={() => setActiveStage(i)}
                  aria-expanded={isActive}
                  aria-label={stage.label}
                >
                  <StageStrip>
                    <StageIcon $color={color}>
                      <Icon size={20} />
                    </StageIcon>
                    <StageStepNo $active={isActive}>0{i + 1}</StageStepNo>
                    <StageLabel>{stage.label}</StageLabel>
                  </StageStrip>

                  <StageContent $visible={isActive} aria-hidden={!isActive}>
                    <ContentBadge $color={color}>
                      Stage 0{i + 1}
                    </ContentBadge>
                    <ContentName>{stage.label}</ContentName>
                    <ContentTagline>{stage.tagline}</ContentTagline>
                    <ContentDesc>{stage.description}</ContentDesc>
                    <PointsLabel>Key points</PointsLabel>
                    <PointsList>
                      {stage.points.map((pt, j) => (
                        <PointItem key={j} $color={color}>
                          <MdCheckCircleOutline size={15} />
                          {pt}
                        </PointItem>
                      ))}
                    </PointsList>
                    {stage.link && (
                      <DocsLink
                        $color={color}
                        href={stage.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {stage.link.label}
                        <MdArrowOutward size={14} />
                      </DocsLink>
                    )}
                  </StageContent>
                </StagePanel>
              )
            })}
          </Accordion>
        </Inner>
      </Section>
    </div>
  )
}
