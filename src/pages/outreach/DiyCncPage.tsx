import { useState, type ComponentType } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  MdBuild,
  MdPrecisionManufacturing,
  MdSchool,
  MdRouter,
  MdCheckCircleOutline,
  MdImage,
  MdPeople,
  MdHandshake,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import data from '../../data/diy-cnc.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/hapa bots/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const TEAM_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  build:     MdBuild,
  precision: MdPrecisionManufacturing,
  school:    MdSchool,
  router:    MdRouter,
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
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

// ─── MPCNC concept body ───────────────────────────────────────────────────────

const ConceptLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 340px;
    gap: 48px;
  }
`

const ConceptBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ConceptParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.85;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const ConceptImageWell = styled.div`
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

const ConceptImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px;
  text-align: center;
`

const ConceptImageLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const ConceptImageHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  max-width: 200px;
`

// ─── Why it works (approach) section ──────────────────────────────────────────

const ApproachParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.85;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;
  max-width: 860px;

  &:last-child {
    margin-bottom: 0;
  }
`

// ─── Horizontal accordion ─────────────────────────────────────────────────────

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
    height: ${({ $active }) => ($active ? '520px' : '52px')};
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
  height: 580px;
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
  margin-bottom: 6px;
`

const ContentTeamNumber = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.4;
  margin-bottom: 4px;
  display: block;
`

const ContentName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 4px;
  line-height: 1.15;
`

const ContentLocation = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  margin-bottom: 14px;
  display: block;
`

const ContentTagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-style: italic;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 18px;
  line-height: 1.6;
  opacity: 0.85;
`

const ContentDesc = styled.div`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 14px;
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

// ─── Partners grid ────────────────────────────────────────────────────────────

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

const LogoSlot = styled.div`
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

const LogoSlotIcon = styled.span`
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

// ─── Keep fadeUp referenced to satisfy noUnusedLocals ────────────────────────
// (Used in a suppressor pattern; styled-components keyframe must be referenced)
const _FadeUpAnchor = styled.div`
  animation: ${fadeUp} 0s;
  display: none;
