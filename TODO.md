# GEarheads Website — TODO

## 0. Progress Legend

```
- [x]  Done
- [ ]  Not started
- [-]  In progress
```

---

## 1. Infrastructure & Dev Setup

- [x] Install react-router-dom v7
- [x] Set up BrowserRouter in App.tsx
- [x] Wire all 45 routes
- [x] Set up 4 Navigate redirects (`/robot/current`, `/engineering/cad-mechanical`, `/outreach/computer-refurbishing`, `/new-members`)
- [x] 404 catch-all route → NotFoundPage
- [x] Header with grouped dropdown nav (hover, keyboard-accessible, mobile drawer)
- [x] Footer with 4-column layout (Team, Technical, Community, Connect)
- [x] Loader animation component (dual counter-rotating rings)
- [x] UnderConstruction placeholder component
- [x] ScrollToTop on route change
- [x] React.lazy + Suspense for all page components
- [x] All 45 page stub files created under `src/pages/`
- [x] Rename package from `nspire-site` to something appropriate in `package.json`
- [x] Update `<title>` and favicon from TI-Nspire defaults to GEarheads branding
- [ ] Configure deployment target (migrate from / extend `ftcgearheads.netlify.app`)
- [ ] Verify `public/assets/sponsor-logos` symlink resolves correctly in production build

---

## 2. Home Page (`/`)

- [x] HeroSection — Gearheads branding, headline, CTAs
- [x] FeaturesGrid — "What We Do" bento (4 cards, responsive breakpoints)
- [x] FeaturesCarousel — Sponsors multi-card carousel (3–4 cards by width, slide transition, arrow nav, dot indicators, pause on hover, seamless infinite loop)
- [x] Timeline — 9 FLL/FTC seasons from `src/public/timeline.json`
- [x] FAQSection — 9 Gearheads FAQs from `src/public/faq.json` (CSS grid accordion)
- [ ] Confirm FAQ #9 (GE origin story) with the team — marked as best guess
- [x] ContactSection — update from TI-Nspire placeholder (email, address, phone) to Gearheads info
- [x] Replace animated calculator visual in HeroSection with robot/team image or GEarheads animation
- [ ] Add impact stats strip (1,000+ students impacted · 31+ teams · 28+ events · Worlds appearances)
- [x] Verify all 13 sponsor logo images load in carousel

---

## 3. About Section

### `/about` — Hub
- [x] Short narrative ("student-led, Brookfield WI, est. 2017, 9 yrs FIRST / 7 yrs FTC")
- [x] Mission summary on hub (quote + pillar bento with descriptions + values + principles; subpage links still TODO)
- [x] `about-hero-bg` photo slot — using Governor's Cup IMG_3727 at `/public/assets/photos/about-hero-bg.jpg`
- [x] Hero + Mission rebuilt as one continuous section: photo banner, subtitle/stats, mission quote + body (MissionWrap), horizontal accordion (PillarsAccordion with BorderGlow + cursor spotlight), values + principles two-column bottom grid

### `/about/history`
- [ ] 9-season narrative timeline (2017–26, one prose section per season)
- [ ] Key milestone callouts (first FTC build 2019; first Inspire 2023; Worlds appearances 2023–25)
- [ ] Founders-graduated inflection point (2025–26 leadership transition)
- [ ] `history-early` and `history-recent` photo slots
- [ ] Optional: per-season thumbnail slots ×9

### `/about/mission`
- [ ] Mission statement (4 points from Appendix A)
- [ ] 2025–26 season goals (3 goals)
- [ ] Brand values (Innovation, Impact, Inclusion, Teamwork, Fun)
- [ ] Operating principles (Data over opinion; Simplicity over complexity; Sustainability over short-term wins; Outreach is strategic; Continuous improvement; Collaboration over competition)
- [ ] Optional: year-by-year team-goal evolution (2023→2026)

### `/about/culture`
- [ ] Student-led model description
- [ ] 2-week sprint structure
- [ ] Tools section (Slack, Google Workspace, Onshape, Microsoft Office)
- [ ] Inclusivity (grades 6–12, all experience levels welcome)
- [ ] "Serious work, genuine fun" section
- [ ] `culture-work` and `culture-fun` photo slots

