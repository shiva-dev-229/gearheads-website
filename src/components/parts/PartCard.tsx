import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { chipHoverSubtle } from '../../styles/mixins'
import type { Part } from '../../data/parts'

interface Props {
  part: Part
  imageUrl: string | null
  onOpen: (part: Part) => void
}

const Tile = styled.button`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.hairline};
  border-radius: ${theme.rounded.md};
  overflow: hidden;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: ${theme.colors.hairlineStrong};
    background: ${theme.colors.surfaceRaised};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover, &:focus-visible { transform: none; }
  }
`

const PreviewWell = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  background: ${theme.colors.cadBackdrop};
  border-bottom: 1px solid ${theme.colors.hairline};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 20px;
`

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`

const Name = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
  margin: 0;
  line-height: 1.3;
`

const CategoryTag = styled.span`
  ${chipHoverSubtle}
  flex-shrink: 0;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: ${theme.rounded.pill};
`

const Description = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default function PartCard({ part, imageUrl, onOpen }: Props) {
  return (
    <Tile type="button" onClick={() => onOpen(part)} aria-haspopup="dialog">
      <PreviewWell>
        {imageUrl && <PreviewImage src={imageUrl} alt={part.name} loading="lazy" />}
      </PreviewWell>
      <Body>
        <TopRow>
          <Name>{part.name}</Name>
          <CategoryTag>{part.category}</CategoryTag>
        </TopRow>
        <Description>{part.description}</Description>
      </Body>
    </Tile>
  )
}
