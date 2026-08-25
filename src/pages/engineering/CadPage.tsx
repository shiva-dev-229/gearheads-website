import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdFlag,
  MdArchitecture,
  MdBuild,
  MdAutorenew,
  MdExpandMore,
  MdCameraAlt,
  MdComputer,
  MdPeople,
  MdSchema,
} from 'react-icons/md'
import { theme } from '../../styles/theme'
import { chipHover } from '../../styles/mixins'
import FadeIn from '../../components/reactbits/FadeIn'
import cadData from '../../data/cad.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const WORKFLOW_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  MdFlag:        MdFlag,
  MdArchitecture: MdArchitecture,
  MdBuild:       MdBuild,
  MdAutorenew:   MdAutorenew,
}

// ─── Keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// ─── Layout ───────────────────────────────────────────────────────────────────

const PageSection = styled.section`
  padding: 44px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 56px ${theme.spacing.marginDesktop};
  }
`

const SectionInner = styled.div`
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
  margin-bottom: 24px;
  cursor: default;

  ${chipHover}
`

const ChipDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? theme.colors.secondary};
  flex-shrink: 0;
`

// ─── Section heading shared ───────────────────────────────────────────────────

const SectionHeading = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 0 0 12px;
  line-height: 1.2;
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 580px;
  margin: 0 0 32px;
`

// ─── Photo slot ───────────────────────────────────────────────────────────────

const PhotoSlot = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 20px;
  border: 1.5px dashed ${theme.colors.outlineVariant}38;
`

const PhotoSlotLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.75;
`

const PhotoSlotHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 12px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.42;
  text-align: center;
  max-width: 220px;
`

// ─── Onshape section ──────────────────────────────────────────────────────────

const OnshapeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 56px;
    align-items: center;
  }
`

const OnshapeFactsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const OnshapeFactRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
  border-bottom: ${({ $last }) => $last ? 'none' : `1px solid ${theme.colors.outlineVariant}14`};
`

const FactIconWell = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`

const FactText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const FactTitle = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
`

const FactBody = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
`

const OnshapePhotoSlot = styled(PhotoSlot)`
  min-height: 280px;

  @media (min-width: 768px) {
    min-height: 340px;
  }
`

// ─── Workflow section ─────────────────────────────────────────────────────────

const WorkflowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.gutter};

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const WorkflowStep = styled.div<{ $index: number }>`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${fadeUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${({ $index }) => $index * 80}ms both;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const StepNum = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.3;
`

const StepIconWell = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
`

const StepTitle = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  line-height: 1.3;
`

const StepDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Lessons accordion — FAQ parity ──────────────────────────────────────────

type LessonAccent = 'blue' | 'green'

const lessonAccentColor = (accent: LessonAccent) =>
  accent === 'blue' ? theme.colors.primary : theme.colors.secondary

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const AccordionItem = styled.div<{ $open: boolean; $accent: LessonAccent }>`
  background: ${({ $open }) => ($open ? theme.colors.surfaceContainerLow : theme.colors.background)};
  box-shadow: ${({ $open }) => ($open ? theme.shadows.neoRaisedLg : theme.shadows.neoRaised)};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid
    ${({ $open }) =>
      $open ? `${theme.colors.outlineVariant}55` : `${theme.colors.outlineVariant}25`};
  transition: background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
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
`

const AccordionNumber = styled.span<{ $open: boolean; $accent: LessonAccent }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 28px;
  color: ${({ $open, $accent }) => ($open ? lessonAccentColor($accent) : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.45)};
  transition: color 0.22s, opacity 0.22s;
`

const AccordionTitle = styled.span`
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

const AccordionChevron = styled.div<{ $open: boolean; $accent: LessonAccent }>`
  font-size: 22px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.22s ease, color 0.22s ease, opacity 0.22s;
  color: ${({ $open, $accent }) => ($open ? lessonAccentColor($accent) : theme.colors.onSurfaceVariant)};
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

const AccordionAnswerWrap = styled.div<{ $accent: LessonAccent }>`
  padding: 0 20px 20px;

  @media (min-width: 768px) {
    padding: 0 24px 22px;
  }
`

const AccordionHairline = styled.div<{ $accent: LessonAccent }>`
  height: 1px;
  background: ${({ $accent }) => `${lessonAccentColor($accent)}25`};
  margin-bottom: 16px;
`

const AccordionBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  max-width: 68ch;
`

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────

interface RevealSectionProps {
  children: React.ReactNode
  delay?: number
}