### `/about/awards`
- [ ] Award table by season (2023 State 3rd INSPIRE · 2024 Worlds 2nd INSPIRE + 4th Alliance Captain Franklin · 2025 Worlds 1st CONNECT + 2nd Alliance Captain Jemison)
- [ ] Worlds appearances list
- [ ] FTC targeted awards list (Think/Connect/Reach/Sustain/Design/Control/Innovate/Machine/Creativity/Judges' Choice)
- [ ] `awards-stage` and `awards-alliance` photo slots

### `/team`
- [ ] Roster grid (names, subteam, role) — **collect from team**
- [ ] Coach/mentor list with roles
- [ ] Student-mentor vs. rostered-member pipeline callout
- [ ] `team-group` photo slot (full team, posed)
- [ ] Per-member headshot slots (consistent framing for all)
- [ ] Confirm full roster and roles before publishing

---

## 4. Robot Section

### `/robot` — Hub
- [ ] Gearboticus overview blurb (DECODE season, Mark 3)
- [ ] 4 subsystems named with one-line descriptions
- [ ] Headline stats (0.9s cycle · 13.6× Mark 1 · zero drops/jams · 38% faster than Mark 2)
- [ ] Links to subpages
- [ ] `robot-hero` photo slot

### `/robot/gearboticus`
- [ ] Design goals section
- [ ] Final capabilities and key specs
- [ ] Subsystem summaries
- [ ] Mark 2→3 delta (lighter, horizontal intake, single level, thin fast spindexer, auto-aim turret, one flywheel post-Governors-Cup)
- [ ] `gearboticus-full` and `gearboticus-detail-1..3` photo slots (CAD/screen ok)

### `/robot/subsystems`
- [ ] Intake — active sweeping, dual color sensors
- [ ] Spindexer — 3 anti-jam chambers, belt-driven, gear feeder paddle
- [ ] Launcher — flywheel roller, servo feeder ~300 ms/ball, DOE-tuned, low-friction tensioner
- [ ] Drivetrain — belt-driven mecanum, low CG, optical + laser odometry, dual FOV
- [ ] `subsystem-intake`, `-spindexer`, `-launcher`, `-drivetrain` photo slots (CAD/screen ok)

### `/robot/evolution`
- [ ] Clawboticus (Mark 1 / 30-Hour Build) description
- [ ] Cubert (Mark 2) description
- [ ] Gearboticus (Mark 3) description
- [ ] Comparison stats table (cycle time, intake success %, weight)
- [ ] Why each redesign was triggered (data-driven decisions)
- [ ] `evolution-mark1`, `-mark2`, `-mark3` photo slots (same crop angle for clean comparison)

---

## 5. Engineering Section

### `/engineering` — Hub
- [x] GE Healthcare DHF framework framing
- [x] Three-phase build overview
- [x] Links to subpages
- [x] `engineering-shop` photo slot (wide build-space shot)

### `/engineering/design-process`
- [x] DHF explanation — present both public phrasings: "Design History File/Framework" (GE origin) and "Define, Hypothesize, Fabricate" (team's)
- [x] Game Points Matrix section
- [x] Monte Carlo simulation (custom Excel, 50+ simulated games)
- [x] FMEA section
- [x] Cost/benefit trade-off examples
- [x] 2-week sprints / 8-month season structure
- [x] Goal tracking overview
- [x] Optional: annotated matrix/FMEA screenshot slots (CAD/screen ok)

### `/engineering/cad`
- [x] Onshape section (web-based, Chromebook-friendly, real-time collaboration)
- [x] 100% CAD workflow description
- [x] Joints/linkages for motion
- [x] Subsystem organization approach
- [x] Integration/version-control lessons learned
- [x] `cad-screen` photo slot (Onshape open with subsystem model)
- [x] Optional: `cad-member` (over-the-shoulder shot)

### `/engineering/manufacturing`
- [x] 3 CNC mills (custom MPCNC, 6×6 industrial mill, large PrintNC)
- [x] 3D printing section
- [x] Sheet metal section
- [x] ~90–99% custom-fabricated stat with context
- [x] `manufacturing-cnc` and `manufacturing-parts` photo slots
- [x] Optional: `manufacturing-3dprint` slot

### `/engineering/testing`
- [x] Scrimmage/qualifier testing workflow
- [x] DOE for launcher accuracy
- [x] Flywheel energy analysis (ball 55 g, exit ~18.8 m/s, ~7.5 J required; Gecko + aluminum flywheels)
- [x] Sorting-efficiency proof (fast release > sorting)
- [x] FMEA-driven fixes examples
- [x] `testing-session` photo slot

---

## 6. Programming Section

### `/programming` — Hub
- [ ] Language/tools overview (Java, Git, Gradle, Android, UML; React/Node for dashboards/tools)
- [ ] Sensors list (encoders, optical odometry, Limelight/AprilTags, HuskyLens, color sensors)
- [x] High-level control architecture summary
- [x] Links to subpages
- [ ] `programming-drivers` photo slot

### `/programming/control`
- [ ] Custom PIDF (feedforward by position/velocity/accel; integral anti-windup)
- [ ] Field-oriented (FOV) drive with trig explanation
- [ ] State-machine architecture (four-button TeleOp, single/dual driver modes)
- [ ] Camera-based auto-aiming
- [ ] Sensor fusion and why pure camera was dropped
- [ ] Optional: `control-screen` photo slot (driver station / dashboard)

### `/programming/autonomous`
- [ ] Pedro Pathing section
- [ ] Optical odometry (vs wheel encoders; slip reduction rationale)
- [ ] Limelight + AprilTags
- [ ] HuskyLens
- [ ] OpenCV detection
- [ ] Far/close autonomous scoring routines
- [ ] Hybrid/semi-auto assist in TeleOp
- [ ] Optional: `autonomous-field` photo slot

### `/programming/innovations`
- [ ] Active Vision Goal Tracking (AprilTag + custom PIDF heading)
- [ ] Voltage-Compensated Launcher Control (dynamic voltage comp, shot-recovery logic, 50 Hz feedback, bandwidth-saving filter)
- [ ] Odometry+Vision localization with onboard AI processing
- [ ] Turret control (trapezoidal motion profiling, kS/kV/kA feedforward, "Slow Zone")
- [ ] Drive-Lock/Position-Hold controller
- [ ] `innovations-demo` photo slot (auto-aim or standout feature in action)

---

## 7. Outreach Section

### `/outreach` — Hub
- [x] "Outreach is not optional — it's who we are" statement
- [x] Categorized program cards linking all 12 detail pages
- [x] Top-line metrics (1,000+ students · 31+ teams · 28+ events · 500+ hours)
- [ ] `outreach-hero` photo slot

### `/outreach/childrens-hospital`
- [x] Inspiration (play-therapy research, Dr. Karst; hospital's only sustained FIRST program)
- [x] Activities (paper circuits, catapults, pneumatic machines, robotics kits, live FTC demo, leave-behind kits)
- [x] Hybrid delivery (in-person + livestream + WeVideo tutorials; Lights & Motion STEM kits)
- [x] This-season results (~40 patients, 4 sessions, 90 team hours)
- [x] Cumulative impact (140+ children, 21 sessions over 4 seasons)
- [x] People & Partners section — Dr. Jeffrey Karst (PhD Pediatrician), Leslie Scott (RN) — portrait photo slots + title + note
- [x] Hero 2-col layout with image well (falls back to dashed placeholder)
- [x] Inline narrative photo slot beside impact callout ("Dr. Karst presenting the program rationale")
- [x] Closing gallery expanded to 5 slots in 3+2 row layout with specific captions
- [ ] `childrens-hospital-lead` photo slot — **requires photo permissions**

### `/outreach/veterans`
- [x] Programs (intro FLL challenge; intro CAD/CNC sign-building; advanced FLL Spike)
- [x] Two 6-week series; 12 weekly 90-min sessions
- [x] Scale (~12 veterans, 130–150+ hours)
- [x] "Only team ever reinvited" callout
- [x] Veterans/families attended Rookie Qualifier note
- [x] Mentors: Sam Doughty (CTRS), Sean Clarke (Program Director), Kali Dancisak, Erinn Brulla
- [x] Next planned session: model rockets
- [x] `veterans-lead` photo slot

### `/outreach/computer-project`
- [x] Process (collection drives → inventory → secure wipe + new OS → distribute; Blair Tech licenses)
- [x] This-season: 56 laptops, 1,000+ students reached
- [x] All-time: 156 laptops
- [x] Recipients list (Libya Team 18422, Jamaica Team 24994, Vietnam Team 25242, Arizona Rez Kids, Milwaukee Robotics Academy, FIRST WI, etc.)
- [x] Partners (Milliman, Reserve Advisors, Soerens Ford, libraries, Tech Lit Africa)
- [x] 5-year growth (2022:9 → 2023:16 → 2024:35–44 → 2025–26:56)
- [x] `computer-project-lead` photo slot

### `/outreach/rookie-qualifier`
- [x] Event scale (26 rookie teams, 80+ volunteers, Feb 2026 — 2nd year)
- [x] 5-week pre-event webinar series (competition flow, alliance selection, judging, portfolio, packing)
- [x] Recruited 3 new FTC judges
- [x] Extra FTAs + on-demand coaching
- [x] State-qualification opportunities
- [x] Team 13201 Hazmat collaboration
- [x] `rookie-qualifier-lead` photo slot
- [x] Revision 2: 2-col hero with HeroImageWell placeholder
- [x] Revision 2: "Why We Run It" approach prose section (3 paragraphs) + inline sticky image well
- [x] Revision 2: People & Partners section — Team 13201 Hazmat + Head Referee/FTA + Volunteer Judges + Event Coordinator portrait slots
- [x] Revision 2: Event Day grid expanded to 6 cards (added Rookie Inspection Lane + Opening Ceremony Orientation)
- [x] Revision 2: Closing photo gallery upgraded to 4-slot PhotoGallery (3-col at 960px+) — Opening ceremony, Rookie team at inspection, Alliance selection, Volunteers at scoring table

### `/outreach/production-hub`
- [x] 41 CNC/3D-printed parts this season (14+ distributed to teams)
- [x] Teams coached (Pack-a-Punch, Random Engineers, Tundrabots, Hapabots)
- [x] Services (CNC milling, 3D printing, laser cutting, plotter printing)
- [x] Scale: 7 teams impacted / 70+ hours / 26 FTC teams in 2026 ecosystem
- [x] `production-hub-lead` photo slot
- [x] Revision 2: "How the Production Hub Works" prose block (intake → make → hand-off, sticky inline photo)
- [x] Revision 2: Expanded service descriptions (deeper CNC, 3D print, laser, plotter copy)
- [x] Revision 2: Teams We Support partner cards — logo/photo slot per team
- [x] Revision 2: Closing gallery expanded to 6 captioned photo slots (2-col → 3-col)

### `/outreach/diy-cnc`
- [x] MPCNC concept and motivation (self-sufficient fabrication for rookies)
- [x] Pilot teams (17347 RedCat Robotics, 12966 C-Gull Robotics, NC team)
- [x] Hapa Bots X-Carve setup
- [x] Goal: teams that can build their own machines
- [x] `diy-cnc-lead` photo slot (hero 2-col image well added; falls back to placeholder)

### `/outreach/maker-faire`
- [x] Venue/scale (Milwaukee Maker Faire at Discovery World — 3rd largest in the US)
- [x] 5th year invited back
- [x] ~6,000+ at venue / 500+ directly engaged
- [x] CNC/MPCNC live demos
- [x] Member-recruiting story (student who later joined mechanical/software)
- [x] Nov 8–9 dates
- [x] `maker-faire-lead` photo slot

### `/outreach/first-advocacy`
- [x] FIRST Advocacy Day at WI capitol (3 years)
- [x] WI FTC Student Advocacy Board / FIRST WI Student Board of Directors seat
- [x] Governors Cup Washington DC (1+ hr with Gov. Evers, spouse, 2 policy staff)
- [x] K-12 DPI funding expansion push (from grades 6–12 → K–12)
- [x] Chips & Sciences Act effort (1 of 5 teams, ~$5M nationally, 6 federal legislators)
- [x] DPI Robotics League Bill passage ($500K annual funding secured; 75+ legislators; 7 students mobilized)
- [x] Key legislators: Rep. Adam Neylon, Sen. Rob Hutton, Gov. Tony Evers, Sen. Tammy Baldwin
- [ ] `first-advocacy-lead` photo slot

### `/outreach/ge-elfuns`
- [x] Partnership with GE Elfuns retiree group
- [x] Presentations overview (connecting robotics to GE work)
- [x] Technical mentorship pipeline potential
- [x] Expanding FIRST awareness to retirees
- [x] `ge-elfuns-lead` photo slot
- [x] Revision 2: 2-col hero with HeroImageWell placeholder
- [x] Revision 2: "Why This Partnership" approach prose section (4 paragraphs + inline sticky image well)
- [x] Revision 2: People & Partners section — GE Elfuns partner card (dashed logo slot) + Elfuns Coordinator role slot
- [x] Revision 2: Closing photo strip replaced with 6-slot PhotoGallery (2/3-col responsive) with specific captions

### `/outreach/fll-mentoring`
- [ ] Judged FLL projects
- [ ] Robot showcase / FTC representation
- [ ] Keynote — sharing the GEarheads' FLL→FTC journey
- [ ] Parent guidance for starting FLL teams
- [ ] `fll-mentoring-lead` photo slot

### `/outreach/community-demos`
- [ ] Brookfield Public Library robot demo
- [ ] Elm Grove Library demo
- [ ] BC High School Club Fair
- [ ] Elmbrook Education Foundation STEM fairs
- [ ] `community-demos-lead` photo slot

### `/outreach/school-support`
- [x] District partnership narrative (superintendent, principal, athletic director)
- [x] FLL & FTC registration and field cost coverage
- [x] Increased school robotics spaces
- [x] Club-fee model context (~$100 BCHS fee)
- [ ] `school-support-lead` photo slot

---

## 8. Seasons

All season pages are stubs — content will be added as materials and time allow.

### `/seasons/2025-26` — DECODE (Current Season)
- [x] Placeholder "Under Construction" page
- [ ] Season intro (DECODE game overview for non-FTC visitors)
- [ ] Robot: Gearboticus / GB3 specs, photos
- [ ] Competition results and match highlights
- [ ] Award achievements (1st CONNECT + 2nd Alliance Captain at Worlds)
- [ ] Photo gallery from season

### `/seasons/2024-25` — Into the Deep
- [x] Placeholder page
- [ ] Season recap
- [ ] Competition results (2nd INSPIRE + 4th Alliance Captain Franklin at Worlds)
- [ ] Photo gallery

### `/seasons/2023-24` — CENTERSTAGE
- [x] Placeholder page
- [ ] Season recap
- [ ] Competition results
- [ ] Photo gallery

### `/seasons/2022-23` — POWERPLAY
- [x] Placeholder page
- [ ] Season recap
- [ ] Competition results (3rd INSPIRE at State; first Worlds qualifier)
- [ ] Photo gallery

### `/seasons/2021-22` — Freight Frenzy
- [x] Placeholder page
- [ ] Season recap
- [ ] Photo gallery

### `/seasons/2020-21` — Ultimate Goal
- [x] Placeholder page
- [ ] Season recap
- [ ] Photo gallery

### `/seasons/2019-20` — Skystone
- [x] Placeholder page
- [ ] Season recap (first FTC season, rookie year)
- [ ] Photo gallery

---

## 9. Standalone Pages

### `/impact` — Impact by the Numbers
- [ ] Metrics dashboard layout (large stat callouts)
- [ ] 1,000+ students impacted
- [ ] 31+ FIRST teams supported
- [ ] 28+ outreach events
- [ ] 500+ hours invested
- [ ] 56 laptops this season / 156 all-time
- [ ] 41 Production Hub parts made / 14+ distributed
- [ ] 30+ mentors engaged
- [ ] 1,750+ avg Instagram views
- [ ] Optional: year-over-year growth charts per program
- [ ] Optional: `impact-montage` photo slot

### `/sponsors`
- [ ] Sponsor/partner list with logos displayed
- [ ] Category breakdown (Sponsors, Technical Partners, Project Partners)
- [ ] Fund usage section (how donations are spent)
- [ ] Budget context (~$12K/yr spend; ~95% donations/grants; ~$100 BCHS club fee)
- [ ] "How to sponsor" CTA section
- [ ] **Missing (collect):** formal sponsor tiers and tier benefits
- [ ] **Missing (collect):** downloadable sponsorship packet PDF
- [ ] **Missing (collect):** tax-status / donation instructions

### `/media`
- [ ] Photo gallery grid (robot, outreach, competition, team) — fill from Google Photos
- [ ] Embedded YouTube videos (robot reveal, match footage, outreach recap)
- [ ] Social links (Instagram @ftcgearheads16460, YouTube @ftcgearheads)
- [ ] Optional: filter by category (robot / outreach / competition / team)
- [ ] **Missing (collect):** curated, captioned, high-res photo library

### `/join`
- [ ] 5-step new-member process (Express Interest → Student Mentor → Pick Subteam → Work on a Project → Grow & Transition)
- [ ] Subteam descriptions (Strategy & Docs, Mechanical, Software, Outreach) with what you'll do/learn
- [ ] Expectations + what you'll gain section
- [ ] Parent expectations (travel, snacks, employer grants, ~$100 club fee, volunteering)
- [ ] Contact CTA / inquiry link
- [ ] Optional: meeting times and location
- [ ] `join-welcome` photo slot

### `/contact`
- [ ] Contact email — **confirm with team (currently TBD)**
- [ ] Social links (Instagram, YouTube)
- [ ] Location (Brookfield, WI)
- [ ] Inquiry categories (join / sponsor / outreach / media)
- [ ] Optional: contact form, map embed

---

## 10. Content & Assets to Collect

### Photography (source from team's Google Photos)
- [ ] Current full-team group photo (for Home / About / Team)
- [ ] Per-member headshots — consistent framing and crop for everyone
- [ ] Sponsor/partner logo files (for `/sponsors`)
- [ ] Robot hero shot — Gearboticus on neutral background
- [ ] Subsystem close-ups ×4 (intake, spindexer, launcher, drivetrain) — CAD/screen ok
- [ ] Robot evolution shots ×3 (Clawboticus, Cubert, Gearboticus — same angle for comparison)
- [ ] Outreach program lead photos ×12 (hospital/VA require explicit photo permissions)
- [ ] Competition / on-stage photos (awards, alliance captain moments)
- [ ] Build/shop photos (CNC running, CAD on screen, testing sessions)
- [ ] Team culture shots (sprint sessions, celebrations)

### Video
- [ ] YouTube embed links: robot reveal, match footage, outreach recap clips

### Written content
- [ ] Member bios (name, grade, subteam, role, 1–2 sentences)
- [ ] Coach/mentor bios and exact subteam roles
- [ ] Confirmed contact email address
- [ ] DHF public phrasing decision ("Design History File" vs "Define, Hypothesize, Fabricate")
- [ ] DECODE game plain-language explainer (for non-FTC visitors)

### Resolve data conflicts (see Appendix B of architecture blueprint)
- [ ] Computers this season: 54 vs **56**
- [ ] Computers all-time: 150 vs **156**
- [ ] New members: "9 new members" vs 6 new + 2 student mentors
- [ ] Worlds appearance years (portfolio says "2022 & 2024" but posters show 2024 & 2025)
- [ ] Maker Faire: 4th vs **5th** year
- [ ] Children's Hospital cumulative sessions: 14 vs **21**
- [ ] Advocacy-day streak: 2 vs **3** years

### Sponsor/legal
- [ ] Confirm which companies are sponsors vs. technical mentors vs. project partners
- [ ] Get permission to publish hospital/VA photography
- [ ] Get quotes/testimonials from outreach partners (confirm permission to publish)

---

## 11. Pre-Deploy

- [x] Replace `nspire-site` package name in `package.json`
- [x] Update `<title>` tag and favicon
- [ ] Add `<meta>` description and `og:image` per page
- [ ] Verify all routes return correct content in production (no client-side routing 404s on refresh)
- [ ] Test full responsive layout on mobile, tablet, and desktop
- [ ] Verify `public/assets/sponsor-logos` symlink resolves in production build
- [ ] Check all 13 sponsor logo paths load on deployed site
- [ ] Test Header dropdown nav on touch devices
- [ ] Audit keyboard navigation and focus management across the site
- [ ] Check color contrast (WCAG AA) for key text/background combinations
- [ ] Run Lighthouse performance audit
- [ ] Confirm deployment target (keep existing `ftcgearheads.netlify.app` or add new domain)
- [ ] Update `.gitignore` for any new artifacts added during build
- [x] Remove or update any remaining TI-Nspire references in components (`ContactSection` placeholder data, component-map.md, content-overview.md)

---

*Last updated: 2026-06-28*
