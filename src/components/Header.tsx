import { useState, useRef, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MdExpandMore } from 'react-icons/md'
import { theme } from '../styles/theme'
import StaggeredMenu from './reactbits/StaggeredMenu'
import logoImg from '../../assets/logos/logo-black-removebg-preview.png'

// ── Types ──────────────────────────────────────────────────────────────────────

type MegaItem = {
  readonly label: string
  readonly to: string
  readonly desc: string
}

type MegaGroup = {
  readonly groupLabel: string
  readonly links: readonly MegaItem[]
}

type FlatNavItem = {
  readonly label: string
  readonly dropdown: false
  readonly to: string
}

type DropdownNavItem = {
  readonly label: string
  readonly dropdown: true
  readonly to: string | null
  readonly cols: number
  readonly items: readonly (MegaItem | MegaGroup)[]
}

type NavItem = FlatNavItem | DropdownNavItem

function isGroup(x: MegaItem | MegaGroup): x is MegaGroup {
  return 'groupLabel' in x
}

// ── Nav data ───────────────────────────────────────────────────────────────────

const navItems: readonly NavItem[] = [
  { label: 'Home', dropdown: false, to: '/' },
  {
    label: 'About',
    dropdown: true,
    to: '/about',
    cols: 3,
    items: [
      { label: 'Our Story / History', to: '/about/history', desc: 'Season-by-season journey from 2017 to today.' },
      { label: 'Mission & Values',    to: '/about/mission', desc: 'What drives us and the goals we chase.' },
      { label: 'Team Culture',        to: '/about/culture', desc: 'How we work, collaborate, and grow together.' },
      { label: 'Awards',              to: '/about/awards',  desc: 'Our competition awards and recognition history.' },
      { label: 'Meet the Team',       to: '/team',          desc: 'The students and mentors behind #16460.' },
    ],
  },
  {
    label: 'STEM',
    dropdown: true,
    to: null,
    cols: 3,
    items: [
      {
        groupLabel: 'Robot',
        links: [
          { label: 'Overview',        to: '/robot',             desc: 'The machines we design, build, and compete with.' },
          { label: 'Gearboticus',     to: '/robot/gearboticus', desc: 'Our latest competition robot, up close.' },
          { label: 'Subsystems',      to: '/robot/subsystems',  desc: 'Drivetrain, intake, scoring, and more, broken down.' },
          { label: 'Robot Evolution', to: '/robot/evolution',   desc: 'How our robots have advanced each season.' },
        ],
      },
      {
        groupLabel: 'Engineering',
        links: [
          { label: 'Overview',            to: '/engineering',                 desc: 'Our end-to-end engineering approach.' },
          { label: 'Design Process',      to: '/engineering/design-process',  desc: 'From concept to competition-ready, step by step.' },
          { label: 'CAD & Mechanical',    to: '/engineering/cad',             desc: '100% CAD-based design and custom parts.' },
          { label: 'Manufacturing',       to: '/engineering/manufacturing',   desc: 'CNC, fabrication, and how we build.' },
          { label: 'Testing & Iteration', to: '/engineering/testing',         desc: 'Analysis, testing, and continuous improvement.' },
        ],
      },
      {
        groupLabel: 'Software',
        links: [
          { label: 'Overview',                to: '/programming',              desc: 'How we program and control our robots.' },
          { label: 'Control Systems',         to: '/programming/control',      desc: 'PID, motion profiling, and driver controls.' },
          { label: 'Autonomous & Navigation', to: '/programming/autonomous',   desc: 'Pathing and optical odometry for autonomous.' },
          { label: 'Software Innovations',    to: '/programming/innovations',  desc: "The tools and techniques we've pioneered." },
        ],
      },
    ],
  },
  {
    label: 'Outreach',
    dropdown: true,
    to: '/outreach',
    cols: 4,
    items: [
      {
        groupLabel: 'Community & Health',
        links: [
          { label: "Children's Hospital", to: '/outreach/childrens-hospital', desc: "STEM workshops at Children's Wisconsin." },
          { label: 'Veterans',            to: '/outreach/veterans',           desc: 'Robotics sessions at the Milwaukee VA.' },
        ],
      },
      {
        groupLabel: 'Growing FIRST',
        links: [
          { label: 'Rookie Qualifier', to: '/outreach/rookie-qualifier', desc: 'Hosting our Brookfield qualifier event.' },
          { label: 'Production Hub',   to: '/outreach/production-hub',  desc: 'Supporting teams through the Wisconsin Production Hub.' },
          { label: 'DIY MPCNC',        to: '/outreach/diy-cnc',         desc: 'Building an open-source CNC machine.' },
          { label: 'FLL Mentoring',    to: '/outreach/fll-mentoring',   desc: 'Mentoring younger FLL teams and the Explore Festival.' },
        ],
      },
      {
        groupLabel: 'Access & Advocacy',
        links: [
          { label: 'Computer Refurbishing', to: '/outreach/computer-project',  desc: 'Refurbishing and donating computers for STEM access.' },
          { label: 'FIRST Advocacy',        to: '/outreach/first-advocacy',    desc: 'Advocating for FIRST at the state level.' },
          { label: 'School Support',        to: '/outreach/school-support',    desc: 'Helping schools start and grow robotics.' },
        ],
      },
      {
        groupLabel: 'Events & Demos',
        links: [
          { label: 'Maker Faire',     to: '/outreach/maker-faire',      desc: 'Demoing robotics at Milwaukee Maker Faire.' },
          { label: 'Community Demos', to: '/outreach/community-demos',  desc: 'Library and school robotics demonstrations.' },
          { label: 'GE Elfuns',       to: '/outreach/ge-elfuns',        desc: 'Partnering with GE Elfuns on STEM.' },
        ],
      },
    ],
  },
  {
    label: 'Seasons',
    dropdown: true,
    to: null,
    cols: 4,
    items: [
      { label: 'DECODE (2025–26)',        to: '/seasons/2025-26', desc: 'Our current season.' },
      { label: 'Into the Deep (2024–25)', to: '/seasons/2024-25', desc: 'Connect Award at Worlds.' },
      { label: 'CENTERSTAGE (2023–24)',   to: '/seasons/2023-24', desc: 'Inspire Award finalist at Worlds.' },
      { label: 'POWERPLAY (2022–23)',     to: '/seasons/2022-23', desc: 'Our first Inspire Award and Worlds berth.' },
      { label: 'Freight Frenzy (2021–22)',to: '/seasons/2021-22', desc: 'Leveling up reliability and strategy.' },
      { label: 'Ultimate Goal (2020–21)', to: '/seasons/2020-21', desc: 'Growing through a challenging year.' },
      { label: 'Skystone (2019–20)',      to: '/seasons/2019-20', desc: 'Our rookie FTC season.' },
    ],
  },
]

