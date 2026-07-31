import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { css } from 'styled-components'
import {
  MdBuild,
  MdArchitecture, MdCheckCircle,
  MdMemory, MdLayers, MdHardware,
  MdTune, MdOutlineSquareFoot, MdOpenInNew,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import { chipHover } from '../../styles/mixins'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import manufacturingData from '../../data/manufacturing.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const MACHINE_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  build:        MdBuild,
  precision:    MdTune,
  area:         MdOutlineSquareFoot,
  layers:       MdLayers,
  hardware:     MdHardware,
}

const PROCESS_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  architecture: MdArchitecture,
  settings:     MdTune,
  build:        MdBuild,
  check:        MdCheckCircle,
}

const COLOR_MAP: Record<string, string> = {
  primary:   theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary:  theme.colors.tertiary,
}

// ─── Type for machine (handles optional externalLink) ─────────────────────────

type ExternalLink = { url: string; label: string }
type Machine = {
  id: string
  label: string
  fullName: string
  iconKey: string
  colorKey: string
  tagline: string
  description: string
  externalLink?: ExternalLink
  makes: string[]
  materials: string[]
  photoLabel: string
  photoHint: string
}

// ─── Shared Layout ────────────────────────────────────────────────────────────

const PageSection = styled.section`
  padding: 36px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop};
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
  margin: 0;
`

// ─── Chip ─────────────────────────────────────────────────────────────────────

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  margin-bottom: 20px;
  cursor: default;

  ${chipHover}
`

const ChipDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? theme.colors.primary};
  flex-shrink: 0;
`

// ─── Section Heading ──────────────────────────────────────────────────────────

const SectionHeading = styled.div`
  margin-bottom: 20px;

  p {
    font-family: ${theme.fonts.headline} !important;
    font-size: clamp(26px, 4vw, 40px) !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
    line-height: 1.15 !important;
    color: ${theme.colors.onSurface} !important;
    gap: 0.3em !important;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 660px;
  margin: 0 0 32px;
`

// ─── Machine Accordion ────────────────────────────────────────────────────────

const MachinePanelLabel = styled.span`
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

const MachinePanel = styled.div<{ $active: boolean }>`
  background: ${theme.colors.background};
  cursor: ${({ $active }) => $active ? 'default' : 'pointer'};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  flex: ${({ $active }) => $active ? '1 1 0%' : '0 0 72px'};
  transition:
    flex-grow 0.44s cubic-bezier(0.4, 0, 0.2, 1),
    flex-basis 0.44s cubic-bezier(0.4, 0, 0.2, 1);

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.04);
  }

  ${({ $active }) => !$active && css`
    &:hover ${MachinePanelLabel} { opacity: 0.65; }
  `}

  @media (max-width: 767px) {
    flex: none;
    height: ${({ $active }) => $active ? '420px' : '52px'};
    transition: height 0.44s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
`

const MachinePanelStrip = styled.div`
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

const MachinePanelIcon = styled.div<{ $color: string }>`
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

const MachineAccordion = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  height: 520px;
  border-radius: 20px;
  overflow: hidden;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`

const MachinePanelContent = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 72px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.28s ease-out ${({ $visible }) => $visible ? '0.12s' : '0s'};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    left: 0;
    top: 52px;
  }
`

const DetailTop = styled.div<{ $color: string }>`
  padding: 28px 28px 0;
  border-bottom: 1px solid ${theme.colors.outlineVariant}18;

  @media (min-width: 640px) {
    padding: 32px 36px 0;
  }
`

const DetailBadge = styled.span<{ $color: string }>`
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

const DetailName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 8px;
  line-height: 1.15;
`

const DetailTagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 24px;
  line-height: 1.55;
`

const DetailBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const DetailCol = styled.div`
  padding: 24px 28px;

  &:first-child {
    border-bottom: 1px solid ${theme.colors.outlineVariant}14;
  }

  @media (min-width: 640px) {
    padding: 28px 36px;

    &:first-child {
      border-bottom: none;
      border-right: 1px solid ${theme.colors.outlineVariant}14;
    }
  }
`

const DetailColLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0 0 14px;
`

const DetailDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const MakesList = styled.ul`
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const MakesItem = styled.li<{ $color: string }>`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.4;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
    opacity: 0.7;
  }
`

const MaterialsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const MaterialChip = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 8px;
  padding: 5px 10px;
`

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 18px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`

// ─── Fab stat ─────────────────────────────────────────────────────────────────

const StatSection = styled(PageSection)`
  background: ${theme.colors.background};
`

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }
`

const StatCopy = styled.div``

const StatNumber = styled.div`
  font-family: ${theme.fonts.headline};
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 1;
  color: ${theme.colors.onSurface};
  margin-bottom: 4px;
`

const StatLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 20px;
`

const StatBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  max-width: 500px;
`

const TrackWrap = styled.div``

const TrackLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const TrackLabelText = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
`

