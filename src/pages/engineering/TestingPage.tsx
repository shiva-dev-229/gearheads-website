import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdScience,
  MdAnalytics,
  MdBuild,
  MdCheckCircle,
  MdEvent,
  MdTune,
  MdWarning,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { theme } from '../../styles/theme'
import FadeIn from '../../components/reactbits/FadeIn'
import testingData from '../../data/testing.json'

// ─── Stage accent color map ────────────────────────────────────────────────────
// Test = primary (blue), Analyze = tertiary (pink), Fix = secondary (green), Validate = primary (blue)
const STAGE_COLORS = [
  { color: theme.colors.primary,   glow: theme.shadows.glowBlue  },
  { color: theme.colors.tertiary,  glow: theme.shadows.glowPink  },
  { color: theme.colors.secondary, glow: theme.shadows.glowGreen },
  { color: theme.colors.primary,   glow: theme.shadows.glowBlue  },
]

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  science:     MdScience,
  analytics:   MdAnalytics,
  build:       MdBuild,
  checkCircle: MdCheckCircle,
  event:       MdEvent,
  tune:        MdTune,
  warning:     MdWarning,
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

// ─── Iteration Loop ───────────────────────────────────────────────────────────

const LoopOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const NodesRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 18px 0;

  &::-webkit-scrollbar { display: none; }

  @media (min-width: 640px) {
    overflow-x: visible;
  }
`

const NodeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 80px;

  &:last-child {
    flex: none;
  }
`

const NodeButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${theme.colors.background};
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  position: relative;
`

const NodeCircle = styled.div<{ $active: boolean; $completed: boolean; $stageColor: string; $stageGlow: string }>`
  width: 56px;
  height: 56px;
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
      ? `${$stageColor}80`
      : theme.colors.onSurfaceVariant + '50'};
  transition: box-shadow 0.25s, color 0.25s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const NodeLabel = styled.span<{ $active: boolean; $completed: boolean; $stageColor: string }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $active, $completed, $stageColor }) =>
    $active
      ? $stageColor
      : $completed
      ? `${$stageColor}70`
      : theme.colors.onSurfaceVariant + '40'};
  transition: color 0.25s;
  white-space: nowrap;
`

// Progress bar connector
const ConnectorBar = styled.div<{ $filled: boolean; $fillColor: string }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  margin: 0 6px;
  min-width: 20px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 2px;
    background: ${({ $fillColor }) => $fillColor};
    width: ${({ $filled }) => ($filled ? '100%' : '0%')};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ $filled, $fillColor }) => ($filled ? `0 0 6px ${$fillColor}80` : 'none')};

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

const DetailStageName = styled.p<{ $color: string }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
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
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  max-width: 760px;
`

// ─── Testing Workflow ─────────────────────────────────────────────────────────

const WorkflowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const WorkflowItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 16px;
  padding: 20px 24px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: var(--wf-delay, 0ms);

  &.wf-visible {
    opacity: 1;
    transform: none;
  }
`

const WorkflowIconWell = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${theme.colors.primary};
`

const WorkflowTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const WorkflowStepLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
`

const WorkflowDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── FMEA Section ─────────────────────────────────────────────────────────────

const FmeaHeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

const SeasonChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.tertiary};
  white-space: nowrap;
`

const FmeaOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const FmeaDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 760px;
  margin: 0;
`

const FmeaTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const FmeaRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-radius: 14px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  transition-delay: var(--fmea-delay, 0ms);

  &.fmea-visible {
    opacity: 1;
    transform: none;
  }
`

const FmeaSeasonTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 16px;
  background: ${theme.colors.background};
  box-shadow: inset -1px 0 0 ${theme.colors.outlineVariant}18;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  white-space: nowrap;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  min-width: 44px;
`

const FmeaCells = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 0;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const FmeaCell = styled.div<{ $type: 'failure' | 'fix' }>`
  padding: 16px 20px;
  border-left: ${({ $type }) => $type === 'fix' ? `1px solid ${theme.colors.outlineVariant}18` : 'none'};
  border-top: ${({ $type }) => $type === 'fix' ? `1px solid ${theme.colors.outlineVariant}14` : 'none'};

  @media (min-width: 640px) {
    border-top: none;
  }
`

const FmeaCellLabel = styled.span<{ $type: 'failure' | 'fix' }>`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $type }) => $type === 'failure' ? theme.colors.onSurfaceVariant : theme.colors.secondary};
  opacity: ${({ $type }) => $type === 'failure' ? 0.45 : 0.8};
  display: block;
  margin-bottom: 5px;
