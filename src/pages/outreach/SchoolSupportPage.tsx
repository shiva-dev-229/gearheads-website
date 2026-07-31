import { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdSchool,
  MdExpandMore,
  MdImage,
  MdPeople,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import data from '../../data/school-support.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/school-support/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Scroll-reveal ────────────────────────────────────────────────────────────

const RevealSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`

function useRevealRefs<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('revealed')
            obs.disconnect()
          }
        },
        { threshold: 0.08 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [count])

  return refs
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

const StatStatLabel = styled.span`
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

// ─── Accordion ────────────────────────────────────────────────────────────────

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const AccordionItem = styled.div<{ $open: boolean }>`
  background: ${({ $open }) => ($open ? theme.colors.surfaceContainerLow : theme.colors.background)};
  box-shadow: ${({ $open }) => ($open ? theme.shadows.neoRaisedLg : theme.shadows.neoRaised)};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid
    ${({ $open }) =>
      $open ? `${theme.colors.outlineVariant}55` : `${theme.colors.outlineVariant}25`};
  border-left: 3px solid
    ${({ $open }) => ($open ? theme.colors.secondary : 'transparent')};
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    border-left-color: ${({ $open }) =>
      $open ? theme.colors.secondary : `${theme.colors.secondary}55`};
  }
`

const AccordionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 22px 24px;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: -2px;
    border-radius: 14px;
  }
`

const AccordionNumber = styled.span<{ $open: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 28px;
  color: ${({ $open }) => ($open ? theme.colors.secondary : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.45)};
  transition: color 0.22s, opacity 0.22s;
`

const AccordionQuestion = styled.span`
  flex: 1;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 17px;
  }
`

const AccordionChevron = styled.div<{ $open: boolean }>`
  font-size: 22px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.22s ease, color 0.22s ease, opacity 0.22s;
  color: ${({ $open }) => ($open ? theme.colors.secondary : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.5)};
`

const AccordionCollapse = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease ${({ $open }) => ($open ? '0.05s' : '0s')};
`

const AccordionCollapseInner = styled.div`
  overflow: hidden;
`

const AccordionAnswerWrap = styled.div`
  padding: 0 20px 20px;

  @media (min-width: 768px) {
    padding: 0 24px 24px;
  }
`

const AccordionHairline = styled.div`
  height: 1px;
  background: ${theme.colors.secondary}25;
  margin-bottom: 16px;
`

const AccordionBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.82;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  animation: ${fadeUp} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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
const STATS = data.stats
const PHOTOS = data.photos

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

export default function SchoolSupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i))

  const revealRefs = useRevealRefs<HTMLDivElement>(5)

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

              <HeroImageWell>
                {heroPhotoSrc ? (
                  <HeroImage src={heroPhotoSrc} alt="GEarheads school district partnership" />
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
                <MdSchool size={20} />
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
          <RevealSection ref={(el) => { revealRefs.current[0] = el }}>
            <SectionLabel>By The Numbers</SectionLabel>
            <StatsRow>
              {STATS.map((s) => (
                <StatChip key={s.label}>
                  <StatValue>{s.value}</StatValue>
                  <StatStatLabel>{s.label}</StatStatLabel>
                  <StatHint>{s.hint}</StatHint>
                </StatChip>
              ))}
            </StatsRow>
          </RevealSection>
        </Inner>
      </Section>

      <Divider />

      {/* ── 4. Partnership Facets accordion ───────────────────────────── */}
      <Section>
        <Inner>
          <RevealSection ref={(el) => { revealRefs.current[1] = el }}>
            <SectionLabel>Partnership Facets</SectionLabel>
            <SectionHeading>How the District Shows Up</SectionHeading>
            <SectionSubtext>
              Four structural commitments from Elmbrook that define what school support actually
              looks like in practice — click any row to read the full story.
            </SectionSubtext>

            <AccordionList role="list">
              {FACETS.map((facet, i) => {
                const open = openIndex === i
                const num = String(i + 1).padStart(2, '0')
                return (
                  <AccordionItem key={facet.id} $open={open} role="listitem">
                    <AccordionButton
                      onClick={() => toggle(i)}
                      aria-expanded={open}
                      aria-controls={`facet-body-${facet.id}`}
                    >
                      <AccordionNumber $open={open}>{num}</AccordionNumber>
                      <AccordionQuestion>{facet.question}</AccordionQuestion>
                      <AccordionChevron $open={open} aria-hidden="true">
                        <MdExpandMore />
                      </AccordionChevron>
                    </AccordionButton>

                    <AccordionCollapse $open={open}>
                      <AccordionCollapseInner>
                        <AccordionAnswerWrap id={`facet-body-${facet.id}`}>
                          <AccordionHairline />
                          <AccordionBody>{facet.description}</AccordionBody>
                        </AccordionAnswerWrap>
                      </AccordionCollapseInner>
                    </AccordionCollapse>
                  </AccordionItem>
                )
              })}
            </AccordionList>
          </RevealSection>
        </Inner>
      </Section>

      <Divider />

      {/* ── 5. Photo strip ────────────────────────────────────────────── */}
      <Section>
        <Inner>
          <RevealSection ref={(el) => { revealRefs.current[2] = el }}>
            <SectionLabel>School Support In Action</SectionLabel>
            <PhotoStrip>
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <PhotoFrame key={i}>
                    <PhotoImg src={url} alt={p.caption} />
                  </PhotoFrame>
                ) : (
                  <PhotoSlot key={i}>
                    <MdPeople size={18} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                    <PhotoSlotLabel>Photo slot</PhotoSlotLabel>
                    <PhotoSlotHint>{p.caption}</PhotoSlotHint>
                  </PhotoSlot>
                )
              })}
            </PhotoStrip>
          </RevealSection>
        </Inner>
      </Section>

    </PageRoot>
  )
}
