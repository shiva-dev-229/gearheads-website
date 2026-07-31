import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MdShowChart, MdArchitecture, MdQueryStats, MdTerminal } from 'react-icons/md'
import { theme } from '../styles/theme'

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 36px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (min-width: 768px) {
    padding: ${theme.spacing.sectionPaddingLg} ${theme.spacing.marginDesktop};
    gap: 36px;
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
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 34px;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }
`

const Card = styled.div<{ $span?: 2 | 3 }>`
  position: relative;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: box-shadow 0.3s, opacity 550ms ease, transform 550ms ease;
  transition-delay: 0ms, var(--fade-delay, 0ms), var(--fade-delay, 0ms);
  opacity: 0;
  transform: translateY(28px);

  &.rb-visible {
    opacity: 1;
    transform: none;
  }

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }

  @media (min-width: 560px) {
    border-radius: 24px;
    padding: 32px;
    grid-column: ${({ $span }) => ($span === 2 ? 'span 2' : 'span 1')};
  }

  @media (min-width: 1024px) {
    grid-column: ${({ $span }) => ($span ? `span ${$span}` : 'span 1')};

    &::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: radial-gradient(
        400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(74, 225, 131, 0.12),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`

const IconWrap = styled.div`
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 26px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 64px;
    height: 64px;
    font-size: 28px;
  }
`

const CardTitle = styled.h3`
  position: relative;
  z-index: 1;
  font-family: ${theme.fonts.headline};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 22px;
  }
`

const CardText = styled.p`
  position: relative;
  z-index: 1;
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement | null) {
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}

export default function FeaturesGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardRefs.current.map(card => {
      if (!card) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.classList.add('rb-visible')
            observer.disconnect()
          }
        },
        { threshold: 0.12 }
      )
      observer.observe(card)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>What We Do</SectionTitle>
        <SectionSubtitle>
          Team #16460, the Gearheads — a student-led FTC team from Brookfield, Wisconsin. We build
          competitive robots, develop real engineering skills, and bring STEM to our community
          through outreach.
        </SectionSubtitle>
      </SectionHeader>

      <Grid>
        <Card
          ref={el => { cardRefs.current[0] = el }}
          style={{ '--fade-delay': '0ms' } as React.CSSProperties}
          $span={2}
          onMouseMove={e => handleCardMouseMove(e, cardRefs.current[0])}
        >
          <IconWrap><MdShowChart /></IconWrap>
          <CardTitle>Competitive Robotics</CardTitle>
          <CardText>
            We design, build, and program nearly 100% custom-CADed robots to compete in the FIRST
            Tech Challenge. Iterative testing, reliable engineering, and innovative mechanisms have
            taken us to multiple World Championships.
          </CardText>
        </Card>

        <Card
          ref={el => { cardRefs.current[1] = el }}
          style={{ '--fade-delay': '80ms' } as React.CSSProperties}
          onMouseMove={e => handleCardMouseMove(e, cardRefs.current[1])}
        >
          <IconWrap><MdArchitecture /></IconWrap>
          <CardTitle>Hands-On Outreach</CardTitle>
          <CardText>
            Outreach isn't optional — it's who we are. We run STEM workshops at Children's
            Wisconsin and the Milwaukee VA, host a Rookie Qualifier, refurbish and donate
            computers, and demo robotics at events like Maker Faire.
          </CardText>
        </Card>

        <Card
          ref={el => { cardRefs.current[2] = el }}
          style={{ '--fade-delay': '160ms' } as React.CSSProperties}
          onMouseMove={e => handleCardMouseMove(e, cardRefs.current[2])}
        >
          <IconWrap><MdQueryStats /></IconWrap>
          <CardTitle>Engineering & Strategy</CardTitle>
          <CardText>
            From CAD and CNC fabrication to autonomous navigation, motion profiling, and
            data-driven match strategy, our subteams turn ideas into competition-ready systems.
          </CardText>
        </Card>

        <Card
          ref={el => { cardRefs.current[3] = el }}
          style={{ '--fade-delay': '240ms' } as React.CSSProperties}
          $span={2}
          onMouseMove={e => handleCardMouseMove(e, cardRefs.current[3])}
        >
          <IconWrap><MdTerminal /></IconWrap>
          <CardTitle>Software & Coding</CardTitle>
          <CardText>
            We program our robots in Java for FTC — autonomous routines, sensor integration, and
            field-centric driving. New to coding? Learn with FTC Wires, our video series covering
            both block coding and Java.
          </CardText>
        </Card>
      </Grid>
    </Section>
  )
}
