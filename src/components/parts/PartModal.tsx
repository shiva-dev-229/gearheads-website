import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { MdClose, MdCode, MdDownload, MdInfoOutline, MdMailOutline, MdPrecisionManufacturing } from 'react-icons/md'
import { theme } from '../../styles/theme'
import PartViewer3D from './PartViewer3D'
import CodeSnippetBlock from './CodeSnippetBlock'
import { TEAM_EMAIL, PRODUCTION_HUB_URL, type Part } from '../../data/parts'

interface Props {
  part: Part
  resolveFile: (filename: string) => string | null
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const cardIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(10, 10, 10, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${overlayIn} 0.18s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 920px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.hairlineStrong};
  border-radius: ${theme.rounded.md};
  box-shadow: ${theme.shadows.ambient};
  animation: ${cardIn} 0.22s cubic-bezier(0.23, 1, 0.32, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: ${theme.rounded.circle};
  border: 1px solid ${theme.colors.hairline};
  background: ${theme.colors.background};
  color: ${theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover { border-color: ${theme.colors.hairlineStrong}; color: ${theme.colors.onSurface}; }
  &:focus-visible { outline: 2px solid ${theme.colors.primary}; outline-offset: 2px; }
`

const ViewerPane = styled.div`
  position: relative;
  min-height: 0;
  aspect-ratio: 1 / 1;
  background: ${theme.colors.surfaceRaised};
  border-bottom: 1px solid ${theme.colors.hairline};

  @media (min-width: 768px) {
    aspect-ratio: auto;
    border-bottom: none;
    border-right: 1px solid ${theme.colors.hairline};
  }
`

const InfoPane = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px 24px 32px;

  @media (min-width: 768px) {
    padding: 32px 32px 36px;
  }
`

const CategoryTag = styled.span`
  align-self: flex-start;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.hairline};
  border-radius: ${theme.rounded.pill};
  padding: 4px 10px;
`

const Name = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 600;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
  margin: 0;
  padding-right: 32px;
`

const Description = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const Owner = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${theme.colors.textSecondary};
  margin: -12px 0 0;
`

const MetaGrid = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 0;
  padding: 16px 0;
  border-top: 1px solid ${theme.colors.hairline};
  border-bottom: 1px solid ${theme.colors.hairline};
`

const MetaWide = styled.div``

const MaterialList = styled.ul`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurface};
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MetaTerm = styled.dt`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`

const MetaValue = styled.dd`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurface};
  margin: 0;
  white-space: pre-line;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ActionButton = styled.a<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $disabled }) => ($disabled ? theme.colors.textSecondary : theme.colors.primary)};
  background: transparent;
  border: 1px solid ${({ $disabled }) => ($disabled ? theme.colors.hairline : theme.colors.hairlineStrong)};
  border-radius: ${theme.rounded.pill};
  padding: 13px 20px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
  transition: border-color 0.2s ease, transform 0.12s ease, background-color 0.2s ease;

  &:hover { border-color: ${theme.colors.primary}; background: ${theme.colors.surfaceRaised}; }
  &:active { transform: scale(0.97); }
  &:focus-visible { outline: 2px solid ${theme.colors.primary}; outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    &:active { transform: none; }
  }
`

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid ${theme.colors.hairline};
  margin: -4px 0 0;
`

const Tab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ $active }) => ($active ? theme.colors.primary : 'transparent')};
  margin-bottom: -1px;
  padding: 10px 14px;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover { color: ${theme.colors.onSurface}; }
  &:focus-visible { outline: 2px solid ${theme.colors.primary}; outline-offset: -2px; }
`

const VariantGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const VariantPill = styled.button<{ $active: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  background: ${({ $active }) => ($active ? theme.colors.surfaceRaised : 'transparent')};
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.hairline)};
  border-radius: ${theme.rounded.pill};
  padding: 8px 14px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;

