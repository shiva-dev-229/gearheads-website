import { useState, type ComponentType } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  MdLightbulb,
  MdLaunch,
  MdAir,
  MdMemory,
  MdSports,
  MdCardGiftcard,
  MdCheckCircle,
  MdLocalHospital,
  MdPeople,
  MdVolunteerActivism,
  MdImage,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import CountUpChip from '../../components/reactbits/CountUpChip'
import data from '../../data/childrens-hospital.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/childrens-hospital/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon + color maps ────────────────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  lightbulb:    MdLightbulb,
  launch:       MdLaunch,
  air:          MdAir,
  memory:       MdMemory,
  sports:       MdSports,
  cardGiftcard: MdCardGiftcard,
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout shell ─────────────────────────────────────────────────────────────

const PageRoot = styled.div`
  width: 100%;
  overflow-x: hidden;
`

const HeroSection = styled.section`
  padding: 36px ${theme.spacing.marginMobile} 24px;

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop} 32px;
  }
`

const HeroInner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

const HeroLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 420px;
    gap: 48px;
  }
`

const HeroCopy = styled.div``

const HeroImageWell = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.25;
  color: ${theme.colors.onSurfaceVariant};
`

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
`

// ─── Hero atoms ───────────────────────────────────────────────────────────────

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

const ChipDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${theme.colors.secondary};
  flex-shrink: 0;
`

const HeroHeading = styled.div`
  margin-bottom: 20px;

  p {
    font-family: ${theme.fonts.headline} !important;
    font-size: clamp(28px, 4.5vw, 46px) !important;
    font-weight: 700 !important;
    letter-spacing: -0.04em !important;
    line-height: 1.1 !important;
    color: ${theme.colors.onSurface} !important;
    gap: 0.25em !important;
    margin: 0 !important;
  }
`

const HeroSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: clamp(13px, 1.5vw, 15px);
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 620px;
  margin: 0;
`

// ─── Impact callout ───────────────────────────────────────────────────────────

const ImpactNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  padding: 22px 26px;
  max-width: 780px;
`

const ImpactIconWell = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
  flex-shrink: 0;
`

const ImpactBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ImpactEyebrow = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.75;
`

const ImpactText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Section header atoms ─────────────────────────────────────────────────────

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

// ─── Stats row ────────────────────────────────────────────────────────────────

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

const StatChip = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
  flex: 1;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }
`

const StatValue = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${theme.colors.secondary};
  line-height: 1;
`

const StatLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
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
`

const StatsGroupLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  margin: 0 0 10px;
`

// ─── Horizontal accordion (activities) ───────────────────────────────────────

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

  ${({ $active }) =>
    !$active &&
    css`
      &:hover ${StageLabel} {
        opacity: 0.65;
      }
    `}

  @media (max-width: 767px) {
    flex: none;
    height: ${({ $active }) => ($active ? '480px' : '52px')};
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

const StageIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${theme.colors.secondary};
`

const StageStepNo = styled.span<{ $active: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: ${({ $active }) => ($active ? theme.colors.secondary : theme.colors.onSurfaceVariant)};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};

  @media (max-width: 767px) {
    display: none;
  }
`

const Accordion = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  height: 560px;
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 72px;
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

const ContentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
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
  font-style: italic;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 16px;
  line-height: 1.55;
  opacity: 0.85;
`

const ContentDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
  max-width: 620px;
`

const HighlightsLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0 0 12px;
`

const HighlightsList = styled.ul`
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

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};

  svg {
    color: ${theme.colors.secondary};
    margin-top: 1px;
    flex-shrink: 0;
  }
`

// ─── Delivery section ─────────────────────────────────────────────────────────

const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const DeliveryCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const DeliveryCardTitle = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
`

const DeliveryCardDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── People & Partners ────────────────────────────────────────────────────────

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PersonCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 26px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const PersonPortrait = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border: 1px dashed ${theme.colors.outlineVariant}48;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
  overflow: hidden;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${theme.colors.outlineVariant}70;
  }
`

const PersonPortraitImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`

const PersonPortraitInitials = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.secondary};
  letter-spacing: 0.04em;
`

const PersonPortraitHint = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  opacity: 0.55;
`

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PersonName = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
`

const PersonTitle = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.75;
`

const PersonNote = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 6px 0 0;
`

// ─── Photo strip ──────────────────────────────────────────────────────────────

const PhotoGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const PhotoRow = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  gap: 14px;

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`

