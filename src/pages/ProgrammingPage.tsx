import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { MdCheckCircleOutline } from 'react-icons/md'
import { theme } from '../styles/theme'
import BlurText from '../components/reactbits/BlurText'
import FadeIn from '../components/reactbits/FadeIn'
import programmingData from '../data/programming.json'
import ControlSection from './programming/ControlPage'
import AutonomousSection from './programming/AutonomousPage'
import InnovationsSection from './programming/InnovationsPage'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Layer {
  id: string
  number: number
  label: string
  title: string
  description: string
  bullets: string[]
}

interface Stat {
  value: string
  label: string
  hint: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LAYERS = programmingData.layers as Layer[]
const STATS = programmingData.stats as Stat[]

// ─── Animations ───────────────────────────────────────────────────────────────

const panelIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout ──────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`

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
    ${theme.colors.outlineVariant}30,
    transparent
  );
`

// ─── Shared Label / Chip ──────────────────────────────────────────────────────

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
`

const ChipDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? theme.colors.secondary};
  flex-shrink: 0;
`

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

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  padding: 56px ${theme.spacing.marginMobile} 44px;

  @media (min-width: 768px) {
    padding: 80px ${theme.spacing.marginDesktop} 56px;
  }
`

const HeroInner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

const HeroBody = styled.div`
  max-width: 720px;
`

const HeroIntro = styled.p`
  font-family: ${theme.fonts.body};
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 36px;

  strong {
    color: ${theme.colors.primary};
    font-weight: 600;
  }
`

// ─── Layer Explorer ───────────────────────────────────────────────────────────

const ExplorerSection = styled(PageSection)`
  padding-top: 0;
`

const ExplorerLabel = styled.div`
  margin-bottom: 32px;
`

const LayerRail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const LayerTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border: none;
  border-radius: 16px;
  background: ${theme.colors.background};
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  text-align: left;

  box-shadow: ${({ $active }) =>
    $active ? theme.shadows.neoInset : theme.shadows.neoRaisedSm};

  &:hover {
    box-shadow: ${({ $active }) =>
      $active ? theme.shadows.neoInset : theme.shadows.neoRaised};
    transform: ${({ $active }) => ($active ? 'none' : 'translateY(-2px)')};
  }

  &:active {
    box-shadow: ${theme.shadows.neoInset};
    transform: none;
  }
`

const LayerNumber = styled.span<{ $active: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${({ $active }) =>
    $active ? theme.shadows.neoInsetSm : theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.label};
  font-size: 13px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  flex-shrink: 0;
  transition: color 0.2s ease, box-shadow 0.2s ease;
`

const LayerTabText = styled.div``

const LayerTabLabel = styled.span<{ $active: boolean }>`
  display: block;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  transition: color 0.2s ease;
`

const PhasePanel = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 24px;
  padding: 40px;
  animation: ${panelIn} 0.25s ease both;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }

  @media (max-width: 767px) {
    padding: 28px 24px;
  }
`

const PanelLeft = styled.div``

const PanelPhaseLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  display: block;
  margin-bottom: 10px;
`

const PanelTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 16px;
`

const PanelDescription = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const PanelRight = styled.div`
  @media (max-width: 767px) {
    margin-top: 28px;
  }
`

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
`

const BulletIcon = styled.span`
  color: ${theme.colors.secondary};
  margin-top: 1px;
  flex-shrink: 0;
`

const PanelDivider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.outlineVariant}30,
    transparent
  );
  margin: 28px 0;

  @media (min-width: 768px) {
    display: none;
  }
`

// ─── Stats Row ────────────────────────────────────────────────────────────────

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.gutter};

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const StatChip = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StatValue = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.primary};
  line-height: 1.1;
`

const StatLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
`

const StatHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.65;
  margin-top: 2px;
