import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  MdArrowForward,
  MdArrowBack,
  MdPlace,
  MdRoute,
  MdImage,
  MdGroups,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import BlurText from '../../components/reactbits/BlurText'
import FadeIn from '../../components/reactbits/FadeIn'
import autoPathsData from '../../data/auto-paths.json'

// ─── Path diagram images (drop files into assets/photos/auto-paths/) ───────────

const PATH_IMAGES = import.meta.glob(
  '../../assets/photos/auto-paths/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' }
) as Record<string, string>

function resolveImage(filename: string): string | null {
  if (!filename) return null
  const match = Object.entries(PATH_IMAGES).find(([key]) => key.endsWith(`/${filename}`))
  return match ? match[1] : null
}

// ─── Shared Layout ────────────────────────────────────────────────────────────

const PageRoot = styled.div`
  width: 100%;
  overflow-x: hidden;
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
  margin: 0;
`

// ─── Hero ─────────────────────────────────────────────────────────────────────

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
  background: ${theme.colors.primary};
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
  max-width: 720px;
  margin: 0;
`

// ─── Alliance note ────────────────────────────────────────────────────────────

const AllianceNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 18px;
  padding: 22px 26px;
  border-left: 3px solid ${theme.colors.secondary};
`

const AllianceIcon = styled.div`
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

const AllianceText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Section Headers ──────────────────────────────────────────────────────────

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

// ─── Path Browser ─────────────────────────────────────────────────────────────

const BrowserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 900px) {
    grid-template-columns: 300px 1fr;
    align-items: start;
  }
`

const PathList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;

  &::-webkit-scrollbar { display: none; }

  @media (min-width: 900px) {
    flex-direction: column;
    overflow-x: visible;
    padding-bottom: 0;
  }
`

const PathListItem = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
  flex-shrink: 0;
  min-width: 220px;
  background: ${theme.colors.background};
  border: none;
  border-radius: 14px;
  padding: 16px 18px;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? theme.shadows.neoInset : theme.shadows.neoRaisedSm};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: ${({ $active }) =>
      $active ? theme.shadows.neoInset : theme.shadows.neoRaised};
    transform: ${({ $active }) => ($active ? 'none' : 'translateY(-2px)')};
  }

  @media (min-width: 900px) {
    min-width: 0;
    width: 100%;
  }
`

const PathListName = styled.span<{ $active: boolean }>`
  font-family: ${theme.fonts.headline};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurface)};
  transition: color 0.2s ease;
`

const PathListLoc = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.7;

  svg { flex-shrink: 0; }
`

// ── Detail panel ──

/*
 * overflow:hidden is intentionally absent here. Pairing it with an outward
 * box-shadow and border-radius creates a compositor-layer mismatch: the shadow
 * is painted outside the clipped layer, causing visible edge artifacts when
 * switching paths. The image corner-clipping is delegated to ImageArea instead.
 */
const DetailPanel = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 22px;
  animation: panelEnter 0.28s ease both;

  @keyframes panelEnter {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  /* inner clip: slightly smaller radius so nested corners sit flush */
  border-radius: 16px;
  overflow: hidden;
`

const PathImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px;
  text-align: center;
`

const PlaceholderIcon = styled.span`
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.28;
`

const PlaceholderName = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.7;
`

const PlaceholderHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.45;
  max-width: 280px;
`

const DetailBody = styled.div`
  padding: 26px 28px 30px;

  @media (min-width: 640px) {
    padding: 30px 36px 34px;
  }
`

const DetailName = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 12px;
  line-height: 1.15;
`

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 50px;
  padding: 7px 14px;
  margin-bottom: 18px;
`

const LocationBadgeLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.55;
`

const LocationBadgeValue = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

const DetailDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 22px;
  max-width: 680px;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-radius: 50px;
  padding: 6px 13px;
`

// ── Empty state ──

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 22px;
  padding: 64px 32px;
  border: 1px dashed ${theme.colors.outlineVariant}33;
`

const EmptyIcon = styled.span`
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.3;
`

const EmptyTitle = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
`

const EmptyHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.6;
  max-width: 420px;
`

// ─── Continue Nav ─────────────────────────────────────────────────────────────

const NavCardLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 24px 28px;
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  max-width: 480px;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: ${theme.shadows.neoInset};
    transform: translateY(0);
  }
`

const NavCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const NavCardIconWell = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const NavCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const NavCardLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
`

const NavCardTitle = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
`

const NavCardArrow = styled.div`
  color: ${theme.colors.primary};
  opacity: 0.6;
  flex-shrink: 0;
