import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import {
  MdExpandMore, MdCameraAlt,
  MdEmojiEvents, MdWorkspacePremium, MdMilitaryTech,
  MdExplore, MdAutoAwesome, MdEco,
  MdPublic, MdTune, MdSchool, MdCelebration,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { theme } from '../styles/theme'
import BorderGlow from './reactbits/BorderGlow'
import { chipHoverSubtle } from '../styles/mixins'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Award {
  iconKey: string
  title: string
  event: string
  tier: 'world' | 'state' | 'qualifier'
}

interface Tag {
  label: string
  variant: 'worlds' | 'milestone' | 'era' | 'current'
}

interface SeasonEntry {
  id: string
  type: 'FTC' | 'FLL'
  year: string
  name: string
  accent: string
  glowHSL: string
  gameChallenge: string
  tags: Tag[]
  description: string
  highlights: string[]
  awards: Award[]
  teamPhotoHint: string
  robotPhotoHint: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────


function awardTierOrder(t: Award['tier']) {
  return t === 'world' ? 0 : t === 'state' ? 1 : 2
}

const AWARD_ICONS: Record<string, IconType> = {
  trophy:    MdEmojiEvents,
  gold:      MdWorkspacePremium,
  silver:    MdMilitaryTech,
  medal:     MdMilitaryTech,
  compass:   MdExplore,
  star:      MdAutoAwesome,
  leaf:      MdEco,
  world:     MdPublic,
  control:   MdTune,
  deans:     MdSchool,
  celebrate: MdCelebration,
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function accentToGlowColors(accent: string): string[] {
  if (accent === theme.colors.secondary)
    return [`${theme.colors.secondary}44`, `${theme.colors.secondaryContainer}28`, `${theme.colors.primary}18`]
  if (accent === theme.colors.primary)
    return [`${theme.colors.primary}44`, `${theme.colors.primaryContainer}28`, `${theme.colors.secondary}18`]
  if (accent === theme.colors.tertiary)
    return [`${theme.colors.tertiary}44`, `${theme.colors.tertiaryContainer}28`, `${theme.colors.primary}18`]
  return [`${accent}44`, `${accent}28`, `${theme.colors.primary}18`]
}

// ─── Keyframes ────────────────────────────────────────────────────────────────


const tagBlink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASONS: SeasonEntry[] = [
  {
    id: 'season-2025-26',
    type: 'FTC',
    year: '2025–26',
    name: 'DECODE',
    accent: theme.colors.secondary,
    glowHSL: '145 74 57',
    gameChallenge: 'Artifact Launch',
    tags: [
      { label: 'Current Season', variant: 'current' },
      { label: '7th FTC Year', variant: 'era' },
    ],
    description:
      'After seven years together, the founding generation graduated and handed the keys to the next class. Six new student mentors took over and ran the entire season on their own — designing three robot iterations from scratch, with 100% custom-fabricated parts at every step. The engineering stack pushed the program\'s technical ceiling: Monte Carlo simulation, FMEA, AprilTag goal alignment, optical odometry, and voltage-compensated launcher control. Off the field, the team crossed $15K donated this season, placed 56 more laptops, and managed 41 CNC projects through the Production Hub.',
    highlights: [
      '9 years as a FIRST team, 7th FTC season — full leadership transition to the next generation',
      '100% custom-fabricated robots across 3 mark iterations (Mark I–III), all CAD-first design',
      'New members: Abhay, Jackson, Shivansh, Joey, Livia, and Nevaan joined the program',
      'Hosted "Skirmish of Brookfield" Rookie Qualifier for the 2nd consecutive year',
      '$15K+ donated this season; 56 laptops distributed; 41 Production Hub CNC projects',
      'AprilTag goal alignment, optical odometry, and voltage-compensated launcher control',
    ],
    awards: [
      { iconKey: 'trophy',  title: 'Inspire Award',                event: 'Lakeshore Ignites Qualifier',  tier: 'qualifier' },
      { iconKey: 'gold',    title: 'Finalist Alliance – Captain',  event: 'Madison Fish Fry',             tier: 'qualifier' },
      { iconKey: 'medal',   title: 'Think Award 2nd Place',        event: 'Madison Fish Fry',             tier: 'qualifier' },
      { iconKey: 'leaf',    title: 'Sustain Award',                event: 'Thumb Wars Hybrid',            tier: 'qualifier' },
      { iconKey: 'compass', title: 'Compass Award 3rd Place',      event: 'Wisconsin Championship',       tier: 'state' },
      { iconKey: 'star',    title: 'Reach Award',                  event: 'Wisconsin Championship',       tier: 'state' },
    ],
    teamPhotoHint: '2025–26 team group shot — DECODE season',
    robotPhotoHint: 'Mark III DECODE competition robot',
  },
  {
    id: 'season-2024-25',
    type: 'FTC',
    year: '2024–25',
    name: 'Into the Deep',
    accent: theme.colors.secondary,
    glowHSL: '145 74 57',
    gameChallenge: 'Sample Collection',
    tags: [
      { label: '🌍 Worlds — Jemison', variant: 'worlds' },
      { label: '1st CONNECT Award', variant: 'milestone' },
    ],
    description:
      'The best season the program has ever had, by almost any measure. The robot pulled a 14th-place OPR ranking worldwide, and FUN FTC clocked it as the 9th best globally in March 2025. The team hosted its first "Skirmish in Brookfield" Rookie Qualifier, bringing 19 teams and nearly 300 students to Brookfield for the day. At the FIRST Championship in Houston, GEarheads competed in the Jemison Division and came home with the 1st Place CONNECT Award — the first time in program history they\'d ever won a judged award on the Worlds stage.',
    highlights: [
      '8th year as a FIRST team, 6th year in FTC — strongest competitive season to date',
      'Robot OPR ranked 14th in the World; FUN FTC ranked it 9th best globally in March 2025',
      '3 robot iterations built across the season; 30-hour build stream watched by 30,000+ viewers',
      'Hosted inaugural "Skirmish in Brookfield" Rookie Qualifier: 19 teams, nearly 300 students',
      '49 laptops donated this season; 109 cumulative over the program\'s lifetime',
      '1st Place CONNECT Award at FIRST Championship (Jemison Division) — program\'s best-ever Worlds result',
    ],
    awards: [
      { iconKey: 'trophy', title: '1st Place CONNECT Award',                            event: 'FIRST Championship — Jemison Division', tier: 'world' },
      { iconKey: 'gold',   title: '2nd Alliance Captain',                               event: 'FIRST Championship — Jemison Division', tier: 'world' },
      { iconKey: 'silver', title: 'Inspire Award 2nd + Winning Alliance Captain',       event: 'Wisconsin Championship',               tier: 'state' },
      { iconKey: 'trophy', title: 'Inspire Award + Winning Alliance Captain',           event: 'Showdown in Sheboygan',                tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Think Award + Winning Alliance Captain',             event: 'Seven Rivers Qualifier',               tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Think Award',                                        event: 'Frozen Frenzy II',                     tier: 'qualifier' },
      { iconKey: 'silver', title: 'Finalist Alliance – Captain',                        event: 'Bots At Beloit',                       tier: 'qualifier' },
    ],
    teamPhotoHint: '2024–25 team group shot — Into the Deep season',
    robotPhotoHint: 'Into the Deep competition robot — differential lift system',
  },
  {
    id: 'season-2023-24',
    type: 'FTC',
    year: '2023–24',
    name: 'CENTERSTAGE',
    accent: theme.colors.primary,
    glowHSL: '220 100 83',
    gameChallenge: 'Pixel Placement',
    tags: [
      { label: '🌍 Worlds — Franklin', variant: 'worlds' },
      { label: '2nd Inspire at Worlds', variant: 'milestone' },
    ],
    description:
      'Back-to-back World Championships — this time in the Franklin Division at Houston 2024. The team took home a 2nd Place Inspire Award at Worlds, the highest all-around recognition in FTC and the best result they\'d earned on that stage. Every qualifier GEarheads entered that year ended with an award. They swept through regionals, carried the momentum to Wisconsin State, then made it to the championship podium for the second year in a row.',
    highlights: [
      'Second consecutive Worlds appearance — Franklin Division, Houston 2024',
      '2nd Place Inspire Award at FIRST Championship — the program\'s best-ever Worlds result at the time',
      '4th Alliance Captain at the World Championship',
      'Competed at 7 events and earned awards at every single one',
      'Innovate RTX 2nd + Think + Winning Alliance Captain at Wisconsin Frozen Frenzy',
      'Connect Award + Inspire 2nd at the Wisconsin State Championship',
    ],
    awards: [
      { iconKey: 'trophy', title: '2nd Place Inspire Award',                               event: 'FIRST Championship — Franklin Division', tier: 'world' },
      { iconKey: 'gold',   title: '4th Alliance Captain',                                   event: 'FIRST Championship — Franklin Division', tier: 'world' },
      { iconKey: 'silver', title: 'Connect Award + Inspire 2nd',                           event: 'WI FTC State Championship',              tier: 'state' },
      { iconKey: 'trophy', title: 'Inspire Award + Winning Alliance Captain',              event: 'WI Showdown in Sheboygan',               tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Innovate RTX 2nd + Think + Winning Alliance',          event: 'WI Frozen Frenzy',                       tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Finalist Alliance Captain + Inspire 2nd + Think',      event: 'WI Phoenix Fury',                        tier: 'qualifier' },
    ],
    teamPhotoHint: '2023–24 team group shot — CENTERSTAGE season',
    robotPhotoHint: 'CENTERSTAGE robot — pixel placement and drone-launch mechanisms',
  },
  {
    id: 'season-2022-23',
    type: 'FTC',
    year: '2022–23',
    name: 'POWERPLAY',
    accent: theme.colors.tertiary,
    glowHSL: '316 100 83',
    gameChallenge: 'Cone Stacking',
    tags: [
      { label: 'DHF Framework Debut', variant: 'milestone' },
      { label: 'State 3rd Inspire', variant: 'era' },
    ],
    description:
      'The year everything clicked on the engineering side. GEarheads built their first fully custom-fabricated robot — Roadrunner — and adopted GE Healthcare\'s DHF (Design History File) framework, treating the build like a real medical device project. They swept the opening qualifier of the season and kept the momentum going all the way to 3rd Inspire at the Wisconsin State Championship, finishing one spot away from Worlds. The team also started the Children\'s Hospital of Wisconsin STEM Workshop program this year, turning outreach into something that would outlast the season.',
    highlights: [
      'Adopted GE Healthcare\'s DHF (Design History File) engineering framework for robot development',
      'Built Roadrunner — the most technically sophisticated robot in program history to that point',
      'Opened the season with an Inspire Award + Winning Alliance Captain sweep at Red Raider Qualifier',
      '3rd Inspire at Wisconsin State Championship — one placement away from a first Worlds trip',
      'Founded the Children\'s Hospital of Wisconsin STEM Workshop program',
      'Computer Refurbishing Project: collected 124 devices, delivered 16 to Milwaukee teams + 5 to Honduras',
    ],
    awards: [
      { iconKey: 'trophy', title: 'Inspire Award + Winning Alliance Captain', event: 'WI Red Raider Qualifier',   tier: 'qualifier' },
      { iconKey: 'gold',   title: 'Winning Alliance – Captain',                event: 'WI Bots on Base',          tier: 'qualifier' },
      { iconKey: 'silver', title: 'Inspire Award 2nd + Think Award',           event: 'WI Lakeshore Qualifier',   tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Design Award 2nd + Think Award',            event: 'WI Knack Attack',          tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Innovate Award + Inspire 3rd + Control 3rd', event: 'Wisconsin Championship', tier: 'state' },
      { iconKey: 'deans',  title: 'Dean\'s List Finalists (×2)',               event: 'Wisconsin Championship',   tier: 'state' },
    ],
    teamPhotoHint: '2022–23 team group shot — POWERPLAY season',
    robotPhotoHint: 'POWERPLAY robot — cone-stacking claw mechanism',
  },
  {
    id: 'season-2021-22',
    type: 'FTC',
    year: '2021–22',
    name: 'Freight Frenzy',
    accent: theme.colors.primary,
    glowHSL: '220 100 83',
    gameChallenge: 'Freight Delivery',
    tags: [
      { label: '🌍 First Worlds — Houston', variant: 'worlds' },
      { label: 'State Alliance Win', variant: 'milestone' },
    ],
    description:
      'The season that changed everything. Thomas, Vaidehi, and Yuva joined and immediately raised the team\'s technical ceiling. GEarheads won the Inspire Award at the very first qualifier of the year, then built from there — claiming the Winning Alliance Captain spot at the Wisconsin State Championship and earning the first FTC Worlds qualification in program history. They packed their bags for Houston and represented Wisconsin on the FTC World Championship stage for the first time.',
    highlights: [
      'New members Thomas, Vaidehi, and Yuva joined — the largest single-year class to date',
      'First Inspire Award in FTC program history, earned at the very first qualifier attended',
      'Winning Alliance Captain at the Wisconsin State Championship — program\'s first FTC Worlds bid',
      'Competed at the FIRST World Championship in Houston, Texas as an FTC team for the first time',
      '99% CAD-based design; 90% custom-fabricated parts across the full robot build',
      'Design Award 2nd + Innovate 3rd + Winning Alliance Captain at Wisconsin State',
    ],
    awards: [
      { iconKey: 'world',  title: 'FIRST Championship — Houston',            event: 'World Championship',          tier: 'world' },
      { iconKey: 'gold',   title: 'Winning Alliance – Captain',              event: 'Wisconsin State Championship', tier: 'state' },
      { iconKey: 'silver', title: 'Design Award 2nd',                        event: 'Wisconsin State Championship', tier: 'state' },
      { iconKey: 'trophy', title: 'Inspire Award',                           event: 'WI Lakeshore Qualifier',       tier: 'qualifier' },
      { iconKey: 'gold',   title: 'Finalist Alliance – 1st Team Selected',   event: 'WI Lakeshore Qualifier',       tier: 'qualifier' },
      { iconKey: 'medal',  title: 'Connect Award + Design Award 3rd',        event: 'WI Knack Attack Qualifier',    tier: 'qualifier' },
    ],
    teamPhotoHint: '2021–22 team group shot — Freight Frenzy season',
    robotPhotoHint: 'Freight Frenzy robot — freight-delivery mechanism',
  },
  {
    id: 'season-2020-21',
    type: 'FTC',
    year: '2020–21',
    name: 'Ultimate Goal',
    accent: theme.colors.tertiary,
    glowHSL: '316 100 83',
    gameChallenge: 'Ring Toss',
    tags: [
      { label: 'COVID Hybrid Season', variant: 'era' },
      { label: 'Control Award ×2', variant: 'milestone' },
    ],
    description:
      'A genuinely strange season — half the competitions were remote, COVID had turned everything sideways, and the team had to adapt week by week. Despite that, GEarheads put together a solid robot for the ring-tossing ULTIMATE GOAL game, leaning into Vuforia-driven autonomous scoring and fast ring delivery in teleop. They earned the Control Award not once but twice — first at a qualifier, then again at the Wisconsin State Championship.',
    highlights: [
      'Hybrid COVID season — a mix of in-person and remote competitions across the year',
      'Prioritized Vuforia-driven autonomous scoring and rapid ring delivery during teleop',
      'Control Award at WI Patriot Games Qualifier + 2nd Control Award at Wisconsin State Championship',
      'Winning Alliance Captain at WI Patriot Games HYBRID Qualifier',
      'Design Award + Finalist Alliance Captain at WI Frozen Frenzy HYBRID',
      'Winning Alliance — 2nd Team Selected at the Wisconsin State Championship',
    ],
    awards: [
      { iconKey: 'control', title: 'Control Award + Winning Alliance Captain', event: 'WI Patriot Games HYBRID',       tier: 'qualifier' },
      { iconKey: 'medal',   title: 'Design Award + Finalist Alliance Captain', event: 'WI Frozen Frenzy HYBRID',       tier: 'qualifier' },
      { iconKey: 'control', title: 'Control Award 2nd + Winning Alliance 2nd', event: 'WI State Championship HYBRID',  tier: 'state' },
    ],
    teamPhotoHint: '2020–21 team photo — Ultimate Goal hybrid season',
    robotPhotoHint: 'Ultimate Goal robot — ring-launching mechanism',
  },
  {
    id: 'season-2019-20',
    type: 'FTC',
    year: '2019–20',
    name: 'Skystone',
    accent: '#c1c6d7',
    glowHSL: '222 16 82',
    gameChallenge: 'Block Stacking',
    tags: [
      { label: 'FTC Rookie Season', variant: 'milestone' },
      { label: 'State Finals', variant: 'era' },
    ],
    description:
      'Making the jump from FLL to FTC was a serious step up — higher stakes, far more complex robots, and a completely different competitive environment. GEarheads were one of only three FTC teams in the entire Brookfield school district when they made the switch. For Skystone, they built a nimble, positioning-focused robot for precision block placement and, in their very first FTC year, made it all the way to the state finals. It set the foundation for everything that came after.',
    highlights: [
      'FTC rookie season — one of just 3 FTC teams in the Brookfield school district',
      'Team expanded to students from grades 7–11 for the first time',
      'Built a nimble robot prioritizing speed and positioning accuracy over brute-force power',
      'Reached the Wisconsin State Championship finals in their very first year competing in FTC',
      'Learned core autonomous navigation with Vuforia — skills that carried into future seasons',
      'Established the engineering discipline and team structure the program still runs on today',
    ],
    awards: [
      { iconKey: 'gold',   title: 'Finalist Alliance – 1st Team Selected',           event: 'Wildcat Qualifier',           tier: 'qualifier' },
      { iconKey: 'silver', title: 'Collins Aerospace Innovate Award 2nd Place',      event: "St. Luke's Church Qualifier", tier: 'qualifier' },
      { iconKey: 'gold',   title: 'Finalist Alliance – 1st Team Selected',           event: "St. Luke's Church Qualifier", tier: 'qualifier' },
    ],
    teamPhotoHint: '2019–20 team photo — Skystone FTC rookie season',
    robotPhotoHint: 'Skystone robot — block-stacking mechanism',
  },
  {
    id: 'season-2018-19',
    type: 'FLL',
    year: '2018–19',
    name: 'Into Orbit',
    accent: theme.colors.primary,
    glowHSL: '220 100 83',
    gameChallenge: 'Space Research',
    tags: [
      { label: '🌍 FLL Worlds — Detroit', variant: 'worlds' },
      { label: '1st Research Award', variant: 'milestone' },
    ],
    description:
      'Year two of FLL and the team was already competing at the highest level. GEarheads took the 1st Place Research Award at the Wisconsin State Championship and earned a spot at the World Festival in Detroit — the program\'s first-ever Worlds trip. Their project proposed a genuinely original idea: satellite solar panels that could retract inside the spacecraft when orbital debris was detected, then safely redeploy once the threat had passed. It was the kind of thinking that showed this team was capable of real engineering, not just robotics.',
    highlights: [
      '1st Place Research Award at the Wisconsin FLL State Championship',
      'Advanced to the FLL World Festival in Detroit — the program\'s very first Worlds trip',
      'Research project: retractable satellite solar panels to survive orbital debris events and redeploy safely',
      'Sid joined the team this season and stayed through the FTC years',
      'Demonstrated original research thinking and compelling presentation skills on the World stage',
    ],
    awards: [
      { iconKey: 'trophy', title: '1st Place Research Award',   event: 'Wisconsin FLL State Championship', tier: 'state' },
      { iconKey: 'world',  title: 'World Festival Qualifier',   event: 'FLL World Festival — Detroit',     tier: 'world' },
    ],
    teamPhotoHint: '2018–19 FLL team — Into Orbit season',
    robotPhotoHint: 'FLL Into Orbit robot build',
  },
  {
    id: 'season-2017-18',
    type: 'FLL',
    year: '2017–18',
    name: 'Hydro Dynamics',
    accent: theme.colors.primary,
    glowHSL: '220 100 83',
    gameChallenge: 'Water Innovation',
    tags: [
      { label: 'Team Founded 2017', variant: 'milestone' },
      { label: 'FLL Origins', variant: 'era' },
    ],
    description:
      'It started with ten fifth-graders at Swanson Elementary in Brookfield — team #31191, FLL, 2017. Their first project took a Fitbit-style approach to composting: just like a step tracker turns walking into a daily habit, their device was designed to turn composting into one, with the end goal of improving watershed health across the community. They made it to sectionals in year one. None of them knew it would still be going eight years later.',
    highlights: [
      'Team #31191 — 10 fifth-graders from Swanson Elementary, Brookfield, WI',
      'Inaugural project: a Fitbit-inspired composting motivator to improve watershed health',
      'Made it to sectionals in the very first season of competition',
      'Founding members Josef, Mathew, Kartik, Misha, and Josh stayed with the program through FTC',
      'The seed of what became a 9-season program and a 3× FTC World Championship team',
    ],
    awards: [
      { iconKey: 'celebrate', title: 'Sectionals Qualifier', event: 'FLL Hydro Dynamics Regional', tier: 'qualifier' },
    ],
    teamPhotoHint: '2017–18 FLL founding team photo — Hydro Dynamics season',
    robotPhotoHint: 'FLL Hydro Dynamics robot build',
  },
]

// ─── Styled Components ────────────────────────────────────────────────────────

const TimelineRoot = styled.div`
  position: relative;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 0 0 80px;

  @media (min-width: 1150px) {
    &::before {
      content: '';
      position: absolute;
      left: 70px;
      top: 0;
      bottom: 0;
      width: 2px;
      transform: translateX(-50%);
      background: repeating-linear-gradient(
        to bottom,
        ${theme.colors.outlineVariant}44 0px,
        ${theme.colors.outlineVariant}44 6px,
        transparent 6px,
        transparent 16px
      );
      pointer-events: none;
    }
  }
`

const Entry = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  scroll-margin-top: 96px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: var(--entry-delay, 0ms);

  &.tl-visible { opacity: 1; transform: none; }

  @media (min-width: 1150px) {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    align-items: stretch;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  min-width: 0;
`

const Rail = styled.div`
  display: none;

  @media (min-width: 1150px) {
    display: block;
    position: relative;
    z-index: 1;
  }
`

const RailSticky = styled.div`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`

const SpineNode = styled.div<{ $accent: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ $accent }) => $accent};
  background: ${theme.colors.background};
  box-shadow: 0 0 20px ${({ $accent }) => $accent}50, 0 0 6px ${({ $accent }) => $accent}80;
  position: relative;
  z-index: 2;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: 0.65;
  }
`

const RailYear = styled.span<{ $accent: string }>`
  font-family: ${theme.fonts.label};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${({ $accent }) => $accent};
  opacity: 0.85;
  margin-top: 12px;
  text-align: center;
  white-space: nowrap;
`

const RailSeasonName = styled.span<{ $accent: string }>`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  opacity: 0.4;
  margin-top: 6px;
  text-align: center;
  max-width: 120px;
  line-height: 1.4;
`

const RailOrdinal = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  opacity: 0.7;
  margin-top: 4px;
  text-align: center;
  white-space: nowrap;
`

const CardGlowOuter = styled.div`
  border-radius: 24px;
  transition: box-shadow 0.25s;

  /* Lift edge-light above content so glow isn't blocked by ExpandSection */
  .border-glow-card > .edge-light {
    z-index: 2;
  }

  .border-glow-card {
    box-shadow: ${theme.shadows.neoRaised};
    transition: box-shadow 0.25s;
  }

  &:hover .border-glow-card {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }
`


const CardContentWrapper = styled.div`
  position: relative;
`

const CardTop = styled.div`
  padding: 18px 24px 12px;
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
  z-index: 1;

  &:hover {
    background: ${theme.colors.surfaceContainerLow}80;
  }

  &:active {
    background: ${theme.colors.surfaceContainer}80;
  }
`

const CardBody = styled.div`
  padding: 0 24px 18px;
  position: relative;
  z-index: 1;

  @media (min-width: 1150px) {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    column-gap: 28px;
  }
`

const DescCol = styled.div`
  min-width: 0;
`

const AwardsCol = styled.div`
  min-width: 0;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.outlineVariant}22;

  @media (min-width: 1150px) {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
    border-left: 1px solid ${theme.colors.outlineVariant}22;
    padding-left: 28px;
  }
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

const TypeBadge = styled.div<{ $type: 'FTC' | 'FLL' }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 7px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $type }) => ($type === 'FTC' ? theme.colors.secondary : theme.colors.primary)};
`

const YearLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 13px;
  color: ${theme.colors.onSurfaceVariant};
  letter-spacing: 0.06em;
`

const ChallengeChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  background: ${theme.colors.primary}14;
  border: 1px solid ${theme.colors.primary}28;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.85;

  ${chipHoverSubtle}
`

const TagChip = styled.div<{ $variant: Tag['variant'] }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid
    ${({ $variant }) => {
      if ($variant === 'worlds') return `${theme.colors.tertiary}38`
      if ($variant === 'milestone') return `${theme.colors.primary}38`
      if ($variant === 'current') return `${theme.colors.secondary}50`
      return `${theme.colors.outlineVariant}30`
    }};
  background: ${({ $variant }) => {
    if ($variant === 'worlds') return `${theme.colors.tertiary}12`
    if ($variant === 'milestone') return `${theme.colors.primary}12`
    if ($variant === 'current') return `${theme.colors.secondary}1c`
    return `${theme.colors.outlineVariant}0a`
  }};
  color: ${({ $variant }) => {
    if ($variant === 'worlds') return theme.colors.tertiary
    if ($variant === 'milestone') return theme.colors.primary
    if ($variant === 'current') return theme.colors.secondary
    return theme.colors.onSurfaceVariant
  }};

  ${({ $variant }) =>
    $variant === 'current' &&
    css`
      animation: ${tagBlink} 2.5s ease-in-out infinite;
    `}

  ${chipHoverSubtle}
`

const SeasonTitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
`

const SeasonName = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const MobileYearTag = styled.span<{ $accent: string }>`
  font-family: ${theme.fonts.label};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ $accent }) => $accent};
  opacity: 0.75;

  @media (min-width: 1150px) {
    display: none;
  }
`

const SeasonDesc = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const AwardsHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

const AwardsLabel = styled.div`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
`

const AwardCountBadge = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 6px;
  padding: 4px 10px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  color: ${theme.colors.onSurfaceVariant};
`

const AwardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const AwardRow = styled.div<{ $tier: Award['tier']; $accent: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px 7px 12px;
  border-radius: 8px;
  border-left: 2px solid ${({ $tier, $accent }) =>
    $tier === 'world' ? theme.colors.tertiary :
    $tier === 'state' ? $accent :
    `${theme.colors.outlineVariant}35`};
  background: ${theme.colors.surfaceContainerLow};
  transition: background 0.15s;

  &:hover {
    background: ${theme.colors.surfaceContainerHigh};
  }
`

const AwardIconWrap = styled.div<{ $tier: Award['tier']; $accent: string }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $tier, $accent }) =>
    $tier === 'world' ? `${theme.colors.tertiary}16` :
    $tier === 'state' ? `${$accent}16` :
    `${theme.colors.outlineVariant}10`};
`

const AwardNameCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`

const AwardName = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.onSurface};
  line-height: 1.3;
`

const AwardEventText = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AwardTierChip = styled.span<{ $tier: Award['tier']; $accent: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 11px;
  border-radius: 99px;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  flex-shrink: 0;
  border: 1px solid ${({ $tier, $accent }) =>
    $tier === 'world' ? `${theme.colors.tertiary}40` :
    $tier === 'state' ? `${$accent}40` :
    `${theme.colors.outlineVariant}25`};
  background: ${({ $tier, $accent }) =>
    $tier === 'world' ? `${theme.colors.tertiary}12` :
    $tier === 'state' ? `${$accent}12` :
    `${theme.colors.outlineVariant}08`};
  color: ${({ $tier, $accent }) =>
    $tier === 'world' ? theme.colors.tertiary :
    $tier === 'state' ? $accent :
    `${theme.colors.outlineVariant}bb`};

  ${chipHoverSubtle}
`

const ExpandSection = styled.div`
  border-top: 1px solid ${theme.colors.outlineVariant}22;
  margin-top: 4px;
  position: relative;
  z-index: 1;
  border-radius: 0 0 22px 22px;
  overflow: hidden;
`

const ExpandButton = styled.button<{ $accent: string; $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${theme.colors.surfaceContainerLow};
  }

  &:active {
    background: ${theme.colors.surfaceContainer};
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
    flex-shrink: 0;
    opacity: 0.7;
  }
`

const ExpandPanelOuter = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease;
`

const ExpandPanelInner = styled.div`
  overflow: hidden;
`

const HighlightsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 24px 20px;
  display: grid;
  gap: 8px 24px;

  @media (min-width: 1150px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HighlightItem = styled.li<{ $accent: string }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};

  &::before {
    content: '›';
    color: ${({ $accent }) => $accent};
    font-weight: 700;
    flex-shrink: 0;
    margin-top: 1px;
    opacity: 0.85;
  }
`

const PhotosSection = styled.div`
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid ${theme.colors.outlineVariant}22;
`

const PhotosLabel = styled.div`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin-bottom: 12px;
`

const PhotosRow = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

const PhotoSlot = styled.div`
  flex: 1;
  height: 90px;
  border-radius: 10px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: 1.5px dashed ${theme.colors.outlineVariant}38;
  transition: border-color 0.2s, background 0.2s;
  overflow: hidden;
  padding: 8px;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.outlineVariant}60;
    background: ${theme.colors.surfaceContainerLow};
  }
`

const PhotoSlotLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 8px;
  font-weight: 700;
  color: ${theme.colors.outlineVariant};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const PhotoSlotHint = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 9px;
  color: ${theme.colors.outlineVariant};
  opacity: 0.45;
  text-align: center;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function SeasonTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = entryRefs.current.map((el) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('tl-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.06 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <TimelineRoot>
      {SEASONS.map((season, i) => {
        const isOpen = expandedId === season.id
        const sortedAwards = [...season.awards].sort((a, b) => awardTierOrder(a.tier) - awardTierOrder(b.tier))
        const glowColors = accentToGlowColors(season.accent)
        const seasonNum = SEASONS.length - i

        return (
          <React.Fragment key={season.id}>
            <Entry
              id={season.id}
              ref={(el) => { entryRefs.current[i] = el }}
              style={{ '--entry-delay': `${Math.min(i * 60, 200)}ms` } as React.CSSProperties}
            >
              <Rail>
                <RailSticky>
                  <SpineNode $accent={season.accent} />
                  <RailYear $accent={season.accent}>{season.year}</RailYear>
                  <RailSeasonName $accent={season.accent}>{season.name}</RailSeasonName>
                  <RailOrdinal>{ordinal(seasonNum)} season</RailOrdinal>
                </RailSticky>
              </Rail>

              <CardWrapper>
              <CardGlowOuter>

                <BorderGlow
                  backgroundColor={theme.colors.background}
                  glowColor={season.glowHSL}
                  colors={glowColors}
                  borderRadius={24}
                  glowRadius={24}
                  glowIntensity={0.65}
                  coneSpread={22}
                >
                  <CardContentWrapper>

                    {/* ── Top: name + description (clickable) ── */}
                    <CardTop onClick={() => setExpandedId(isOpen ? null : season.id)}>
                      <MetaRow>
                        <TypeBadge $type={season.type}>
                          {season.type === 'FTC' ? '⚙' : '🤖'} {season.type}
                        </TypeBadge>
                        <YearLabel>{season.year}</YearLabel>
                        <ChallengeChip>
                          {season.gameChallenge}
                        </ChallengeChip>
                        {season.tags.map((tag, ti) => (
                          <TagChip key={ti} $variant={tag.variant}>
                            {tag.label}
                          </TagChip>
                        ))}
                      </MetaRow>

                      <SeasonTitleRow>
                        <SeasonName>{season.name}</SeasonName>
                        <MobileYearTag $accent={season.accent}>{season.year}</MobileYearTag>
                      </SeasonTitleRow>
                    </CardTop>

                    <CardBody>
                      <DescCol>
                        <SeasonDesc>{season.description}</SeasonDesc>

                        <PhotosSection>
                          <PhotosLabel>Photos</PhotosLabel>
                          <PhotosRow>
                            <PhotoSlot>
                              <MdCameraAlt size={16} color={theme.colors.outlineVariant} />
                              <PhotoSlotLabel>Team Photo</PhotoSlotLabel>
                              <PhotoSlotHint>{season.teamPhotoHint}</PhotoSlotHint>
                            </PhotoSlot>
                            <PhotoSlot>
                              <MdCameraAlt size={16} color={theme.colors.outlineVariant} />
                              <PhotoSlotLabel>Robot Photo</PhotoSlotLabel>
                              <PhotoSlotHint>{season.robotPhotoHint}</PhotoSlotHint>
                            </PhotoSlot>
                          </PhotosRow>
                        </PhotosSection>
                      </DescCol>

                      <AwardsCol>
                        <AwardsHeaderRow>
                          <AwardsLabel>Awards &amp; Achievements</AwardsLabel>
                          <AwardCountBadge>{season.awards.length} total</AwardCountBadge>
                        </AwardsHeaderRow>

                        <AwardList>
                          {sortedAwards.map((award, ai) => {
                            const AwardIcon = AWARD_ICONS[award.iconKey] ?? MdEmojiEvents
                            const iconColor =
                              award.tier === 'world' ? theme.colors.tertiary :
                              award.tier === 'state' ? season.accent :
                              `${theme.colors.outlineVariant}`
                            return (
                              <AwardRow key={ai} $tier={award.tier} $accent={season.accent}>
                                <AwardIconWrap $tier={award.tier} $accent={season.accent}>
                                  <AwardIcon size={17} color={iconColor} />
                                </AwardIconWrap>
                                <AwardNameCol>
                                  <AwardName>{award.title}</AwardName>
                                  <AwardEventText>{award.event}</AwardEventText>
                                </AwardNameCol>
                                <AwardTierChip $tier={award.tier} $accent={season.accent}>
                                  {award.tier === 'world' ? 'Worlds' : award.tier === 'state' ? 'State' : 'Qualifier'}
                                </AwardTierChip>
                              </AwardRow>
                            )
                          })}
                        </AwardList>
                      </AwardsCol>
                    </CardBody>

                    {/* ── Expand toggle ── */}
                    <ExpandSection>
                      <ExpandButton
                        $accent={season.accent}
                        $open={isOpen}
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedId(isOpen ? null : season.id)
                        }}
                        aria-expanded={isOpen}
                      >
                        <span>{isOpen ? 'Close Highlights' : 'Season Highlights'}</span>
                        <MdExpandMore size={16} />
                      </ExpandButton>

                      <ExpandPanelOuter $open={isOpen}>
                        <ExpandPanelInner>
                          <HighlightsList>
                            {season.highlights.map((h, hi) => (
                              <HighlightItem key={hi} $accent={season.accent}>
                                {h}
                              </HighlightItem>
                            ))}
                          </HighlightsList>
                        </ExpandPanelInner>
                      </ExpandPanelOuter>
                    </ExpandSection>
                  </CardContentWrapper>
                </BorderGlow>
              </CardGlowOuter>
              </CardWrapper>
            </Entry>
          </React.Fragment>
        )
      })}
    </TimelineRoot>
  )
}
