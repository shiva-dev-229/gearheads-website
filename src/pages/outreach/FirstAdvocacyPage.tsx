import { useState, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdLandscape,
  MdGroups,
  MdFlag,
  MdSchool,
  MdMemory,
  MdVerified,
  MdCheckCircle,
  MdHowToVote,
  MdImage,
  MdPeople,
  MdAccountBalance,
  MdPersonOutline,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import CountUpChip from '../../components/reactbits/CountUpChip'
import data from '../../data/first-advocacy.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/first-advocacy/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const MILESTONE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  landmark:  MdLandscape,
  groups:    MdGroups,
  flag:      MdFlag,
  school:    MdSchool,
  memory:    MdMemory,
  verified:  MdVerified,
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

const HeroImageWell = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeroImage = styled.img`
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

// ─── Impact callout ───────────────────────────────────────────────────────────

const ImpactNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  padding: 22px 26px;
  border-left: 3px solid ${theme.colors.secondary};
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

// ─── Why we advocate ──────────────────────────────────────────────────────────

const NarrativeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 340px;
    gap: 48px;
  }
`

const NarrativeCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const NarrativeParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.85;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const NarrativeImageWell = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 900px) {
    position: sticky;
    top: 96px;
  }
`

const NarrativeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const NarrativeImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px;
  opacity: 0.22;
  color: ${theme.colors.onSurfaceVariant};
`

const NarrativeImageCaption = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
  text-align: center;
  max-width: 220px;
`

// ─── Milestone stepper ────────────────────────────────────────────────────────

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
  min-width: 64px;

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
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 3px;
    border-radius: 50%;
  }
`

const NodeCircle = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${({ $active }) =>
    $active
      ? `${theme.shadows.neoInsetSm}, 0 0 0 2px ${theme.colors.secondary}70, ${theme.shadows.glowGreen}`
      : theme.shadows.neoRaised};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, $completed }) =>
    $active
      ? theme.colors.secondary
      : $completed
      ? `${theme.colors.secondary}70`
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
      ? theme.colors.secondary
      : $completed
      ? `${theme.colors.secondary}70`
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
    background: ${theme.colors.secondary};
    width: ${({ $filled }) => ($filled ? '100%' : '0%')};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${({ $filled }) => ($filled ? `0 0 6px ${theme.colors.secondary}80` : 'none')};

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`

const MilestonePanel = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  padding: 28px 32px;
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const MilestoneStepLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 8px;
  opacity: 0.7;
`

const MilestoneTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${theme.colors.onSurface};
  margin: 0 0 10px;
`

const MilestoneSummary = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  font-style: italic;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 16px;
  opacity: 0.85;
`

const MilestoneDetail = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
`

const HighlightsLabel = styled.span`
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

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 10px;
  padding: 11px 14px;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurface};
  line-height: 1.45;
`

const HighlightIcon = styled.span`
  color: ${theme.colors.secondary};
  flex-shrink: 0;
  margin-top: 1px;
`

// ─── Officials / People section ───────────────────────────────────────────────

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const PersonCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 24px 18px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const PersonPortraitSlot = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border: 1px dashed ${theme.colors.outlineVariant}48;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s;

  ${PersonCard}:hover & {
    border-color: ${theme.colors.secondary}50;
  }
`

const PersonPortraitImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`

const PersonName = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
  line-height: 1.3;
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

const PersonNote = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.55;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.6;
  text-align: center;
`

// ─── Legislators grid ─────────────────────────────────────────────────────────

const LegislatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const LegislatorCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 18px;
  padding: 22px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const LegislatorAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.label};
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.secondary};
  letter-spacing: 0.04em;
  flex-shrink: 0;
`

const LegislatorChamberBadge = styled.span<{ $chamber: string }>`
  font-family: ${theme.fonts.label};
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  color: ${({ $chamber }) =>
    $chamber === 'Federal'
      ? theme.colors.primary
      : theme.colors.secondary};
`

const LegislatorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`

const LegislatorName = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
`

const LegislatorRole = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.55;
`

const LegislatorContext = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.55;
  text-align: center;
