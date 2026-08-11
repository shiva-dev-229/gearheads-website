import { useState, type ComponentType } from 'react'
import {
  MdBuild, MdVolunteerActivism, MdEmojiEvents,
  MdSchool, MdEco, MdLightbulb, MdFavorite, MdPeople,
  MdHandshake, MdStar,
  MdGroups, MdHistory, MdFlag, MdPerson,
  MdForum, MdCloud, MdArchitecture, MdCode, MdApps,
  MdRocketLaunch, MdPublic, MdMilitaryTech, MdSend,
  MdCameraAlt, MdCheckCircle,
} from 'react-icons/md'
import SeasonTimeline from '../components/SeasonTimeline'
import TeamModal from '../components/TeamModal'
import type { TeamMember } from '../components/TeamModal'
import FolderModal, { type FolderModalItem } from '../components/FolderModal'
import teamData from '../data/team.json'
import aboutData from '../data/about.json'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASONS = teamData.seasons as Array<{ id: string; label: string }>
const MEMBERS_BY_SEASON = teamData.membersBySeason as Record<string, TeamMember[]>

const TOOL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  forum:        MdForum,
  cloud:        MdCloud,
  architecture: MdArchitecture,
  code:         MdCode,
  apps:         MdApps,
}

const SUBTEAM_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  flag:              MdFlag,
  build:             MdBuild,
  code:              MdCode,
  volunteerActivism: MdVolunteerActivism,
}

const PILLAR_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  build:             MdEmojiEvents,
  volunteerActivism: MdVolunteerActivism,
  school:            MdSchool,
  eco:               MdEco,
}

const VALUE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  lightbulb: MdLightbulb,
  favorite:  MdFavorite,
  people:    MdPeople,
  handshake: MdHandshake,
  star:      MdStar,
}

