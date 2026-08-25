import { useRef, useEffect, useState, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdPrecisionManufacturing,
  MdPrint,
  MdFlashOn,
  MdColorLens,
  MdCheckCircle,
  MdSports,
  MdEngineering,
  MdGroup,
  MdImage,
  MdPeople,
  MdHandshake,
  MdAcUnit,
  MdGroups,
  MdBuild,
  MdExpandMore,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import CountUpChip from '../../components/reactbits/CountUpChip'
import data from '../../data/production-hub.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/production-hub/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon maps ────────────────────────────────────────────────────────────────

const SERVICE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  precisionManufacturing: MdPrecisionManufacturing,
  print:                  MdPrint,
  flashOn:                MdFlashOn,
  colorLens:              MdColorLens,
}

const PARTNER_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  sports:      MdSports,
  engineering: MdEngineering,
  ac_unit:     MdAcUnit,
  group:       MdGroup,
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

// ─── How It Works — prose + inline sticky photo ───────────────────────────────

const ApproachLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 360px;
    gap: 48px;
  }
`

const ApproachProse = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ApproachParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const ApproachImageWell = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    position: sticky;
    top: 80px;
  }
`

const ApproachImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ApproachImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
`

const ApproachImageLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const ApproachImageHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  text-align: center;
  max-width: 220px;
`

// ─── Request form ─────────────────────────────────────────────────────────────

const RequestCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 24px;
  padding: 32px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 40px 48px;
  }
`

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 8px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`

const FieldGroup = styled.div<{ $span2?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 640px) {
    grid-column: ${({ $span2 }) => ($span2 ? 'span 2' : 'span 1')};
  }
`

const FieldLabel = styled.label`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.7;
`

const fieldBase = `
  background: ${theme.colors.surfaceRaised};
  border-radius: ${theme.rounded.sm};
  border: 1px solid ${theme.colors.hairlineStrong};
  padding: 14px 16px;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
`

const Input = styled.input`
  ${fieldBase}
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;

  &::placeholder {
    color: ${theme.colors.onSurfaceVariant}4d;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}22;
  }
`

const Textarea = styled.textarea`
  ${fieldBase}
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  min-height: 110px;
  resize: vertical;

  &::placeholder {
    color: ${theme.colors.onSurfaceVariant}4d;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}22;
  }
`

const SelectWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const Select = styled.select`
  ${fieldBase}
  appearance: none;
  -webkit-appearance: none;
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  padding-right: 40px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}22;
  }

  option {
    background: ${theme.colors.background};
    color: ${theme.colors.onSurface};
  }
`

const SelectChevron = styled(MdExpandMore)`
  position: absolute;
  right: 14px;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.6;
  pointer-events: none;
`

const SubmitButton = styled.button`
  justify-self: start;
  background: ${theme.colors.background};
  color: ${theme.colors.primary};
  box-shadow: ${theme.shadows.neoButtonPrimary};
  border-radius: 50px;
  border: none;
  padding: 16px 32px;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:active {
    box-shadow: ${theme.shadows.neoButtonPrimaryActive};
  }
`

const FormNote = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.6;
  margin: 14px 0 0;

  a {
    color: ${theme.colors.primary};
    opacity: 1;
    text-decoration: underline;
  }
`

// ─── Bento grid — services ────────────────────────────────────────────────────

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
    box-shadow: ;
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
  color: ${theme.colors.secondary};
  flex-shrink: 0;
`

const CardText = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
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
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const CardHighlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`

const CardHighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  color: ${theme.colors.onSurface};
  line-height: 1.45;
`

const CardHighlightIcon = styled.span`
  color: ${theme.colors.secondary};
  flex-shrink: 0;
  margin-top: 1px;
`

// ─── Partner cards (Teams We Support) ────────────────────────────────────────

const PartnersGrid = styled.div`
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

const PartnerCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 26px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  animation: ${fadeUp} 0.4s ease both;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }
`

const PartnerLogoSlot = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border: 1px dashed ${theme.colors.outlineVariant}50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: border-color 0.2s;

  ${PartnerCard}:hover & {
    border-color: ${theme.colors.secondary}40;
  }
`

const PartnerLogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
`

const PartnerLogoIcon = styled.span`
  color: ${theme.colors.secondary};
  opacity: 0.3;
`

const PartnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`

const PartnerName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const PartnerTagBadge = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const PartnerDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  text-align: left;
`

// ─── In-action video ──────────────────────────────────────────────────────────

const VideoLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const VideoWell = styled.div`
  width: 100%;
  max-width: 320px;
  aspect-ratio: 9 / 16;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 24px;
  overflow: hidden;
