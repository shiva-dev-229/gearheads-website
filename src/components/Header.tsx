import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoImg from '../assets/logos/logo-black-removebg-preview.png'

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
  readonly items: readonly (MegaItem | MegaGroup)[]
}

type NavItem = FlatNavItem | DropdownNavItem

function isGroup(x: MegaItem | MegaGroup): x is MegaGroup {
  return 'groupLabel' in x
}

// ── Nav data ───────────────────────────────────────────────────────────────────

const navItems: readonly NavItem[] = [
  {
    label: 'About',
    dropdown: true,
    to: '/about',
    items: [
      {
        groupLabel: 'Who We Are',
        links: [
          { label: 'Mission & Values', to: '/about#mission', desc: 'What drives us and the goals we chase.' },
          { label: 'Team Culture',     to: '/about#culture', desc: 'How we work, collaborate, and grow together.' },
        ],
      },
      {
        groupLabel: 'The Team',
        links: [
          { label: 'Meet the Team', to: '/about#team', desc: 'The students and mentors behind #16460.' },
        ],
      },
      {
        groupLabel: 'Season History',
        links: [
          { label: 'Our Journey', to: '/about#history', desc: 'Every season — from FLL to Worlds.' },
        ],
      },
      {
        groupLabel: 'Seasons',
        links: [
          { label: 'DECODE',         to: '/about#season-2025-26', desc: '2025–26 · Current season.' },
          { label: 'Into the Deep',  to: '/about#season-2024-25', desc: '2024–25 · 1st CONNECT Award at Worlds.' },
          { label: 'CENTERSTAGE',    to: '/about#season-2023-24', desc: '2023–24 · 2nd Inspire at Worlds.' },
          { label: 'POWERPLAY',      to: '/about#season-2022-23', desc: '2022–23 · First Worlds qualification.' },
          { label: 'Freight Frenzy', to: '/about#season-2021-22', desc: '2021–22 · State alliance win.' },
          { label: 'Ultimate Goal',  to: '/about#season-2020-21', desc: '2020–21 · COVID hybrid season.' },
          { label: 'Skystone',       to: '/about#season-2019-20', desc: '2019–20 · FTC rookie year.' },
          { label: 'Into Orbit',     to: '/about#season-2018-19', desc: '2018–19 · FLL Worlds — Detroit.' },
          { label: 'Hydro Dynamics', to: '/about#season-2017-18', desc: '2017–18 · Where it all began.' },
        ],
      },
    ],
  },
  {
    label: 'Design',
    dropdown: true,
    to: null,
    items: [
      {
        groupLabel: 'Software',
        links: [
          { label: 'Overview',                to: '/programming',               desc: 'How we program and control our robots.' },
          { label: 'Control Systems',         to: '/programming#control',       desc: 'PID, motion profiling, and driver controls.' },
          { label: 'Autonomous & Navigation', to: '/programming#autonomous',    desc: 'Pathing and optical odometry for autonomous.' },
          { label: 'Software Innovations',    to: '/programming#innovations',   desc: "The tools and techniques we've pioneered." },
          { label: 'Auto Paths',              to: '/robot/auto-paths',          desc: 'Our autonomous routines — open for other teams to reference.' },
        ],
      },
      {
        groupLabel: 'Mechanical',
        links: [
          { label: 'Overview',            to: '/engineering',                  desc: 'Our end-to-end engineering approach.' },
          { label: 'Design Process',      to: '/engineering#design-process',  desc: 'From concept to competition-ready, step by step.' },
          { label: 'CAD & Mechanical',    to: '/engineering#cad',             desc: '100% CAD-based design and custom parts.' },
          { label: 'Manufacturing',       to: '/engineering#manufacturing',   desc: 'CNC, fabrication, and how we build.' },
          { label: 'Testing & Iteration', to: '/engineering#testing',         desc: 'Analysis, testing, and continuous improvement.' },
        ],
      },
    ],
  },
  {
    label: 'Outreach',
    dropdown: true,
    to: '/outreach',
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
    label: 'Resources',
    dropdown: true,
    to: null,
    items: [
      {
        groupLabel: 'Software',
        links: [
          { label: 'GIT Tutorial',    to: '/resources/git',    desc: 'Version control for FTC code workflows.' },
          { label: 'Blocks Tutorial', to: '/resources/blocks', desc: 'Get started with FTC Blocks programming.' },
          { label: 'Java Tutorial',   to: '/resources/java',   desc: 'Level up with Java for advanced robot control.' },
          { label: 'React Tutorial',  to: '/resources/react',  desc: 'Web development for building your team site.' },
        ],
      },
      {
        groupLabel: 'Mechanical',
        links: [
          { label: 'Onshape Tutorials',        to: '/resources/onshape-tutorials',  desc: 'Robot CAD tutorials, from sketching to a finished subsystem.' },
          { label: 'Parts',                    to: '/resources/parts',              desc: 'Public part designs we\'re sharing with the community.' },
          { label: 'Production Hub',           to: '/outreach/production-hub#form', desc: 'CNC parts with us — request parts for your robot.' },
        ],
      },
      {
        groupLabel: 'General',
        links: [
          { label: 'Qualifier Prep',    to: '/resources/qualifier-prep',         desc: 'Checklists and guides to prepare for competition.' },
          { label: 'Sponsorship Guide', to: '/resources/sponsorship',            desc: 'How to find sponsors and write an email that gets read.' },
          { label: 'Computer Outreach', to: '/outreach/computer-project#form',   desc: 'Request a refurbished computer for your team.' },
        ],
      },
    ],
  },
]

// ── Flattened link list, for the plain mobile/expanded nav ──────────────────────

function flattenLinks(item: DropdownNavItem): MegaItem[] {
  return item.items.flatMap((entry) => (isGroup(entry) ? entry.links : [entry]))
}

// ── Header ────────────────────────────────────────────────────────────────────

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header>
      <div>
        <Link to="/">
          <img src={logoImg} alt="GEarheads logo" width={32} height={32} />
          <span><em>GE</em>arheads</span>
        </Link>

        <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <nav>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.to
                  ? <NavLink to={item.to} end={!item.dropdown}>{item.label}</NavLink>
                  : <span>{item.label}</span>}
                {item.dropdown && (
                  <ul>
                    {flattenLinks(item).map((link) => (
                      <li key={link.to}>
                        <NavLink to={link.to}>{link.label}</NavLink> — {link.desc}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li><NavLink to="/contact">Contact Us</NavLink></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