// Mobile StaggeredMenu items
const mobileNavItems = [
  { label: 'Home',     ariaLabel: 'Home page',    link: '/' },
  { label: 'About',    ariaLabel: 'About us',     link: '/about' },
  { label: 'Robot',    ariaLabel: 'Our robots',   link: '/robot' },
  { label: 'Outreach', ariaLabel: 'Outreach',     link: '/outreach' },
  { label: 'Seasons',  ariaLabel: 'Seasons',      link: '/seasons/2025-26' },
  { label: 'Contact',  ariaLabel: 'Contact us',   link: '/contact' },
]

const mobileSocialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/ftcgearheads16460/' },
]

// ── Keyframes ─────────────────────────────────────────────────────────────────

const megaIn = keyframes`
  from { opacity: 0; transform: translateY(-6px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`

// ── Header shell ──────────────────────────────────────────────────────────────

const HeaderRoot = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  border-bottom: 1px solid ${theme.colors.outlineVariant}20;
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 0 ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.marginDesktop};
  }
`

// ── Brand ─────────────────────────────────────────────────────────────────────

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-decoration: none;
`

const BrandLogo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
`

const BrandText = styled.span`
  font-family: ${theme.fonts.brand};
  font-size: 22px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: ${theme.colors.onSurface};

  em {
    font-style: normal;
    color: ${theme.colors.secondary};
  }
`

// ── Desktop nav ───────────────────────────────────────────────────────────────

const DesktopNav = styled.nav`
  display: none;
  flex: 1;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    display: flex;
  }
`

const Chevron = styled(MdExpandMore)<{ $open: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 15px;
  flex-shrink: 0;
  opacity: 0.7;
`

