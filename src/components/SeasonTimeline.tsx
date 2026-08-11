import {
  MdEmojiEvents, MdWorkspacePremium, MdMilitaryTech,
  MdExplore, MdAutoAwesome, MdEco,
  MdPublic, MdTune, MdSchool, MdCelebration,
} from 'react-icons/md'
import type { IconType } from 'react-icons'

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASONS: SeasonEntry[] = [
  {
    id: 'season-2025-26',
    type: 'FTC',
    year: '2025–26',
    name: 'DECODE',
    accent: '#4ae183',
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
    accent: '#4ae183',
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
    accent: '#adc6ff',
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
    accent: '#ffabef',
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
    accent: '#adc6ff',
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
    accent: '#ffabef',
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
    accent: '#adc6ff',
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
    accent: '#adc6ff',
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function SeasonTimeline() {
  return (
    <div>
      {SEASONS.map((season, i) => {
        const sortedAwards = [...season.awards].sort((a, b) => awardTierOrder(a.tier) - awardTierOrder(b.tier))
        const seasonNum = SEASONS.length - i

        return (
          <section key={season.id} id={season.id}>
            <p>{ordinal(seasonNum)} season</p>

            <p>
              {season.type} · {season.year} · {season.gameChallenge}
              {season.tags.map((tag, ti) => <span key={ti}> · {tag.label}</span>)}
            </p>

            <h3>{season.name}</h3>
            <p>{season.description}</p>

            <p>Team photo: {season.teamPhotoHint}</p>
            <p>Robot photo: {season.robotPhotoHint}</p>

            <h4>Awards &amp; Achievements ({season.awards.length})</h4>
            <ul>
              {sortedAwards.map((award, ai) => {
                const AwardIcon = AWARD_ICONS[award.iconKey] ?? MdEmojiEvents
                return (
                  <li key={ai}>
                    <AwardIcon size={17} />
                    {' '}{award.title} — {award.event} (
                    {award.tier === 'world' ? 'Worlds' : award.tier === 'state' ? 'State' : 'Qualifier'})
                  </li>
                )
              })}
            </ul>

            <details>
              <summary>Season Highlights</summary>
              <ul>
                {season.highlights.map((h, hi) => <li key={hi}>{h}</li>)}
              </ul>
            </details>
          </section>
        )
      })}
    </div>
  )
}
