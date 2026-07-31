import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdFlag, MdArchitecture, MdBuild, MdScience, MdEmojiEvents,
  MdAnalytics, MdWarning, MdGridView, MdCameraAlt,
  MdExpandMore,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import dpData from '../../data/design-process.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const STEP_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  flag:         MdFlag,
  analytics:    MdAnalytics,
  architecture: MdArchitecture,
  build:        MdBuild,
  science:      MdScience,
  trophy:       MdEmojiEvents,
}

const TOOL_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  grid:      MdGridView,
  analytics: MdAnalytics,
  warning:   MdWarning,
}

const COLOR_MAP: Record<string, string> = {
  primary:   theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary:  theme.colors.tertiary,
}

type ColorKey = 'primary' | 'secondary' | 'tertiary'

const GLOW_MAP: Record<ColorKey, { color: string; glow: string }> = {
  primary:   { color: theme.colors.primary,   glow: theme.shadows.glowBlue },
  secondary: { color: theme.colors.secondary, glow: theme.shadows.glowGreen },
  tertiary:  { color: theme.colors.tertiary,  glow: theme.shadows.glowPink },
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout ───────────────────────────────────────────────────────────────────

const PageSection = styled.section`
  padding: 36px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 52px ${theme.spacing.marginDesktop};
  }
`

const SectionInner = styled.div`
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
`

// ─── Section Heading ──────────────────────────────────────────────────────────

const SectionHeading = styled.div`
  margin-bottom: 8px;

  p {
    font-family: ${theme.fonts.headline} !important;
    font-size: clamp(22px, 3.2vw, 34px) !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
    line-height: 1.15 !important;
    color: ${theme.colors.onSurface} !important;
    gap: 0.3em !important;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 620px;
  margin: 0 0 28px;
`

const SubheadLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 14px;
  opacity: 0.8;
`

// ─── DHF Accordion ────────────────────────────────────────────────────────────

type DhfAccent = 'blue' | 'green'

const dhfAccentColor = (accent: DhfAccent) =>
  accent === 'blue' ? theme.colors.primary : theme.colors.secondary

const DhfList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const DhfItem = styled.div<{ $open: boolean; $accent: DhfAccent }>`
  background: ${({ $open }) => ($open ? theme.colors.surfaceContainerLow : theme.colors.background)};
  box-shadow: ${({ $open }) => ($open ? theme.shadows.neoRaisedLg : theme.shadows.neoRaised)};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid
    ${({ $open }) =>
      $open ? `${theme.colors.outlineVariant}55` : `${theme.colors.outlineVariant}25`};
  border-left: 3px solid
    ${({ $open, $accent }) => ($open ? dhfAccentColor($accent) : 'transparent')};
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    border-left-color: ${({ $open, $accent }) =>
      $open ? dhfAccentColor($accent) : `${dhfAccentColor($accent)}55`};
  }
`

const DhfButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  text-align: left;
  background: none;

  @media (min-width: 768px) {
    padding: 22px 24px;
  }
`

const DhfNumber = styled.span<{ $open: boolean; $accent: DhfAccent }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 28px;
  color: ${({ $open, $accent }) => ($open ? dhfAccentColor($accent) : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.45)};
  transition: color 0.22s, opacity 0.22s;
`

const DhfQuestion = styled.span`
  flex: 1;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 17px;
  }
`

const DhfChevron = styled.div<{ $open: boolean; $accent: DhfAccent }>`
  font-size: 22px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.22s ease, color 0.22s ease, opacity 0.22s;
  color: ${({ $open, $accent }) => ($open ? dhfAccentColor($accent) : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.5)};
`

const DhfCollapse = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease ${({ $open }) => ($open ? '0.05s' : '0s')};
`

const DhfCollapseInner = styled.div`
  overflow: hidden;
`

const DhfAnswerWrap = styled.div<{ $accent: DhfAccent }>`
  padding: 0 20px 20px;

  @media (min-width: 768px) {
    padding: 0 24px 22px;
  }
`

const DhfHairline = styled.div<{ $accent: DhfAccent }>`
  height: 1px;
  background: ${({ $accent }) => `${dhfAccentColor($accent)}25`};
  margin-bottom: 16px;
`

