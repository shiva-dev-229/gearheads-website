import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MdSchool, MdBuild } from 'react-icons/md'
import { theme } from '../styles/theme'
import rawEntries from '../public/timeline.json'

const entries = rawEntries.map((e) => ({
  ...e,
  side: e.side as 'left' | 'right',
}))

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 32px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 48px;
  background: ${theme.colors.surfaceContainerLow};
  border-radius: 24px;

  @media (min-width: 768px) {
    padding: 64px ${theme.spacing.marginDesktop};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 40px;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
`

const TimelineWrapper = styled.div`
  position: relative;
`

const CenterLine = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${theme.colors.outlineVariant}33;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    display: block;
  }
`

const Entries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  position: relative;
`

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease var(--entry-delay, 0ms), transform 0.55s ease var(--entry-delay, 0ms);

  &.rb-visible {
    opacity: 1;
    transform: none;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }
`

const EntryContentLink = styled(Link)<{ $align: 'left' | 'right' }>`
  flex: 1;
  text-align: left;
  display: block;
  text-decoration: none;
  padding: 12px;
  margin: -12px;
  border-radius: 16px;
  transition: background 0.18s;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  @media (min-width: 768px) {
    text-align: ${({ $align }) => ($align === 'left' ? 'right' : 'left')};
  }
`

const EntryContentSpacer = styled.div`
  flex: 1;
  display: none;
  @media (min-width: 768px) { display: block; }
`

const EntryDot = styled.div`
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 768px) {
    display: flex;
  }
`

const DotCore = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--entry-color, ${theme.colors.primary});
  box-shadow: 0 0 8px var(--entry-glow, rgba(173, 198, 255, 0.6));
  transform: scale(0.6);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  .rb-visible & {
    transform: scale(1);
  }
`

const EntryYear = styled.h4`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--entry-color, ${theme.colors.primary});
  margin-bottom: 4px;
`

const TypeChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--entry-color, ${theme.colors.primary});
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--entry-border, ${theme.colors.primary}30);
  border-radius: 6px;
  padding: 3px 7px;
  margin-left: 8px;
  vertical-align: middle;

  svg {
    font-size: 11px;
    flex-shrink: 0;
  }
`

const EntryTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  color: ${theme.colors.onSurface};
  margin-bottom: 8px;
  transition: color 0.18s;

  ${EntryContentLink}:hover & {
    color: var(--entry-color, ${theme.colors.primary});
  }
`

const EntryDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 380px;
`

const LeftAlignedDesc = styled(EntryDesc)`
  @media (min-width: 768px) {
    margin-left: auto;
  }
`

export default function Timeline() {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = entryRefs.current.map(el => {
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('rb-visible')
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Timeline</SectionTitle>
        <SectionSubtitle>
          A decade of FIRST robotics, engineering growth, and outreach.
        </SectionSubtitle>
      </SectionHeader>

      <TimelineWrapper>
        <CenterLine />
        <Entries>
          {entries.map((entry, index) => {
            const isLeft = entry.side === 'left'
            const isFLL = entry.year.includes('FLL')
            const typeChip = (
              <TypeChip>
                {isFLL ? <MdSchool /> : <MdBuild />}
                {isFLL ? 'FLL' : 'FTC'}
              </TypeChip>
            )

            const entryColor = isFLL ? theme.colors.primary : theme.colors.secondary
            const entryGlow = isFLL ? 'rgba(173,198,255,0.55)' : 'rgba(74,225,131,0.45)'
            const entryBorder = isFLL ? `${theme.colors.primary}30` : `${theme.colors.secondary}30`

            return (
              <Entry
                key={entry.title}
                ref={el => { entryRefs.current[index] = el }}
                style={{
                  '--entry-delay': `${index * 80}ms`,
                  '--entry-color': entryColor,
                  '--entry-glow': entryGlow,
                  '--entry-border': entryBorder,
                } as React.CSSProperties}
              >
                {isLeft ? (
                  <EntryContentLink to={entry.path} $align="left">
                    <EntryYear>{entry.year}{typeChip}</EntryYear>
                    <EntryTitle>{entry.title}</EntryTitle>
                    <LeftAlignedDesc>{entry.desc}</LeftAlignedDesc>
                  </EntryContentLink>
                ) : (
                  <EntryContentSpacer />
                )}

                <EntryDot>
                  <DotCore />
                </EntryDot>

                {!isLeft ? (
                  <EntryContentLink to={entry.path} $align="right">
                    <EntryYear>{entry.year}{typeChip}</EntryYear>
                    <EntryTitle>{entry.title}</EntryTitle>
                    <EntryDesc>{entry.desc}</EntryDesc>
                  </EntryContentLink>
                ) : (
                  <EntryContentSpacer />
                )}
              </Entry>
            )
          })}
        </Entries>
      </TimelineWrapper>
    </Section>
  )
}