`

// ─── Component ────────────────────────────────────────────────────────────────

interface AutoPath {
  id: string
  name: string
  startingLocation: string
  description: string
  tags: string[]
  image: string
}

export default function AutoPathsPage() {
  const paths = autoPathsData.paths as AutoPath[]
  const [activeId, setActiveId] = useState(paths[0]?.id ?? '')

  const active = paths.find((p) => p.id === activeId) ?? paths[0]
  const activeImage = active ? resolveImage(active.image) : null

  return (
    <PageRoot>
      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <FadeIn direction="up" delay={0}>
            <Chip>
              <ChipDot />
              Auto Paths
            </Chip>
            <HeroHeading>
              <BlurText
                text="Every auto, open to our partners."
                delay={55}
                animateBy="words"
                direction="bottom"
              />
            </HeroHeading>
            <HeroSubtitle>
              A shared reference for the autonomous routines we can run. Each entry lists where the
              robot starts, what it does, and a diagram of its route — so alliance partners can pick
              complementary starting spots and know exactly what to expect in the first 30 seconds.
            </HeroSubtitle>
          </FadeIn>
        </HeroInner>
      </HeroSection>

      <Section style={{ paddingTop: 0 }}>
        <Inner>
          <FadeIn direction="up">
            <AllianceNote>
              <AllianceIcon aria-hidden="true">
                <MdGroups size={20} />
              </AllianceIcon>
              <AllianceText>{autoPathsData.intro}</AllianceText>
            </AllianceNote>
          </FadeIn>
        </Inner>
      </Section>

      <Divider />

      {/* ── 2. Path Browser ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Routine Library</SectionLabel>
            <SectionHeading>Available Paths</SectionHeading>
            <SectionSubtext>
              Select a path to see its starting position, description, and route diagram.
            </SectionSubtext>
          </FadeIn>

          {paths.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <MdRoute size={40} />
              </EmptyIcon>
              <EmptyTitle>No paths added yet</EmptyTitle>
              <EmptyHint>
                Auto paths will appear here as they're added — each with a starting location,
                description, and route diagram.
              </EmptyHint>
            </EmptyState>
          ) : (
            <BrowserGrid>
              <PathList role="tablist" aria-label="Auto paths">
                {paths.map((p) => (
                  <PathListItem
                    key={p.id}
                    role="tab"
                    aria-selected={p.id === activeId}
                    $active={p.id === activeId}
                    onClick={() => setActiveId(p.id)}
                  >
                    <PathListName $active={p.id === activeId}>{p.name}</PathListName>
                    <PathListLoc>
                      <MdPlace size={12} />
                      {p.startingLocation}
                    </PathListLoc>
                  </PathListItem>
                ))}
              </PathList>

              {active && (
                <DetailPanel key={active.id}>
                  <ImageArea>
                    {activeImage ? (
                      <PathImage src={activeImage} alt={`${active.name} route diagram`} />
                    ) : (
                      <ImagePlaceholder>
                        <PlaceholderIcon>
                          <MdImage size={40} />
                        </PlaceholderIcon>
                        <PlaceholderName>path diagram</PlaceholderName>
                        <PlaceholderHint>
                          Drop a diagram into assets/photos/auto-paths/ and set its filename in
                          auto-paths.json.
                        </PlaceholderHint>
                      </ImagePlaceholder>
                    )}
                  </ImageArea>

                  <DetailBody>
                    <DetailName>{active.name}</DetailName>
                    <LocationBadge>
                      <MdPlace size={14} color={theme.colors.primary} />
                      <LocationBadgeLabel>Starts</LocationBadgeLabel>
                      <LocationBadgeValue>{active.startingLocation}</LocationBadgeValue>
                    </LocationBadge>
                    <DetailDesc>{active.description}</DetailDesc>
                    {active.tags?.length > 0 && (
                      <TagRow>
                        {active.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </TagRow>
                    )}
                  </DetailBody>
                </DetailPanel>
              )}
            </BrowserGrid>
          )}
        </Inner>
      </Section>

      <Divider />

      {/* ── 3. Continue Nav ──────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <NavCardLink to="/programming" aria-label="Back to Software overview">
              <NavCardLeft>
                <NavCardIconWell>
                  <MdArrowBack size={20} />
                </NavCardIconWell>
                <NavCardText>
                  <NavCardLabel>Back to</NavCardLabel>
                  <NavCardTitle>Software Overview</NavCardTitle>
                </NavCardText>
              </NavCardLeft>
              <NavCardArrow>
                <MdArrowForward size={20} />
              </NavCardArrow>
            </NavCardLink>
          </FadeIn>
        </Inner>
      </Section>
    </PageRoot>
  )
}
