import type { ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { theme } from '../../styles/theme'
import type { CourseModule, Resource } from '../../data/tutorial-types'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdPlayCircleOutline,
  MdOpenInNew,
} from 'react-icons/md'
import HoverTitle from '../reactbits/HoverTitle'
import FadeIn from '../reactbits/FadeIn'
import BorderGlow from '../reactbits/BorderGlow'

// ─── Layout ──────────────────────────────────────────────────────────────────

const PageRoot = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 80px);
`

const Sidebar = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 272px;
    flex-shrink: 0;
    position: sticky;
    top: 80px;
    height: calc(100vh - 80px);
    overflow-y: auto;
    border-right: 1px solid ${theme.colors.outlineVariant}33;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const SidebarHeader = styled.div`
  padding: 24px 20px 20px;
  border-bottom: 1px solid ${theme.colors.outlineVariant}26;
`

const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`

const BrandIconWell = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: ${theme.colors.primary}18;
  border: 1px solid ${theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const BrandTitle = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.onSurface};
  letter-spacing: -0.01em;
`

const BrandSub = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  color: ${theme.colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ProgressTrack = styled.div`
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: ${theme.colors.outlineVariant}30;
  overflow: hidden;
`

const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
`

const ProgressLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  color: ${theme.colors.onSurfaceVariant};
  white-space: nowrap;
  flex-shrink: 0;
`

const SidebarNav = styled.div`
  padding: 16px 0;
  flex: 1;
`

const SidebarGroup = styled.div`
  & + & {
    margin-top: 32px;
  }
`

const SidebarGroupLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0 20px;
  margin: 0 0 10px;
`

const SidebarItem = styled.button<{ $active: boolean }>`
  width: 100%;
  background: ${({ $active }) => ($active ? `${theme.colors.primary}0e` : 'none')};
  border: none;
  border-left: 2px solid ${({ $active }) => ($active ? theme.colors.primary : 'transparent')};
  padding: 10px 20px 10px 18px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurfaceVariant)};
  font-family: ${theme.fonts.body};
  font-size: 13.5px;
  line-height: 1.4;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.onSurface)};
    background: ${({ $active }) =>
      $active ? `${theme.colors.primary}0e` : `${theme.colors.onSurface}08`};
  }
`

const ItemNumber = styled.span<{ $active: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 10.5px;
  flex-shrink: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.15s ease;
`

const Content = styled.div`
  flex: 1;
  min-width: 0;
  padding: 40px 24px 80px;

  @media (min-width: 768px) {
    padding: 48px 72px 96px;
  }
`

// ─── Mobile bar ───────────────────────────────────────────────────────────────

const MobileBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 0 20px;

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileChip = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

// ─── Content typography ───────────────────────────────────────────────────────

const ModuleBadge = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  background: ${theme.colors.secondary}16;
  border: 1px solid ${theme.colors.secondary}30;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 16px;
`

const MetaChip = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  margin-left: 8px;
`

const StyledHoverTitle = styled(HoverTitle)`
  font-family: ${theme.fonts.display};
  font-size: 36px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  letter-spacing: -0.03em;
  margin: 0 0 12px;
  line-height: 1.1;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`

const PageDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 17px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  line-height: 1.55;
  max-width: 640px;
`

const TitleDivider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.outlineVariant}26;
  margin: 24px 0 20px;
`

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
`

const ConceptChip = styled.span`
  background: ${theme.colors.primary}16;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.label};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid ${theme.colors.primary}30;
  display: inline-block;
`

const BodyText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 17px;
  color: ${theme.colors.onSurface};
  line-height: 1.8;
  margin: 0 0 18px;
`

// ─── Section label ────────────────────────────────────────────────────────────

const SectionLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 28px 0 14px;
`

// ─── Two-column body: text left, video + resources right ─────────────────────

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 28px;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

const TextColumn = styled.div``

const MediaColumn = styled.div``

const SoloVideoWrap = styled.div`
  max-width: 920px;
`

// ─── Video embed ───────────────────────────────────────────────────────────────

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background: ${theme.colors.surfaceContainerLowest};
  border: 1px solid ${theme.colors.outlineVariant}26;
  box-shadow: ${theme.shadows.neoRaisedLg};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}44;
    box-shadow:
      ${theme.shadows.neoRaisedLg},
      0 0 0 1px ${theme.colors.primary}16,
      0 0 28px ${theme.colors.primary}10;
  }

  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`

const VideoPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${theme.colors.onSurfaceVariant};
  background:
    radial-gradient(circle at 50% 40%, ${theme.colors.primary}0a, transparent 60%),
    ${theme.colors.surfaceContainerLowest};
`

const PlaceholderIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary}99;
  box-shadow: ${theme.shadows.neoInsetSm};
`

const PlaceholderText = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`

// ─── Resources ─────────────────────────────────────────────────────────────────

const ResourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const resourceLinkStyle = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${theme.colors.surfaceContainerLow};
  border: 1px solid ${theme.colors.outlineVariant}26;
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  text-decoration: none;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.primary}44;
    color: ${theme.colors.primary};
  }
`

const ExternalResourceLink = styled.a`${resourceLinkStyle}`
const InternalResourceLink = styled(Link)`${resourceLinkStyle}`

const ResourceIcon = styled.span`
  flex-shrink: 0;
  opacity: 0.6;
`

const ResourceEmpty = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant}99;
  font-style: italic;
  margin: 28px 0;
`

// ─── Important info box ────────────────────────────────────────────────────────

const TipCallout = styled.div`
  border-left: 3px solid ${theme.colors.secondary}cc;
  border-radius: 0 10px 10px 0;
  padding: 14px 20px;
  margin: 24px 0;
  background: ${theme.colors.surfaceContainerLow};
`

const TipLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  display: block;
`

const TipText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  line-height: 1.6;
  margin: 0;
`

// ─── Nav footer ───────────────────────────────────────────────────────────────

const NavFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
  margin-top: 64px;
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.outlineVariant}26;
`

const NavCardWrapper = styled.div`
  flex: 1;
  max-width: 280px;
`

const NavCardBody = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
`