const Track = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 8px;
  height: 14px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
`

const TrackFill = styled.div<{ $pct: number; $color: string; $visible: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background: ${({ $color }) => $color};
  border-radius: 8px;
  box-shadow: 0 0 12px ${({ $color }) => $color}60;
  transform-origin: left;
  transform: scaleX(${({ $visible, $pct }) => ($visible ? $pct / 100 : 0)});
  transition: transform 1.1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
`

const TrackRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const ProductionHubNote = styled.div`
  margin-top: 24px;
  padding: 18px 22px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-radius: 14px;
  border-left: 3px solid ${theme.colors.secondary}70;
`

const ProductionHubText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;

  strong {
    color: ${theme.colors.secondary};
    font-weight: 600;
  }
`

// ─── Process Flow — clean 4-column card grid ──────────────────────────────────

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.gutter};

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ProcessCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const ProcessStepNum = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  opacity: 0.5;
`

const ProcessIconWell = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`

const ProcessStepName = styled.h4`
  font-family: ${theme.fonts.headline};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0;
  line-height: 1.2;
`

const ProcessStepDetail = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.8;
`

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManufacturingSection() {
  const [activeMachine, setActiveMachine] = useState(manufacturingData.machines[0].id)

  const { ref: statRef, visible: statVisible } = useReveal<HTMLDivElement>()
  const { ref: processRef, visible: processVisible } = useReveal<HTMLDivElement>()

  const { fabStat, processSteps, productionHub } = manufacturingData

  function selectMachine(id: string) {
    if (id === activeMachine) return
    setActiveMachine(id)
  }

  return (
    <div id="manufacturing">

      {/* ── Machine Selector ── */}
      <PageSection>
        <SectionInner>
          <FadeIn>
            <Chip>
              <ChipDot $color={theme.colors.secondary} />
              Machine Shop
            </Chip>
          </FadeIn>

          <FadeIn delay={60}>
            <SectionHeading>
              <BlurText text="The shop floor." delay={50} animateBy="words" />
            </SectionHeading>
            <SectionSubtitle>
              Three CNC mills and a 3D printing station — each filling a different role in the
              build pipeline. Select a machine to see what it makes, what it cuts, and why the
              team uses it.
            </SectionSubtitle>
          </FadeIn>

          <FadeIn delay={100}>
            <MachineAccordion role="list" aria-label="Machine roster">
              {manufacturingData.machines.map(m => {
                const machineTyped = m as Machine
                const Icon = MACHINE_ICONS[m.iconKey] ?? MdBuild
                const color = COLOR_MAP[m.colorKey]
                const isActive = m.id === activeMachine
                return (
                  <MachinePanel
                    key={m.id}
                    $active={isActive}
                    onClick={() => selectMachine(m.id)}
                    role="listitem"
                    aria-label={`Select ${machineTyped.fullName}`}
                  >
                    <MachinePanelStrip>
                      <MachinePanelIcon $color={color}>
                        <Icon size={17} />
                      </MachinePanelIcon>
                      <MachinePanelLabel>{m.label}</MachinePanelLabel>
                    </MachinePanelStrip>

                    <MachinePanelContent $visible={isActive}>
                      <DetailTop $color={color}>
                        <DetailBadge $color={color}>
                          <MdMemory size={12} />
                          {m.label}
                        </DetailBadge>
                        <DetailName>{machineTyped.fullName}</DetailName>
                        <DetailTagline>{machineTyped.tagline}</DetailTagline>
                      </DetailTop>

                      <DetailBody>
                        <DetailCol>
                          <DetailColLabel>What it makes</DetailColLabel>
                          <MakesList>
                            {machineTyped.makes.map(item => (
                              <MakesItem key={item} $color={color}>{item}</MakesItem>
                            ))}
                          </MakesList>

                          <DetailColLabel style={{ marginTop: 8 }}>Materials</DetailColLabel>
                          <MaterialsRow>
                            {machineTyped.materials.map(mat => (
                              <MaterialChip key={mat}>{mat}</MaterialChip>
                            ))}
                          </MaterialsRow>

                          {machineTyped.externalLink && (
                            <ExternalLink
                              href={machineTyped.externalLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${machineTyped.externalLink.label} in a new tab`}
                            >
                              <MdOpenInNew size={11} />
                              {machineTyped.externalLink.label}
                            </ExternalLink>
                          )}
                        </DetailCol>

                        <DetailCol>
                          <DetailColLabel>About this station</DetailColLabel>
                          <DetailDesc>{machineTyped.description}</DetailDesc>
                        </DetailCol>
                      </DetailBody>
                    </MachinePanelContent>
                  </MachinePanel>
                )
              })}
            </MachineAccordion>
          </FadeIn>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Custom-fabrication stat ── */}
      <StatSection>
        <SectionInner>
          <FadeIn>
            <Chip>
              <ChipDot $color={theme.colors.secondary} />
              Custom Fabrication
            </Chip>
          </FadeIn>

          <div ref={statRef}>
            <StatGrid>
              <StatCopy>
                <FadeIn>
                  <StatNumber>~{fabStat.rangeHigh}%</StatNumber>
                  <StatLabel>Custom-Fabricated Parts — recent seasons</StatLabel>
                  <StatBody>{fabStat.context}</StatBody>
                </FadeIn>

                <FadeIn delay={100}>
                  <ProductionHubNote>
                    <ProductionHubText>
                      <strong>Production Hub:</strong> {productionHub.description}
                    </ProductionHubText>
                  </ProductionHubNote>
                </FadeIn>
              </StatCopy>

              <FadeIn delay={60}>
                <TrackWrap>
                  <TrackRow>
                    <TrackLabel>
                      <TrackLabelText>Freight Frenzy 2021–22</TrackLabelText>
                      <TrackLabelText>~{fabStat.rangeLow}%</TrackLabelText>
                    </TrackLabel>
                    <Track>
                      <TrackFill $pct={fabStat.rangeLow} $color={theme.colors.primary} $visible={statVisible} />
                    </Track>
                  </TrackRow>

                  <TrackRow>
                    <TrackLabel>
                      <TrackLabelText>POWERPLAY 2022–23</TrackLabelText>
                      <TrackLabelText>~100%</TrackLabelText>
                    </TrackLabel>
                    <Track>
                      <TrackFill $pct={98} $color={theme.colors.secondary} $visible={statVisible} />
                    </Track>
                  </TrackRow>

                  <TrackRow>
                    <TrackLabel>
                      <TrackLabelText>CENTERSTAGE 2023–24</TrackLabelText>
                      <TrackLabelText>~100%</TrackLabelText>
                    </TrackLabel>
                    <Track>
                      <TrackFill $pct={99} $color={theme.colors.secondary} $visible={statVisible} />
                    </Track>
                  </TrackRow>

                  <TrackRow>
                    <TrackLabel>
                      <TrackLabelText>Into the Deep 2024–25</TrackLabelText>
                      <TrackLabelText>100%</TrackLabelText>
                    </TrackLabel>
                    <Track>
                      <TrackFill $pct={100} $color={theme.colors.secondary} $visible={statVisible} />
                    </Track>
                  </TrackRow>

                  <TrackRow>
                    <TrackLabel>
                      <TrackLabelText>DECODE 2025–26 (3 iterations)</TrackLabelText>
                      <TrackLabelText>100%</TrackLabelText>
                    </TrackLabel>
                    <Track>
                      <TrackFill $pct={100} $color={theme.colors.tertiary} $visible={statVisible} />
                    </Track>
                  </TrackRow>
                </TrackWrap>
              </FadeIn>
            </StatGrid>
          </div>
        </SectionInner>
      </StatSection>

      <Divider />

      {/* ── Process Flow ── */}
      <PageSection>
        <SectionInner>
          <FadeIn>
            <Chip>
              <ChipDot $color={theme.colors.tertiary} />
              Build Pipeline
            </Chip>
          </FadeIn>

          <FadeIn delay={60}>
            <SectionHeading>
              <BlurText text="From file to field." delay={50} animateBy="words" />
            </SectionHeading>
            <SectionSubtitle>
              Every part follows the same path — from a fully-constrained CAD model
              through toolpath generation, then onto the appropriate machine, and
              finally into the assembled robot.
            </SectionSubtitle>
          </FadeIn>

          <FadeIn delay={100}>
            <div ref={processRef}>
              <ProcessGrid>
                {processSteps.map((step, i) => {
                  const Icon = PROCESS_ICONS[step.iconKey] ?? MdBuild
                  const stepColors = [
                    theme.colors.primary,
                    theme.colors.secondary,
                    theme.colors.tertiary,
                    theme.colors.secondary,
                  ]
                  const color = stepColors[i] ?? theme.colors.primary
                  return (
                    <ProcessCard
                      key={step.id}
                      style={{
                        opacity: processVisible ? 1 : 0,
                        transform: processVisible ? 'none' : 'translateY(12px)',
                        transition: `opacity 0.45s ease ${i * 90}ms, transform 0.45s ease ${i * 90}ms`,
                      }}
                    >
                      <ProcessStepNum>Step {String(i + 1).padStart(2, '0')}</ProcessStepNum>
                      <ProcessIconWell $color={color}>
                        <Icon size={20} color={color} />
                      </ProcessIconWell>
                      <ProcessStepName>{step.label}</ProcessStepName>
                      <ProcessStepDetail>{step.detail}</ProcessStepDetail>
                    </ProcessCard>
                  )
                })}
              </ProcessGrid>
            </div>
          </FadeIn>
        </SectionInner>
      </PageSection>

    </div>
  )
}
