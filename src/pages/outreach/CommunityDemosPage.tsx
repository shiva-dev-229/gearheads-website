import { useRef, useEffect, type ComponentType } from 'react'
import styled from 'styled-components'
import {
  MdMenuBook,
  MdLocalLibrary,
  MdSchool,
  MdScience,
  MdVolunteerActivism,
  MdImage,
  MdPeople,
  MdHandshake,
  MdPlace,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import CountUpChip from '../../components/reactbits/CountUpChip'
import data from '../../data/community-demos.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/**/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

function resolve(file: string | null, folder?: string): string | null {
  if (!file) return null
  const needle = folder ? `/${folder}/${file}` : `/${file}`
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith(needle))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const VENUE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  menuBook:     MdMenuBook,
  localLibrary: MdLocalLibrary,
  school:       MdSchool,
  science:      MdScience,
}

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

// ─── Approach section ─────────────────────────────────────────────────────────

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
  gap: 0;
`

const ApproachParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.85;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const ApproachImageWell = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed ${theme.colors.outlineVariant}38;

  @media (min-width: 768px) {
    position: sticky;
    top: 24px;
  }
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
  max-width: 200px;
`

// ─── Bento grid ───────────────────────────────────────────────────────────────

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

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(
      440px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      ${theme.colors.secondary}1e,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }

  &:hover::before {
    opacity: 1;
  }

  @media (min-width: 720px) {
    grid-column: ${({ $wide }) => ($wide ? 'span 2' : 'span 1')};
    flex-direction: ${({ $wide }) => ($wide ? 'row' : 'column')};
    align-items: ${({ $wide }) => ($wide ? 'flex-start' : 'stretch')};
    gap: ${({ $wide }) => ($wide ? '24px' : '16px')};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.25s ease;
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
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  white-space: pre-line;
`

// ─── Venues & Partners grid ───────────────────────────────────────────────────

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const PartnerCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 24px 16px 20px;
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

const PartnerLogoSlot = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border: 1px dashed ${theme.colors.outlineVariant}50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-shrink: 0;
  transition: border-color 0.2s;

  ${PartnerCard}:hover & {
    border-color: ${theme.colors.secondary}40;
  }
`

const PartnerLogoIcon = styled.span`
  color: ${theme.colors.secondary};
  opacity: 0.35;
`

const PartnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PartnerName = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
  line-height: 1.3;
`

const PartnerType = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const PartnerNote = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 11px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
  margin-top: 2px;
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

function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement | null) {
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

// ─── Static data ──────────────────────────────────────────────────────────────

type PhotoEntry = { src: string | null; caption: string; folder?: string }

const VENUES   = data.venues
const STATS    = data.stats
const PHOTOS   = data.photos as PhotoEntry[]
const PARTNERS = data.partners
const APPROACH = data.approach

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src, p.folder)
    if (url) return url
  }
  return null
})()

const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

// ─── Component ────────────────────────────────────────────────────────────────

export default function CommunityDemosPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

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

              <HeroImageWell aria-label="Community demo hero image">
                {heroPhotoSrc ? (
                  <HeroImage src={heroPhotoSrc} alt="GEarheads at a community demo event" />
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
                <MdVolunteerActivism size={20} />
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
                          icon={<MdHandshake size={14} color={theme.colors.secondary} />}
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

      {/* ── 4. Our Approach ───────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{APPROACH.label}</SectionLabel>
            <SectionHeading>{APPROACH.heading}</SectionHeading>

            <ApproachLayout>
              <ApproachProse>
                {APPROACH.body.split('\n\n').map((para, i) => (
                  <ApproachParagraph key={i}>{para}</ApproachParagraph>
                ))}
              </ApproachProse>

              <ApproachImageWell aria-label="Photo slot: community demo in action">
                {approachPhotoSrc ? (
                  <img
                    src={approachPhotoSrc}
                    alt={APPROACH.inlinePhoto.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ApproachImagePlaceholder>
                    <MdPeople size={28} color={theme.colors.secondary} style={{ opacity: 0.35 }} />
                    <ApproachImageLabel>Photo slot</ApproachImageLabel>
                    <ApproachImageHint>{APPROACH.inlinePhoto.caption}</ApproachImageHint>
                  </ApproachImagePlaceholder>
                )}
              </ApproachImageWell>
            </ApproachLayout>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Venues bento grid ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Where We Show Up</SectionLabel>
            <SectionHeading>Demo Venues</SectionHeading>
            <SectionSubtext>
              Each venue reaches a different slice of the Elmbrook community — from families
              browsing library programs to high schoolers choosing their extracurriculars.
            </SectionSubtext>
          </FadeIn>

          <BentoGrid>
            {VENUES.map((venue, i) => {
              const Icon = VENUE_ICONS[venue.iconKey] ?? MdSchool
              return (
                <BentoCard
                  key={venue.id}
                  $wide={venue.wide}
                  ref={(el) => { cardRefs.current[i] = el }}
                  style={{ '--bento-delay': `${Math.min(i * 60, 260)}ms` } as React.CSSProperties}
                  onMouseMove={(e) => handleCardMouseMove(e, cardRefs.current[i])}
                  aria-label={venue.title}
                >
                  <CardIconWell aria-hidden="true">
                    <Icon size={24} />
                  </CardIconWell>
                  <CardText>
                    <CardTag>{venue.tag}</CardTag>
                    <CardTitle>{venue.title}</CardTitle>
                    <CardDesc>{venue.description}</CardDesc>
                  </CardText>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. Venues & Partners ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Venues & Partners</SectionLabel>
            <SectionHeading>Who Makes It Possible</SectionHeading>
            <SectionSubtext style={{ marginBottom: 24 }}>
              The organizations that open their doors and give us the room to run a demo. Logo
              slots are ready — add an image whenever it's available.
            </SectionSubtext>

            <PartnersGrid>
              {PARTNERS.map((p) => (
                <PartnerCard key={p.id} aria-label={`${p.name}, ${p.type}`}>
                  <PartnerLogoSlot aria-label={`Logo placeholder for ${p.name}`}>
                    <PartnerLogoIcon>
                      <MdPlace size={22} />
                    </PartnerLogoIcon>
                  </PartnerLogoSlot>
                  <PartnerInfo>
                    <PartnerName>{p.name}</PartnerName>
                    <PartnerType>{p.type}</PartnerType>
                    {p.note && <PartnerNote>{p.note}</PartnerNote>}
                  </PartnerInfo>
                </PartnerCard>
              ))}
            </PartnersGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. Photo gallery ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Events</SectionLabel>
            <PhotoGallery aria-label="Community demos photo gallery">
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src, p.folder)
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
