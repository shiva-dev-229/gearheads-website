import { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { MdClose, MdOpenInNew, MdChevronRight, MdArrowBack, MdArrowForward } from 'react-icons/md'
import { theme } from '../styles/theme'

export interface FolderModalItemDetail {
  fullDesc: string
  projects: Array<{ name: string; desc: string }>
  url?: string
  linkLabel?: string
}

export interface FolderModalItem {
  icon: React.ReactNode
  color: string
  title: string
  description: string
  url?: string
  detail?: FolderModalItemDetail
}

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const cardIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${overlayIn} 0.18s ease;
`

const Card = styled.div`
  background: ${theme.colors.surfaceContainerLow};
  box-shadow: ${theme.shadows.neoRaisedLg};
  border-radius: 28px;
  border: 1px solid ${theme.colors.outlineVariant}22;
  width: 100%;
  max-width: 560px;
  max-height: 88vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${cardIn} 0.28s cubic-bezier(0.16, 1, 0.3, 1);
`

const CardTop = styled.div<{ $color: string }>`
  height: 4px;
  background: ${({ $color }) => $color};
  opacity: 0.7;
  flex-shrink: 0;
`

const CardHead = styled.div`
  padding: 28px 36px 20px;
  position: relative;
  flex-shrink: 0;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  color: ${theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.18s, box-shadow 0.18s;
  flex-shrink: 0;

  &:hover { color: ${theme.colors.onSurface}; box-shadow: ${theme.shadows.neoRaised}; }
  &:active { box-shadow: ${theme.shadows.neoInsetSm}; }
`

const BackBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  padding: 0;
  margin-bottom: 10px;
  transition: color 0.15s;

  &:hover { color: ${theme.colors.onSurface}; }
`

const ModalTitle = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.8vw, 26px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 44px 4px 0;
`

const ModalCount = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0;
`

const HeadDivider = styled.div`
  height: 1px;
  background: ${theme.colors.outlineVariant}20;
  margin: 0 36px;
  flex-shrink: 0;
`

// ─── Panels ──────────────────────────────────────────────────────────────────

const PanelsOuter = styled.div`
  overflow: hidden;
`

const PanelsTrack = styled.div<{ $detailed: boolean }>`
  display: flex;
  width: 200%;
  transform: ${({ $detailed }) => $detailed ? 'translateX(-50%)' : 'translateX(0)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

const Panel = styled.div`
  width: 50%;
`

// ─── List panel ──────────────────────────────────────────────────────────────

const ChevronWrap = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
  color: ${theme.colors.outlineVariant};
  flex-shrink: 0;
  transition: color 0.15s, transform 0.15s;
`

const Item = styled.div<{ $clickable?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid ${theme.colors.outlineVariant}12;

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 16px; }

  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
    transition: opacity 0.15s;

    &:hover {
      opacity: 0.8;
    }

    &:hover ${ChevronWrap} {
      color: ${theme.colors.onSurfaceVariant};
      transform: translateX(3px);
    }
  `}
`

const ItemList = styled.div`
  padding: 4px 36px 36px;
  overflow-y: auto;
  max-height: calc(88vh - 110px);
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.outlineVariant}30 transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${theme.colors.outlineVariant}30; border-radius: 2px; }
`

const IconWell = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
  margin-top: 1px;
`

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
`

const ItemTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  margin: 0 0 5px;
`

const ItemDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 10px;
`

const VisitLink = styled.a<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.15s;

  &:hover { opacity: 1; }
`

// ─── Detail panel ─────────────────────────────────────────────────────────────

const DetailBody = styled.div`
  padding: 20px 36px 36px;
  overflow-y: auto;
  max-height: calc(88vh - 110px);
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.outlineVariant}30 transparent;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${theme.colors.outlineVariant}30; border-radius: 2px; }
`

const DetailHero = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`

const DetailIconWell = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`

const DetailTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 6px;
`

const DetailTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 20px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const DetailTagline = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0;
`

const DetailDivider = styled.div`
  height: 1px;
  background: ${theme.colors.outlineVariant}20;
  margin: 0 0 20px;
`

const DetailDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 24px;
`

const ProjectsLabel = styled.p<{ $color: string }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin: 0 0 10px;
`

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ProjectCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-radius: 14px;
  padding: 14px 18px;
`

const ProjectName = styled.span`
  display: block;
  font-family: ${theme.fonts.headline};
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  margin-bottom: 4px;
`