const TEAM_EMAIL = 'gearheads16460@gmail.com'

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeSeason, setActiveSeason] = useState('2025-26')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [subteamsOpen, setSubteamsOpen] = useState(false)
  const [joinForm, setJoinForm] = useState({
    name: '', email: '', grade: '', school: '', subteam: '', message: '',
  })

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Joining GEarheads — ${joinForm.name}`)
    const body = encodeURIComponent(
      `Hi GEarheads Team,\n\nI'm interested in joining the team!\n\n` +
      `Name: ${joinForm.name}\n` +
      `Email: ${joinForm.email}\n` +
      `Grade: ${joinForm.grade}\n` +
      `School: ${joinForm.school}\n` +
      `Interested Subteam: ${joinForm.subteam}\n\n` +
      `About me:\n${joinForm.message}\n\n` +
      `—\nSent from gearheads.org`
    )
    window.open(`mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`, '_self')
  }

  const setJoinField = (field: keyof typeof joinForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setJoinForm(prev => ({ ...prev, [field]: e.target.value }))

  const activeSeasonLabel = SEASONS.find(s => s.id === activeSeason)?.label ?? ''
  const activeMembers = MEMBERS_BY_SEASON[activeSeason] ?? []

  const toolModalItems: FolderModalItem[] = teamData.tools.map(tool => {
    const Icon = TOOL_ICONS[tool.iconKey]
    return { icon: <Icon size={20} />, title: tool.name, description: tool.fullDesc, url: tool.url }
  })

  const subteamModalItems: FolderModalItem[] = teamData.subteams.map(s => {
    const Icon = SUBTEAM_ICONS[s.iconKey]
    return {
      icon: <Icon size={20} />,
      title: s.name,
      description: s.desc,
      detail: { fullDesc: s.fullDesc, projects: s.projects, url: s.url, linkLabel: s.linkLabel },
    }
  })

  return (
    <div>
      {toolsOpen && (
        <FolderModal
          title="Tools We Use"
          items={toolModalItems}
          onClose={() => setToolsOpen(false)}
        />
      )}
      {subteamsOpen && (
        <FolderModal
          title="Our Subteams"
          items={subteamModalItems}
          onClose={() => setSubteamsOpen(false)}
        />
      )}
      {selectedMember && (
        <TeamModal
          member={selectedMember}
          season={activeSeasonLabel}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* ── Hero + Mission (one section) ────────────────────────────── */}
      <section>
        <div>
          <MdCameraAlt size={28} />
          <span>about-hero-bg.jpg — full-team group photo</span>
        </div>

        <p>
          <span>FTC Team #16460 · Brookfield, WI</span>
        </p>
        <h1>About GEarheads</h1>

        <p>
          A student-led FIRST Tech Challenge team from Brookfield, Wisconsin — building
          competitive robots, running transformative outreach programs, and growing the FIRST
          ecosystem since 2017.
        </p>

        <ul>
          <li><MdRocketLaunch size={13} /> Est. 2017</li>
          <li><MdPublic size={13} /> 3× World Championship</li>
          <li><MdMilitaryTech size={13} /> 9 Seasons</li>
          <li><MdGroups size={13} /> Team #16460</li>
        </ul>

        <h2>Mission &amp; Values</h2>

        <blockquote>
          <p>
            We build machines that compete on the world stage, run programs that transform lives,
            and develop students who will lead the next generation of engineers and innovators.
          </p>
          <p>
            Founded in Brookfield, Wisconsin, GEarheads is a student-led FTC robotics team driven by
            three beliefs: that competition sharpens excellence, that outreach multiplies impact, and
            that every student — regardless of background — deserves access to real engineering.
          </p>
        </blockquote>

        <ul>
          {aboutData.pillars.map((p) => {
            const Icon = PILLAR_ICONS[p.iconKey]
            return (
              <li key={p.title}>
                <Icon size={20} />
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span>{p.stat}</span>
                <span>{p.statLabel}</span>
              </li>
            )
          })}
        </ul>

        <div>
          <div>
            <h3>Core Values</h3>
            <ul>
              {aboutData.values.map((v, i) => {
                const Icon = VALUE_ICONS[v.iconKey]
                return (
                  <li key={v.label}>
                    <Icon size={18} />
                    <span>{v.label}</span>
                    <span>0{i + 1}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h3>Operating Principles</h3>
            <ul>
              {aboutData.principles.map((p) => (
                <li key={p}>
                  <MdCheckCircle size={16} />
                  <span>
                    <strong>{p.split('—')[0].trim()}</strong>
                    {p.includes('—') ? ` — ${p.split('—').slice(1).join('—').trim()}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Team Culture ──────────────────────────────────────────── */}
      <section>
        <p><MdGroups size={13} /> How We Work</p>

        <h2>Team Culture</h2>

        <p>
          Every design decision, outreach initiative, budget call, and strategic direction is
          made by students. Mentors advise; students decide.
        </p>

        <div>
          <div>
            <h4>Student-led</h4>
            <p>Every design, budget, and outreach decision belongs to the team. Mentors bring expertise and a sounding board — students bring direction.</p>

            <h4>Sprint culture</h4>
            <p>An eight-month season built on two-week cycles. Each sprint ends with a progress demo, a short retro, and updated goals for the next cycle.</p>

            <h4>Open to everyone</h4>
            <p>Grades 6–12, zero experience required. New members join as Student Mentors and grow into contributors and leads across seasons.</p>

            <h4>Multi-season pipeline</h4>
            <p>Skills compound year over year. Newcomer → contributor → lead — the same path every current senior has walked.</p>
          </div>

          <div>
            <div>
              <MdCameraAlt size={28} />
              <span>culture-photo</span>
              <span>Team at work or play — build space, competition floor, or team event.</span>
            </div>

            <div>
              <button type="button" onClick={() => setSubteamsOpen(true)}>Subteams</button>
              <span>4 subteams · click to open</span>

              <button type="button" onClick={() => setToolsOpen(true)}>Tools We Use</button>
              <span>5 tools · click to open</span>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section id="team">
        <p><MdGroups size={13} /> The People</p>

        <h2>Meet the Team</h2>

        <p>
          Students from grades 6–12 across the Brookfield School District and surrounding
          communities — organized into four subteams, led entirely by students.
        </p>

        <div>
          <div>
            <MdCameraAlt size={40} />
            <span>team-group</span>
            <span>
              Full-team posed group photo. Consistent lighting, neutral background preferred.
              Landscape recommended.
            </span>
          </div>

          <div>
            {[
              { icon: MdGroups, value: '6–12', meta: 'Grade range' },
              { icon: MdRocketLaunch, value: '9', meta: 'Competitive seasons' },
              { icon: MdPublic, value: '3×', meta: 'World championship' },
              { icon: MdMilitaryTech, value: '5', meta: 'Consecutive award seasons' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.meta}>
                  <Icon size={20} />
                  <span>{s.value}</span>
                  <span>{s.meta}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div role="tablist">
          {SEASONS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={activeSeason === s.id}
              onClick={() => setActiveSeason(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div>
          {activeMembers.map((member) => (
            <button
              key={member.id}
              type="button"
              onClick={() => setSelectedMember(member)}
              aria-label={`View ${member.name} profile`}
            >
              {member.photo
                ? <img src={member.photo} alt={member.name} />
                : <MdPerson size={24} />
              }
              <h4>{member.name}</h4>
              <span>{member.type ?? 'STUDENT'}</span>
              <span>{member.subteam}</span>
            </button>
          ))}
        </div>
      </section>

      <hr />

      {/* ── Season History Timeline ───────────────────────────────────── */}
      <section id="history">
        <p><MdHistory size={13} /> Our Journey</p>

        <h2>Nine Seasons of GEarheads</h2>

        <p>
          From a{' '}
          <span>5th-grade FLL team in 2017</span>
          {' '}to{' '}
          <span>back-to-back Worlds appearances</span>
          {' '}and a{' '}
          <span>1st Place CONNECT Award</span>
          {' '}— nine seasons, every one below.
        </p>

        <SeasonTimeline />
      </section>

      <hr />

      {/* ── Interested in joining? ─────────────────────────────────────────── */}
      <section>
        <div>
          <p>
            <MdHandshake size={13} />
            Get Involved
          </p>

          <h2>Interested<br />in joining?</h2>
          <p>
            Applications are open year-round. Fill this out and we'll reach out — takes two minutes.
          </p>

          <ul>
            <li>
              <MdBuild size={16} />
              <strong>Hands-on engineering</strong>
              <span>Design and build real competition robots from scratch.</span>
            </li>
            <li>
              <MdStar size={16} />
              <strong>Real competition experience</strong>
              <span>Qualify and compete at regional and world-level events.</span>
            </li>
            <li>
              <MdFavorite size={16} />
              <strong>A team that cares</strong>
              <span>Student-led, mentor-supported, genuinely fun.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3>Apply to join</h3>
          <p>
            We'll reach out to schedule a visit. Applications are open all year.
          </p>

          <form onSubmit={handleJoinSubmit}>
            <div>
              <div>
                <label htmlFor="join-name">Full Name</label>
                <input
                  id="join-name"
                  type="text"
                  placeholder="Your full name"
                  value={joinForm.name}
                  onChange={setJoinField('name')}
                  required
                />
              </div>
              <div>
                <label htmlFor="join-email">Email</label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="you@example.com"
                  value={joinForm.email}
                  onChange={setJoinField('email')}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="join-school">School</label>
              <select
                id="join-school"
                value={joinForm.school}
                onChange={setJoinField('school')}
                required
              >
                <option value="" disabled>Select your school...</option>
                <option>Wisconsin Hills Middle School</option>
                <option>Brookfield Central High School</option>
                <option>Brookfield East High School</option>
                <option>Pilgrim Park Middle School</option>
                <option>Other (Homeschool, moving, etc.)</option>
              </select>
            </div>

            <div>
              <div>
                <label htmlFor="join-subteam">Subteam Interest</label>
                <select
                  id="join-subteam"
                  value={joinForm.subteam}
                  onChange={setJoinField('subteam')}
                  required
                >
                  <option value="" disabled>Which subteam?</option>
                  <option>Mechanical</option>
                  <option>Software</option>
                  <option>Outreach</option>
                  <option>Strategy & Documentation</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="join-grade">Grade</label>
                <select
                  id="join-grade"
                  value={joinForm.grade}
                  onChange={setJoinField('grade')}
                  required
                >
                  <option value="" disabled>Your grade...</option>
                  <option value="6th Grade">6th Grade</option>
                  <option value="7th Grade">7th Grade</option>
                  <option value="8th Grade">8th Grade</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="join-message">About you</label>
              <textarea
                id="join-message"
                placeholder="What draws you to robotics? Any skills or experience? What are you hoping to learn?"
                value={joinForm.message}
                onChange={setJoinField('message')}
                required
              />
            </div>

            <div>
              <span>Opens your email app</span>
              <button type="submit">
                <MdSend size={13} />
                Send Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