  &:hover { border-color: ${theme.colors.hairlineStrong}; color: ${theme.colors.onSurface}; }
  &:focus-visible { outline: 2px solid ${theme.colors.primary}; outline-offset: 2px; }
`

const CodePane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`

const FileSelect = styled.select`
  font-family: ${theme.fonts.code};
  font-size: 12px;
  color: ${theme.colors.onSurface};
  background: ${theme.colors.surfaceRaised};
  border: 1px solid ${theme.colors.hairline};
  border-radius: ${theme.rounded.pill};
  padding: 9px 14px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover { border-color: ${theme.colors.hairlineStrong}; }
  &:focus-visible { outline: 2px solid ${theme.colors.primary}; outline-offset: 2px; }
`

export default function PartModal({ part, resolveFile, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tab, setTab] = useState<'details' | 'code'>('details')
  const [fileIndex, setFileIndex] = useState(0)
  const [variantIndex, setVariantIndex] = useState(0)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const card = cardRef.current
    const focusables = card?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !card) return

      const nodes = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus()
    }
  }, [onClose])

  const variant = part.variants?.[variantIndex]
  const stlUrl = resolveFile(variant?.stlFile ?? part.stlFile)
  const emailBody = `Hi GEarheads,\n\nWe'd like a copy of the "${part.name}" part.\n\nTeam name:\nFTC team number:\n\nThanks!`
  const mailtoHref = `mailto:${TEAM_EMAIL}?subject=${encodeURIComponent(part.emailSubject)}&body=${encodeURIComponent(emailBody)}`

  return (
    <Overlay onClick={onClose}>
      <Card
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="part-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn onClick={onClose} aria-label="Close part details">
          <MdClose size={16} />
        </CloseBtn>

        <ViewerPane>
          <PartViewer3D key={stlUrl} stlUrl={stlUrl} label={variant ? `${part.name} — ${variant.label}` : part.name} interactive />
        </ViewerPane>

        <InfoPane>
          <CategoryTag>{part.category}</CategoryTag>
          <Name id="part-modal-title">{part.name}</Name>
          <Owner>Designed by {part.owner}</Owner>
          {part.code.length > 0 && (
            <Tabs role="tablist">
              <Tab type="button" role="tab" aria-selected={tab === 'details'} $active={tab === 'details'} onClick={() => setTab('details')}>
                <MdInfoOutline size={14} />
                Details
              </Tab>
              <Tab type="button" role="tab" aria-selected={tab === 'code'} $active={tab === 'code'} onClick={() => setTab('code')}>
                <MdCode size={16} />
                Code
              </Tab>
            </Tabs>
          )}

          {tab === 'code' && part.code.length > 0 ? (
            <CodePane>
              {part.code.length > 1 && (
                <FileSelect
                  value={fileIndex}
                  onChange={(e) => setFileIndex(Number(e.target.value))}
                  aria-label="Choose source file"
                >
                  {part.code.map((file, i) => (
                    <option key={file.name} value={i}>{file.name}</option>
                  ))}
                </FileSelect>
              )}
              <CodeSnippetBlock key={part.code[fileIndex].name} file={part.code[fileIndex]} />
            </CodePane>
          ) : (
            <>
          <Description>{part.description}</Description>

          {part.variants && part.variants.length > 1 && (
            <VariantGroup role="radiogroup" aria-label="Choose variant">
              {part.variants.map((v, i) => (
                <VariantPill
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={i === variantIndex}
                  $active={i === variantIndex}
                  onClick={() => setVariantIndex(i)}
                >
                  {v.label}
                </VariantPill>
              ))}
            </VariantGroup>
          )}

          <MetaGrid>
            <MetaWide>
              <MetaTerm>Materials</MetaTerm>
              <MaterialList>
                {part.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </MaterialList>
            </MetaWide>
            <MetaWide>
              <MetaTerm>Print / fab notes</MetaTerm>
              <MetaValue>{part.printNotes}</MetaValue>
            </MetaWide>
          </MetaGrid>

          <Actions>
            <ActionButton
              href={part.driveUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              $disabled={!part.driveUrl}
              aria-disabled={!part.driveUrl}
            >
              <MdDownload size={14} />
              {part.driveUrl ? 'Download files' : 'Download link coming soon'}
            </ActionButton>

            <ActionButton href={mailtoHref}>
              <MdMailOutline size={14} />
              Email us for this part
            </ActionButton>

            <ActionButton as={Link} to={PRODUCTION_HUB_URL}>
              <MdPrecisionManufacturing size={14} />
              Fabricate with Production Hub
            </ActionButton>
          </Actions>

            </>
          )}
        </InfoPane>
      </Card>
    </Overlay>
  )
}