const triggerBase = css`
  display: flex; align-items: center; gap: 3px;
  font-family: ${theme.fonts.label}; font-size: 11px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 9px 10px 9px 16px; border-radius: 8px;
  background: transparent; color: ${theme.colors.onSurfaceVariant};
  transition: color 0.18s, background 0.18s, box-shadow 0.18s;
  cursor: pointer; white-space: nowrap; text-decoration: none; border: none; outline: none;
  &:hover { color: ${theme.colors.secondary}; background: ${theme.colors.surfaceContainerLow}; }
  &:focus-visible { outline: 2px solid ${theme.colors.secondary}55; outline-offset: 2px; }
`

const TriggerNavLinkFlat = styled(NavLink)`
  ${triggerBase}
  &.active { color: ${theme.colors.primary}; background: ${theme.colors.surfaceContainerLow}; box-shadow: ${theme.shadows.neoInsetSm}; }
  &.active:hover { color: ${theme.colors.secondary}; box-shadow: none; }
`

const TriggerNavLinkDropdown = styled(NavLink)<{ $open: boolean }>`
  ${triggerBase}
  ${({ $open }) => $open ? css`
    color: ${theme.colors.secondary}; background: ${theme.colors.surfaceContainerLow};
    &.active { color: ${theme.colors.secondary}; box-shadow: none; }
  ` : css`
    &.active { color: ${theme.colors.primary}; background: ${theme.colors.surfaceContainerLow}; box-shadow: ${theme.shadows.neoInsetSm}; }
    &.active:hover { color: ${theme.colors.secondary}; box-shadow: none; }
  `}
`

const TriggerButton = styled.button<{ $open: boolean }>`
  ${triggerBase}
  ${({ $open }) => $open && css`color: ${theme.colors.secondary}; background: ${theme.colors.surfaceContainerLow};`}
`

// ── Mega panel ────────────────────────────────────────────────────────────────

const MegaPanelOuter = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 6px ${theme.spacing.marginMobile} 0;
  z-index: 50;

  @media (min-width: 768px) {
    padding: 6px ${theme.spacing.marginDesktop} 0;
  }
`

const MegaPanelCard = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  background: ${theme.colors.surfaceContainerLow};
  box-shadow: ${theme.shadows.neoRaisedLg};
  border-radius: 20px;
  border: 1px solid ${theme.colors.outlineVariant}22;
  padding: 20px;
  animation: ${megaIn} 0.2s ease;
`

const MegaGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  gap: 4px;
`

const MegaGroupGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  gap: 0 8px;
`

const MegaGroupCol = styled.div`
  display: flex;
  flex-direction: column;
`

const MegaGroupLabel = styled.div`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  padding: 0 12px 10px;
  margin-bottom: 2px;
  border-bottom: 1px solid ${theme.colors.outlineVariant}18;
  margin-bottom: 6px;
`

const MegaItemLabel = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${theme.colors.onSurface};
  transition: color 0.15s;
`

const MegaItemDesc = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 11px;
  line-height: 1.4;
  color: ${theme.colors.onSurfaceVariant};
`

const MegaItemLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 12px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.surfaceContainerHigh};
    border-color: ${theme.colors.outlineVariant}22;
  }

  &:hover ${MegaItemLabel} {
    color: ${theme.colors.secondary};
  }

  &.active {
    background: ${theme.colors.background};
    box-shadow: ${theme.shadows.neoInsetSm};
  }

  &.active ${MegaItemLabel} {
    color: ${theme.colors.primary};
  }

  &.active:hover ${MegaItemLabel} {
    color: ${theme.colors.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.secondary}55;
    outline-offset: 2px;
  }
`

// ── Trailing ──────────────────────────────────────────────────────────────────

const Trailing = styled.div`
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
`

const JoinButton = styled(Link)`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    font-family: ${theme.fonts.label};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 24px;
    border-radius: 8px;
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.neoButtonPrimary};
    border: 1px solid ${theme.colors.primary}28;
    transition: box-shadow 0.2s, transform 0.15s;
    text-decoration: none;
    white-space: nowrap;

    &:hover { transform: translateY(-1px); }
    &:active { box-shadow: ${theme.shadows.neoButtonPrimaryActive}; transform: translateY(0); }
  }