const DhfBullets = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DhfBullet = styled.li<{ $accent: DhfAccent }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};

  &::before {
    content: '›';
    color: ${({ $accent }) => dhfAccentColor($accent)};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
    opacity: 0.8;
  }
`

// ─── Process Stepper ──────────────────────────────────────────────────────────

const StepperRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 3px;
    border-radius: 50%;
  }
`

const NodeCircle = styled.div<{ $active: boolean; $completed: boolean; $stageColor: string; $stageGlow: string }>`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${({ $active, $stageColor, $stageGlow }) =>
    $active
      ? `${theme.shadows.neoInsetSm}, 0 0 0 2px ${$stageColor}70, ${$stageGlow}`
      : theme.shadows.neoRaised};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, $completed, $stageColor }) =>
    $active
      ? $stageColor
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
  white-space: pre-line;
  text-align: center;
  max-width: 64px;
  line-height: 1.4;
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

const DetailStageLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin: 0 0 8px;
  opacity: 0.7;
`

const DetailTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${theme.colors.onSurface};
  margin: 0 0 10px;
`

const DetailSummary = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;
`

const DetailDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 24px;
`

const OutputsLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.4;
  display: block;
  margin-bottom: 10px;
`

const OutputsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const OutputItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 10px;
  padding: 11px 14px;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurface};
  line-height: 1.4;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${theme.colors.secondary};
    flex-shrink: 0;
  }
`

// ─── Analysis Tools ───────────────────────────────────────────────────────────

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ToolCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }
`

const ToolIconWell = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`

const ToolName = styled.h4`
  font-family: ${theme.fonts.headline};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const ToolDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  flex: 1;
`

// ─── Photo slot ───────────────────────────────────────────────────────────────

const PhotoSlot = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 16px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 1px dashed ${theme.colors.outlineVariant}38;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${theme.colors.outlineVariant}60;
  }
`

const PhotoSlotName = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.7;
`

const PhotoSlotDesc = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  text-align: center;
  max-width: 260px;
`

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────

const RevealSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useRevealRefs<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            obs.disconnect()
          }
        },
        { threshold: 0.08 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [count])

  return refs
}

// ─── Component ────────────────────────────────────────────────────────────────

const STEPS = dpData.steps
const DHF = dpData.dhf
const TOOLS = dpData.tools