`

// ─── Photo strip & closing gallery ────────────────────────────────────────────

const PhotoStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const ClosingGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
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

// ─── Component ────────────────────────────────────────────────────────────────

const MILESTONES = data.milestones
const STATS = data.stats
const LEGISLATORS = data.legislators
const PHOTOS = data.photos
const PEOPLE = data.people
const CLOSING_GALLERY = data.closingGallery

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

const narrativeImageSrc = resolve(data.whyWeAdvocate.inlineImage)

export default function FirstAdvocacyPage() {
  const [activeMilestone, setActiveMilestone] = useState(0)
  const milestone = MILESTONES[activeMilestone]

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

              <HeroImageWell aria-label="Hero photo — GEarheads student advocates at the Wisconsin State Capitol">
                {heroPhotoSrc ? (
                  <HeroImage src={heroPhotoSrc} alt="GEarheads student advocates at the Wisconsin State Capitol" />
                ) : (
                  <HeroImagePlaceholder aria-hidden="true">
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
                <MdAccountBalance size={20} />
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
            <StatsRow>
              {STATS.map((s) => {
                const parsed = parseStatValue(s.value)
                return (
                  <StatChip key={s.label}>
                    {parsed ? (
                      <StatValue>
                        <CountUpChip
                          icon={<MdHowToVote size={14} color={theme.colors.secondary} />}
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

      {/* ── 4. Why We Advocate — narrative prose block ────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Our Approach</SectionLabel>
            <SectionHeading>{data.whyWeAdvocate.heading}</SectionHeading>
            <NarrativeLayout>
              <NarrativeCopy>
                {data.whyWeAdvocate.paragraphs.map((p, i) => (
                  <NarrativeParagraph key={i}>{p}</NarrativeParagraph>
                ))}
              </NarrativeCopy>

              <NarrativeImageWell aria-label="Inline photo — advocacy preparation">
                {narrativeImageSrc ? (
                  <NarrativeImage
                    src={narrativeImageSrc}
                    alt="GEarheads students preparing advocacy testimony"
                  />
                ) : (
                  <>
                    <NarrativeImagePlaceholder aria-hidden="true">
                      <MdImage size={32} />
                    </NarrativeImagePlaceholder>
                    <NarrativeImageCaption>
                      {data.whyWeAdvocate.inlineImageCaption}
                    </NarrativeImageCaption>
                  </>
                )}
              </NarrativeImageWell>
            </NarrativeLayout>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Advocacy milestones stepper ────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Milestones</SectionLabel>
            <SectionHeading>The Advocacy Timeline</SectionHeading>
            <SectionSubtext>
              Three years of deliberate, sustained policy work — from the first Advocacy Day at the
              Wisconsin Capitol to a signed bill directing $500K in annual state funding to K–12
              robotics programs.
            </SectionSubtext>

            <StepperRoot>
              <NodesRow aria-label="Advocacy milestone navigation">
                {MILESTONES.map((m, i) => {
                  const Icon = MILESTONE_ICONS[m.iconKey] ?? MdAccountBalance
                  const isActive = i === activeMilestone
                  const isCompleted = i < activeMilestone
                  const isLast = i === MILESTONES.length - 1

                  return (
                    <NodeWrapper key={m.id}>
                      <NodeButton
                        onClick={() => setActiveMilestone(i)}
                        aria-pressed={isActive}
                        aria-label={`Milestone ${i + 1}: ${m.label.replace('\n', ' ')}`}
                      >
                        <NodeCircle $active={isActive} $completed={isCompleted}>
                          <Icon size={22} />
                        </NodeCircle>
                        <NodeLabel $active={isActive} $completed={isCompleted}>
                          {m.label}
                        </NodeLabel>
                      </NodeButton>
                      {!isLast && <ConnectorBar $filled={activeMilestone > i} />}
                    </NodeWrapper>
                  )
                })}
              </NodesRow>

              <MilestonePanel
                key={activeMilestone}
                role="tabpanel"
                aria-label={milestone.label.replace('\n', ' ')}
              >
                <MilestoneStepLabel>
                  Milestone {milestone.step} of {MILESTONES.length}
                </MilestoneStepLabel>
                <MilestoneTitle>{milestone.label.replace('\n', ' ')}</MilestoneTitle>
                <MilestoneSummary>{milestone.summary}</MilestoneSummary>
                <MilestoneDetail>{milestone.detail}</MilestoneDetail>
                <HighlightsLabel>Key Facts</HighlightsLabel>
                <HighlightsList>
                  {milestone.highlights.map((h, i) => (
                    <HighlightItem key={i}>
                      <HighlightIcon>
                        <MdCheckCircle size={16} />
                      </HighlightIcon>
                      {h}
                    </HighlightItem>
                  ))}
                </HighlightsList>
              </MilestonePanel>
            </StepperRoot>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. Photo strip (from visits) ──────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Visits</SectionLabel>
            <PhotoStrip>
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <PhotoFrame key={i}>
                    <PhotoImg src={url} alt={p.caption} />
                  </PhotoFrame>
                ) : (
                  <PhotoSlot key={i} aria-label={`Photo slot: ${p.caption}`}>
                    <MdPeople size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                    <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                    <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                  </PhotoSlot>
                )
              })}
            </PhotoStrip>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. Officials We've Worked With — portrait person-cards ────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>People & Partners</SectionLabel>
            <SectionHeading>Officials We've Worked With</SectionHeading>
            <SectionSubtext>
              From the Wisconsin State Capitol to the U.S. Senate, these are the elected officials
              GEarheads students met with directly — building relationships that turned advocacy
              visits into legislative outcomes.
            </SectionSubtext>

            <PeopleGrid>
              {PEOPLE.map((person) => {
                const portraitSrc = resolve(person.photo)
                return (
                  <PersonCard key={person.name} aria-label={`${person.name}, ${person.title}`}>
                    <PersonPortraitSlot aria-label={`Portrait placeholder for ${person.name}`}>
                      {portraitSrc ? (
                        <PersonPortraitImg src={portraitSrc} alt={`Portrait of ${person.name}`} />
                      ) : (
                        <MdPersonOutline
                          size={32}
                          color={theme.colors.secondary}
                          style={{ opacity: 0.35 }}
                          aria-hidden="true"
                        />
                      )}
                    </PersonPortraitSlot>
                    <PersonInfo>
                      <PersonName>{person.name}</PersonName>
                      <PersonTitle>{person.title}</PersonTitle>
                      <PersonNote>{person.note}</PersonNote>
                    </PersonInfo>
                  </PersonCard>
                )
              })}
            </PeopleGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 8. Legislators reference grid ─────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Legislative Record</SectionLabel>
            <SectionHeading>Legislators We Engaged</SectionHeading>
            <SectionSubtext>
              A reference list of the elected officials GEarheads built direct working
              relationships with across three years of state and federal advocacy.
            </SectionSubtext>

            <LegislatorsGrid>
              {LEGISLATORS.map((l) => (
                <LegislatorCard key={l.name}>
                  <LegislatorAvatar>{initials(l.name)}</LegislatorAvatar>
                  <LegislatorChamberBadge $chamber={l.chamber}>
                    {l.chamber}
                  </LegislatorChamberBadge>
                  <LegislatorInfo>
                    <LegislatorName>{l.name}</LegislatorName>
                    <LegislatorRole>{l.role}</LegislatorRole>
                    <LegislatorContext>{l.context}</LegislatorContext>
                  </LegislatorInfo>
                </LegislatorCard>
              ))}
            </LegislatorsGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 9. Closing gallery ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Gallery</SectionLabel>
            <SectionHeading>Three Years in the Rooms Where It Happens</SectionHeading>
            <SectionSubtext>
              Photo documentation of GEarheads' advocacy work — from committee rooms at the
              Wisconsin Capitol to the halls of Congress.
            </SectionSubtext>

            <ClosingGallery>
              {CLOSING_GALLERY.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <PhotoFrame key={i}>
                    <PhotoImg src={url} alt={p.caption} />
                  </PhotoFrame>
                ) : (
                  <PhotoSlot key={i} aria-label={`Photo slot: ${p.caption}`}>
                    <MdImage size={20} color={theme.colors.outlineVariant} style={{ opacity: 0.35 }} aria-hidden="true" />
                    <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                    <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                  </PhotoSlot>
                )
              })}
            </ClosingGallery>
          </FadeIn>
        </Inner>
      </Section>

    </PageRoot>
  )
}
