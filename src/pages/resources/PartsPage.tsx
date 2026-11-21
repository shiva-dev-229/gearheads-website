import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdSearch, MdInventory2 } from 'react-icons/md'
import { theme } from '../../styles/theme'
import { chipHover } from '../../styles/mixins'
import FadeIn from '../../components/reactbits/FadeIn'
import PartCard from '../../components/parts/PartCard'
import PartModal from '../../components/parts/PartModal'
import { PARTS, CATEGORIES, PRODUCTION_HUB_URL, type Part, type PartCategory } from '../../data/parts'

const PART_FILES = import.meta.glob('../../assets/parts/final/*/*.{stl,png}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function resolvePartFile(part: Part, filename: string): string | null {
  return PART_FILES[`../../assets/parts/final/${part.assetFolder}/${filename}`] ?? null
}

// ─── Layout shell ───────────────────────────────────────────────────────────

const PageRoot = styled.div`
  width: 100%;
`

const Section = styled.section`
  padding: 56px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: ${theme.spacing.sectionPaddingXl} ${theme.spacing.marginDesktopLg};
  }
`

const HeroSection = styled(Section)`
  padding-bottom: 32px;

  @media (min-width: 768px) {
    padding-bottom: 48px;
  }
`

const Inner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

// ─── Hero ───────────────────────────────────────────────────────────────────

const Eyebrow = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.85;
  margin: 0 0 16px;
`

const HeroHeading = styled.h1`
  font-family: ${theme.fonts.headline};
  font-size: clamp(2rem, 3.5vw + 1rem, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${theme.colors.onSurface};
  margin: 0 0 18px;
  max-width: 720px;
`

const HeroSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  max-width: ${theme.spacing.proseMax};
  margin: 0;
`

const HeroNote = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: ${theme.spacing.proseMax};
  margin: 16px 0 0;

  a {
    color: ${theme.colors.primary};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

// ─── Filter bar ─────────────────────────────────────────────────────────────

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  @media (min-width: 720px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SearchField = styled.div`
  position: relative;
  flex: 1;
  max-width: 340px;
`

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
  pointer-events: none;
`

const SearchInput = styled.input`
  width: 100%;
  background: ${theme.colors.surfaceRaised};
  border: 1px solid ${theme.colors.hairlineStrong};
  border-radius: ${theme.rounded.pill};
  padding: 11px 16px 11px 40px;
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  transition: border-color 0.2s ease;

  &::placeholder { color: ${theme.colors.textSecondary}; }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

const CategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const CategoryPill = styled.button<{ $active: boolean }>`
  ${chipHover}
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 9px 16px;
  border-radius: ${theme.rounded.pill};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  background: ${({ $active }) => ($active ? theme.colors.surfaceRaised : 'transparent')};
  border-color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.hairline)};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

// ─── Grid ───────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${theme.spacing.gutter};
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 64px 20px;
  text-align: center;
  color: ${theme.colors.textSecondary};
`

const EmptyStateText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  margin: 0;
`

export default function PartsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<PartCategory | 'All'>('All')
  const [selectedPart, setSelectedPart] = useState<Part | null>(null)

  const filteredParts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PARTS.filter((part) => {
      const matchesCategory = activeCategory === 'All' || part.category === activeCategory
      const matchesQuery =
        q.length === 0 ||
        part.name.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <PageRoot>
      <HeroSection>
        <Inner>
          <FadeIn direction="up">
            <Eyebrow>Resources · Parts</Eyebrow>
            <HeroHeading>Parts we've built — yours to build from too.</HeroHeading>
            <HeroSubtitle>
              Every part below came out of our own robot this season. Download the STL and code,
              or email us and we'll send it directly. Need it made, not just designed? Our
              Production Hub can CNC or print it for you.
            </HeroSubtitle>
            <HeroNote>
              Looking for fabrication instead of files?{' '}
              <Link to={PRODUCTION_HUB_URL}>Request one from the Production Hub →</Link>
            </HeroNote>
          </FadeIn>
        </Inner>
      </HeroSection>

      <Section style={{ paddingTop: 0 }}>
        <Inner>
          <FadeIn direction="up">
            <FilterBar>
              <SearchField>
                <SearchIcon size={16} />
                <SearchInput
                  type="text"
                  placeholder="Search parts…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search parts"
                />
              </SearchField>

              <CategoryRow role="group" aria-label="Filter by category">
                <CategoryPill
                  type="button"
                  $active={activeCategory === 'All'}
                  onClick={() => setActiveCategory('All')}
                >
                  All
                </CategoryPill>
                {CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat}
                    type="button"
                    $active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </CategoryPill>
                ))}
              </CategoryRow>
            </FilterBar>
          </FadeIn>

          {filteredParts.length > 0 ? (
            <Grid>
              {filteredParts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  imageUrl={resolvePartFile(part, part.imageFile)}
                  onOpen={setSelectedPart}
                />
              ))}
            </Grid>
          ) : (
            <EmptyState>
              <MdInventory2 size={28} color={theme.colors.textSecondary} style={{ opacity: 0.5 }} />
              <EmptyStateText>No parts match "{query}" in {activeCategory === 'All' ? 'any category' : activeCategory}.</EmptyStateText>
            </EmptyState>
          )}
        </Inner>
      </Section>

      {selectedPart && (
        <PartModal
          part={selectedPart}
          resolveFile={(filename) => resolvePartFile(selectedPart, filename)}
          onClose={() => setSelectedPart(null)}
        />
      )}
    </PageRoot>
  )
}
