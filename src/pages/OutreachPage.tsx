import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdArrowForward, MdHandshake } from 'react-icons/md'
import { theme } from '../styles/theme'
import BlurText from '../components/reactbits/BlurText'
import FadeIn from '../components/reactbits/FadeIn'
import CountUpChip from '../components/reactbits/CountUpChip'
import data from '../data/outreach.json'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
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
  max-width: 680px;
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

// ─── Category groups ──────────────────────────────────────────────────────────

const CategoriesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

const CategoryGroup = styled.div``

const CategoryHeader = styled.div`
  margin-bottom: 20px;
`

const CategoryLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 6px;
  opacity: 0.8;
`

const CategoryTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(17px, 2.2vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 4px;
`

const CategoryDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.75;
`

// ─── Program cards ────────────────────────────────────────────────────────────

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const CardLink = styled(Link)`
  text-decoration: none;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 18px;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-3px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary};
    outline-offset: 3px;
    border-radius: 18px;
  }
`

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`

const CardTitle = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
  line-height: 1.3;
`

const CardArrow = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
  flex-shrink: 0;
  transition: box-shadow 0.2s, transform 0.2s;

  ${CardLink}:hover & {
    box-shadow: ${theme.shadows.neoInsetSm};
    transform: translate(2px, -2px);
  }
`

const CardDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.8;
`

// ─── Component ────────────────────────────────────────────────────────────────

const STATS = data.stats
const CATEGORIES = data.categories

export default function OutreachPage() {
  return (
    <PageRoot>

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroInner>
          <FadeIn direction="up" delay={0}>
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
          </FadeIn>
        </HeroInner>
      </HeroSection>

      <Divider />

      {/* ── 2. Top-line metrics ───────────────────────────────────────── */}
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

      {/* ── 3. Program grid ───────────────────────────────────────────── */}
      <Section>
        <Inner>
          <FadeIn direction="up">
            <SectionLabel>Programs</SectionLabel>
            <SectionHeading>Everything We Run</SectionHeading>
            <SectionSubtext>
              Twelve programs across four categories — each one student-led, hands-on, and built to last.
            </SectionSubtext>
          </FadeIn>

          <CategoriesStack>
            {CATEGORIES.map((cat, catIdx) => (
              <FadeIn key={cat.id} direction="up" delay={catIdx * 80}>
                <CategoryGroup>
                  <CategoryHeader>
                    <CategoryLabel>Category</CategoryLabel>
                    <CategoryTitle>{cat.label}</CategoryTitle>
                    <CategoryDesc>{cat.description}</CategoryDesc>
                  </CategoryHeader>

                  <CardGrid>
                    {cat.pages.map((page) => (
                      <CardLink
                        key={page.slug}
                        to={`/outreach/${page.slug}`}
                        aria-label={`${page.title} — ${page.description}`}
                      >
                        <CardTop>
                          <CardTitle>{page.title}</CardTitle>
                          <CardArrow aria-hidden="true">
                            <MdArrowForward size={14} />
                          </CardArrow>
                        </CardTop>
                        <CardDesc>{page.description}</CardDesc>
                      </CardLink>
                    ))}
                  </CardGrid>
                </CategoryGroup>
              </FadeIn>
            ))}
          </CategoriesStack>
        </Inner>
      </Section>

    </PageRoot>
  )
}