`

const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
`

// ─── Photo gallery ────────────────────────────────────────────────────────────

const PhotoGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
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

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const SERVICES  = data.services
const STATS     = data.stats
const PARTNERS  = data.partners
const PHOTOS    = data.photos
const HOW       = data.howItWorks
const REQUEST   = data.requestForm

const heroPhotoSrc    = resolve(data.hero.heroPhoto.src)
const approachPhotoSrc = resolve(HOW.inlinePhoto.src)
const VIDEO = data.video

function buildRequestMailto(fields: {
  team: string
  contact: string
  email: string
  service: string
  message: string
}): string {
  const subject = `Production Hub Request — ${fields.team || 'New request'}`
  const body = [
    `Team: ${fields.team}`,
    `Contact name: ${fields.contact}`,
    `Contact email: ${fields.email}`,
    `Service requested: ${fields.service}`,
    '',
    'What we need:',
    fields.message,
    '',
    '(Attach your design file — Onshape link, STL, or DXF — before sending.)',
  ].join('\n')
  return `mailto:${REQUEST.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ProductionHubPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [requestFields, setRequestFields] = useState({
    team: '',
    contact: '',
    email: '',
    service: SERVICES[0]?.title ?? '',
    message: '',
  })

  function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.location.href = buildRequestMailto(requestFields)
  }

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

              <HeroImageWell aria-label="Production Hub fabrication space">
                {heroPhotoSrc ? (
                  <HeroImage src={heroPhotoSrc} alt={data.hero.heroPhoto.caption} />
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
                <MdHandshake size={20} />
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
                          icon={<MdPrecisionManufacturing size={14} color={theme.colors.secondary} />}
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

      {/* ── 4. How It Works — prose + inline photo ────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{HOW.label}</SectionLabel>
            <SectionHeading>{HOW.heading}</SectionHeading>

            <ApproachLayout>
              <ApproachProse>
                {HOW.body.split('\n\n').map((para, i) => (
                  <ApproachParagraph key={i}>{para}</ApproachParagraph>
                ))}
              </ApproachProse>

              <ApproachImageWell aria-label={`Photo slot: ${HOW.inlinePhoto.caption}`}>
                {approachPhotoSrc ? (
                  <ApproachImage src={approachPhotoSrc} alt={HOW.inlinePhoto.caption} />
                ) : (
                  <ApproachImagePlaceholder>
                    <MdBuild size={28} color={theme.colors.secondary} style={{ opacity: 0.35 }} />
                    <ApproachImageLabel>Photo slot</ApproachImageLabel>
                    <ApproachImageHint>{HOW.inlinePhoto.caption}</ApproachImageHint>
                  </ApproachImagePlaceholder>
                )}
              </ApproachImageWell>
            </ApproachLayout>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Services bento grid ────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Services</SectionLabel>
            <SectionHeading>What We Make</SectionHeading>
            <SectionSubtext>
              Four fabrication services, each targeting a different part of the robot-building
              workflow. Any team in the region can request a run — no equipment required on their
              end.
            </SectionSubtext>
          </FadeIn>

          <BentoGrid>
            {SERVICES.map((item, i) => {
              const Icon = SERVICE_ICONS[item.iconKey] ?? MdPrecisionManufacturing
              return (
                <BentoCard
                  key={item.id}
                  $wide={item.wide}
                  ref={(el) => { cardRefs.current[i] = el }}
                  style={{ '--bento-delay': `${Math.min(i * 60, 260)}ms` } as React.CSSProperties}

                  aria-label={item.title}
                >
                  <CardIconWell aria-hidden="true">
                    <Icon size={24} />
                  </CardIconWell>
                  <CardText>
                    <CardTag>{item.tag}</CardTag>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDesc>{item.description}</CardDesc>
                    <CardHighlights aria-label={`${item.title} highlights`}>
                      {item.highlights.map((h, hi) => (
                        <CardHighlightItem key={hi}>
                          <CardHighlightIcon aria-hidden="true">
                            <MdCheckCircle size={14} />
                          </CardHighlightIcon>
                          {h}
                        </CardHighlightItem>
                      ))}
                    </CardHighlights>
                  </CardText>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5b. Request a part ────────────────────────────────────────── */}
      <Section id="form">
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{REQUEST.label}</SectionLabel>
            <SectionHeading>{REQUEST.heading}</SectionHeading>
            <SectionSubtext>{REQUEST.subtext}</SectionSubtext>

            <RequestCard>
              <FormGrid onSubmit={handleRequestSubmit}>
                <FieldGroup>
                  <FieldLabel htmlFor="rq-team">Team Name</FieldLabel>
                  <Input
                    id="rq-team"
                    placeholder="e.g. FTC #12345 Ironclads"
                    value={requestFields.team}
                    onChange={(e) => setRequestFields((f) => ({ ...f, team: e.target.value }))}
                    required
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="rq-contact">Contact Name</FieldLabel>
                  <Input
                    id="rq-contact"
                    placeholder="Your name"
                    value={requestFields.contact}
                    onChange={(e) => setRequestFields((f) => ({ ...f, contact: e.target.value }))}
                    required
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="rq-email">Contact Email</FieldLabel>
                  <Input
                    id="rq-email"
                    type="email"
                    placeholder="you@example.com"
                    value={requestFields.email}
                    onChange={(e) => setRequestFields((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel htmlFor="rq-service">Service Needed</FieldLabel>
                  <SelectWrap>
                    <Select
                      id="rq-service"
                      value={requestFields.service}
                      onChange={(e) => setRequestFields((f) => ({ ...f, service: e.target.value }))}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </Select>
                    <SelectChevron size={18} aria-hidden="true" />
                  </SelectWrap>
                </FieldGroup>

                <FieldGroup $span2>
                  <FieldLabel htmlFor="rq-message">What Do You Need?</FieldLabel>
                  <Textarea
                    id="rq-message"
                    placeholder="Describe the part — dimensions, material, deadline, and anything else we should know."
                    value={requestFields.message}
                    onChange={(e) => setRequestFields((f) => ({ ...f, message: e.target.value }))}
                    required
                  />
                </FieldGroup>

                <FieldGroup $span2>
                  <SubmitButton type="submit">
                    Send Request
                  </SubmitButton>
                  <FormNote>
                    This opens your email client with everything filled in — attach your design
                    file before sending. Prefer to email directly? Reach us at{' '}
                    <a href={`mailto:${REQUEST.email}`}>{REQUEST.email}</a>.
                  </FormNote>
                </FieldGroup>
              </FormGrid>
            </RequestCard>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. Teams We Support ───────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Teams Served</SectionLabel>
            <SectionHeading>Who We've Worked With</SectionHeading>
            <SectionSubtext>
              Every team below received parts, coaching, or fabrication support through the
              Production Hub. Some have since built their own manufacturing capability — which is
              exactly the point.
            </SectionSubtext>

            <PartnersGrid>
              {PARTNERS.map((p) => {
                const Icon = PARTNER_ICONS[p.iconKey] ?? MdGroups
                const logoUrl = resolve(p.logoSrc)
                return (
                  <PartnerCard key={p.id} aria-label={p.name}>
                    <PartnerLogoSlot aria-label={`Logo placeholder for ${p.name}`}>
                      {logoUrl ? (
                        <PartnerLogoImg src={logoUrl} alt={`${p.name} logo`} />
                      ) : (
                        <PartnerLogoIcon aria-hidden="true">
                          <Icon size={26} />
                        </PartnerLogoIcon>
                      )}
                    </PartnerLogoSlot>
                    <PartnerInfo>
                      <PartnerName>{p.name}</PartnerName>
                      <PartnerTagBadge>{p.tag}</PartnerTagBadge>
                      <PartnerDesc>{p.description}</PartnerDesc>
                    </PartnerInfo>
                  </PartnerCard>
                )
              })}
            </PartnersGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. In-action video ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <VideoLayout>
              <div style={{ textAlign: 'center' }}>
                <SectionLabel>{VIDEO.label}</SectionLabel>
                <SectionHeading>{VIDEO.heading}</SectionHeading>
                <SectionSubtext style={{ margin: '0 auto' }}>{VIDEO.subtext}</SectionSubtext>
              </div>
              <VideoWell>
                <VideoFrame
                  src={`https://www.youtube.com/embed/${VIDEO.youtubeId}`}
                  title={VIDEO.heading}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </VideoWell>
            </VideoLayout>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 8. Photo gallery ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Shop</SectionLabel>
            <PhotoGallery aria-label="Production Hub photo gallery">
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <PhotoFrame key={i}>
                    <PhotoImg src={url} alt={p.caption} />
                  </PhotoFrame>
                ) : (
                  <PhotoSlot key={i} aria-label={`Photo placeholder: ${p.caption}`}>
                    <MdPeople size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                    <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                    <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                  </PhotoSlot>
                )
              })}
            </PhotoGallery>
          </FadeIn>
        </Inner>
      </Section>

    </PageRoot>
  )
}
