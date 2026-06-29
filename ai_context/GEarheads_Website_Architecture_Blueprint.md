# FTC Team #16460 "GEarheads" — Public Website Information Architecture Blueprint

*A documentation analysis and content architecture deliverable. Contains no code, HTML, or UI design — only extracted information, organized and structured so a future website project can be built from it.*

**Prepared from 7 source documents:** Judging Script · Engineering Portfolio (Rev 4) · Award Summary Presentation · Judge Q&A Prep ("Questions") · New Member Information Session deck · Pit/State Competition Posters (the two PDFs are byte-identical duplicates) · Team Timeline screenshot.

---

## TABLE OF CONTENTS
1. Executive Summary of the Team's Documentation
2. Website Sitemap
3. Navigation Hierarchy
4. Recommended URL Routing
5. Detailed Page Breakdown
6. Outreach Page Structure
7. Content Inventory for Every Page
8. Cross-Link Recommendations
9. Missing-Information Checklist
10. Suggested Content Folder/File Structure
- Appendix A: Canonical Facts (merged & deduplicated)
- Appendix B: Documented Conflicts (where sources disagree)
- Appendix C: Photo Placeholder Map (empty photo slots + a note on what each should show)

---

# 1. EXECUTIVE SUMMARY OF THE TEAM'S DOCUMENTATION

