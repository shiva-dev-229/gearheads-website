import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { MdClose, MdOpenInNew } from 'react-icons/md'
import { theme } from '../styles/theme'

export interface ToolInfo {
  name: string
  iconKey: string
  colorKey: string
  desc: string
  fullDesc: string
  url: string
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
  max-width: 520px;
  overflow: hidden;
  animation: ${cardIn} 0.28s cubic-bezier(0.16, 1, 0.3, 1);
`

const CardTop = styled.div<{ $color: string }>`
  height: 4px;
  background: ${({ $color }) => $color};
  opacity: 0.7;
`

const CardBody = styled.div`
  padding: 36px 36px 40px;
  position: relative;
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

  &:hover { color: ${theme.colors.onSurface}; box-shadow: ${theme.shadows.neoRaised}; }
  &:active { box-shadow: ${theme.shadows.neoInsetSm}; }
`

const IconWell = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  margin-bottom: 20px;
`

const ToolName = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(22px, 3vw, 28px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 6px;
  padding-right: 40px;
`

const ToolTagline = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin: 0 0 24px;
`

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.outlineVariant}20;
  margin-bottom: 24px;
`

const FullDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 32px;
`

const VisitBtn = styled.a<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.background};
  background: ${({ $color }) => $color};
  text-decoration: none;
  border-radius: 50px;
  padding: 13px 28px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.35), -2px -2px 8px #1e1e1e;
  transition: box-shadow 0.18s, transform 0.12s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 10px rgba(0,0,0,0.4), -2px -2px 8px #1e1e1e, 0 0 12px ${({ $color }) => $color}60;
  }
  &:active {
    transform: translateY(0);
    box-shadow: inset 3px 3px 8px rgba(0,0,0,0.3);
  }
`

interface Props {
  tool: ToolInfo
  icon: React.ReactNode
  color: string
  onClose: () => void
}

export default function ToolModal({ tool, icon, color, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <Overlay onClick={onClose}>
      <Card onClick={e => e.stopPropagation()}>
        <CardTop $color={color} />
        <CardBody>
          <CloseBtn onClick={onClose} aria-label="Close">
            <MdClose size={16} />
          </CloseBtn>

          <IconWell $color={color}>{icon}</IconWell>
          <ToolName>{tool.name}</ToolName>
          <ToolTagline>{tool.desc}</ToolTagline>
          <Divider />
          <FullDesc>{tool.fullDesc}</FullDesc>
          <VisitBtn
            $color={color}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOpenInNew size={13} />
            Visit {tool.name}
          </VisitBtn>
        </CardBody>
      </Card>
    </Overlay>
  )
}
