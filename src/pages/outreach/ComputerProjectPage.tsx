import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdInbox,
  MdChecklistRtl,
  MdSecurity,
  MdSend,
  MdCheckCircle,
  MdLaptop,
  MdPublic,
  MdPeople,
  MdHandshake,
  MdImage,
  MdBusiness,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import CountUpChip from '../../components/reactbits/CountUpChip'
import data from '../../data/computer-project.json'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PipelineStep {
  id: string
  step: string
  label: string
  iconKey: string
  summary: string
  detail: string
  highlights: string[]
}

interface Recipient {
  name: string
  region: string
  description: string
}

interface PartnerOrg {
  name: string
  type: string
  note: string
  logo: string | null
}

interface GrowthEntry {
  season: string
  count: number
  label: string
}

interface Stat {
  value: string
  label: string
  hint: string
}

interface Photo {
  src: string | null
  caption: string
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const STEP_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  inbox:     MdInbox,
  checklist: MdChecklistRtl,
  security:  MdSecurity,
  send:      MdSend,
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
  border: 1px dashed ${theme.colors.outlineVariant}38;

  @media (min-width: 768px) {
    aspect-ratio: 4 / 3;
  }
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

const HeroImagePlaceholderLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
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

// ─── Pipeline stepper ─────────────────────────────────────────────────────────

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

const StepDetailPanel = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  padding: 28px 32px;
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StepStepLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 8px;
  opacity: 0.7;
`

const StepTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${theme.colors.onSurface};
  margin: 0 0 10px;
`

const StepSummary = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  font-style: italic;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 16px;
  opacity: 0.85;
`

const StepDetail = styled.p`
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

// ─── Inline photo slot ────────────────────────────────────────────────────────

const InlinePhotoSlot = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 20px;
  aspect-ratio: 16 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 32px;
  border: 1px dashed ${theme.colors.outlineVariant}38;
  margin-bottom: 36px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${theme.colors.outlineVariant}60;
  }

  @media (min-width: 768px) {
    aspect-ratio: 16 / 6;
  }
`

const InlinePhotoLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const InlinePhotoHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.4;
  text-align: center;
  max-width: 280px;
`

// ─── Recipients grid ──────────────────────────────────────────────────────────

const RecipientsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const RecipientCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const RecipientRegion = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const RecipientName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const RecipientDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Partner org cards ────────────────────────────────────────────────────────

const PartnerCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const PartnerOrgCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 20px 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const PartnerLogoSlot = styled.div`
  width: 100%;
  aspect-ratio: 3 / 2;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${theme.colors.outlineVariant}38;
  flex-shrink: 0;
  transition: border-color 0.2s;

  ${PartnerOrgCard}:hover & {
    border-color: ${theme.colors.outlineVariant}60;
  }
`

const PartnerLogoImg = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`

const PartnerLogoPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.22;
  color: ${theme.colors.onSurfaceVariant};
`

const PartnerLogoHint = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const PartnerOrgName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const PartnerTypeChip = styled.span`
  display: inline-block;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.75;
`

const PartnerNote = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.75;
`

// ─── Narrative block ──────────────────────────────────────────────────────────

const NarrativeBlock = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  padding: 32px 28px;
  border-left: 3px solid ${theme.colors.secondary};
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    padding: 36px 40px;
  }
`

const NarrativeParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.85;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const NarrativeCallout = styled.blockquote`
  margin: 0;
  padding: 18px 22px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-radius: 14px;
  border-left: 2px solid ${theme.colors.secondary}60;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-style: italic;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.85;
`

// ─── Growth callout ───────────────────────────────────────────────────────────

const GrowthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const GrowthCard = styled.div<{ $current?: boolean }>`
  background: ${theme.colors.background};
  box-shadow: ${({ $current }) =>
    $current
      ? `${theme.shadows.neoInset}, 0 0 0 1px ${theme.colors.secondary}40, ${theme.shadows.glowGreen}`
      : theme.shadows.neoRaised};
  border-radius: 18px;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }
`