**Who they are.** GEarheads (FTC Team #16460) are a student-led FIRST Tech Challenge team from Brookfield, Wisconsin, established in 2017. As of the 2025–2026 DECODE season they are in their 9th year in FIRST and 7th year in FTC, with ~17 members spanning grades 6–12, guided by 4–5 parent coaches. They are affiliated with Brookfield Central High School (BCHS).

**What the documents collectively convey.** Across every document, three themes recur with unusual consistency:
1. **Industry-grade, data-driven engineering.** The team models its process on GE Healthcare's Design History File (DHF) framework and makes decisions using a Game Points Matrix, Monte Carlo simulation (custom Excel), and FMEA — explicitly "data over opinion."
2. **Large-scale, sustained outreach as identity, not garnish.** "Outreach is not optional — it's who we are." Their programs reach hospitals, veterans, under-resourced FIRST teams, and state/national legislators.
3. **Sustainability through a student-mentorship pipeline.** This season's defining storyline is leadership transition: all ~10 founding members graduated, and the team rebuilt continuity through formalized documentation, shadowing roles, and 2-week sprints.

**Competitive credibility.** Multiple Worlds appearances and a strong awards record (2023 State 3rd INSPIRE; 2024 Worlds 2nd INSPIRE; 2025 Worlds 1st CONNECT), plus alliance-captain finishes at Worlds.

**Current robot.** "Gearboticus" (Mark 3 / GB3) — the third iteration this season, a lightweight, fast, auto-aiming launcher robot built 100% in CAD and ~90–99% custom-fabricated on team-built CNC machines.

**Documentation maturity.** The team already maintains an Engineering Notebook, Portfolio, Award Summaries, Posters, a Goal Tracker, and an existing website (ftcgearheads.netlify.app). The material is rich enough to populate a substantial multi-page site; the main gaps are individual member bios/roster, formal sponsor tiers/logos, and the actual photos to drop into the placeholder slots (see Appendix C — Photo Placeholder Map).

**Document purposes (so content can be sourced correctly):**
- **Engineering Portfolio** — the richest single source: process, robot, software, innovations, connections, outreach, finances.
- **Judge Q&A Prep ("Questions")** — narrative answers organized by FTC award; excellent for prose, quotes, and "why we decided X."
- **Award Summary** — concise, award-aligned highlights (Connect/Design/Innovate/Sustain/Think/Control).
- **New Member deck** — ready-made recruitment/onboarding content, impact-by-the-numbers, subteam descriptions, season timeline, culture.
- **Posters** — competition history/awards, robot-iteration stats, flywheel math, event timeline, advocacy figures.
- **Judging Script** — the team's own voice; clean quotable lines and outreach storytelling.
- **Timeline screenshot** — the canonical year-by-year team history.

---

# 2. WEBSITE SITEMAP

Indentation = hierarchy. Pages marked **[N]** are the auto-discovered outreach detail pages (each gets its own page per requirements).

```
/                              Home
/about                         About the Team (overview hub)
  /about/history               Our Story / Season-by-Season History
  /about/mission               Mission, Goals & Core Values
  /about/culture               Team Culture & How We Work
  /about/awards                Awards & Competition History
/team                          Meet the Team (roster + leadership)
/robot                         The Robot (hub / current overview)
  /robot/gearboticus           Current Robot — "Gearboticus" (Mark 3)
  /robot/subsystems            Subsystems Deep-Dive (Intake/Spindexer/Launcher/Drivetrain)
  /robot/evolution             Robot Evolution (Clawboticus → Cubert → Gearboticus)
/engineering                   Engineering (hub)
  /engineering/design-process  Design Process (DHF, Game Points Matrix, FMEA, Monte Carlo)
  /engineering/cad             CAD & Mechanical Design (Onshape, subsystem design)
  /engineering/manufacturing   Manufacturing & Fabrication (CNC, 3D printing, sheet metal)
  /engineering/testing         Testing, Analysis & Iteration (DOE, flywheel math, data)
/programming                   Programming & Control Systems (hub)
  /programming/control         Control Systems (PIDF, FOV, state machine, sensor fusion)
  /programming/autonomous      Autonomous & Navigation (Pedro Pathing, optical odometry)
  /programming/innovations     Software Innovations (vision goal-tracking, voltage comp, turret)
/seasons                       Seasons (dropdown parent — last 7 FTC seasons, 2019–26)
  /seasons/2025-26             DECODE season 2025–26 (current, in construction)
  /seasons/2024-25             Into the Deep season 2024–25 (in construction)
  /seasons/2023-24             CENTERSTAGE season 2023–24 (in construction)
  /seasons/2022-23             POWERPLAY season 2022–23 (in construction)
  /seasons/2021-22             Freight Frenzy season 2021–22 (in construction)
  /seasons/2020-21             Ultimate Goal season 2020–21 (in construction)
  /seasons/2019-20             Skystone season 2019–20 (in construction)
/outreach                      Outreach (landing hub — dropdown parent)
  /outreach/childrens-hospital Children's Hospital STEM Workshops          [N]
  /outreach/veterans           Veterans Robotics Outreach (VA SCI Unit)    [N]
  /outreach/computer-project   Computer Refurbishing & Donation Project    [N]
  /outreach/rookie-qualifier   Rookie Qualifier — "Skirmish in Brookfield" [N]
  /outreach/production-hub      FIRST Wisconsin Production Hub             [N]
  /outreach/diy-cnc            DIY MPCNC Build Project                      [N]
  /outreach/maker-faire        Milwaukee Maker Faire                       [N]
  /outreach/first-advocacy     FIRST Advocacy & Legislative Impact         [N]
  /outreach/ge-elfuns          GE Elfuns Retiree Partnership               [N]
  /outreach/fll-mentoring      FLL Mentoring & Explore Festival            [N]
  /outreach/community-demos    Library & School Demos                      [N]
  /outreach/school-support     School & District Robotics Support          [N]
/impact                        Impact by the Numbers (metrics dashboard)
/sponsors                      Sponsors & Partners
/media                         Media (photo gallery, video, social)
/join                          Join the Team (new-member process)
/contact                       Contact Us
```

**Page count:** 13 outreach pages (1 hub + 12 detail) + 7 season pages + 27 non-outreach pages = **~47 pages total.**

> Build-priority note: every page above is fully supported by the documentation **except** `/team` (roster), `/sponsors` (logos/tiers), and `/media` (curated gallery), which are partially supported and flagged in Section 9. They are included because they are standard and expected, but require collection before they can be completed.

---

# 3. NAVIGATION HIERARCHY

Primary navigation bar contains **10 top-level items**. Outreach is a single nav item that opens a dropdown listing every outreach page (per requirements). Seasons is a single nav item that opens a dropdown listing the last 7 FTC seasons (per requirements).

```
Home

About ▾
    Our Story / History
    Mission & Values
    Team Culture
    Awards & Competition History
    Meet the Team

Robot ▾
    Current Robot — Gearboticus
    Subsystems
    Robot Evolution

Engineering ▾
    Design Process
    CAD & Mechanical
    Manufacturing & Fabrication
    Testing & Analysis

Programming ▾
    Control Systems
    Autonomous & Navigation
    Software Innovations

Seasons ▾
    2025–26 DECODE
    2024–25 Into the Deep
    2023–24 CENTERSTAGE
    2022–23 POWERPLAY
    2021–22 Freight Frenzy
    2020–21 Ultimate Goal
    2019–20 Skystone

Outreach ▾
    Outreach Home
    Children's Hospital Workshops
    Veterans Robotics Outreach
    Computer Refurbishing Project
    Rookie Qualifier (Skirmish in Brookfield)
    FIRST Wisconsin Production Hub
    DIY MPCNC Build Project
    Milwaukee Maker Faire
    FIRST Advocacy & Legislative Impact
    GE Elfuns Partnership
    FLL Mentoring & Explore Festival
    Library & School Demos
    School & District Robotics Support

Impact

Sponsors

Media

Join
```

**Utility/footer nav (secondary):** Contact · Instagram (@ftcgearheads16460) · YouTube (@ftcgearheads) · current site (ftcgearheads.netlify.app) · email (TBD).

**Notes on navigation choices:**
- "Meet the Team" is placed last in the About dropdown so the dropdown leads with story/mission (strong content) before the roster (currently thin).
- "Seasons" is a dropdown listing the last 7 FTC seasons (2019–26). Each season page is a placeholder with "in construction" text; they will be populated with detailed season recaps, robot specs, match results, and award moments when content is ready.
- The Outreach dropdown is long (13 links). Consider visually grouping it inside the dropdown as: *Community & Health* (Hospital, Veterans), *Growing FIRST* (Rookie Qualifier, Production Hub, DIY CNC, FLL Mentoring), *Access & Advocacy* (Computer Project, FIRST Advocacy, School Support), *Events & Demos* (Maker Faire, Library/School Demos, GE Elfuns). Grouping is presentational only and does not change routes.
- "Impact," "Sponsors," "Media," "Join" are single pages with no children (no dropdown).

---

# 4. RECOMMENDED URL ROUTING

| Route | Page | Notes |
|---|---|---|
| `/` | Home | |
| `/about` | About hub | Landing for the About section |
| `/about/history` | Season-by-season history | |
| `/about/mission` | Mission, goals, values | |
| `/about/culture` | Team culture & workflow | |
| `/about/awards` | Awards & competition history | |
| `/team` | Roster & leadership | Top-level route (linked from About dropdown) |
| `/robot` | Robot hub | |
| `/robot/gearboticus` | Current robot | Alias: `/robot/current` → redirect to `/robot/gearboticus` |
| `/robot/subsystems` | Subsystems deep-dive | |
| `/robot/evolution` | Iteration history | |
| `/engineering` | Engineering hub | |
| `/engineering/design-process` | DHF + decision tools | |
| `/engineering/cad` | CAD & mechanical | Alias: `/engineering/cad-mechanical` |
| `/engineering/manufacturing` | Fabrication | |
| `/engineering/testing` | Testing & analysis | |
| `/programming` | Programming hub | |
| `/programming/control` | Control systems | |
| `/programming/autonomous` | Autonomous & navigation | |
| `/programming/innovations` | Software innovations | |
| `/seasons/2025-26` | DECODE season 2025–26 | In construction |
| `/seasons/2024-25` | Into the Deep season 2024–25 | In construction |
| `/seasons/2023-24` | CENTERSTAGE season 2023–24 | In construction |
| `/seasons/2022-23` | POWERPLAY season 2022–23 | In construction |
| `/seasons/2021-22` | Freight Frenzy season 2021–22 | In construction |
| `/seasons/2020-21` | Ultimate Goal season 2020–21 | In construction |
| `/seasons/2019-20` | Skystone season 2019–20 | In construction |
| `/outreach` | Outreach hub | |
| `/outreach/childrens-hospital` | Children's Hospital | |
| `/outreach/veterans` | Veterans / VA SCI Unit | |
| `/outreach/computer-project` | Computer refurbishing | Alias: `/outreach/computer-refurbishing` |
| `/outreach/rookie-qualifier` | Skirmish in Brookfield | |
| `/outreach/production-hub` | Production Hub | |
| `/outreach/diy-cnc` | DIY MPCNC build | |
| `/outreach/maker-faire` | Milwaukee Maker Faire | |
| `/outreach/first-advocacy` | Advocacy & legislation | |
| `/outreach/ge-elfuns` | GE Elfuns partnership | |
| `/outreach/fll-mentoring` | FLL mentoring & Explore | |
| `/outreach/community-demos` | Library & school demos | |
| `/outreach/school-support` | District robotics funding | |
| `/impact` | Metrics dashboard | |
| `/sponsors` | Sponsors & partners | |
| `/media` | Gallery / video / social | |
| `/join` | New-member process | Alias: `/new-members` |
| `/contact` | Contact | |

**Routing conventions:**
- All-lowercase, hyphen-separated slugs.
- Section hubs (`/robot`, `/engineering`, `/programming`, `/outreach`, `/about`) are real landing pages, not just redirects.
- Provide the listed aliases as redirects to keep links resilient and SEO-friendly.

---

# 5. DETAILED PAGE BREAKDOWN

For each page: **Purpose · Primary audience · Required info · Optional info · Related pages.**

### `/` — Home
- **Purpose:** Communicate identity, credibility, and the three pillars (engineering, outreach, sustainability) in one scroll; route visitors to deeper sections.
- **Primary audience:** Everyone — judges, sponsors, prospective members/parents, other teams.
- **Required:** Team name/number/location/tagline; 1-line mission; hero visual (robot or team); headline stats (1,000+ students impacted, 31+ teams supported, multiple Worlds appearances, current awards); quick links to Robot, Engineering, Outreach, Join; latest-season banner (DECODE 2025–2026).
- **Optional:** Latest news/announcement; embedded promo video; social feed teaser. *(Photo slots: see Appendix C.)*
- **Related:** About, Robot, Outreach, Impact, Join.

### `/about` — About hub
- **Purpose:** Overview of who the team is; gateway to history/mission/culture/awards/team.
- **Audience:** Judges, sponsors, new families.
- **Required:** Short narrative ("student-led, Brookfield WI, est. 2017, 9 yrs FIRST / 7 yrs FTC"); the three mission points; links to all About subpages.
- **Optional:** Founding story snippet; "this season" transition narrative (founders graduated).
- **Related:** History, Mission, Culture, Awards, Team.

### `/about/history` — Our Story / Season-by-Season History
- **Purpose:** Tell the full arc from 2017 to today.
- **Audience:** Judges, sponsors, alumni, members.
- **Required:** The 9-season timeline (game name, years, program FLL/FTC, one-line theme) — from the Timeline screenshot; key milestones (first FTC build 2019; first Inspire 2023; Worlds appearances).
- **Optional:** Per-season robot thumbnail slots (Appendix C); alumni note; "founders graduated → new leadership" inflection.
- **Related:** Awards, Robot Evolution, Mission.

### `/about/mission` — Mission, Goals & Core Values
- **Purpose:** State why the team exists and what it stands for.
- **Audience:** Judges (Sustain/Connect), sponsors, recruits.
- **Required:** Mission (4 points); 2025–26 season goals (3); core values (both the brand pillars *Innovation/Impact/Inclusion/Teamwork/Fun* and the operating principles *Data over opinion / Simplicity over complexity / Sustainability over short-term wins / Outreach is strategic / Continuous improvement / Collaboration over competition*).
- **Optional:** Year-by-year team-goal evolution (2023→2026); "Do a few things better" philosophy.
- **Related:** Culture, Engineering/Design Process, Outreach hub.

### `/about/culture` — Team Culture & How We Work
- **Purpose:** Show the human + operational side: student-led, sprint-based, inclusive, fun.
- **Audience:** Prospective members/parents; judges (Sustain).
- **Required:** Student-led model; 2-week sprint structure; tools (Slack, Google Workspace, Onshape, Microsoft Office); inclusivity (grades 6–12, all experience levels); "serious work, genuine fun."
- **Optional:** Subteam snapshot. *(Photo slots: see Appendix C.)*
- **Related:** Join, Team, Engineering/Design Process.

### `/about/awards` — Awards & Competition History
- **Purpose:** Consolidate competitive results and judged-award honors.
- **Audience:** Judges, sponsors, recruits.
- **Required:** Award table by season — 2023 State 3rd INSPIRE; 2024 Worlds 2nd INSPIRE + 4th Alliance Captain (Franklin Division); 2025 Worlds 1st CONNECT + 2nd Alliance Captain (Jemison Division); Worlds appearances; which FTC awards the team targets (Think/Connect/Reach/Sustain/Design/Control/Innovate/Machine/Creativity/Judges' Choice).
- **Optional:** Division/event context. *(Photo slots: see Appendix C.)*
- **Related:** History, Robot, Outreach (Connect/Reach tie-ins).

### `/team` — Meet the Team
- **Purpose:** Put faces/roles to the team; show leadership and the mentorship pipeline.
- **Audience:** Judges, sponsors, recruits.
- **Required:** Member roster with names + subteam + role; coach/mentor list; student-mentor vs rostered-member distinction.
- **Optional:** Headshots, bios, "favorite subsystem," grad year, fun facts.
- **Related:** Culture, Join, Sponsors (mentors).
- **Status:** Names appear (presenters: John, Shloka, Shivansh, Rhea, Livia, Abhay, Aryav, Dirk, Anirudh, Roman, Victor, Manav; new members: Abhay, Jackson, Shivansh, Joey, Livia, Nevaan) but **no bios/roles/photos** — see Section 9.

### `/robot` — The Robot (hub)
- **Purpose:** Snapshot of the current robot + entry to subsystem/evolution detail.
- **Audience:** Judges (Design/Machine), other teams, sponsors.
- **Required:** "Gearboticus" overview; four subsystems named; headline robot stats (0.9s cycle; 13.6× Mark 1; zero drops/jams; 38% faster than Mark 2); DECODE game one-liner; links to subpages.
- **Optional:** 3D/CAD turntable; match video.
- **Related:** Subsystems, Evolution, Engineering, Programming.

### `/robot/gearboticus` — Current Robot
- **Purpose:** Full description of the Mark 3 competition robot.
- **Audience:** Judges (Design/Machine/Innovate), teams.
- **Required:** Design goals; final capabilities; subsystem summaries; key specs; what changed from Mark 2 (lighter, horizontal intake, single level, thin spindexer, auto-aim turret, one flywheel post-Governor's-Cup).
- **Optional:** BOM highlights; weight/dimension specs (TBD). *(Photo / CAD slots: see Appendix C.)*
- **Related:** Subsystems, Programming, Testing.

### `/robot/subsystems` — Subsystems Deep-Dive
- **Purpose:** Detail each subsystem (Intake, Spindexer/Sorting, Launcher, Drivetrain).
- **Audience:** Judges (Design/Machine), teams.
- **Required:** Per subsystem: function, mechanism, sensors, key numbers — Intake (active sweeping, dual color sensors); Spindexer (3 anti-jam chambers, belt-driven, gear feeder paddle); Launcher (flywheel roller, servo feeder 300ms/ball, DOE-tuned, low-friction tensioner); Drivetrain (belt-driven mecanum, low CG, optical + laser odometry, dual FOV).
- **Optional:** Exploded views; iteration notes per subsystem.
- **Related:** Gearboticus, Engineering/CAD, Programming/Control.

### `/robot/evolution` — Robot Evolution
- **Purpose:** Tell the three-iteration story and the discipline behind rapid iteration.
- **Audience:** Judges (Design/Think), teams.
- **Required:** Clawboticus (Mark 1, 30-Hour Build — claw intake, reused chassis, small); Cubert (Mark 2 — heavy/stable, active intake, adjustable launch angle, spindexer color sort, 95% intake success); Gearboticus (Mark 3 — lightweight, fast sort, 0.9s cycle, auto-aim); comparison stats; how/why each redesign was triggered (data-driven).
- **Optional:** Side-by-side spec table; lessons learned. *(Photo slots: see Appendix C.)*
- **Related:** Gearboticus, Design Process, Testing, History.

### `/engineering` — Engineering (hub)
- **Purpose:** Frame the industry-grade engineering approach and route to detail.
- **Audience:** Judges (Design/Think), sponsors, teams.
- **Required:** DHF/GE-Healthcare framing; the three-phase build approach; links to Design Process, CAD, Manufacturing, Testing.
- **Optional:** Process diagram; mentor-companies note.
- **Related:** All engineering subpages, Programming, Robot.

### `/engineering/design-process` — Design Process
- **Purpose:** Explain the decision framework end to end.
- **Audience:** Judges (Think/Design), teams.
- **Required:** DHF (Design History File / "Define, Hypothesize, Fabricate"); Game Points Matrix; Monte Carlo simulation (custom Excel, 50+ games); FMEA; cost/benefit trade-offs; subsystem-based design; 2-week sprints / 8-month season; goal tracking.
- **Optional:** Annotated matrix/FMEA/simulation screenshots; example trade-off.
- **Related:** CAD, Testing, Robot Evolution, Mission.

### `/engineering/cad` — CAD & Mechanical Design
- **Purpose:** Show the 100%-CAD, subsystem-driven mechanical workflow.
- **Audience:** Judges (Design/Machine), teams, recruits.
- **Required:** Onshape (web-based, Chromebook-friendly, real-time collaboration); 100% CAD design; joints/linkages for motion; subsystem organization; CAD-integration/version-control lessons.
- **Optional:** Before/after notes. *(CAD / photo slots: see Appendix C.)*
- **Related:** Manufacturing, Subsystems, Design Process.

### `/engineering/manufacturing` — Manufacturing & Fabrication
- **Purpose:** Detail custom fabrication capability.
- **Audience:** Judges (Machine), teams (incl. those seeking Production Hub help).
- **Required:** 3 CNC mills (custom MP "Mostly Printed" CNC; small 6×6 industrial mill; large "PrintNC" mill); 3D printing; sheet-metal manufacturing; ~90–99% custom-fabricated.
- **Optional:** Tolerances/materials. *(Photo slots: see Appendix C.)*
- **Related:** CAD, Production Hub, DIY MPCNC.

### `/engineering/testing` — Testing, Analysis & Iteration
- **Purpose:** Show how data validates design.
- **Audience:** Judges (Think/Design/Control), teams.
- **Required:** Scrimmage/qualifier testing; DOE for launcher accuracy; flywheel energy analysis (ball 55 g, exit ~18.8 m/s, ~7.5 J required; Gecko + aluminum flywheels; slowdown math); sorting-efficiency analysis (fast release > sorting); FMEA-driven fixes.
- **Optional:** Charts/derivations; test-log excerpts.
- **Related:** Design Process, Robot Evolution, Programming/Control.

### `/programming` — Programming & Control Systems (hub)
- **Purpose:** Overview of the software stack and philosophy ("push for heavy automation").
- **Audience:** Judges (Control), teams, recruits.
- **Required:** Language/tools (Java, Git, Gradle, Android, UML, plus web tooling React/Node for dashboards/tools); sensors list; high-level control architecture; links to subpages.
- **Optional:** Architecture diagram; repo link (TBD).
- **Related:** Control, Autonomous, Innovations, Robot.

### `/programming/control` — Control Systems
- **Purpose:** Detail real-time control.
- **Audience:** Judges (Control), teams.
- **Required:** Custom PIDF (feedforward by position/velocity/accel; integral anti-windup); field-oriented (FOV) drive with trig; state-machine architecture (four-button TeleOp, single/dual driver); camera-based aiming; sensor fusion (odometry + vision) and why pure camera was dropped.
- **Optional:** Code-structure overview; tuning notes; formulas.
- **Related:** Autonomous, Innovations, Subsystems.

### `/programming/autonomous` — Autonomous & Navigation
- **Purpose:** Detail localization and autonomous routines.
- **Audience:** Judges (Control), teams.
- **Required:** Pedro Pathing; optical odometry (vs wheel encoders; slip reduction); Limelight + AprilTags; HuskyLens; OpenCV detection; far/close autonomous scoring; hybrid/semi-auto assist in TeleOp.
- **Optional:** Path visualizations; auto-routine breakdown.
- **Related:** Control, Innovations, Strategy content (Robot Evolution/Testing).

### `/programming/innovations` — Software Innovations
- **Purpose:** Spotlight standout/novel software.
- **Audience:** Judges (Innovate/Control), teams.
- **Required:** Active Vision Goal Tracking (AprilTag + custom PIDF heading); Voltage-Compensated Launcher Control (dynamic voltage compensation, shot-recovery logic, 50 Hz feedback, bandwidth-saving filter); Odometry+Vision localization with onboard AI processing; turret control (trapezoidal motion profiling, kS/kV/kA feedforward, "Slow Zone"); Drive-Lock/Position-Hold controller.
- **Optional:** Performance metrics. *(Demo/clip slot: see Appendix C.)*
- **Related:** Control, Autonomous, Robot.

### `/seasons/[year]` — Season Pages (2019–26)

**Template for all 7 season pages:** `/seasons/2025-26` (DECODE), `/seasons/2024-25` (Into the Deep), `/seasons/2023-24` (CENTERSTAGE), `/seasons/2022-23` (POWERPLAY), `/seasons/2021-22` (Freight Frenzy), `/seasons/2020-21` (Ultimate Goal), `/seasons/2019-20` (Skystone).

- **Purpose:** Serve as a landing page and teaser for each season's full recap content.
- **Audience:** Everyone — judges reviewing specific seasons, alumni, team members, prospective members curious about history.
- **Required (at launch):** Clear "in construction" notice with the season name and game title; a placeholder or brief blurb indicating what content will come.
- **Planned future content (to be added):** Season recap (game overview, rules summary); team's robot for that season; competition results (qualifiers, states, regionals, Worlds); key award achievements; photo gallery from the season; notable match footage links; member highlights/new members that season.
- **Optional:** Timeline of season events; match videos; alliance/partnership stories.
- **Related:** Home, About/History, Robot/Evolution, Awards, all Outreach pages (which have cross-links by season).
- **Status:** Placeholder pages only; content to be populated as time allows.

### `/outreach` — Outreach (landing hub)
- **Purpose:** Frame outreach as core identity and index every initiative.
- **Audience:** Judges (Connect/Reach/Sustain), sponsors, community, teams.
- **Required:** "Outreach is not optional" statement; categorized cards linking to all 12 detail pages; top-line outreach metrics (1,000+ students; 31+ teams; 28+ events; 500+ hours; 30+ mentors).
- **Optional:** Outreach map; this-season event timeline; featured story.
- **Related:** All outreach detail pages, Impact, Sponsors, Awards.

*(All 12 outreach detail pages are specified in Section 6.)*

### `/impact` — Impact by the Numbers
- **Purpose:** A single metrics dashboard quantifying reach.
- **Audience:** Judges (Sustain/Reach), sponsors.
- **Required:** 1,000+ students impacted; 31+ FIRST teams supported; 28+ outreach events; 500+ hours invested; 56 laptops this season (156 all-time); 41 Production Hub parts; 30+ mentors engaged; 1,750+ avg Instagram views.
- **Optional:** Year-over-year growth charts; per-program breakdowns.
- **Related:** Outreach hub, Sponsors, Awards.

### `/sponsors` — Sponsors & Partners
- **Purpose:** Recognize funders/partners and make the case for new sponsors.
- **Audience:** Current/prospective sponsors, judges (Connect/Sustain).
- **Required:** Sponsor/partner list (GE Healthcare, Milwaukee Tool, PRSG, Wisconsin DPI Grant; technical partners Milliman, Generac, Johnson Controls, Elmbrook Schools; project partners Reserve Advisors, Soerens Ford, libraries, Tech Lit Africa, Blair Tech); how funds are used; budget context (~$12K/yr; ~95% donations/grants); how to sponsor.
- **Optional:** Logos, sponsor tiers, impact-per-dollar, sponsorship packet/PDF download.
- **Related:** Impact, Outreach, Contact.
- **Status:** Names exist; **logos, tiers, and a sponsorship packet are missing** — Section 9.

### `/media` — Media
- **Purpose:** Central gallery of photos, videos, and social content.
- **Audience:** Everyone.
- **Required:** Curated photo gallery (robot, outreach, competition, team); embedded videos; social links (Instagram @ftcgearheads16460, YouTube @ftcgearheads).
- **Optional:** Press mentions; downloadable press kit; filter by category.
- **Related:** Every page (as image source), Join, Contact.
- **Status:** Source slides contain many photos, but a **curated, captioned, high-res library is missing** — Sections 9 & Appendix C.

### `/join` — Join the Team
- **Purpose:** Convert interested students/parents; set expectations.
- **Audience:** Prospective members and parents.
- **Required:** 5-step new-member process (Express Interest → Student Mentor → Pick Subteam → Work on a Project → Grow & Transition); subteam descriptions (Strategy & Docs, Mechanical, Software, Outreach) with "what you'll do / learn"; expectations; what you'll gain; parent expectations (travel, snacks, employer grants, ~$100 club fee, volunteering); contact CTA.
- **Optional:** Application form/link; FAQ; meeting times/location.
- **Related:** Team, Culture, Contact, Mission.

### `/contact` — Contact Us
- **Purpose:** Provide ways to reach the team.
- **Audience:** Everyone.
- **Required:** Contact email (TBD); social links; general location (Brookfield, WI); inquiry categories (join / sponsor / outreach / media).
- **Optional:** Contact form; mailing address; map.
- **Related:** Join, Sponsors, Media.

---

# 6. OUTREACH PAGE STRUCTURE

`/outreach` is the landing hub. The nav "Outreach" item opens a dropdown listing the hub plus all 12 detail pages below. Each detail page follows a **consistent template**: *Overview → Problem/Need → What We Do → Partners/Mentors → This-Season Results → Cumulative Impact → Photo slot(s) → Related pages.* (The photo slot for every outreach page is listed in Appendix C — Photo Placeholder Map.)

### `/outreach/childrens-hospital` — Children's Hospital STEM Workshops
- **What it is:** Bi-monthly hybrid STEM workshops for long-term pediatric patients (cancer and severe conditions) at Children's Hospital of Wisconsin (Milwaukee Children's) — the hospital's only sustained multi-year FIRST program.
- **Required:** Inspiration (play-therapy research, Dr. Karst); activities (paper circuits, catapults, pneumatic machines, robotics kits, live FTC-robot experience, leave-behind kits); hybrid delivery (in-person + livestream + WeVideo tutorials); Lights & Motion STEM kits; this season ~40 patients / 4 sessions / 90 team hours; cumulative 140+ children / 21 sessions over 4 seasons; mentors Dr. Jeffrey Karst (PhD Pediatrician) & Leslie Scott (RN).
- **Sources:** Judging Script §4; Portfolio p16; New Member p13; Posters p3; Questions Connect/Reach.

### `/outreach/veterans` — Veterans Robotics Outreach (VA Spinal Cord Injury Unit)
- **What it is:** Multi-week FLL-based robotics bootcamps for veterans at the Milwaukee VA SCI Unit (via War Memorial Center) — the only team ever reinvited.
- **Required:** Programs (intro FLL challenge; intro CAD/CNC sign-building; advanced FLL Spike); two 6-week series; 12 weekly 90-min sessions; ~12 veterans; 130–150+ hours; ends in friendly competition; next session planned on model rockets; veterans/families attended the Rookie Qualifier; mentors Sam (Samantha) Doughty (CTRS), Sean Clarke (Program Director), Kali Dancisak; (also Erinn Brulla).
- **Sources:** Judging Script §5; Portfolio p16; New Member p14; Posters p3; Questions Connect.

### `/outreach/computer-project` — Computer Refurbishing & Donation Project
- **What it is:** Collect, refurbish, and securely re-image donated computers to close the digital divide for FIRST/STEM access.
- **Required:** Process (collection drives → inventory/catalog → secure data wipe + new OS → distribute; Blair Tech licenses); this season 56 laptops (1000+ students reached); all-time 156; recipients incl. Libya (Team 18422), Jamaica (Team 24994), Vietnam (Team 25242), Arizona (Rez Kids, Rocksisaan, Los A.R.I.E.S), NOAM/Team 25644, C-Gull, Milwaukee Robotics Academy, FIRST WI/WTC/UW Stout, FIRST WI Sheboygan; pending Door of Hope, Laser Ducks; partners Milliman, Reserve Advisors, Soerens Ford, Elm Grove/Brookfield Libraries, Elmbrook Schools, Tech Lit Africa; 5-year growth (2022:9 → 2023:16 → 2024:35–44 → 2025–26:56).
- **Sources:** Judging Script §7; Portfolio p15; New Member p12; Questions Connect/Reach.

### `/outreach/rookie-qualifier` — Rookie Qualifier ("Skirmish in Brookfield")
- **What it is:** A full FTC qualifier the team hosts for newer teams, in a supportive, learning-focused environment (2nd year; Feb 2026).
- **Required:** 26 rookie teams; 80+ volunteers; 5-week pre-event webinar series (competition flow, alliance selection, judging, portfolio, packing); recruited 3 new FTC judges; extra FTAs + on-demand coaching; state-qualification opportunities; collaboration with Team 13201 Hazmat.
- **Sources:** Judging Script §8; Portfolio p14; New Member p15; Posters p4; Questions Connect/Reach/Judges' Choice.

### `/outreach/production-hub` — FIRST Wisconsin Production Hub
- **What it is:** Free custom-fabrication for under-resourced WI FTC/FRC teams; the GEarheads were one of the hub's first official FTC teams.
- **Required:** 41 CNC/3D-printed parts this season (14+ distributed); fabrication/CNC coaching to 4 teams (Pack-a-Punch, Random Engineers, Tundrabots, Hapabots); services (CNC milling, 3D printing, laser cutting, plotter printing); 7 teams impacted / 70+ hours; 26 FTC teams in 2026 ecosystem.
- **Sources:** Judging Script §8; Portfolio p14; New Member p16; Posters p5; Questions Connect/Reach.

### `/outreach/diy-cnc` — DIY MPCNC Build Project
- **What it is:** Helping rookie teams build their own low-cost CNC using the "MP (Mostly Printed) CNC" design — supplying parts and step-by-step guidance.
- **Required:** Piloted with 17347 RedCat Robotics, 12966 C-Gull Robotics, and an FTC team from North Carolina; Hapa Bots (helped set up X-Carve); Red Cat/C-Gull (materials & guidance); goal of self-sufficient fabrication for rookies.
- **Sources:** Portfolio p14; New Member p8; Posters p5.

### `/outreach/maker-faire` — Milwaukee Maker Faire
- **What it is:** Annual 2-day demo at Discovery World (Milwaukee Maker Faire — 3rd largest in the US), showcasing FIRST and the team's fabrication.
- **Required:** Invited back for 5th year; ~6,000+ makers at the venue (500+ directly engaged); CNC/MPCNC demos; recruited members (e.g., a student who later joined mechanical/software); Nov 8–9.
- **Sources:** Judging Script §6; Portfolio p13; New Member p17; Posters p5; Questions Reach.

### `/outreach/first-advocacy` — FIRST Advocacy & Legislative Impact
- **What it is:** State and national advocacy to grow and fund FIRST.
- **Required:** FIRST Advocacy Day at the WI capitol (multiple years); seat on the WI FTC Student Advocacy Board / FIRST WI Student Board of Directors; Government Advocacy Day in Madison (personal stories to 3 legislators); FTC Governors Cup, Washington DC (1+ hr with Gov. Evers, spouse, 2 policy staff); push to expand DPI Robotics League funding from grades 6–12 to K–12; Chips & Sciences Act effort (1 of 5 teams advocating ~$5M nationally; 6 federal legislators); helped pass the DPI Robotics League Bill grant ($500K annual funding secured; 75+ legislators connected; 7 students mobilized); legislators Rep. Adam Neylon, Sen. Rob Hutton, Gov. Tony Evers, Sen. Tammy Baldwin.
- **Sources:** Judging Script §6 (cont.); Portfolio p12–13; New Member p17; Posters p5; Award Summary p5.

### `/outreach/ge-elfuns` — GE Elfuns Retiree Partnership
- **What it is:** Partnership with the GE Elfuns retiree group to introduce FIRST/robotics and explore retiree mentorship.
- **Required:** Presentations to GE Elfuns; connecting robotics to GE work; potential technical-mentorship pipeline; expanding FIRST awareness to a new community.
- **Sources:** Portfolio p13; Posters p4 (Elfun GE Retiree Presentation, Dec 2025); Award Summary p2 (Community Connections).

### `/outreach/fll-mentoring` — FLL Mentoring & Explore Festival
- **What it is:** Mentoring and judging for FIRST LEGO League, including the FLL Explore Festival.
- **Required:** Judged FLL projects; represented FTC by showcasing the robot; delivered the keynote sharing the GEarheads' FLL→FTC journey; guided parents starting their own FLL teams.
- **Sources:** Portfolio p13; Posters p4 (FLL Explore Festival Mentoring, Nov 2025); New Member p17.

### `/outreach/community-demos` — Library & School Demos
- **What it is:** Robot demonstrations and recruiting at libraries and school events.
- **Required:** Robot showcase at Brookfield Public Library; Elm Grove Library demos; BC High School Club Fair; Elmbrook Education Foundation STEM fairs; general community demos.
- **Sources:** Judging Script §6; New Member p17; Posters p4.

### `/outreach/school-support` — School & District Robotics Support
- **What it is:** Working with the school district to fund and grow robotics.
- **Required:** Partnered with superintendent, principal, athletic director to secure funding; covered FLL & FTC registration and field costs; increased school robotics spaces; club-fee model context.
- **Sources:** Portfolio p13; New Member p24 (Parents/funding).

---

# 7. CONTENT INVENTORY FOR EVERY PAGE

Format: page → content checklist → **contributing source documents**.

**`/` Home**
✓ Identity/tagline ✓ Mission one-liner ✓ Hero visual ✓ Headline stats ✓ Section quick-links ✓ Season banner
Sources: Portfolio p1–2; New Member p3, p19; Posters p1; Timeline screenshot.

**`/about` About hub**
✓ Short narrative ✓ Mission points ✓ Subpage links
Sources: Portfolio p2–3; New Member p3; Judging Script §1.

**`/about/history`**
✓ 9-season timeline ✓ Program transitions (FLL→FTC) ✓ Milestones ✓ Founders-graduated inflection
Sources: Timeline screenshot (primary); Posters p1; Portfolio p3; Judging Script §1, §3.

**`/about/mission`**
✓ Mission (4) ✓ Season goals (3) ✓ Brand values ✓ Operating principles ✓ Year-by-year goals
Sources: Judging Script §2; Portfolio p2–3; New Member p3–4; Award Summary p2; Questions p6.

**`/about/culture`**
✓ Student-led ✓ Sprint structure ✓ Tools ✓ Inclusivity ✓ "Serious work, genuine fun"
Sources: New Member p20, p22; Questions p5, p15–16; Portfolio p2.

**`/about/awards`**
✓ Award table by season ✓ Worlds appearances ✓ Alliance-captain finishes ✓ Targeted FTC awards
Sources: Posters p1; Award Summary p1; Questions (award sections); Timeline screenshot.

**`/team`**
✓ Roster (names/subteam/role) ✓ Coaches/mentors ✓ Mentor-vs-member pipeline ⚠ bios/photos missing
Sources: Judging Script (presenter names); Portfolio p3, p12; New Member p23–24; Questions p5.

**`/robot` hub**
✓ Gearboticus overview ✓ Four subsystems ✓ Headline robot stats ✓ Subpage links
Sources: Portfolio p6, p8; Award Summary p3; Posters p9; Judging Script §10.

**`/robot/gearboticus`**
✓ Design goals ✓ Final capabilities ✓ Subsystem summaries ✓ Specs ✓ Mark 2→3 changes
Sources: Portfolio p6, p8; Award Summary p3; Posters p2, p7, p9; Judging Script §10.

**`/robot/subsystems`**
✓ Intake ✓ Spindexer ✓ Launcher ✓ Drivetrain (function/mechanism/sensors/numbers)
Sources: Portfolio p8; Award Summary p3–4; Posters p7–8; Questions p17–18.

**`/robot/evolution`**
✓ Clawboticus/Cubert/Gearboticus ✓ Comparison stats ✓ Redesign triggers ✓ Lessons
Sources: Portfolio p6; Posters p9; Award Summary p3, p6; Questions p3, p7–8, p18.

**`/engineering` hub**
✓ DHF/GE framing ✓ Three-phase build ✓ Subpage links
Sources: Portfolio p4, p7; Award Summary p3, p6; Questions p3, p9.

**`/engineering/design-process`**
✓ DHF ✓ Game Points Matrix ✓ Monte Carlo ✓ FMEA ✓ Trade-offs ✓ Sprints ✓ Goal tracking
Sources: Portfolio p4; Award Summary p4, p6; New Member p6–7; Questions p3, p7–9, p17.

**`/engineering/cad`**
✓ Onshape ✓ 100% CAD ✓ Joints/linkages ✓ Subsystem org ✓ Integration lessons
Sources: Portfolio p7; New Member p8; Posters p7; Questions p16, p22.

**`/engineering/manufacturing`**
✓ 3 CNC mills ✓ 3D printing ✓ Sheet metal ✓ ~90–99% custom-fabricated
Sources: Portfolio p7; New Member p6, p8; Posters p5.

**`/engineering/testing`**
✓ Scrimmage/qualifier testing ✓ DOE ✓ Flywheel math ✓ Sorting-efficiency proof ✓ FMEA fixes
Sources: Portfolio p4, p8, p11; Posters p2; Questions p18, p20; Award Summary p4.

**`/programming` hub**
✓ Stack/tools ✓ Sensors ✓ Architecture overview ✓ Subpage links
Sources: New Member p9; Portfolio p5; Questions p4, p19.

**`/programming/control`**
✓ PIDF ✓ FOV drive ✓ State machine ✓ Camera aiming ✓ Sensor fusion
Sources: Portfolio p5, p10–11; Award Summary p6–7; Posters p7–8; Questions p4, p19–20.

**`/programming/autonomous`**
✓ Pedro Pathing ✓ Optical odometry ✓ Limelight/AprilTags ✓ HuskyLens ✓ OpenCV ✓ Auto scoring
Sources: Portfolio p5, p9–10; Award Summary p7; Questions p4, p19–20; New Member p9.

**`/programming/innovations`**
✓ Vision goal-tracking ✓ Voltage-compensated launcher ✓ Odometry+vision ✓ Turret profiling ✓ Drive-lock
Sources: Portfolio p9–11; Posters p7; Questions p19.

**`/outreach` hub**
✓ "Not optional" statement ✓ Categorized cards ✓ Top-line metrics ✓ (optional) event timeline/map
Sources: New Member p11, p19; Portfolio p2–3; Judging Script §3–8.

**`/outreach/childrens-hospital`**
✓ Inspiration/play-therapy ✓ Activities ✓ Hybrid delivery ✓ Results/cumulative ✓ Mentors ✓ Photo slot
Sources: Judging Script §4; Portfolio p16; New Member p13; Posters p3.

**`/outreach/veterans`**
✓ Programs ✓ Two 6-week series ✓ Sessions/hours/vets ✓ Reinvited ✓ Mentors ✓ Photo slot
Sources: Judging Script §5; Portfolio p16; New Member p14; Posters p3.

**`/outreach/computer-project`**
✓ Process ✓ This-season/all-time counts ✓ Recipients ✓ Partners ✓ 5-yr growth ✓ Photo slot
Sources: Judging Script §7; Portfolio p15; New Member p12; Questions p12.

**`/outreach/rookie-qualifier`**
✓ Event scale ✓ Webinar series ✓ Judges/FTAs ✓ Hazmat collab ✓ Photo slot
Sources: Judging Script §8; Portfolio p14; New Member p15; Posters p4.

**`/outreach/production-hub`**
✓ Parts made/distributed ✓ Teams coached ✓ Services ✓ Teams/hours ✓ Photo slot
Sources: Judging Script §8; Portfolio p14; New Member p16; Posters p5.

**`/outreach/diy-cnc`**
✓ MPCNC concept ✓ Pilot teams ✓ X-Carve/Hapa Bots ✓ Photo slot
Sources: Portfolio p14; New Member p8; Posters p5.

**`/outreach/maker-faire`**
✓ Venue/scale ✓ 5th year ✓ Demos ✓ Recruiting ✓ Photo slot
Sources: Judging Script §6; Portfolio p13; New Member p17; Posters p5.

**`/outreach/first-advocacy`**
✓ Advocacy Day ✓ Student board ✓ Governors Cup ✓ K-12 funding push ✓ Chips & Sciences ✓ Bill passage ✓ Legislators
Sources: Judging Script §6; Portfolio p12–13; New Member p17; Posters p5; Award Summary p5.

**`/outreach/ge-elfuns`**
✓ Partnership ✓ Presentations ✓ Mentorship pipeline ✓ Photo slot
Sources: Portfolio p13; Posters p4; Award Summary p2.

**`/outreach/fll-mentoring`**
✓ Judging ✓ Robot showcase ✓ Keynote ✓ Parent guidance ✓ Photo slot
Sources: Portfolio p13; Posters p4; New Member p17.

**`/outreach/community-demos`**
✓ Library demos ✓ Club fair ✓ STEM fairs ✓ Photo slot
Sources: Judging Script §6; New Member p17; Posters p4.

**`/outreach/school-support`**
✓ District partnership ✓ Registration/field funding ✓ Robotics spaces ✓ Fee model
Sources: Portfolio p13; New Member p24.

**`/impact`**
✓ All headline metrics ✓ (optional) growth charts
Sources: New Member p19; Portfolio (various); Posters p5–6; Award Summary p5.

**`/sponsors`**
✓ Sponsor/partner list ✓ Fund usage ✓ Budget context ✓ How to sponsor ⚠ logos/tiers/packet missing
Sources: Portfolio p3, p12; New Member p24–25; Questions p5, p15; Award Summary p2, p5.

**`/media`**
✓ Photo gallery ✓ Video embeds ✓ Social links ⚠ curated/captioned library missing
Sources: All slide decks (image content); New Member p18; Questions p14.

**`/join`**
✓ 5-step process ✓ Subteam descriptions ✓ Expectations ✓ Gains ✓ Parent expectations ✓ CTA
Sources: New Member p7–10, p21–26.

**`/contact`**
✓ Email (TBD) ✓ Social ✓ Location ✓ Inquiry types
Sources: New Member p18, p26; Posters p1.

---

# 8. CROSS-LINK RECOMMENDATIONS

High-value internal links to weave the site together (source → target, with reason):

**Robot ↔ Engineering ↔ Programming (the technical triangle)**
- `/robot/subsystems` → `/engineering/cad` (how each part was designed) and → `/programming/control` (how each is controlled).
- `/robot/evolution` → `/engineering/design-process` (the decision tools that drove each redesign) and → `/engineering/testing` (data that triggered Mark 2→3).
- `/engineering/testing` → `/programming/innovations` (voltage-compensated launcher) and → `/robot/gearboticus` (validated specs).
- `/engineering/manufacturing` → `/outreach/production-hub` and `/outreach/diy-cnc` (same CNC capability powers outreach).

**Outreach ↔ Awards/Impact/Sponsors**
- Every outreach detail page → `/impact` (its metrics in context) and → `/about/awards` (Connect/Reach evidence).
- `/outreach/first-advocacy` → `/sponsors` (DPI grant funding) and → `/about/awards` (2025 CONNECT win).
- `/outreach/computer-project`, `/outreach/production-hub`, `/outreach/rookie-qualifier` → cross-link to each other ("Growing FIRST" cluster).
- `/outreach/childrens-hospital` ↔ `/outreach/veterans` (shared origin story; veterans grew from hospital project).
- `/sponsors` → relevant outreach pages funded by each partner (e.g., GE Healthcare → Elfuns; Blair Tech/Milliman → Computer Project).

**About/Join/Team (the human cluster)**
- `/about/history` → `/about/awards` and `/robot/evolution` (parallel timelines).
- `/about/culture` → `/join` (turn culture interest into action) and → `/about/mission`.
- `/join` → `/team` (see who you'd join) and → each subteam's relevant technical page (Mechanical→/engineering/cad; Software→/programming; Outreach→/outreach; Strategy→/engineering/design-process).
- `/team` → `/sponsors` (mentors) and → `/about/culture`.

**Home as a hub**
- `/` → Robot, Engineering, Outreach, Impact, Join, Sponsors (primary CTAs), plus History and Awards (credibility).

**Contextual mentor links**
- Mentor names on outreach pages (Dr. Karst, Leslie Scott, Sam Doughty, etc.) → `/sponsors` or `/team` mentor section where appropriate.

---

# 9. MISSING-INFORMATION CHECKLIST

Collect before/while building. Grouped by type.

**Photos / media — source from the team's Google Photos**
Photos are handled as empty placeholder slots, not described in the body. **Appendix C (Photo Placeholder Map)** lists the slots page by page, each with a one-line note on what the picture should show — walk that list and drop in the right shot for each. A few items you may still need to capture or gather (rather than just pick from existing photos):
- [ ] A current full-team group photo (used on Home / About / Team).
- [ ] One headshot per member, framed the same way for everyone (for `/team`).
- [ ] Sponsor/partner logo files (for `/sponsors` — these are logos, not photos).
- [ ] Embeddable video links (YouTube) for the slots that call for a clip (robot reveal, match footage, outreach recap).

**Missing descriptions / written content**
- [ ] Member bios (name, grade, subteam, role, a sentence or two) — none exist.
- [ ] Coach/mentor bios and exact roles (4–5 parent coaches; which subteams).
- [ ] A confirmed, plain-language definition of what "DHF" stands for on the public site (sources use both "Design History File/Framework" and "Define, Hypothesize, Fabricate").
- [ ] Robot physical specs: weight, dimensions, motor count, gear ratios, battery (not stated).
- [ ] DECODE game explainer (1 short paragraph) so non-FTC visitors understand "artifacts," "motif," "obelisk," goals.
- [ ] Plain-English captions for the flywheel/sorting math (for general audiences).

**Missing statistics / clarifications (resolve conflicts — see Appendix B)**
- [ ] Confirm computers donated **this season**: 54 vs 56.
- [ ] Confirm **all-time** computers: 150 vs 156.
- [ ] Confirm **new-member count**: 6 new + 2 student mentors vs "9 new members."
- [ ] Confirm current launcher: **one flywheel** (current) vs two (analysis) — and update math page accordingly.
- [ ] Confirm Worlds appearance years (portfolio "2022 & 2024" vs poster results for 2024 & 2025; screenshot shows 2023 qualification).
- [ ] Confirm Maker Faire year count (4th vs 5th) and attendance framing (500+ engaged vs 6,000+ at venue).
- [ ] Confirm Children's Hospital cumulative sessions (14 vs 21) and hours.
- [ ] Confirm "100% CAD" vs "~90–99% custom-fabricated" phrasing for public use.
- [ ] Confirm advocacy-day streak (2 vs 3 years).

**Missing timelines**
- [ ] An exact, dated event list for the current season (poster p4 has approximate months — confirm precise dates for a public timeline).
- [ ] Founding date specifics and any pre-2017 history (if any).

**Missing biographies**
- [ ] Student leadership structure (who leads each subteam; captain(s)).
- [ ] Alumni notes (the ~10 graduated founders — optional alumni page/section).

**Missing sponsor information**
- [ ] Formal sponsor tiers/levels and what each tier receives.
- [ ] A downloadable sponsorship packet/PDF.
- [ ] Confirmation of which named companies are *sponsors* vs *technical mentors* vs *project partners* (overlapping in sources).
- [ ] Tax-status/donation-instructions (how a sponsor actually gives).

**Missing robot details**
- [ ] Final canonical robot name/label (resolve "Mark II" header vs Mark 3 current).
- [ ] Per-subsystem spec sheets and a bill of materials summary.
- [ ] Autonomous routine list (named routines + point values).

**Missing outreach information**
- [ ] Exact partner/recipient confirmations and any logos/permissions for hospitals/VA (privacy-sensitive — confirm what may be published).
- [ ] Quotes/testimonials from partners or participants (a few strong anecdotes exist; get permission to publish).
- [ ] Confirmed contact email and any mailing address for `/contact`.

**General/site-wide**
- [ ] Existing brand assets to preserve: the brain/circuit-board logo and the existing color treatment (black/white/blue) seen in the decks — gather the source logo files. *(Noted as an existing asset to carry over, not a new design choice.)*
- [ ] Confirm whether to migrate from / retire the current Netlify site, and whether to preserve its timeline component (the source of the History screenshot).

---

# 10. SUGGESTED CONTENT FOLDER / FILE STRUCTURE

*Content organization only (Markdown/data + assets) — not code. One folder per page; shared assets centralized. This mirrors the sitemap so a future build can map folders → routes directly.*

```
content/
├── home/
│   ├── index.md                 (hero copy, stats, CTAs)
│   └── highlights.md            (rotating highlights / featured items)
├── about/
│   ├── index.md                 (About hub overview)
│   ├── history.md               (season-by-season timeline)
│   ├── mission.md               (mission, goals, values)
│   ├── culture.md               (how we work)
│   └── awards.md                (awards & competition results)
├── team/
│   ├── index.md                 (roster intro + pipeline explainer)
│   ├── members/                 (one file per member — TO COLLECT)
│   │   ├── _template.md
│   │   └── ...
│   └── coaches.md               (coach/mentor list — TO COLLECT)
├── robot/
│   ├── index.md                 (robot hub overview)
│   ├── gearboticus.md           (current robot — Mark 3)
│   ├── subsystems.md            (intake / spindexer / launcher / drivetrain)
│   └── evolution.md             (Clawboticus → Cubert → Gearboticus)
├── engineering/
│   ├── index.md                 (engineering hub)
│   ├── design-process.md        (DHF, matrix, FMEA, Monte Carlo)
│   ├── cad.md                   (Onshape, mechanical design)
│   ├── manufacturing.md         (CNC, 3D printing, sheet metal)
│   └── testing.md               (DOE, flywheel math, iteration)
├── programming/
│   ├── index.md                 (programming hub)
│   ├── control.md               (PIDF, FOV, state machine, fusion)
│   ├── autonomous.md            (Pedro Pathing, odometry, vision)
│   └── innovations.md           (vision tracking, voltage comp, turret)
├── outreach/
│   ├── index.md                 (outreach hub + dropdown index)
│   ├── childrens-hospital/
│   │   └── index.md
│   ├── veterans/
│   │   └── index.md
│   ├── computer-project/
│   │   └── index.md
│   ├── rookie-qualifier/
│   │   └── index.md
│   ├── production-hub/
│   │   └── index.md
│   ├── diy-cnc/
│   │   └── index.md
│   ├── maker-faire/
│   │   └── index.md
│   ├── first-advocacy/
│   │   └── index.md
│   ├── ge-elfuns/
│   │   └── index.md
│   ├── fll-mentoring/
│   │   └── index.md
│   ├── community-demos/
│   │   └── index.md
│   └── school-support/
│       └── index.md
├── impact/
│   └── index.md                 (metrics dashboard data)
├── sponsors/
│   └── index.md                 (partners, usage, how-to-sponsor)
├── media/
│   └── index.md                 (gallery manifest, video embeds, social)
├── join/
│   └── index.md                 (process, subteams, expectations)
├── contact/
│   └── index.md                 (contact methods)
└── _data/
    ├── stats.yml                (single source of truth for all numbers)
    ├── timeline.yml             (season-by-season entries)
    ├── awards.yml               (award records)
    ├── robots.yml               (iteration specs/stats)
    ├── outreach.yml             (per-program metrics + partners)
    ├── sponsors.yml             (partners, tiers — TO COLLECT)
    ├── team.yml                 (roster — TO COLLECT)
    └── conflicts.yml            (open numbers to confirm — see Appendix B)

assets/
├── images/
│   ├── robot/                   (CAD renders, subsystem photos, hero shots)
│   ├── outreach/
│   │   ├── childrens-hospital/
│   │   ├── veterans/
│   │   ├── computer-project/
│   │   ├── rookie-qualifier/
│   │   ├── production-hub/
│   │   ├── maker-faire/
│   │   └── advocacy/
│   ├── team/                    (group photo, headshots — TO COLLECT)
│   ├── awards/                  (award moments — TO COLLECT)
│   ├── engineering/             (CNC, CAD captures)
│   └── brand/                   (logo files, existing brand assets)
├── video/                       (links/manifests — hosted on YouTube)
└── docs/                        (downloadable: sponsorship packet, press kit — TO COLLECT)
```

**Why a `_data/` layer:** Numbers (laptops donated, hours, parts, students impacted) repeat across many pages and currently conflict between source documents. Centralizing them in `stats.yml` (with `conflicts.yml` tracking the open questions in Appendix B) keeps every page consistent and makes corrections one-edit-fixes-everywhere.

---

# APPENDIX A — CANONICAL FACTS (merged & deduplicated)

**Identity:** Team #16460 "GEarheads," Brookfield, WI. Est. 2017. 9 yrs FIRST / 7 yrs FTC (2025–26). ~17 members, grades 6–12. Student-led; 4–5 parent coaches. Affiliated with Brookfield Central HS. Logo: brain/circuit motif. Social: Instagram @ftcgearheads16460, YouTube @ftcgearheads. Current site: ftcgearheads.netlify.app.

**Mission:** Build competitive robots with strong engineering; expand STEM access in underserved communities; grow technical + outreach skills across the team; be ambassadors for FIRST in Wisconsin, helping new teams grow.

**2025–26 goals:** (1) grow technical + outreach skills, keep everyone engaged; (2) expand core outreach to underserved groups/new teams; (3) build a strong, reliable, competitive robot. (Plus a documentation goal.)

**Values:** Brand pillars — Innovation, Impact, Inclusion, Teamwork, Fun. Operating principles — Data over opinion; Simplicity over complexity; Sustainability over short-term wins; Outreach is strategic; Continuous improvement; Collaboration over competition.

**History (program · years · theme):** Hydro Dynamics (FLL, 2017–18, "Where It All Began") · Into Orbit (FLL, 2018–19, "Launching to New Heights") · Skystone (FTC, 2019–20, "Our Rookie Journey") · Ultimate Goal (FTC, 2020–21, "Growing Through Challenge") · Freight Frenzy (FTC, 2021–22, "Leveling Up") · POWERPLAY (FTC, 2022–23, "A Breakout Season" — first Inspire, state-alliance win, Worlds) · CENTERSTAGE (FTC, 2023–24, "Expanding Our Impact") · Into the Deep (FTC, 2024–25, "Engineering Forward") · DECODE (FTC, 2025–26, "Building the Future" — current).

**Awards:** 2023 State 3rd place INSPIRE · 2024 Worlds 2nd place INSPIRE + 4th Alliance Captain (Franklin Div.) · 2025 Worlds 1st place CONNECT + 2nd Alliance Captain (Jemison Div.). Multiple Worlds appearances.

**Engineering:** GE Healthcare DHF framework; Game Points Matrix; Monte Carlo (custom Excel, 50+ games); FMEA; cost/benefit trade-offs; subsystem-based design; 2-week sprints over an 8-month season; three build phases.

**CAD/Manufacturing:** 100% CAD in Onshape; ~90–99% custom-fabricated; 3 CNC mills (custom MP "Mostly Printed" CNC, 6×6 industrial mill, large "PrintNC"); 3D printing; sheet metal.

**Robot iterations:** Clawboticus (Mark 1 / 30-Hour Build) → Cubert (Mark 2 — heavy, active intake, adjustable launch angle, spindexer, 95% intake success) → Gearboticus (Mark 3 / current — lightweight, horizontal intake, single level, thin fast spindexer, auto-aim turret, 0.9 s cycle; 13.6× Mark 1; zero drops/jams; 38% faster than Mark 2; single flywheel post-Governors-Cup).

**Subsystems (current):** Intake (active sweeping, dual color sensors) · Spindexer (3 anti-jam chambers, belt-driven, gear feeder paddle) · Launcher (flywheel roller, servo feeder ~300 ms/ball, DOE-tuned, low-friction tensioner) · Drivetrain (belt-driven mecanum, low CG, optical + laser odometry, dual FOV).

**Software:** Java/Git/Gradle/Android/UML (+ React/Node tooling). Sensors: encoders, optical odometry, Limelight/AprilTags, HuskyLens, color sensors. Pedro Pathing. Custom PIDF; field-oriented drive; state machine; camera aiming; sensor fusion. Innovations: active vision goal-tracking, voltage-compensated launcher control, odometry+vision localization, turret trapezoidal motion profiling, drive-lock/position-hold.

**Finances:** ~$12K/yr spend; $15K+ donated this season; ~95% donations + local/DPI grants; PRSG; ~$100 BCHS club fee; coach-managed with student input.

**Outreach metrics (canonical):** 1,000+ students impacted · 31+ FIRST teams supported · 28+ outreach events · 500+ hours · 56 laptops this season (156 all-time) · 41 Production Hub parts · 30+ mentors engaged · 1,750+ avg Instagram views.

---

# APPENDIX B — DOCUMENTED CONFLICTS (where sources disagree)

| # | Topic | Source A | Source B | Suggested canonical |
|---|---|---|---|---|
| 1 | Computers this season | 54 (Judging Script) | 56 (Portfolio/Award/Questions/New Member) | **56** (confirm) |
| 2 | Computers all-time | 150 (Judging Script) | 156 (Questions/New Member) | **156** (or "150+") |
| 3 | New members | 6 named + 2 student mentors (Portfolio/Award) | "9 new members" (Questions) | State as **6 new members + 2 student mentors** |
| 4 | Launcher flywheels | One (Award/Posters/Questions — current) | Two (Portfolio math p11 + poster calc) | **One** now; two used in earlier analysis |
| 5 | Robot label on subsystem slide | "Mark II" header (Portfolio p8) | Mark 3 features/current | **Mark 3 / Gearboticus** (header is a typo) |
| 6 | Worlds years | "2022 & 2024" (Portfolio) | 2024 & 2025 results (Posters); 2023 qual (screenshot) | List **multiple appearances 2023–2025**; verify |
| 7 | Advocacy-day streak | "two years" (Award) | "three years" (Portfolio/Posters) | **Three years** (later docs) |
| 8 | Maker Faire | 5th year, 6,000+ (Portfolio) | 4th year, 500+ (Posters) | **5th year**; 6,000+ at venue / 500+ engaged |
| 9 | Children's Hospital cumulative | 21 sessions/4 seasons (New Member) | 14 sessions/140+ hrs (Posters) | Verify; this season ~40 patients/4 sessions/90 hrs |
| 10 | Fabrication % | "100% CAD" | "90%" / "99% custom-fabricated" | **100% CAD-designed; ~90–99% custom-fabricated** |
| 11 | DHF meaning | "Design History File/Framework" (GE) | "Define, Hypothesize, Fabricate" (team) | Present **both**; pick one primary public phrasing |
| 12 | Grade range | 6–12 (most) | 7–12 (some) | **6–12** (team's stated range) |
| 13 | Production Hub parts | 41 made | 14+ distributed | **41 made; 14+ distributed** |
| 14 | Connections count | 33 / 31 / 30+ | — | **~30–33** |

---

# APPENDIX C — PHOTO PLACEHOLDER MAP

This replaces a list of specific images with a list of **empty photo slots** to leave on each page. The build should leave each slot blank (mark it `[PHOTO]`); you fill it later by picking the right shot from the team's Google Photos.

**How to read each table.** Left column = a short slot label (also a good filename). Right column = what the picture should show, so you can match it to a photo. "Optional" rows can be skipped without breaking the page.

**Three quick rules:**
- Keep all member headshots framed the same way (same crop, similar background) so `/team` looks consistent.
- Hero / banner slots want **landscape** shots; detail/close-up slots can be either orientation.
- For Children's Hospital, Veterans, and any shot with minors or patients, only use photos you have permission to publish.

A few slots suit a **CAD render or a screen capture** (from Onshape or a dashboard) instead of a camera photo — these are marked *(CAD/screen)*.

---

## Core pages

### `/` — Home
| Slot | What it should show |
|---|---|
| `home-hero` | One strong landscape shot that sums up the team — the whole team with the robot, or the robot mid-match. |
| `home-strip-1` | Action: robot scoring / competing during a match. |
| `home-strip-2` | Outreach: members working with kids or the community. |
| `home-strip-3` | Build: members at a CNC or with CAD up on a screen. |

### `/about` — About hub
| Slot | What it should show |
|---|---|
| `about-banner` | A candid team group shot at an event (looser than the posed hero). |

### `/about/history` — Season-by-Season History
| Slot | What it should show |
|---|---|
| `history-early` | The earliest team or robot photo you have (rookie / FLL era). |
| `history-recent` | A recent-season team photo, to bookend the timeline. |
| `history-season-thumb` ×9 *(optional)* | One small photo per season — that year's robot or team. Add a slot per season only if you want the timeline illustrated. |

### `/about/mission` — Mission & Values
| Slot | What it should show |
|---|---|
| `mission-values` *(optional)* | A photo that captures the values in action — collaboration or a team celebration. |

### `/about/culture` — Team Culture
| Slot | What it should show |
|---|---|
| `culture-work` | A real work session — members heads-down during a sprint. |
| `culture-fun` | The fun side — team laughing, celebrating, or a team tradition. |

### `/about/awards` — Awards & Competition History
| Slot | What it should show |
|---|---|
| `awards-stage` | Team on stage / holding a trophy or banner (Worlds or State). |
| `awards-alliance` *(optional)* | An alliance or award moment (e.g., team with alliance partners). |

### `/team` — Meet the Team
| Slot | What it should show |
|---|---|
| `team-group` | Full current-season team group photo (posed). |
| `team-headshot-[name]` (one per member) | A clean headshot per member — **same framing for everyone**. Leave one slot per roster entry. |
| `team-mentors` *(optional)* | Coaches / mentors group shot. |

---

## Robot pages

### `/robot` — Robot hub
| Slot | What it should show |
|---|---|
| `robot-hero` | A clean shot of the current robot (Gearboticus) on a neutral background. |

### `/robot/gearboticus` — Current Robot
| Slot | What it should show |
|---|---|
| `gearboticus-full` | Full robot, competition-ready, clear side or 3/4 angle. |
| `gearboticus-detail-1..3` | Close-ups of standout features (auto-aim turret, intake, launcher) — one slot each. *(CAD/screen ok)* |

### `/robot/subsystems` — Subsystems
| Slot | What it should show |
|---|---|
| `subsystem-intake` | Close-up of the intake. *(CAD/screen ok)* |
| `subsystem-spindexer` | Close-up of the spindexer / sorting carousel. *(CAD/screen ok)* |
| `subsystem-launcher` | Close-up of the launcher / flywheel. *(CAD/screen ok)* |
| `subsystem-drivetrain` | Close-up of the drivetrain (mecanum + odometry). *(CAD/screen ok)* |

### `/robot/evolution` — Robot Evolution
| Slot | What it should show |
|---|---|
| `evolution-mark1` | Mark 1 "Clawboticus." |
| `evolution-mark2` | Mark 2 "Cubert." |
| `evolution-mark3` | Mark 3 "Gearboticus." |
| | *Tip: shoot or crop the three the same way so they compare cleanly side by side.* |

---

## Engineering pages

### `/engineering` — Engineering hub
| Slot | What it should show |
|---|---|
| `engineering-shop` | Wide shot of the build space with the team working. |

### `/engineering/design-process` — Design Process
| Slot | What it should show |
|---|---|
| `design-process-artifact` *(optional)* | A whiteboard or screen showing the process at work (matrix, FMEA, or simulation) — whatever you're comfortable showing. *(CAD/screen ok)* |

### `/engineering/cad` — CAD & Mechanical Design
| Slot | What it should show |
|---|---|
| `cad-screen` | Onshape on screen with a subsystem model open. *(CAD/screen)* |
| `cad-member` *(optional)* | A member doing CAD (over-the-shoulder). |

### `/engineering/manufacturing` — Manufacturing & Fabrication
| Slot | What it should show |
|---|---|
| `manufacturing-cnc` | A CNC mill running or set up. |
| `manufacturing-parts` | Finished custom-fabricated parts. |
| `manufacturing-3dprint` *(optional)* | A 3D printer running, or printed parts. |

### `/engineering/testing` — Testing & Iteration
| Slot | What it should show |
|---|---|
| `testing-session` | Members testing the robot — at a scrimmage or in the shop. |

---

## Programming pages

### `/programming` — Programming hub
| Slot | What it should show |
|---|---|
| `programming-drivers` | Drivers at the controls during a match or practice. |

### `/programming/control` — Control Systems
| Slot | What it should show |
|---|---|
| `control-screen` *(optional)* | Driver station / dashboard on a screen. *(CAD/screen)* |

### `/programming/autonomous` — Autonomous & Navigation
| Slot | What it should show |
|---|---|
| `autonomous-field` *(optional)* | Robot running autonomously on the field. |

### `/programming/innovations` — Software Innovations
| Slot | What it should show |
|---|---|
| `innovations-demo` | A shot or video still showing a standout feature in action (e.g., auto-aim). |

---

## Outreach pages

`/outreach` hub:

| Slot | What it should show |
|---|---|
| `outreach-hero` | One strong outreach image that represents the whole program (members with the community / kids). |

Each detail page gets **one lead photo slot** (`<slug>-lead`). Add an optional second slot (`<slug>-detail`) where noted.

| Page | Slot | What the lead photo should show |
|---|---|---|
| Children's Hospital | `childrens-hospital-lead` | Members running a STEM activity with patients (only with permission). |
| Veterans | `veterans-lead` | Members and veterans building / working together. |
| Computer Refurbishing | `computer-project-lead` | Laptops being refurbished, a stack of donated machines, or a handoff. *(+ optional `-detail`)* |
| Rookie Qualifier | `rookie-qualifier-lead` | The hosted event — teams competing, volunteers running it. *(+ optional `-detail`)* |
| Production Hub | `production-hub-lead` | Parts being made for other teams, or the team coaching another team. |
| DIY MPCNC Build | `diy-cnc-lead` | An MPCNC build, or helping a rookie team assemble one. |
| Maker Faire | `maker-faire-lead` | The team's booth / demo at Maker Faire. |
| FIRST Advocacy | `first-advocacy-lead` | Team at the capitol, with legislators, or at an advocacy day. *(+ optional `-detail`)* |
| GE Elfuns | `ge-elfuns-lead` | Presenting to the GE Elfuns retiree group. |
| FLL Mentoring | `fll-mentoring-lead` | Mentoring or judging FLL kids; or the keynote moment. |
| Library & School Demos | `community-demos-lead` | A robot demo at a library or school event. |
| School & District Support | `school-support-lead` | Working with the school/district, or a club-fair / recruiting shot. |

---

## Supporting pages

### `/impact` — Impact by the Numbers
| Slot | What it should show |
|---|---|
| `impact-montage` *(optional)* | A small montage of outreach moments — or leave the page numbers-only. |

### `/sponsors` — Sponsors & Partners
| Slot | What it should show |
|---|---|
| `sponsors-context` *(optional)* | The team with a sponsor, or at a sponsor's site. (Sponsor **logos** are separate files, listed in Section 9.) |

### `/media` — Media
| Slot | What it should show |
|---|---|
| `media-grid` | This page **is** the gallery — leave a grid of empty slots and fill it from Google Photos across all categories (robot, outreach, competition, team). Plus embedded video and social links. |

### `/join` — Join the Team
| Slot | What it should show |
|---|---|
| `join-welcome` | An inviting team photo with newer members included. |
| `join-subteam-[name]` ×4 *(optional)* | One photo per subteam (Strategy & Docs, Mechanical, Software, Outreach). |

### `/contact` — Contact Us
| Slot | What it should show |
|---|---|
| `contact-team` *(optional)* | A single friendly team photo. |

---

## Non-photo visual references (already designed — reuse as-is, not placeholders)

These are existing designed panels/assets, not photo slots:
- "Impact by the Numbers" panel; iteration-comparison stat block; the season timeline; the 5-year computer-donation growth graphic; and the existing History timeline component (the source of the History screenshot).
- **Brand:** the brain/circuit-board logo and the existing black/white/blue treatment — gather the source logo files to carry the identity over.

---

*End of blueprint. This document extracts, merges, organizes, and architects the information from all provided GEarheads documentation into a build-ready content plan. It intentionally contains no HTML, React, components, UI, or color/design decisions — those are for a later phase.*