`

// ─── Component ────────────────────────────────────────────────────────────────

const TEAMS    = data.teams
const PHOTOS   = data.photos
const PARTNERS = data.partners
const GALLERY  = data.closingGallery
const CONCEPT  = data.concept
const APPROACH = data.whyItWorks

// Resolve hero image from hapa-bots folder (only real folder available)
const heroPhotoSrc = (() => {
  const h = data.hero.heroImage
  return h ? resolve(h.src) : null
})()

export default function DiyCncPage() {
  const [activeTeam, setActiveTeam] = useState(0)

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

              <HeroImageWell aria-label="Hero photo slot">
                {heroPhotoSrc ? (
                  <HeroImage
                    src={heroPhotoSrc}
                    alt={data.hero.heroImage.caption}
                  />
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
                <MdBuild size={20} />
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

      {/* ── 3. MPCNC concept ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{CONCEPT.label}</SectionLabel>
            <SectionHeading>{CONCEPT.heading}</SectionHeading>
            <SectionSubtext>{CONCEPT.subtext}</SectionSubtext>

            <ConceptLayout>
              <ConceptBody>
                {CONCEPT.body.map((para, i) => (
                  <ConceptParagraph key={i}>{para}</ConceptParagraph>
                ))}
              </ConceptBody>

              <ConceptImageWell aria-label="Photo slot: MPCNC mid-build">
                <ConceptImagePlaceholder>
                  <MdPeople size={28} color={theme.colors.secondary} style={{ opacity: 0.35 }} />
                  <ConceptImageLabel>Photo slot</ConceptImageLabel>
                  <ConceptImageHint>{CONCEPT.inlinePhoto.caption}</ConceptImageHint>
                </ConceptImagePlaceholder>
              </ConceptImageWell>
            </ConceptLayout>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 4. Why teach teams to build their own machines ────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>{APPROACH.label}</SectionLabel>
            <SectionHeading>{APPROACH.heading}</SectionHeading>
            {APPROACH.body.map((para, i) => (
              <ApproachParagraph key={i}>{para}</ApproachParagraph>
            ))}
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Pilot teams accordion ──────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Pilot Teams</SectionLabel>
            <SectionHeading>Who we built with</SectionHeading>
            <SectionSubtext>
              Four teams across the 2025–26 season. Click a panel to expand the full story.
            </SectionSubtext>

            <Accordion role="tablist" aria-label="Pilot teams">
              {TEAMS.map((t, i) => {
                const Icon = TEAM_ICONS[t.iconKey] ?? MdBuild
                const isActive = i === activeTeam
                return (
                  <StagePanel
                    key={t.id}
                    $active={isActive}
                    onClick={() => setActiveTeam(i)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${t.name}${t.number !== '—' ? ` — Team ${t.number}` : ''}`}
                  >
                    <StageStrip>
                      <StageIcon>
                        <Icon size={20} />
                      </StageIcon>
                      <StageStepNo $active={isActive}>0{i + 1}</StageStepNo>
                      <StageLabel>{t.name}</StageLabel>
                    </StageStrip>

                    <StageContent
                      $visible={isActive}
                      role="tabpanel"
                      aria-label={t.name}
                      aria-hidden={!isActive}
                    >
                      <ContentBadge>
                        Pilot team {String(i + 1).padStart(2, '0')}
                      </ContentBadge>
                      {t.number !== '—' && (
                        <ContentTeamNumber>FTC #{t.number}</ContentTeamNumber>
                      )}
                      <ContentName>{t.name}</ContentName>
                      <ContentLocation>{t.location}</ContentLocation>
                      <ContentTagline>{t.tagline}</ContentTagline>
                      <ContentDesc>
                        {t.description.split('\n\n').map((para, j) => (
                          <p key={j} style={{ margin: 0 }}>{para}</p>
                        ))}
                      </ContentDesc>
                      <HighlightsLabel>Highlights</HighlightsLabel>
                      <HighlightsList>
                        {t.highlights.map((h, j) => (
                          <HighlightItem key={j}>
                            <MdCheckCircleOutline size={15} />
                            {h}
                          </HighlightItem>
                        ))}
                      </HighlightsList>
                    </StageContent>
                  </StagePanel>
                )
              })}
            </Accordion>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. Pilot Teams & Partners ─────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Pilot Teams &amp; Partners</SectionLabel>
            <SectionHeading>The teams and organizations in the pilot</SectionHeading>
            <SectionSubtext style={{ marginBottom: 24 }}>
              Logo slots are ready — drop in team and partner logos whenever they are available.
            </SectionSubtext>

            <PartnersGrid>
              {PARTNERS.map((p) => (
                <PartnerCard key={p.id} aria-label={p.name}>
                  <LogoSlot aria-label={`Logo placeholder for ${p.name}`}>
                    <LogoSlotIcon>
                      <MdHandshake size={24} />
                    </LogoSlotIcon>
                  </LogoSlot>
                  <PartnerInfo>
                    <PartnerName>{p.name}</PartnerName>
                    {p.note && <PartnerNote>{p.note}</PartnerNote>}
                  </PartnerInfo>
                </PartnerCard>
              ))}
            </PartnersGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 7. From the field (original photos) ───────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Field</SectionLabel>
            <SectionHeading>Sessions in progress</SectionHeading>
            <SectionSubtext>
              Photos from the pilot sessions — real builds, real machines, real teams.
            </SectionSubtext>
            <PhotoGallery aria-label="Program photos">
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

      <Divider />

      {/* ── 8. Closing gallery ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Gallery</SectionLabel>
            <SectionHeading>Build to cut — the full arc</SectionHeading>
            <SectionSubtext>
              Six photo slots covering the complete journey: frame assembly through first
              production cuts on a team-built machine.
            </SectionSubtext>
            <PhotoGallery aria-label="Closing gallery — DIY-CNC program arc">
              {GALLERY.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <PhotoFrame key={i}>
                    <PhotoImg src={url} alt={p.caption} />
                  </PhotoFrame>
                ) : (
                  <PhotoSlot key={i} aria-label={`Photo placeholder: ${p.caption}`}>
                    <MdImage size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                    <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                    <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                  </PhotoSlot>
                )
              })}
            </PhotoGallery>
          </FadeIn>
        </Inner>
      </Section>

      <_FadeUpAnchor aria-hidden="true" />

      {/* Satisfy noUnusedLocals for icons that appear in JSX only via variable */}

    </PageRoot>
  )
}