`

// ── Mobile StaggeredMenu wrapper ──────────────────────────────────────────────

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 101;
  pointer-events: none;

  @media (min-width: 1024px) {
    display: none;
  }
`

// ── Mega panel content ────────────────────────────────────────────────────────

function MegaContent({ item, onClose }: { item: DropdownNavItem; onClose: () => void }) {
  const hasGroups = item.items.some(isGroup)

  if (hasGroups) {
    return (
      <MegaGroupGrid $cols={item.cols}>
        {item.items.map((entry) => {
          if (!isGroup(entry)) return null
          return (
            <MegaGroupCol key={entry.groupLabel}>
              <MegaGroupLabel>{entry.groupLabel}</MegaGroupLabel>
              {entry.links.map((link) => (
                <MegaItemLink key={link.to} to={link.to} onClick={onClose}>
                  <MegaItemLabel>{link.label}</MegaItemLabel>
                  <MegaItemDesc>{link.desc}</MegaItemDesc>
                </MegaItemLink>
              ))}
            </MegaGroupCol>
          )
        })}
      </MegaGroupGrid>
    )
  }

  return (
    <MegaGrid $cols={item.cols}>
      {item.items.map((entry) => {
        if (isGroup(entry)) return null
        return (
          <MegaItemLink key={entry.to} to={entry.to} onClick={onClose}>
            <MegaItemLabel>{entry.label}</MegaItemLabel>
            <MegaItemDesc>{entry.desc}</MegaItemDesc>
          </MegaItemLink>
        )
      })}
    </MegaGrid>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpenLabel(null)
  }, [pathname])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenLabel(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenLabel(label)
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenLabel(null), 150)
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  function closeNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenLabel(null)
  }

  function handleHeaderBlur(e: React.FocusEvent<HTMLElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) closeNow()
  }

  const openItem =
    navItems.find((item): item is DropdownNavItem => item.dropdown && item.label === openLabel) ?? null

  return (
    <>
      <HeaderRoot onBlur={handleHeaderBlur}>
        <Inner>
          <BrandLink to="/" onClick={closeNow}>
            <BrandLogo src={logoImg} alt="GEarheads logo" />
            <BrandText>
              <em>GE</em>arheads
            </BrandText>
          </BrandLink>

          <DesktopNav>
            <ul style={{ display: 'contents' }}>
              {navItems.map((item) => {
                if (!item.dropdown) return (
                  <li key={item.label} style={{ listStyle: 'none' }}>
                    <TriggerNavLinkFlat to={item.to} end>{item.label}</TriggerNavLinkFlat>
                  </li>
                )
                const isOpen = openLabel === item.label
                return (
                  <li key={item.label} style={{ listStyle: 'none' }}
                    onMouseEnter={() => openMenu(item.label)} onMouseLeave={scheduleClose}>
                    {item.to !== null
                      ? <TriggerNavLinkDropdown to={item.to} $open={isOpen} onFocus={() => openMenu(item.label)}>
                          {item.label}<Chevron $open={isOpen} />
                        </TriggerNavLinkDropdown>
                      : <TriggerButton $open={isOpen} onFocus={() => openMenu(item.label)} aria-expanded={isOpen} aria-haspopup="true">
                          {item.label}<Chevron $open={isOpen} />
                        </TriggerButton>}
                  </li>
                )
              })}
            </ul>
          </DesktopNav>

          <Trailing>
            <JoinButton to="/contact" onClick={closeNow}>
              Contact Us
            </JoinButton>
          </Trailing>
        </Inner>

        {openItem && (
          <MegaPanelOuter onMouseEnter={cancelClose} onMouseLeave={scheduleClose} onFocus={cancelClose}>
            <MegaPanelCard>
              <MegaContent item={openItem} onClose={closeNow} />
            </MegaPanelCard>
          </MegaPanelOuter>
        )}
      </HeaderRoot>

      <MobileMenuOverlay>
        <StaggeredMenu
          position="right"
          items={mobileNavItems}
          socialItems={mobileSocialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#c8c8c8"
          openMenuButtonColor="#c8c8c8"
          changeMenuColorOnOpen={false}
          colors={['#1a2540', '#0f1520']}
          accentColor="#adc6ff"
        />
      </MobileMenuOverlay>
    </>
  )
}