export default function DesignProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [dhfOpen, setDhfOpen] = useState<number | null>(null)

  const toggleDhf = (i: number) => setDhfOpen((cur) => (cur === i ? null : i))

  const revealRefs = useRevealRefs<HTMLDivElement>(6)

  const step = STEPS[activeStep]

  return (
    <div id="design-process">

      {/* ── DHF Section ────────────────────────────────────────────────── */}
      <PageSection>
        <SectionInner>
          <RevealSection ref={(el) => { revealRefs.current[0] = el }}>
            <SubheadLabel>Foundation</SubheadLabel>
            <SectionHeading>
              <BlurText
                text="The DHF Framework"
                delay={50}
                animateBy="words"
                direction="bottom"
              />
            </SectionHeading>
            <SectionSubtitle>
              A medical-device engineering standard adapted for FTC — where it comes from, what it
              means, and how the team enforces it every build season.
            </SectionSubtitle>

            <DhfList>
              {DHF.map((item, i) => {
                const open = dhfOpen === i
                const accent: DhfAccent = i % 2 === 0 ? 'blue' : 'green'
                const num = String(i + 1).padStart(2, '0')

                return (
                  <DhfItem key={item.id} $open={open} $accent={accent}>
                    <DhfButton onClick={() => toggleDhf(i)} aria-expanded={open}>
                      <DhfNumber $open={open} $accent={accent}>{num}</DhfNumber>
                      <DhfQuestion>{item.question}</DhfQuestion>
                      <DhfChevron $open={open} $accent={accent}>
                        <MdExpandMore />
                      </DhfChevron>
                    </DhfButton>

                    <DhfCollapse $open={open}>
                      <DhfCollapseInner>
                        <DhfAnswerWrap $accent={accent}>
                          <DhfHairline $accent={accent} />
                          <DhfBullets>
                            {item.bullets.map((bullet, j) => (
                              <DhfBullet key={j} $accent={accent}>{bullet}</DhfBullet>
                            ))}
                          </DhfBullets>
                        </DhfAnswerWrap>
                      </DhfCollapseInner>
                    </DhfCollapse>
                  </DhfItem>
                )
              })}
            </DhfList>
          </RevealSection>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Process Stepper ────────────────────────────────────────────── */}
      <PageSection>
        <SectionInner>
          <RevealSection ref={(el) => { revealRefs.current[1] = el }}>
            <SubheadLabel>Season Workflow</SubheadLabel>
            <SectionHeading>
              <BlurText
                text="Step by Step"
                delay={55}
                animateBy="words"
                direction="bottom"
              />
            </SectionHeading>
            <SectionSubtitle>
              An interactive walk through the season process — from game kickoff to the competition
              field. Click any node to explore that stage.
            </SectionSubtitle>

            <StepperRoot>
              <NodesRow>
                {STEPS.map((s, i) => {
                  const Icon = STEP_ICONS[s.iconKey] ?? MdFlag
                  const isActive = i === activeStep
                  const isCompleted = i < activeStep
                  const isLast = i === STEPS.length - 1
                  const glowEntry = GLOW_MAP[s.colorKey as ColorKey] ?? GLOW_MAP.primary
                  return (
                    <NodeWrapper key={s.id}>
                      <NodeButton
                        onClick={() => setActiveStep(i)}
                        aria-pressed={isActive}
                        aria-label={`Step ${i + 1}: ${s.label}`}
                      >
                        <NodeCircle
                          $active={isActive}
                          $completed={isCompleted}
                          $stageColor={glowEntry.color}
                          $stageGlow={glowEntry.glow}
                        >
                          <Icon size={22} />
                        </NodeCircle>
                        <NodeLabel $active={isActive} $completed={isCompleted}>
                          {s.label}
                        </NodeLabel>
                      </NodeButton>
                      {!isLast && <ConnectorBar $filled={activeStep > i} />}
                    </NodeWrapper>
                  )
                })}
              </NodesRow>

              <DetailPanel key={activeStep} role="tabpanel" aria-label={step.label}>
                <DetailStageLabel>Step {step.number} of {STEPS.length}</DetailStageLabel>
                <DetailTitle>{step.label}</DetailTitle>
                <DetailSummary>{step.summary}</DetailSummary>
                <DetailDesc>{step.detail}</DetailDesc>
                <OutputsLabel>Phase Outputs</OutputsLabel>
                <OutputsList>
                  {step.outputs.map((o, i) => (
                    <OutputItem key={i}>{o}</OutputItem>
                  ))}
                </OutputsList>
              </DetailPanel>
            </StepperRoot>
          </RevealSection>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Analysis Tools ─────────────────────────────────────────────── */}
      <PageSection>
        <SectionInner>
          <RevealSection ref={(el) => { revealRefs.current[2] = el }}>
            <SubheadLabel>Core Toolkit</SubheadLabel>
            <SectionHeading>
              <BlurText
                text="The Three Instruments"
                delay={50}
                animateBy="words"
                direction="bottom"
              />
            </SectionHeading>
            <SectionSubtitle>
              Every design decision runs through the same three tools — used in sequence and
              updated continuously across the season.
            </SectionSubtitle>

            <ToolsGrid>
              {TOOLS.map((tool) => {
                const Icon = TOOL_ICONS[tool.iconKey] ?? MdAnalytics
                const color = COLOR_MAP[tool.colorKey] ?? theme.colors.primary
                return (
                  <ToolCard key={tool.name}>
                    <ToolIconWell $color={color}>
                      <Icon size={22} color={color} />
                    </ToolIconWell>
                    <ToolName>{tool.name}</ToolName>
                    <ToolDesc>{tool.description}</ToolDesc>
                    <PhotoSlot>
                      <MdCameraAlt size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                      <PhotoSlotName>Screenshot Slot</PhotoSlotName>
                      <PhotoSlotDesc>{tool.slotHint}</PhotoSlotDesc>
                    </PhotoSlot>
                  </ToolCard>
                )
              })}
            </ToolsGrid>
          </RevealSection>
        </SectionInner>
      </PageSection>


    </div>
  )
}