`

// ─── Scroll Reveal ───────────────────────────────────────────────────────────

function useScrollReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return ref
}

const RevealSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s ease, transform 0.55s ease;

  &.sr-visible {
    opacity: 1;
    transform: none;
  }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgrammingPage() {
  const [activeLayer, setActiveLayer] = useState(0)

  const statsRef = useScrollReveal<HTMLDivElement>()

  const layer = LAYERS[activeLayer]

  return (
    <PageWrapper>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <HeroBody>
            <Chip>
              <ChipDot $color={theme.colors.primary} />
              Software
            </Chip>

            <SectionHeading>
              <BlurText text="How We Program" delay={120} animateBy="words" />
            </SectionHeading>

            <FadeIn delay={300}>
              <HeroIntro>
                Our robot code is built in <strong>Java</strong> on the FTC SDK and structured in
                clear layers — hardware abstraction at the base, closed-loop control on top,
                autonomous navigation above that, and live tooling wrapped around all of it. The
                goal is software that's <strong>reliable, tunable, and reusable</strong>: a proven
                foundation we carry from season to season instead of rebuilding from scratch every
                year.
              </HeroIntro>
            </FadeIn>
          </HeroBody>
        </HeroInner>
      </HeroSection>

      <Divider />

      {/* ── Layer Explorer ────────────────────────────────── */}
      <ExplorerSection>
        <SectionInner>
          <ExplorerLabel>
            <Chip>
              <ChipDot $color={theme.colors.secondary} />
              Software Stack
            </Chip>
          </ExplorerLabel>

          <SectionHeading>
            <BlurText text="Built in Layers" delay={100} animateBy="words" />
          </SectionHeading>

          <SectionSubtitle>
            Each layer builds on the one below it — and each one is designed to work the same way
            no matter what the game is. Click a layer to see how it works.
          </SectionSubtitle>

          <LayerRail role="tablist" aria-label="Software layers">
            {LAYERS.map((l, i) => (
              <LayerTab
                key={l.id}
                role="tab"
                aria-selected={activeLayer === i}
                aria-controls={`layer-panel-${l.id}`}
                $active={activeLayer === i}
                onClick={() => setActiveLayer(i)}
              >
                <LayerNumber $active={activeLayer === i}>{l.number}</LayerNumber>
                <LayerTabText>
                  <LayerTabLabel $active={activeLayer === i}>{l.label}</LayerTabLabel>
                </LayerTabText>
              </LayerTab>
            ))}
          </LayerRail>

          <PhasePanel
            key={layer.id}
            role="tabpanel"
            id={`layer-panel-${layer.id}`}
            aria-label={`Layer ${layer.number}: ${layer.title}`}
          >
            <PanelLeft>
              <PanelPhaseLabel>Layer {layer.number} — {layer.label}</PanelPhaseLabel>
              <PanelTitle>{layer.title}</PanelTitle>
              <PanelDescription>{layer.description}</PanelDescription>
              <PanelDivider />
            </PanelLeft>
            <PanelRight>
              <BulletList>
                {layer.bullets.map((bullet, i) => (
                  <BulletItem key={i}>
                    <BulletIcon>
                      <MdCheckCircleOutline size={16} />
                    </BulletIcon>
                    {bullet}
                  </BulletItem>
                ))}
              </BulletList>
            </PanelRight>
          </PhasePanel>
        </SectionInner>
      </ExplorerSection>

      <Divider />

      {/* ── Stats ─────────────────────────────────────────── */}
      <PageSection>
        <SectionInner>
          <RevealSection ref={statsRef}>
            <Chip>
              <ChipDot $color={theme.colors.primary} />
              At a Glance
            </Chip>

            <StatsRow>
              {STATS.map((stat) => (
                <StatChip key={stat.label}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatHint>{stat.hint}</StatHint>
                </StatChip>
              ))}
            </StatsRow>
          </RevealSection>
        </SectionInner>
      </PageSection>

      <Divider />
      <ControlSection />
      <Divider />
      <AutonomousSection />
      <Divider />
      <InnovationsSection />
    </PageWrapper>
  )
}