const NavDirection = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 4px;
`

const NavTitle = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.primary};
  font-weight: 500;
`

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoBlock({ module }: { module: CourseModule }) {
  return (
    <VideoFrame>
      {module.youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${module.youtubeId}`}
          title={`${module.title} — video lesson`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <VideoPlaceholder>
          <PlaceholderIcon>
            <MdPlayCircleOutline size={26} />
          </PlaceholderIcon>
          <PlaceholderText>Video in production — check back soon</PlaceholderText>
        </VideoPlaceholder>
      )}
    </VideoFrame>
  )
}

function ResourcesBlock({ resources }: { resources?: Resource[] }) {
  if (!resources || resources.length === 0) {
    return <ResourceEmpty>Lesson-specific resources will be added here once available.</ResourceEmpty>
  }
  return (
    <ResourceList>
      {resources.map(r =>
        r.url.startsWith('/') ? (
          <InternalResourceLink key={r.url} to={r.url}>
            {r.label}
            <ResourceIcon>
              <MdOpenInNew size={15} />
            </ResourceIcon>
          </InternalResourceLink>
        ) : (
          <ExternalResourceLink key={r.url} href={r.url} target="_blank" rel="noreferrer">
            {r.label}
            <ResourceIcon>
              <MdOpenInNew size={15} />
            </ResourceIcon>
          </ExternalResourceLink>
        )
      )}
    </ResourceList>
  )
}

function TipBox({ tip }: { tip: string }) {
  return (
    <TipCallout>
      <TipLabel>Important</TipLabel>
      <TipText>{tip}</TipText>
    </TipCallout>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export interface VideoCourseTutorialProps {
  basePath: string
  brandIcon: ReactNode
  brandTitle: string
  brandSub: string
  navLabel: string
  modules: CourseModule[]
  courseResources?: Resource[]
  defaultSlug: string
}

export default function VideoCourseTutorial({
  basePath,
  brandIcon,
  brandTitle,
  brandSub,
  navLabel,
  modules,
  courseResources,
  defaultSlug,
}: VideoCourseTutorialProps) {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIdx = modules.findIndex(m => m.slug === slug)
  const courseModule = modules[currentIdx]
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : null
  const nextModule = currentIdx < modules.length - 1 ? modules[currentIdx + 1] : null

  if (!courseModule) {
    navigate(`${basePath}/${defaultSlug}`, { replace: true })
    return null
  }

  const progressPct = ((currentIdx + 1) / modules.length) * 100

  const groups: { label: string; items: CourseModule[] }[] = []
  for (const m of modules) {
    const label = m.section ?? navLabel
    const group = groups.find(g => g.label === label)
    if (group) group.items.push(m)
    else groups.push({ label, items: [m] })
  }

  const resources = [...(courseModule.resources ?? []), ...(courseResources ?? [])]
  const hasSupportingText = courseModule.body.length > 0 || !!courseModule.tip

  return (
    <PageRoot>
      <Sidebar aria-label="Course lessons">
        <SidebarHeader>
          <SidebarBrand>
            <BrandIconWell>{brandIcon}</BrandIconWell>
            <BrandText>
              <BrandTitle>{brandTitle}</BrandTitle>
              <BrandSub>{brandSub}</BrandSub>
            </BrandText>
          </SidebarBrand>
          <ProgressRow>
            <ProgressTrack>
              <ProgressFill $pct={progressPct} />
            </ProgressTrack>
            <ProgressLabel>
              {currentIdx + 1} / {modules.length}
            </ProgressLabel>
          </ProgressRow>
        </SidebarHeader>

        <SidebarNav>
          {groups.map(group => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              {group.items.map(m => (
                <SidebarItem
                  key={m.id}
                  $active={m.slug === slug}
                  onClick={() => navigate(`${basePath}/${m.slug}`)}
                >
                  <ItemNumber $active={m.slug === slug}>{m.number}</ItemNumber>
                  {m.title}
                </SidebarItem>
              ))}
            </SidebarGroup>
          ))}
        </SidebarNav>
      </Sidebar>

      <Content>
        <MobileBar>
          <MobileChip>
            Lesson {courseModule.number} / {modules.length}
          </MobileChip>
        </MobileBar>

        <AnimatePresence mode="wait">
          <motion.div
            key={courseModule.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ModuleBadge>Lesson {courseModule.number}</ModuleBadge>
            {courseModule.meta && <MetaChip>{courseModule.meta}</MetaChip>}

            <StyledHoverTitle text={courseModule.title} delay={18} />

            <PageDesc>{courseModule.description}</PageDesc>
            <TitleDivider />

            <ChipsRow>
              {courseModule.concepts.map((c, i) => (
                <motion.div
                  key={c}
                  style={{ display: 'inline-flex' }}
                  initial={{ opacity: 0, scale: 0.78, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.25, ease: 'easeOut' }}
                >
                  <ConceptChip>{c}</ConceptChip>
                </motion.div>
              ))}
            </ChipsRow>

            {hasSupportingText ? (
              <TwoColumnGrid>
                <TextColumn>
                  {courseModule.body.map((p, i) => (
                    <FadeIn key={i} direction="up" delay={i * 70} duration={480}>
                      <BodyText>{p}</BodyText>
                    </FadeIn>
                  ))}

                  {courseModule.tip && <TipBox tip={courseModule.tip} />}
                </TextColumn>

                <MediaColumn>
                  <VideoBlock module={courseModule} />

                  <SectionLabel>Resources</SectionLabel>
                  <ResourcesBlock resources={resources} />
                </MediaColumn>
              </TwoColumnGrid>
            ) : (
              <SoloVideoWrap>
                <VideoBlock module={courseModule} />

                <SectionLabel>Resources</SectionLabel>
                <ResourcesBlock resources={resources} />
              </SoloVideoWrap>
            )}

            <NavFooter>
              {prevModule ? (
                <NavCardWrapper>
                  <BorderGlow
                    borderRadius={10}
                    backgroundColor="#1c1b1b"
                    glowColor="222 100 84"
                    glowIntensity={0.55}
                    animated
                    colors={['#adc6ff', '#4ae183', '#adc6ff']}
                    fillOpacity={0.05}
                    glowRadius={28}
                  >
                    <NavCardBody onClick={() => navigate(`${basePath}/${prevModule.slug}`)}>
                      <NavDirection>
                        <MdKeyboardArrowLeft size={14} />
                        Previous
                      </NavDirection>
                      <NavTitle>{prevModule.title}</NavTitle>
                    </NavCardBody>
                  </BorderGlow>
                </NavCardWrapper>
              ) : (
                <div />
              )}
              {nextModule ? (
                <NavCardWrapper>
                  <BorderGlow
                    borderRadius={10}
                    backgroundColor="#1c1b1b"
                    glowColor="222 100 84"
                    glowIntensity={0.55}
                    animated
                    colors={['#adc6ff', '#4ae183', '#adc6ff']}
                    fillOpacity={0.05}
                    glowRadius={28}
                  >
                    <NavCardBody onClick={() => navigate(`${basePath}/${nextModule.slug}`)}>
                      <NavDirection>
                        Next
                        <MdKeyboardArrowRight size={14} />
                      </NavDirection>
                      <NavTitle>{nextModule.title}</NavTitle>
                    </NavCardBody>
                  </BorderGlow>
                </NavCardWrapper>
              ) : (
                <div />
              )}
            </NavFooter>
          </motion.div>
        </AnimatePresence>
      </Content>
    </PageRoot>
  )
}