`

const FmeaCellText = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.55;
  color: ${theme.colors.onSurfaceVariant};
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestingSection() {
  const [activeStage, setActiveStage] = useState(0)

  // Workflow scroll-reveal
  const workflowRefs = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const observers = workflowRefs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('wf-visible')
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

  // FMEA scroll-reveal
  const fmeaRefs = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const observers = fmeaRefs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('fmea-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.06 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const activeStageData = testingData.iterationLoop[activeStage]
  const activeAccent = STAGE_COLORS[activeStage] ?? STAGE_COLORS[0]

  return (
    <div id="testing">

      {/* ── 2. Iteration Loop ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Engineering Process</SectionLabel>
            <SectionHeading>The Iteration Loop</SectionHeading>
            <SectionSubtext>
              Click a stage to see what the team actually does at each step.
            </SectionSubtext>
          </FadeIn>

          <LoopOuter>
            <NodesRow>
              {testingData.iterationLoop.map((stage, i) => {
                const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
                const isActive = i === activeStage
                const isCompleted = i < activeStage
                const isLast = i === testingData.iterationLoop.length - 1
                const accent = STAGE_COLORS[i] ?? STAGE_COLORS[0]
                // The connector after node i is filled if activeStage > i
                const connectorFilled = activeStage > i
                // The connector color is the color of the stage being entered (i+1)
                const connectorColor = (STAGE_COLORS[i + 1] ?? STAGE_COLORS[0]).color

                return (
                  <NodeWrapper key={stage.id}>
                    <NodeButton
                      $active={isActive}
                      onClick={() => setActiveStage(i)}
                      aria-pressed={isActive}
                      aria-label={`Stage: ${stage.label}`}
                    >
                      <NodeCircle
                        $active={isActive}
                        $completed={isCompleted}
                        $stageColor={accent.color}
                        $stageGlow={accent.glow}
                      >
                        <Icon size={22} />
                      </NodeCircle>
                      <NodeLabel
                        $active={isActive}
                        $completed={isCompleted}
                        $stageColor={accent.color}
                      >
                        {stage.label}
                      </NodeLabel>
                    </NodeButton>
                    {!isLast && (
                      <ConnectorBar
                        $filled={connectorFilled}
                        $fillColor={connectorColor}
                      />
                    )}
                  </NodeWrapper>
                )
              })}
            </NodesRow>

            <DetailPanel key={activeStage}>
              <DetailStageName $color={activeAccent.color}>
                Stage {activeStage + 1} of {testingData.iterationLoop.length}
              </DetailStageName>
              <DetailTitle>{activeStageData.description}</DetailTitle>
              <DetailBody>{activeStageData.details}</DetailBody>
            </DetailPanel>
          </LoopOuter>
        </Inner>
      </Section>

      <Divider />

      {/* ── 3. Testing Workflow ───────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Process</SectionLabel>
            <SectionHeading>Testing Workflow</SectionHeading>
            <SectionSubtext>
              From pre-competition baselines through post-event FMEA updates, every testing session
              follows a structured sequence.
            </SectionSubtext>
          </FadeIn>

          <WorkflowList>
            {testingData.testingWorkflow.map((item, i) => {
              const Icon = ICON_MAP[item.iconKey] as ComponentType<{ size?: number }>
              return (
                <WorkflowItem
                  key={i}
                  ref={el => { workflowRefs.current[i] = el }}
                  style={{ '--wf-delay': `${Math.min(i * 60, 250)}ms` } as React.CSSProperties}
                >
                  <WorkflowIconWell>
                    <Icon size={22} />
                  </WorkflowIconWell>
                  <WorkflowTextBlock>
                    <WorkflowStepLabel>{item.step}</WorkflowStepLabel>
                    <WorkflowDesc>{item.description}</WorkflowDesc>
                  </WorkflowTextBlock>
                </WorkflowItem>
              )
            })}
          </WorkflowList>
        </Inner>
      </Section>

      <Divider />

      {/* ── 4. FMEA Section ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Failure Analysis</SectionLabel>
            <FmeaHeadingRow>
              <SectionHeading style={{ margin: 0 }}>{testingData.fmea.title}</SectionHeading>
              <SeasonChip>DECODE 2025–26</SeasonChip>
            </FmeaHeadingRow>
            <FmeaOuter>
              <FmeaDesc>
                These examples are drawn from the DECODE robot's mark iterations — failure modes
                identified through structured FMEA analysis after each testing session and
                competition. The team ranks them by severity and likelihood, then commits to a fix
                only when the Monte Carlo model shows it improves projected match performance.
              </FmeaDesc>

              <FmeaTable>
                {testingData.fmea.examples.map((ex, i) => (
                  <FmeaRow
                    key={i}
                    ref={el => { fmeaRefs.current[i] = el }}
                    style={{ '--fmea-delay': `${Math.min(i * 70, 280)}ms` } as React.CSSProperties}
                  >
                    <FmeaSeasonTag>{ex.season}</FmeaSeasonTag>
                    <FmeaCells>
                      <FmeaCell $type="failure">
                        <FmeaCellLabel $type="failure">Failure mode</FmeaCellLabel>
                        <FmeaCellText>{ex.failure}</FmeaCellText>
                      </FmeaCell>
                      <FmeaCell $type="fix">
                        <FmeaCellLabel $type="fix">Fix applied</FmeaCellLabel>
                        <FmeaCellText>{ex.fix}</FmeaCellText>
                      </FmeaCell>
                    </FmeaCells>
                  </FmeaRow>
                ))}
              </FmeaTable>
            </FmeaOuter>
          </FadeIn>
        </Inner>
      </Section>


    </div>
  )
}
