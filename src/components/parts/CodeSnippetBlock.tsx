import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { MdContentCopy, MdCheck, MdExpandMore, MdDownload } from 'react-icons/md'
import { theme } from '../../styles/theme'
import { tokenizeJava, type Token } from './javaHighlight'
import type { PartCodeFile } from '../../data/parts'

interface Props {
  file: PartCodeFile
}

const COLLAPSE_LINE_COUNT = 16

const Block = styled.div`
  background: ${theme.colors.surfaceRaised};
  border: 1px solid ${theme.colors.hairline};
  border-radius: ${theme.rounded.sm};
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${theme.colors.hairline};
  flex-wrap: wrap;
`

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const Filename = styled.span`
  font-family: ${theme.fonts.code};
  font-size: 12px;
  color: ${theme.colors.onSurface};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  background: transparent;
  border: 1px solid ${theme.colors.hairline};
  border-radius: ${theme.rounded.pill};
  padding: 6px 12px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${theme.colors.hairlineStrong};
    color: ${theme.colors.onSurface};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`

const CodeScroll = styled.div<{ $collapsed: boolean }>`
  position: relative;
  max-height: ${({ $collapsed }) => ($collapsed ? '340px' : 'none')};
  overflow: hidden;
`

const Pre = styled.pre`
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: ${theme.fonts.code};
  font-size: 12.5px;
  line-height: 1.6;
`

const FadeOut = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: linear-gradient(to bottom, transparent, ${theme.colors.surfaceRaised});
  pointer-events: none;
`

const ExpandRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  background: transparent;
  border: none;
  border-top: 1px solid ${theme.colors.hairline};
  cursor: pointer;

  svg { transition: transform 0.2s ease; }
`

const TokenSpan = styled.span<{ $kind: Token['kind'] }>`
  color: ${({ $kind }) => {
    switch ($kind) {
      case 'keyword': return theme.colors.primary
      case 'string': return theme.colors.secondary
      case 'comment': return theme.colors.textSecondary
      case 'annotation': return theme.colors.primary
      default: return theme.colors.onSurface
    }
  }};
  font-style: ${({ $kind }) => ($kind === 'comment' ? 'italic' : 'normal')};
`

function downloadSnippet(file: PartCodeFile) {
  const blob = new Blob([file.code], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function CodeSnippetBlock({ file }: Props) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const tokens = useMemo(() => tokenizeJava(file.code), [file.code])
  const lineCount = useMemo(() => file.code.split('\n').length, [file.code])
  const isLong = lineCount > COLLAPSE_LINE_COUNT

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(file.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard API unavailable — nothing else reasonable to do here.
    }
  }

  return (
    <Block>
      <Header>
        <HeaderInfo>
          <Filename>{file.name}</Filename>
        </HeaderInfo>
        <HeaderActions>
          <IconButton type="button" onClick={handleCopy} aria-label={`Copy ${file.name}`}>
            {copied ? <MdCheck size={13} /> : <MdContentCopy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </IconButton>
          <IconButton
            type="button"
            onClick={() => downloadSnippet(file)}
            aria-label={`Download ${file.name}`}
          >
            <MdDownload size={13} />
            .{file.language}
          </IconButton>
        </HeaderActions>
      </Header>

      <CodeScroll $collapsed={isLong && !expanded}>
        <Pre>
          <code>
            {tokens.map((t, i) => (
              <TokenSpan key={i} $kind={t.kind}>{t.text}</TokenSpan>
            ))}
          </code>
        </Pre>
        {isLong && !expanded && <FadeOut />}
      </CodeScroll>

      {isLong && (
        <ExpandRow type="button" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Show less' : `Show all ${lineCount} lines`}
          <MdExpandMore size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
        </ExpandRow>
      )}
    </Block>
  )
}
