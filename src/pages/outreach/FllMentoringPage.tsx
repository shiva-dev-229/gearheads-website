import { useState, type ComponentType } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  MdGavel,
  MdSmartToy,
  MdMic,
  MdFamilyRestroom,
  MdCheckCircleOutline,
  MdImage,
  MdPeople,
  MdVolunteerActivism,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import data from '../../data/fll-mentoring.json'

// ─── Image resolution ──────────────────────────────────────────────────────────
// No fll-mentoring folder exists yet — resolver will always return null

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/fll-mentoring/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ──────────────────────────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  gavel:  MdGavel,
  robot:  MdSmartToy,
  mic:    MdMic,
  family: MdFamilyRestroom,
}

// ─── Keyframes ─────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout shell ──────────────────────────────────────────────────────────────

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

// ─── Hero atoms ────────────────────────────────────────────────────────────────

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

const HeroImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0.25;
  color: ${theme.colors.onSurfaceVariant};
`

// ─── Impact callout ────────────────────────────────────────────────────────────

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

// ─── Section header atoms ──────────────────────────────────────────────────────

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

// ─── Approach section ──────────────────────────────────────────────────────────

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

// ─── Horizontal Accordion ──────────────────────────────────────────────────────

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
  color: ${({ $active }) =>
    $active ? theme.colors.secondary : theme.colors.onSurfaceVariant};
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
  transition: opacity 0.28s ease-out
    ${({ $visible }) => ($visible ? '0.12s' : '0s')};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 28px;

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
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 20px;
  line-height: 1.55;
  font-style: italic;
  opacity: 0.85;
`

const ContentDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
  max-width: 660px;
  white-space: pre-line;
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

// ─── People & Partners ─────────────────────────────────────────────────────────

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

// ─── Fade-up for panel re-mount ────────────────────────────────────────────────

const PanelRoot = styled.div`
  animation: ${fadeUp} 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

// ─── Photo gallery ─────────────────────────────────────────────────────────────

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

// ─── Component ─────────────────────────────────────────────────────────────────

const ACTIVITIES = data.activities
const PEOPLE = data.people
const PHOTOS = data.photos
const APPROACH = data.approach

export default function FllMentoringPage() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <PageRoot>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
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

              <HeroImageWell aria-label="FLL Mentoring hero photo slot">
                <HeroImagePlaceholder>
                  <MdImage size={36} />
                </HeroImagePlaceholder>
              </HeroImageWell>
            </HeroLayout>
          </FadeIn>
        </HeroInner>
      </HeroSection>

      {/* ── 2. Impact callout ───────────────────────────────────────────── */}
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

      {/* ── 3. Our Approach ─────────────────────────────────────────────── */}
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

              <ApproachImageWell aria-label="Photo slot: inline approach image">
                {resolve(APPROACH.inlinePhoto.src) ? null : (
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

      {/* ── 4. Activities — Horizontal Accordion ────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Activities</SectionLabel>
            <SectionHeading>What We Do at FLL Events</SectionHeading>
            <SectionSubtext>
              Four distinct roles at FLL tournaments — each designed to meet students, parents,
              and the event itself where they need us most. Click an activity to expand it.
            </SectionSubtext>
          </FadeIn>

          <FadeIn direction="up">
            <Accordion role="tablist" aria-label="FLL mentoring activities">
              {ACTIVITIES.map((act, i) => {
                const ActIcon = ACTIVITY_ICONS[act.iconKey] as ComponentType<{ size?: number }>
                const isActive = i === activeStage

                return (
                  <StagePanel
                    key={act.id}
                    $active={isActive}
                    onClick={() => setActiveStage(i)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={act.label}
                  >
                    <StageStrip>
                      <StageIcon>
                        <ActIcon size={20} />
                      </StageIcon>
                      <StageStepNo $active={isActive}>0{i + 1}</StageStepNo>
                      <StageLabel>{act.label}</StageLabel>
                    </StageStrip>

                    <StageContent
                      $visible={isActive}
                      role="tabpanel"
                      aria-hidden={!isActive}
                    >
                      {isActive && (
                        <PanelRoot key={act.id}>
                          <ContentBadge>Activity 0{i + 1}</ContentBadge>
                          <ContentName>{act.label}</ContentName>
                          <ContentTagline>{act.tagline}</ContentTagline>
                          <ContentDesc>{act.description}</ContentDesc>
                          <HighlightsLabel>Highlights</HighlightsLabel>
                          <HighlightsList>
                            {act.highlights.map((pt, j) => (
                              <HighlightItem key={j}>
                                <MdCheckCircleOutline size={15} />
                                {pt}
                              </HighlightItem>
                            ))}
                          </HighlightsList>
                        </PanelRoot>
                      )}
                    </StageContent>
                  </StagePanel>
                )
              })}
            </Accordion>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. People & Partners ────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>People & Partners</SectionLabel>
            <SectionHeading>Faces Behind the Work</SectionHeading>
            <SectionSubtext style={{ marginBottom: 24 }}>
              FLL judges, coached teams, parent coaches, and event coordinators who make this
              work possible. Portrait slots are ready for headshots when available.
            </SectionSubtext>

            <PeopleGrid>
              {PEOPLE.map((p) => (
                <PersonCard key={p.name} aria-label={`${p.name}, ${p.role}`}>
                  <PortraitSlot aria-label={`Portrait placeholder for ${p.name}`}>
                    <PortraitSlotIcon>
                      <MdPeople size={22} />
                    </PortraitSlotIcon>
                  </PortraitSlot>
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

      {/* ── 6. Photo gallery ────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>From The Events</SectionLabel>
            <SectionHeading>FLL in Action</SectionHeading>

            <PhotoGallery aria-label="FLL mentoring photo gallery">
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src)
                return url ? null : (
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