const GrowthSeason = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
`

const GrowthCount = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${theme.colors.secondary};
  line-height: 1;
`

const GrowthUnit = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
`

// ─── Photo strip ──────────────────────────────────────────────────────────────

const PhotoStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
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

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PIPELINE     = data.pipeline    as PipelineStep[]
const STATS        = data.stats       as Stat[]
const RECIPIENTS   = data.recipients  as Recipient[]
const PARTNER_ORGS = data.partnerOrgs as PartnerOrg[]
const GROWTH       = data.growth      as GrowthEntry[]
const PHOTOS       = data.photos      as Photo[]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComputerProjectPage() {
  const [activeStep, setActiveStep] = useState(0)
  const step = PIPELINE[activeStep]

  const heroPhoto: string | null = (data.hero as { heroPhoto: string | null }).heroPhoto

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

              <HeroImageWell aria-label="Hero photo — computer project">
                {heroPhoto ? (
                  <HeroImage src={heroPhoto} alt="Computer project program" />
                ) : (
                  <HeroImagePlaceholder>
                    <MdLaptop size={32} />
                    <HeroImagePlaceholderLabel>Photo slot</HeroImagePlaceholderLabel>
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
            <ImpactNote aria-label="Global reach impact">
              <ImpactIconWell aria-hidden="true">
                <MdPublic size={20} />
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
                          icon={<MdLaptop size={14} color={theme.colors.secondary} />}
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

      {/* ── 4. The Pipeline stepper ───────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>The Pipeline</SectionHeading>
            <SectionSubtext>
              Every laptop follows the same four-step journey — from the moment it arrives at a
              collection point to the day it ships to a student who needs it. Tap any stage to read
              the full story of what happens inside it.
            </SectionSubtext>

            <StepperRoot>
              <NodesRow>
                {PIPELINE.map((p, i) => {
                  const Icon = STEP_ICONS[p.iconKey] ?? MdLaptop
                  const isActive    = i === activeStep
                  const isCompleted = i < activeStep
                  const isLast      = i === PIPELINE.length - 1

                  return (
                    <NodeWrapper key={p.id}>
                      <NodeButton
                        onClick={() => setActiveStep(i)}
                        aria-pressed={isActive}
                        aria-label={`Step ${i + 1}: ${p.label}`}
                      >
                        <NodeCircle $active={isActive} $completed={isCompleted}>
                          <Icon size={22} />
                        </NodeCircle>
                        <NodeLabel $active={isActive} $completed={isCompleted}>
                          {p.label}
                        </NodeLabel>
                      </NodeButton>
                      {!isLast && <ConnectorBar $filled={activeStep > i} />}
                    </NodeWrapper>
                  )
                })}
              </NodesRow>

              <StepDetailPanel key={activeStep} role="tabpanel" aria-label={step.label}>
                <StepStepLabel>Step {step.step} of {PIPELINE.length}</StepStepLabel>
                <StepTitle>{step.label}</StepTitle>
                <StepSummary>{step.summary}</StepSummary>
                <StepDetail>{step.detail}</StepDetail>
                <HighlightsLabel>What happens here</HighlightsLabel>
                <HighlightsList>
                  {step.highlights.map((h, i) => (
                    <HighlightItem key={i}>
                      <HighlightIcon>
                        <MdCheckCircle size={16} />
                      </HighlightIcon>
                      {h}
                    </HighlightItem>
                  ))}
                </HighlightsList>
              </StepDetailPanel>
            </StepperRoot>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Where they go ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Recipients</SectionLabel>
            <SectionHeading>Where They Go</SectionHeading>
            <SectionSubtext>
              We match every batch of machines to a specific program — an FTC team trying to run
              Android Studio on borrowed hardware, a community education center, a nonprofit with
              in-country logistics. These are the organizations receiving machines this season and
              historically.
            </SectionSubtext>

            <InlinePhotoSlot aria-label="Inline photo — recipients">
              <MdImage size={24} color={theme.colors.outlineVariant} style={{ opacity: 0.3 }} />
              <InlinePhotoLabel>Photo slot</InlinePhotoLabel>
              <InlinePhotoHint>In the field — laptops delivered and in use at a recipient program</InlinePhotoHint>
            </InlinePhotoSlot>

            <RecipientsGrid>
              {RECIPIENTS.map((r) => (
                <RecipientCard key={r.name} aria-label={`Recipient: ${r.name}`}>
                  <RecipientRegion>{r.region}</RecipientRegion>
                  <RecipientName>{r.name}</RecipientName>
                  <RecipientDesc>{r.description}</RecipientDesc>
                </RecipientCard>
              ))}
            </RecipientsGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. People & Partners ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>People & Partners</SectionLabel>
            <SectionHeading>Who Makes It Possible</SectionHeading>
            <SectionSubtext>
              The project depends on a network of corporate donors, local businesses, and
              distribution partners. Corporate partners supply the bulk of our incoming machines;
              Tech Lit Africa handles international last-mile logistics; local libraries and
              dealerships serve as convenient drop-off points for the community.
            </SectionSubtext>

            <PartnerCardsGrid>
              {PARTNER_ORGS.map((p) => (
                <PartnerOrgCard key={p.name} aria-label={`Partner: ${p.name}`}>
                  <PartnerLogoSlot aria-label={`${p.name} logo placeholder`}>
                    {p.logo ? (
                      <PartnerLogoImg src={p.logo} alt={`${p.name} logo`} />
                    ) : (
                      <PartnerLogoPlaceholder>
                        <MdBusiness size={22} />
                        <PartnerLogoHint>Logo</PartnerLogoHint>
                      </PartnerLogoPlaceholder>
                    )}
                  </PartnerLogoSlot>
                  <PartnerOrgName>{p.name}</PartnerOrgName>
                  <PartnerTypeChip>{p.type}</PartnerTypeChip>
                  <PartnerNote>{p.note}</PartnerNote>
                </PartnerOrgCard>
              ))}
            </PartnerCardsGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. Five-year growth ───────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Growth</SectionLabel>
            <SectionHeading>Five Seasons, Six Times the Volume</SectionHeading>
            <SectionSubtext>
              What began as a handful of machines in our first season has grown into a structured
              program that scales every year. The jump from 2022–23 to 2025–26 is not accidental —
              it reflects refining the collection pipeline, building partner relationships, and
              expanding our distribution network to match demand.
            </SectionSubtext>

            <GrowthGrid>
              {GROWTH.map((g, i) => (
                <GrowthCard key={g.season} $current={i === GROWTH.length - 1}>
                  <GrowthSeason>{g.season}</GrowthSeason>
                  <GrowthCount>{g.label}</GrowthCount>
                  <GrowthUnit>laptops</GrowthUnit>
                </GrowthCard>
              ))}
            </GrowthGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 8. Why It Matters — narrative ────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Why It Matters</SectionLabel>
            <SectionHeading>{data.whyItMatters.heading}</SectionHeading>
            <NarrativeBlock aria-label="Why it matters narrative">
              <NarrativeParagraph>{data.whyItMatters.body}</NarrativeParagraph>
              <NarrativeCallout>{data.whyItMatters.callout}</NarrativeCallout>
            </NarrativeBlock>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 9. Photo strip ────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Program</SectionLabel>
            <PhotoStrip>
              {PHOTOS.map((p, i) => (
                <PhotoSlot key={i} aria-label={`Photo slot: ${p.caption}`}>
                  <MdPeople size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                  <PhotoSlotLabel>
                    <MdHandshake size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    Photo slot
                  </PhotoSlotLabel>
                  <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                </PhotoSlot>
              ))}
            </PhotoStrip>
          </FadeIn>
        </Inner>
      </Section>

    </PageRoot>
  )
}
