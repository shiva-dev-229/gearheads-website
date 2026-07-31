import { useState, type ComponentType } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  MdPresentToAll,
  MdAccountTree,
  MdTravelExplore,
  MdLink,
  MdCheckCircle,
  MdPeople,
  MdHandshake,
  MdImage,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import data from '../../data/ge-elfuns.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/ge-elfuns/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const FACET_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  presenter:  MdPresentToAll,
  pipeline:   MdAccountTree,
  awareness:  MdTravelExplore,
  connection: MdLink,
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
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
  max-width: 200px;
`

// ─── Horizontal Accordion ─────────────────────────────────────────────────────

const FacetLabel = styled.span`
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

const FacetPanel = styled.div<{ $active: boolean }>`
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
      &:hover ${FacetLabel} {
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

const FacetStrip = styled.div`
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

const FacetIconBox = styled.div`
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

const FacetStepNo = styled.span<{ $active: boolean }>`
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

const FacetContent = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 72px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.28s ease-out ${({ $visible }) => ($visible ? '0.12s' : '0s')};
  overflow: hidden;
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
  font-size: clamp(18px, 2.8vw, 26px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 8px;
  line-height: 1.15;
`

const ContentTagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 16px;
  line-height: 1.55;
  font-style: italic;
  opacity: 0.85;
`

const ContentDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.78;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;
  max-width: 640px;
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

// ─── Panel entrance ───────────────────────────────────────────────────────────

const PanelEntrance = styled.div`
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// ─── People & Partners ────────────────────────────────────────────────────────

const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const PersonCard = styled.div`
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

const PortraitSlot = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
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

  ${PersonCard}:hover & {
    border-color: ${theme.colors.secondary}40;
  }
`

const PortraitSlotIcon = styled.span`
  color: ${theme.colors.secondary};
  opacity: 0.35;
`

const PartnerLogoSlot = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border: 1px dashed ${theme.colors.outlineVariant}50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s;

  ${PersonCard}:hover & {
    border-color: ${theme.colors.secondary}40;
  }
`

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PersonName = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
`

const PersonRole = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const PersonNote = styled.span`
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

// ─── Component ────────────────────────────────────────────────────────────────

const FACETS = data.facets
const PEOPLE = data.people
const PHOTOS = data.photos
const APPROACH = data.approach

const heroPhotoSrc = resolve(data.hero.heroPhoto.src)
const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

export default function GeElfunsPage() {
  const [activeFacet, setActiveFacet] = useState(0)

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

              <HeroImageWell aria-label={data.hero.heroPhoto.caption}>
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

      {/* ── 3. Why This Partnership (Approach) ───────────────────────── */}
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

              <ApproachImageWell aria-label={`Photo slot: ${APPROACH.inlinePhoto.caption}`}>
                {approachPhotoSrc ? (
                  <ApproachImage src={approachPhotoSrc} alt={APPROACH.inlinePhoto.caption} />
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

      {/* ── 4. Partnership facets — horizontal accordion ──────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Partnership Facets</SectionLabel>
            <SectionHeading>Four dimensions of the relationship.</SectionHeading>
            <SectionSubtext>
              The GE Elfuns partnership is broader than a single presentation. It spans how
              the team tells its story, the mentorship potential it unlocks, the communities
              it reaches, and the shared history that makes all of it meaningful.
            </SectionSubtext>

            <Accordion aria-label="Partnership facets accordion">
              {FACETS.map((f, i) => {
                const Icon = FACET_ICONS[f.iconKey] ?? MdLink
                const isActive = i === activeFacet

                return (
                  <FacetPanel
                    key={f.id}
                    $active={isActive}
                    onClick={() => setActiveFacet(i)}
                    aria-expanded={isActive}
                    aria-label={f.label}
                  >
                    <FacetStrip>
                      <FacetIconBox>
                        <Icon size={20} />
                      </FacetIconBox>
                      <FacetStepNo $active={isActive}>0{i + 1}</FacetStepNo>
                      <FacetLabel>{f.label}</FacetLabel>
                    </FacetStrip>

                    <FacetContent $visible={isActive} aria-hidden={!isActive}>
                      <PanelEntrance key={activeFacet}>
                        <ContentBadge>Facet 0{i + 1}</ContentBadge>
                        <ContentName>{f.label}</ContentName>
                        <ContentTagline>{f.tagline}</ContentTagline>
                        <ContentDesc>{f.description}</ContentDesc>
                        <HighlightsLabel>Key points</HighlightsLabel>
                        <HighlightsList>
                          {f.highlights.map((h, j) => (
                            <HighlightItem key={j}>
                              <MdCheckCircle size={15} />
                              {h}
                            </HighlightItem>
                          ))}
                        </HighlightsList>
                      </PanelEntrance>
                    </FacetContent>
                  </FacetPanel>
                )
              })}
            </Accordion>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. People & Partners ──────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>People & Partners</SectionLabel>
            <SectionHeading>The people behind the partnership.</SectionHeading>
            <SectionSubtext style={{ marginBottom: 24 }}>
              The GE Elfuns organization and the contacts who make this relationship work.
              Portrait and logo slots are ready to fill whenever assets are available.
            </SectionSubtext>

            <PeopleGrid>
              {PEOPLE.map((p) => (
                <PersonCard key={p.name} aria-label={`${p.name}, ${p.role}`}>
                  {p.type === 'partner' ? (
                    <PartnerLogoSlot aria-label={`Logo placeholder for ${p.name}`}>
                      <PortraitSlotIcon>
                        <MdHandshake size={24} />
                      </PortraitSlotIcon>
                    </PartnerLogoSlot>
                  ) : (
                    <PortraitSlot aria-label={`Portrait placeholder for ${p.name}`}>
                      <PortraitSlotIcon>
                        <MdPeople size={22} />
                      </PortraitSlotIcon>
                    </PortraitSlot>
                  )}
                  <PersonInfo>
                    <PersonName>{p.name}</PersonName>
                    <PersonRole>{p.role}</PersonRole>
                    {p.note && <PersonNote>{p.note}</PersonNote>}
                  </PersonInfo>
                </PersonCard>
              ))}
            </PeopleGrid>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 6. Photo gallery ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Partnership</SectionLabel>
            <PhotoGallery aria-label="GE Elfuns partnership photo gallery">
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
