import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { theme } from '../../styles/theme'
import { modules } from '../../data/git-tutorial'
import type { TerminalBlock, TerminalLine } from '../../data/git-tutorial'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdTerminal,
  MdStorage,
  MdCallSplit,
  MdHistory,
  MdMergeType,
  MdRateReview,
  MdBuildCircle,
  MdMenuBook,
} from 'react-icons/md'
import HoverTitle from '../../components/reactbits/HoverTitle'
import FadeIn from '../../components/reactbits/FadeIn'
import BorderGlow from '../../components/reactbits/BorderGlow'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const MODULE_ICONS = {
  'module-1': <MdStorage size={15} />,
  'module-2': <MdCallSplit size={15} />,
  'module-3': <MdHistory size={15} />,
  'module-4': <MdMergeType size={15} />,
  'module-5': <MdRateReview size={15} />,
  'module-6': <MdBuildCircle size={15} />,
  'module-7': <MdMenuBook size={15} />,
}

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

const BrandIcon = styled.div`
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

const SidebarGroupLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0 20px;
  margin: 0 0 6px;
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

const ItemIcon = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
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
  max-width: 680px;
`

// ─── Terminal ────────────────────────────────────────────────────────────────

const TerminalOuter = styled.div`
  background: ${theme.colors.surfaceContainerLowest};
  border-radius: 12px;
  overflow: hidden;
  margin: 28px 0;
  max-width: 100%;
  border: 1px solid ${theme.colors.outlineVariant}26;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}44;
    box-shadow:
      0 0 0 1px ${theme.colors.primary}16,
      0 0 28px ${theme.colors.primary}10;
  }
`

const TerminalHeader = styled.div`
  background: ${theme.colors.surfaceContainerHigh};
  padding: 0 16px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TerminalLeft = styled.div`
  display: flex;
  align-items: center;
`

const Dot = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 6px;
`

const TerminalLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.onSurfaceVariant};
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.08em;
  color: ${theme.colors.onSurfaceVariant};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`

const TerminalBody = styled.div`
  padding: 16px 20px;
  overflow-x: auto;
  font-family: ${theme.fonts.code};
  font-size: 13px;
  line-height: 1.7;
`

const TerminalRow = styled.span<{ $type: TerminalLine['type'] }>`
  display: block;
  ${({ $type }) => {
    switch ($type) {
      case 'prompt':
        return `color: ${theme.colors.primary};`
      case 'output':
        return `color: ${theme.colors.onSurface};`
      case 'comment':
        return `color: ${theme.colors.secondary};`
      case 'error':
        return `color: ${theme.colors.error};`
      case 'blank':
        return `min-height: 1em;`
      default:
        return `color: ${theme.colors.onSurface};`
    }
  }}
`

// ─── Tip box ──────────────────────────────────────────────────────────────────

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

function TerminalBlockComponent({ block }: { block: TerminalBlock }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = block.lines
      .filter(l => l.type === 'prompt')
      .map(l => l.text)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <TerminalOuter>
      <TerminalHeader>
        <TerminalLeft>
          <Dot $color="#ff5f57" />
          <Dot $color="#febc2e" />
          <Dot $color="#28c840" />
          <TerminalLabel>{block.label ?? 'bash'}</TerminalLabel>
        </TerminalLeft>
        <CopyButton onClick={handleCopy} aria-label="Copy to clipboard">
          {copied ? '✓ COPIED' : 'COPY'}
        </CopyButton>
      </TerminalHeader>
      <TerminalBody>
        {block.lines.map((line, i) => (
          <TerminalRow key={i} $type={line.type}>
            {line.type === 'prompt' && (
              <span style={{ color: theme.colors.onSurfaceVariant }}>
                {'gearheads@ftc:~/FtcRobotController$ '}
              </span>
            )}
            {line.type === 'blank' ? ' ' : line.text}
          </TerminalRow>
        ))}
      </TerminalBody>
    </TerminalOuter>
  )
}

function TipBox({ tip }: { tip: string }) {
  return (
    <TipCallout>
      <TipLabel>Tip</TipLabel>
      <TipText>{tip}</TipText>
    </TipCallout>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GitTutorialPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const currentIdx = modules.findIndex(m => m.slug === slug)
  const module = modules[currentIdx]
  const prevModule = currentIdx > 0 ? modules[currentIdx - 1] : null
  const nextModule = currentIdx < modules.length - 1 ? modules[currentIdx + 1] : null

  if (!module) {
    navigate('/resources/git/repository-basics', { replace: true })
    return null
  }

  const progressPct = ((currentIdx + 1) / modules.length) * 100

  return (
    <PageRoot>
      <Sidebar aria-label="Course modules">
        <SidebarHeader>
          <SidebarBrand>
            <BrandIcon>
              <MdTerminal size={17} />
            </BrandIcon>
            <BrandText>
              <BrandTitle>Git Workshop</BrandTitle>
              <BrandSub>GitHub for FTC</BrandSub>
            </BrandText>
          </SidebarBrand>
          <ProgressRow>
            <ProgressTrack>
              <ProgressFill $pct={progressPct} />
            </ProgressTrack>
            <ProgressLabel>{currentIdx + 1} / {modules.length}</ProgressLabel>
          </ProgressRow>
        </SidebarHeader>

        <SidebarNav>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          {modules.map(m => (
            <SidebarItem
              key={m.id}
              $active={m.slug === slug}
              onClick={() => navigate(`/resources/git/${m.slug}`)}
            >
              <ItemIcon $active={m.slug === slug}>
                {MODULE_ICONS[m.id as keyof typeof MODULE_ICONS]}
              </ItemIcon>
              {m.title}
            </SidebarItem>
          ))}
        </SidebarNav>
      </Sidebar>

      <Content>
        <MobileBar>
          <MobileChip>Module {module.number} / 7</MobileChip>
        </MobileBar>

        <AnimatePresence mode="wait">
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ModuleBadge>Module {module.number}</ModuleBadge>

            <StyledHoverTitle text={module.title} delay={18} />

            <PageDesc>{module.description}</PageDesc>
            <TitleDivider />

            <ChipsRow>
              {module.concepts.map((c, i) => (
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

            {module.body.map((p, i) => (
              <FadeIn key={i} direction="up" delay={i * 70} duration={480}>
                <BodyText>{p}</BodyText>
              </FadeIn>
            ))}

            {module.terminals.map(tb => (
              <TerminalBlockComponent key={tb.id} block={tb} />
            ))}

            {module.tip && <TipBox tip={module.tip} />}

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
                    <NavCardBody onClick={() => navigate(`/resources/git/${prevModule.slug}`)}>
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
                    <NavCardBody onClick={() => navigate(`/resources/git/${nextModule.slug}`)}>
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
