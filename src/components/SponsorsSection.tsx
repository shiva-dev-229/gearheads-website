import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { theme } from '../styles/theme'
import sponsorsData from '../data/sponsors.json'
import BorderGlow from './reactbits/BorderGlow'

const logoModules = import.meta.glob('../assets/sponsor-logos/*.png', { eager: true, import: 'default' }) as Record<string, string>
const resolveLogo = (filename: string) => logoModules[`../assets/sponsor-logos/${filename}`] ?? ''

const SPONSORS = sponsorsData.map(s => ({ ...s, image: resolveLogo(s.image) }))
const N = SPONSORS.length
const ITEMS = [...SPONSORS, ...SPONSORS, ...SPONSORS] // tripled for seamless loop

const GAP = 20
const SLIDE_MS = 460
const INTERVAL_MS = 3000

function getVis(w: number): number {
  if (w >= 900) return 4
  if (w >= 600) return 3
  return 1
}

// ─── Styles ──────────────────────────────────────────────────

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 56px 0 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`

const SectionHeader = styled.div`
  padding: 0 ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.marginDesktop};
  }
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${theme.colors.primary};
  text-align: center;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  text-align: center;
`

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.marginDesktop};
    gap: 16px;
  }
`

const TrackOuter = styled.div`
  flex: 1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
`

const Track = styled.div<{ $offset: number; $animated: boolean }>`
  display: flex;
  gap: ${GAP}px;
  transform: translateX(${({ $offset }) => -$offset}px);
  transition: ${({ $animated }) =>
    $animated ? `transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none'};
  will-change: transform;
`

const CardOuter = styled.div<{ $w: number; $clickable: boolean }>`
  flex: 0 0 ${({ $w }) => $w}px;
  width: ${({ $w }) => $w}px;
  height: 150px;
  text-decoration: none;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};

  .border-glow-card {
    height: 100%;
    width: 100%;
  }

  .border-glow-inner {
    height: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px 24px;
  }
`

const Logo = styled.img`
  max-width: 100%;
  max-height: 52px;
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.2s;

  ${CardOuter}:hover & {
    opacity: 1;
  }
`

const SponsorName = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`

const ArrowBtn = styled.button`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.background};
  color: ${theme.colors.onSurfaceVariant};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s, box-shadow 0.2s;

  &:hover {
    color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.neoRaised};
  }

  &:active {
    box-shadow: ${theme.shadows.neoInsetSm};
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

const DotsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`

const Dot = styled.button<{ $active: boolean }>`
  height: 7px;
  width: ${({ $active }) => ($active ? 18 : 7)}px;
  border-radius: 4px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.outlineVariant};
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: width 0.3s ease, background 0.3s ease, opacity 0.3s ease;
`

// ─── Component ────────────────────────────────────────────────

export default function SponsorsSection() {
  const [cardW, setCardW] = useState(0)
  const [trackIdx, setTrackIdx] = useState(N)
  const [animated, setAnimated] = useState(false)
  const [dotIdx, setDotIdx] = useState(0)

  const trackIdxRef = useRef(N)
  const outerRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const lockedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Measure track container; disable animation on resize
  useEffect(() => {
    if (!outerRef.current) return
    const measure = () => {
      const w = outerRef.current!.offsetWidth
      const v = getVis(w)
      setCardW((w - GAP * (v - 1)) / v)
      setAnimated(false)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(outerRef.current)
    return () => ro.disconnect()
  }, [])

  // Re-enable animation shortly after cardW settles
  useEffect(() => {
    if (cardW === 0) return
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [cardW])

  const step = cardW + GAP
  const offset = trackIdx * step

  function snap(to: number) {
    lockedRef.current = true
    setTimeout(() => {
      setAnimated(false)
      trackIdxRef.current = to
      setTrackIdx(to)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimated(true)
          lockedRef.current = false
        })
      )
    }, SLIDE_MS + 60)
  }

  function goForward() {
    if (lockedRef.current) return
    const next = trackIdxRef.current + 1
    trackIdxRef.current = next
    setTrackIdx(next)
    setDotIdx(i => (i + 1) % N)
    if (next >= 2 * N) snap(N)
  }

  function goBack() {
    if (lockedRef.current) return
    const next = trackIdxRef.current - 1
    trackIdxRef.current = next
    setTrackIdx(next)
    setDotIdx(i => (i - 1 + N) % N)
    if (next < N) snap(2 * N - 1)
  }

  function startTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!pausedRef.current && !lockedRef.current) goForward()
    }, INTERVAL_MS)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Our Sponsors</SectionTitle>
        <SectionSubtitle>
          Thank you to the organizations that make our team possible.
        </SectionSubtitle>
      </SectionHeader>

      <CarouselWrapper
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <ArrowBtn
          onClick={() => { goBack(); startTimer() }}
          aria-label="Previous sponsor"
        >
          <MdChevronLeft />
        </ArrowBtn>

        <TrackOuter ref={outerRef}>
          {cardW > 0 && (
            <Track $offset={offset} $animated={animated}>
              {ITEMS.map((s, i) => {
                const hasLink = !!s.website && s.website !== 'N/A'
                return (
                  <CardOuter
                    key={i}
                    $w={cardW}
                    $clickable={hasLink}
                    as={hasLink ? 'a' : 'div'}
                    {...(hasLink
                      ? { href: s.website, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    onMouseEnter={() => {
                      if (s.name === 'GE HealthCare') window.dispatchEvent(new CustomEvent('ge-hover', { detail: { active: true } }))
                    }}
                    onMouseLeave={() => {
                      if (s.name === 'GE HealthCare') window.dispatchEvent(new CustomEvent('ge-hover', { detail: { active: false } }))
                    }}
                  >
                    <BorderGlow
                      backgroundColor="#141414"
                      borderRadius={16}
                      glowColor="217 100 84"
                      colors={['#adc6ff', '#4ae183', '#adc6ff']}
                      glowRadius={18}
                      glowIntensity={0.9}
                      edgeSensitivity={20}
                      coneSpread={22}
                      fillOpacity={0.12}
                      animated={false}
                    >
                      <Logo src={s.image} alt={s.name} />
                      <SponsorName>{s.name}</SponsorName>
                    </BorderGlow>
                  </CardOuter>
                )
              })}
            </Track>
          )}
        </TrackOuter>

        <ArrowBtn
          onClick={() => { goForward(); startTimer() }}
          aria-label="Next sponsor"
        >
          <MdChevronRight />
        </ArrowBtn>
      </CarouselWrapper>

      <DotsRow>
        {SPONSORS.map((s, i) => (
          <Dot
            key={s.name}
            $active={i === dotIdx}
            onClick={() => {
              const steps = (i - dotIdx + N) % N
              for (let k = 0; k < steps; k++) goForward()
              startTimer()
            }}
            aria-label={`Go to ${s.name}`}
          />
        ))}
      </DotsRow>
    </Section>
  )
}