function RevealSection({ children, delay = 0 }: RevealSectionProps) {
  return (
    <FadeIn delay={delay} duration={500} direction="up">
      {children}
    </FadeIn>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CadSection() {
  const [openLesson, setOpenLesson] = useState<string | null>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[]
    const observers = els.map((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('cad-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.07 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])


  const onshapeFacts = [
    {
      iconKey: 'computer',
      icon: <MdComputer size={18} color={theme.colors.primary} />,
      title: 'Web-Based — Runs on Chromebooks',
      body: 'Onshape is the main CAD software the team uses. Because it is entirely web-based, every team member can open and edit the model from a school-issued Chromebook — no local installation or hardware upgrade required.',
    },
    {
      iconKey: 'people',
      icon: <MdPeople size={18} color={theme.colors.secondary} />,
      title: 'Real-Time Multi-Member Collaboration',
      body: 'Multiple members design subsystems simultaneously in the same document. Onshape handles live merges, so the mechanical lead and the drivetrain lead can work in the same assembly at the same time.',
    },
    {
      iconKey: 'schema',
      icon: <MdSchema size={18} color={theme.colors.tertiary} />,
      title: 'Joints Define Motion',
      body: 'The team organizes every CAD design into subsystems and uses joints to define how parts move. This confirms that moving parts have enough space and allows the team to experiment with more complex features like linkages.',
    },
  ]

  return (
    <div id="cad">

      {/* ── Onshape ──────────────────────────────────────── */}
      <PageSection
        ref={(el) => { sectionRefs.current[0] = el }}
      >
        <SectionInner>
          <RevealSection>
            <Chip>
              <ChipDot $color={theme.colors.primary} />
              Our CAD Platform
            </Chip>
            <SectionHeading>Why Onshape?</SectionHeading>
            <SectionSubtitle>
              Web-based, real-time, and accessible from any Chromebook. The platform the whole
              team can use without friction.
            </SectionSubtitle>
          </RevealSection>

          <RevealSection delay={80}>
            <OnshapeGrid>
              <OnshapeFactsList>
                {onshapeFacts.map((fact, i) => (
                  <OnshapeFactRow key={fact.iconKey} $last={i === onshapeFacts.length - 1}>
                    <FactIconWell>{fact.icon}</FactIconWell>
                    <FactText>
                      <FactTitle>{fact.title}</FactTitle>
                      <FactBody>{fact.body}</FactBody>
                    </FactText>
                  </OnshapeFactRow>
                ))}
              </OnshapeFactsList>

              <OnshapePhotoSlot>
                <MdCameraAlt size={22} color={theme.colors.outlineVariant} style={{ opacity: 0.4 }} />
                <PhotoSlotLabel>cad-screen</PhotoSlotLabel>
                <PhotoSlotHint>Onshape open with subsystem model — robot assembly view</PhotoSlotHint>
              </OnshapePhotoSlot>
            </OnshapeGrid>
          </RevealSection>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── 100% CAD Workflow ─────────────────────────────── */}
      <PageSection
        ref={(el) => { sectionRefs.current[1] = el }}
      >
        <SectionInner>
          <RevealSection>
            <Chip>
              <ChipDot $color={theme.colors.secondary} />
              Design Process
            </Chip>
            <SectionHeading>100% CAD Workflow</SectionHeading>
            <SectionSubtitle>
              The whole robot is CAD-designed in the first few weeks after kickoff. Software and
              mechanical development run in parallel — each subsystem has a CAD model before any
              part is cut.
            </SectionSubtitle>
          </RevealSection>

          <RevealSection delay={60}>
            <WorkflowGrid>
              {cadData.workflowSteps.map((step, i) => {
                const Icon = WORKFLOW_ICONS[step.iconKey]
                return (
                  <WorkflowStep key={step.id} $index={i}>
                    <StepNum>Phase {String(i + 1).padStart(2, '0')}</StepNum>
                    <StepIconWell>
                      {Icon && <Icon size={20} color={theme.colors.primary} />}
                    </StepIconWell>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDesc>{step.description}</StepDesc>
                  </WorkflowStep>
                )
              })}
            </WorkflowGrid>
          </RevealSection>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Lessons Learned ──────────────────────────────── */}
      <PageSection
        ref={(el) => { sectionRefs.current[3] = el }}
      >
        <SectionInner>
          <RevealSection>
            <Chip>
              <ChipDot $color={theme.colors.secondary} />
              Lessons Learned
            </Chip>
            <SectionHeading>What We Discovered</SectionHeading>
            <SectionSubtitle>
              Integration and version-control insights built up over multiple seasons of 100%
              CAD-first development.
            </SectionSubtitle>
          </RevealSection>

          <RevealSection delay={60}>
            <AccordionList>
              {cadData.lessons.map((lesson, i) => {
                const isOpen = openLesson === lesson.id
                const accent: LessonAccent = i % 2 === 0 ? 'blue' : 'green'
                const num = String(i + 1).padStart(2, '0')
                return (
                  <AccordionItem key={lesson.id} $open={isOpen} $accent={accent}>
                    <AccordionButton
                      onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                      aria-expanded={isOpen}
                    >
                      <AccordionNumber $open={isOpen} $accent={accent}>{num}</AccordionNumber>
                      <AccordionTitle>{lesson.title}</AccordionTitle>
                      <AccordionChevron $open={isOpen} $accent={accent}>
                        <MdExpandMore />
                      </AccordionChevron>
                    </AccordionButton>

                    <AccordionCollapse $open={isOpen}>
                      <AccordionCollapseInner>
                        <AccordionAnswerWrap $accent={accent}>
                          <AccordionHairline $accent={accent} />
                          <AccordionBody>{lesson.body}</AccordionBody>
                        </AccordionAnswerWrap>
                      </AccordionCollapseInner>
                    </AccordionCollapse>
                  </AccordionItem>
                )
              })}
            </AccordionList>
          </RevealSection>

        </SectionInner>
      </PageSection>


    </div>
  )
}