const ProjectDesc = styled.span`
  display: block;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.55;
  color: ${theme.colors.onSurfaceVariant};
`

const ExploreDivider = styled.div`
  height: 1px;
  background: ${theme.colors.outlineVariant}20;
  margin: 20px 0 16px;
`

const ExploreLink = styled(Link)<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  text-decoration: none;
  transition: gap 0.18s, opacity 0.18s;
  opacity: 0.85;

  &:hover { gap: 12px; opacity: 1; }
`

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  title: string
  accentColor?: string
  items: FolderModalItem[]
  onClose: () => void
}

export default function FolderModal({ title, accentColor = theme.colors.primary, items, onClose }: Props) {
  const [detailIdx, setDetailIdx] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (detailIdx !== null) setDetailIdx(null)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, detailIdx])

  const activeItem = detailIdx !== null ? items[detailIdx] : null

  return (
    <Overlay onClick={() => { if (detailIdx !== null) setDetailIdx(null); else onClose() }}>
      <Card onClick={e => e.stopPropagation()}>
        <CardTop $color={accentColor} />

        <CardHead>
          <CloseBtn onClick={onClose} aria-label="Close"><MdClose size={16} /></CloseBtn>
          {detailIdx !== null ? (
            <>
              <BackBtn onClick={() => setDetailIdx(null)}>
                <MdArrowBack size={11} />
                Back
              </BackBtn>
              <ModalTitle>{activeItem?.title}</ModalTitle>
            </>
          ) : (
            <>
              <ModalTitle>{title}</ModalTitle>
              <ModalCount>{items.length} item{items.length !== 1 ? 's' : ''}</ModalCount>
            </>
          )}
        </CardHead>

        <HeadDivider />

        <PanelsOuter>
          <PanelsTrack $detailed={detailIdx !== null}>

            {/* List panel */}
            <Panel>
              <ItemList>
                {items.map((item, i) => (
                  <Item
                    key={i}
                    $clickable={!!item.detail}
                    onClick={item.detail ? () => setDetailIdx(i) : undefined}
                    role={item.detail ? 'button' : undefined}
                    tabIndex={item.detail ? 0 : undefined}
                    onKeyDown={item.detail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDetailIdx(i) } } : undefined}
                  >
                    <IconWell $color={item.color}>{item.icon}</IconWell>
                    <ItemBody>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemDesc>{item.description}</ItemDesc>
                      {item.url && !item.detail && (
                        <VisitLink href={item.url} target="_blank" rel="noopener noreferrer" $color={item.color}>
                          <MdOpenInNew size={10} />
                          Visit {item.title}
                        </VisitLink>
                      )}
                    </ItemBody>
                    {item.detail && (
                      <ChevronWrap><MdChevronRight size={18} /></ChevronWrap>
                    )}
                  </Item>
                ))}
              </ItemList>
            </Panel>

            {/* Detail panel */}
            <Panel>
              {activeItem?.detail && (
                <DetailBody key={detailIdx}>
                  <DetailHero>
                    <DetailIconWell $color={activeItem.color}>{activeItem.icon}</DetailIconWell>
                    <DetailTitleGroup>
                      <DetailTitle>{activeItem.title}</DetailTitle>
                      <DetailTagline>{activeItem.description}</DetailTagline>
                    </DetailTitleGroup>
                  </DetailHero>

                  <DetailDivider />

                  <DetailDesc>{activeItem.detail.fullDesc}</DetailDesc>

                  <ProjectsLabel $color={activeItem.color}>Projects</ProjectsLabel>
                  <ProjectList>
                    {activeItem.detail.projects.map((p, i) => (
                      <ProjectCard key={i}>
                        <ProjectName>{p.name}</ProjectName>
                        <ProjectDesc>{p.desc}</ProjectDesc>
                      </ProjectCard>
                    ))}
                  </ProjectList>

                  {activeItem.detail.url && (
                    <>
                      <ExploreDivider />
                      <ExploreLink
                        to={activeItem.detail.url}
                        $color={activeItem.color}
                        onClick={onClose}
                      >
                        {activeItem.detail.linkLabel ?? 'View section'}
                        <MdArrowForward size={13} />
                      </ExploreLink>
                    </>
                  )}
                </DetailBody>
              )}
            </Panel>

          </PanelsTrack>
        </PanelsOuter>
      </Card>
    </Overlay>
  )
}