const PhotoFrame = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
`

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PhotoSlot = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 18px;
  aspect-ratio: 4 / 3;
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

const PhotoSlotLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const PhotoSlotHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  text-align: center;
  max-width: 220px;
`

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Activity detail panel ───────────────────────────────────────────────────

const ActivityDetailPanel = styled.div`
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// ─── Constants ────────────────────────────────────────────────────────────────

const ACTIVITIES = data.activities
const STATS_SEASON = data.statsThisSeason
const STATS_ALLTIME = data.statsAllTime
const DELIVERY = data.delivery
const PEOPLE = data.people
const PHOTOS = data.photos

// ─── Resolve hero image ───────────────────────────────────────────────────────

const heroImageKeys = Object.keys(RAW_IMAGES)
const firstHeroImage =
  heroImageKeys.length > 0 ? RAW_IMAGES[heroImageKeys[0]] : null

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChildrensHospitalPage() {
  const [activeActivity, setActiveActivity] = useState(0)

  return (
    <PageRoot>

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <FadeIn direction="up" delay={0}>
            <HeroLayout>
              <HeroCopy>
                <Chip>
                  <ChipDot />
                  {data.hero.chip}
                </Chip>
                <HeroHeading>
                  <BlurText
                    text={data.hero.title}
                    delay={55}
                    animateBy="words"
                    direction="bottom"
                  />
                </HeroHeading>
                <HeroSubtitle>{data.hero.subtitle}</HeroSubtitle>
              </HeroCopy>

              <HeroImageWell aria-label="Program hero image">
                {firstHeroImage ? (
                  <HeroImg src={firstHeroImage} alt="Children's Hospital program" />
                ) : (
                  <HeroImagePlaceholder>
                    <MdImage size={36} />
                  </HeroImagePlaceholder>
                )}
              </HeroImageWell>
            </HeroLayout>
          </FadeIn>
        </HeroInner>
      </HeroSection>

      {/* ── 2. Impact callout ─────────────────────────────────────────── */}
      <Section style={{ paddingTop: 0 }}>
        <Inner>
          <FadeIn direction="up">
            <ImpactNote>
              <ImpactIconWell aria-hidden="true">
                <MdLocalHospital size={20} />
              </ImpactIconWell>
              <ImpactBody>
                <ImpactEyebrow>{data.impact.label}</ImpactEyebrow>
                <ImpactText>{data.impact.text}</ImpactText>
              </ImpactBody>
            </ImpactNote>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 3. Stats ──────────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>By The Numbers</SectionLabel>
            <SectionHeading>Impact, measured</SectionHeading>
            <SectionSubtext>
              Four seasons of sustained programming — every number is real, every session was run inside Children's Wisconsin.
            </SectionSubtext>

            <StatsGroupLabel>This Season</StatsGroupLabel>
            <StatsRow style={{ marginBottom: 28 }}>
              {STATS_SEASON.map((s) => {
                const parsed = parseStatValue(s.value)
                return (
                  <StatChip key={s.label}>
                    {parsed ? (
                      <StatValue>
                        <CountUpChip
                          icon={<MdVolunteerActivism size={14} color={theme.colors.secondary} />}
                          countTo={parsed.count}
                          suffix={parsed.suffix}
                        />
                      </StatValue>
                    ) : (
                      <StatValue>{s.value}</StatValue>
                    )}
                    <StatLabel>{s.label}</StatLabel>
                    <StatHint>{s.hint}</StatHint>
                  </StatChip>
                )
              })}
            </StatsRow>

            <StatsGroupLabel>All Time</StatsGroupLabel>
            <StatsRow>
              {STATS_ALLTIME.map((s) => {
                const parsed = parseStatValue(s.value)
                return (
                  <StatChip key={s.label}>
                    {parsed ? (
                      <StatValue>
                        <CountUpChip
                          icon={<MdPeople size={14} color={theme.colors.secondary} />}
                          countTo={parsed.count}
                          suffix={parsed.suffix}
                        />
                      </StatValue>
                    ) : (
                      <StatValue>{s.value}</StatValue>
                    )}
                    <StatLabel>{s.label}</StatLabel>
                    <StatHint>{s.hint}</StatHint>
                  </StatChip>
                )
              })}
            </StatsRow>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 4. Activities accordion ───────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Activities</SectionLabel>
            <SectionHeading>What we do in every session</SectionHeading>
            <SectionSubtext>
              Six hands-on activities, each chosen because it creates a moment of genuine engineering engagement. Click an activity to expand it.
            </SectionSubtext>
          </FadeIn>

          <FadeIn direction="up" delay={80}>
            <Accordion>
              {ACTIVITIES.map((act, i) => {
                const Icon = ACTIVITY_ICONS[act.iconKey] ?? MdLightbulb
                const isActive = i === activeActivity
                return (
                  <StagePanel
                    key={act.id}
                    $active={isActive}
                    onClick={() => setActiveActivity(i)}
                    aria-expanded={isActive}
                    aria-label={act.label}
                  >
                    <StageStrip>
                      <StageIcon>
                        <Icon size={20} />
                      </StageIcon>
                      <StageStepNo $active={isActive}>0{i + 1}</StageStepNo>
                      <StageLabel>{act.label}</StageLabel>
                    </StageStrip>

                    <StageContent $visible={isActive} aria-hidden={!isActive}>
                      <ActivityDetailPanel key={activeActivity}>
                        <ContentBadge>Activity 0{i + 1}</ContentBadge>
                        <ContentName>{act.label}</ContentName>
                        <ContentTagline>{act.tagline}</ContentTagline>
                        <ContentDesc>{act.description}</ContentDesc>
                        <HighlightsLabel>Highlights</HighlightsLabel>
                        <HighlightsList>
                          {act.highlights.map((h, j) => (
                            <HighlightItem key={j}>
                              <MdCheckCircle size={15} />
                              {h}
                            </HighlightItem>
                          ))}
                        </HighlightsList>
                      </ActivityDetailPanel>
                    </StageContent>
                  </StagePanel>
                )
              })}
            </Accordion>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Hybrid delivery ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{DELIVERY.label}</SectionLabel>
            <SectionHeading>{DELIVERY.heading}</SectionHeading>
            <SectionSubtext>{DELIVERY.subtext}</SectionSubtext>

            <DeliveryGrid>
              {DELIVERY.modes.map((mode) => (
                <DeliveryCard key={mode.title}>
                  <DeliveryCardTitle>{mode.title}</DeliveryCardTitle>
                  <DeliveryCardDesc>{mode.desc}</DeliveryCardDesc>
                </DeliveryCard>
              ))}
            </DeliveryGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. People & Partners ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>People & Partners</SectionLabel>
            <SectionHeading>The clinicians behind the program</SectionHeading>
            <SectionSubtext style={{ marginBottom: 24 }}>
              Two Children's Wisconsin clinicians advise on every aspect of the program — from activity design to patient scheduling to clinical safety.
            </SectionSubtext>

            <PeopleGrid>
              {PEOPLE.map((p) => {
                const photoUrl = resolve(p.photo)
                return (
                  <PersonCard key={p.name}>
                    <PersonPortrait aria-label={`Portrait photo slot for ${p.name}`}>
                      {photoUrl ? (
                        <PersonPortraitImg src={photoUrl} alt={p.name} />
                      ) : (
                        <>
                          <PersonPortraitInitials>{initials(p.name)}</PersonPortraitInitials>
                          <PersonPortraitHint>Photo</PersonPortraitHint>
                        </>
                      )}
                    </PersonPortrait>
                    <PersonInfo>
                      <PersonName>{p.name}</PersonName>
                      <PersonTitle>{p.title}</PersonTitle>
                      <PersonNote>{p.note}</PersonNote>
                    </PersonInfo>
                  </PersonCard>
                )
              })}
            </PeopleGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. Photo gallery ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Sessions</SectionLabel>
            <PhotoGallery>
              <PhotoRow $cols={3}>
                {PHOTOS.slice(0, 3).map((p, i) => {
                  const url = resolve(p.src)
                  return url ? (
                    <PhotoFrame key={i}>
                      <PhotoImg src={url} alt={p.caption} />
                    </PhotoFrame>
                  ) : (
                    <PhotoSlot key={i} aria-label={`Photo slot: ${p.caption}`}>
                      <MdImage size={18} color={theme.colors.outlineVariant} aria-hidden="true" />
                      <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                      <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                    </PhotoSlot>
                  )
                })}
              </PhotoRow>
              <PhotoRow $cols={2}>
                {PHOTOS.slice(3).map((p, i) => {
                  const url = resolve(p.src)
                  return url ? (
                    <PhotoFrame key={i}>
                      <PhotoImg src={url} alt={p.caption} />
                    </PhotoFrame>
                  ) : (
                    <PhotoSlot key={i} aria-label={`Photo slot: ${p.caption}`}>
                      <MdImage size={18} color={theme.colors.outlineVariant} aria-hidden="true" />
                      <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                      <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                    </PhotoSlot>
                  )
                })}
              </PhotoRow>
            </PhotoGallery>
          </FadeIn>
        </Inner>
      </Section>

    </PageRoot>
  )
}
