import { useState, type ComponentType } from 'react'
import {
  MdLandscape,
  MdGroups,
  MdFlag,
  MdSchool,
  MdMemory,
  MdVerified,
  MdCheckCircle,
  MdHowToVote,
  MdImage,
  MdPeople,
  MdAccountBalance,
  MdPersonOutline,
} from 'react-icons/md'
import data from '../../data/first-advocacy.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/first-advocacy/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const MILESTONE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  landmark:  MdLandscape,
  groups:    MdGroups,
  flag:      MdFlag,
  school:    MdSchool,
  memory:    MdMemory,
  verified:  MdVerified,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const MILESTONES = data.milestones
const STATS = data.stats
const LEGISLATORS = data.legislators
const PHOTOS = data.photos
const PEOPLE = data.people
const CLOSING_GALLERY = data.closingGallery

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

const narrativeImageSrc = resolve(data.whyWeAdvocate.inlineImage)

export default function FirstAdvocacyPage() {
  const [activeMilestone, setActiveMilestone] = useState(0)
  const milestone = MILESTONES[activeMilestone]

  return (
    <div>

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>
              <div>
                <span />
                {data.hero.chip}
              </div>
              <div>
                {data.hero.title}
              </div>
              <p>{data.hero.subtitle}</p>
            </div>

            <div aria-label="Hero photo — GEarheads student advocates at the Wisconsin State Capitol">
              {heroPhotoSrc ? (
                <img src={heroPhotoSrc} alt="GEarheads student advocates at the Wisconsin State Capitol" />
              ) : (
                <div aria-hidden="true">
                  <MdImage size={36} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Impact callout ─────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div aria-hidden="true">
              <MdAccountBalance size={20} />
            </div>
            <div>
              <span>{data.impact.label}</span>
              <p>{data.impact.text}</p>
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 3. Stats ──────────────────────────────────────────────────── */}
      <section>
        <div>
          <p>By The Numbers</p>
          <div>
            {STATS.map((s) => {
              const parsed = parseStatValue(s.value)
              return (
                <div key={s.label}>
                  {parsed ? (
                    <span>
                      <MdHowToVote size={14} /> {parsed.count}{parsed.suffix}
                    </span>
                  ) : (
                    <span>{s.value}</span>
                  )}
                  <span>{s.label}</span>
                  <span>{s.hint}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 4. Why We Advocate — narrative prose block ────────────────── */}
      <section>
        <div>
          <p>Our Approach</p>
          <h2>{data.whyWeAdvocate.heading}</h2>
          <div>
            <div>
              {data.whyWeAdvocate.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div aria-label="Inline photo — advocacy preparation">
              {narrativeImageSrc ? (
                <img
                  src={narrativeImageSrc}
                  alt="GEarheads students preparing advocacy testimony"
                />
              ) : (
                <>
                  <div aria-hidden="true">
                    <MdImage size={32} />
                  </div>
                  <span>
                    {data.whyWeAdvocate.inlineImageCaption}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 5. Advocacy milestones stepper ────────────────────────────── */}
      <section>
        <div>
          <p>Milestones</p>
          <h2>The Advocacy Timeline</h2>
          <p>
            Three years of deliberate, sustained policy work — from the first Advocacy Day at the
            Wisconsin Capitol to a signed bill directing $500K in annual state funding to K–12
            robotics programs.
          </p>

          <div>
            <div aria-label="Advocacy milestone navigation">
              {MILESTONES.map((m, i) => {
                const Icon = MILESTONE_ICONS[m.iconKey] ?? MdAccountBalance
                const isActive = i === activeMilestone
                const isLast = i === MILESTONES.length - 1

                return (
                  <div key={m.id}>
                    <button
                      onClick={() => setActiveMilestone(i)}
                      aria-pressed={isActive}
                      aria-label={`Milestone ${i + 1}: ${m.label.replace('\n', ' ')}`}
                    >
                      <div>
                        <Icon size={22} />
                      </div>
                      <span>
                        {m.label}
                      </span>
                    </button>
                    {!isLast && <div />}
                  </div>
                )
              })}
            </div>

            <div
              key={activeMilestone}
              role="tabpanel"
              aria-label={milestone.label.replace('\n', ' ')}
            >
              <p>
                Milestone {milestone.step} of {MILESTONES.length}
              </p>
              <h3>{milestone.label.replace('\n', ' ')}</h3>
              <p>{milestone.summary}</p>
              <p>{milestone.detail}</p>
              <span>Key Facts</span>
              <div>
                {milestone.highlights.map((h, i) => (
                  <div key={i}>
                    <span>
                      <MdCheckCircle size={16} />
                    </span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. Photo strip (from visits) ──────────────────────────────── */}
      <section>
        <div>
          <p>From The Visits</p>
          <div>
            {PHOTOS.map((p, i) => {
              const url = resolve(p.src)
              return url ? (
                <div key={i}>
                  <img src={url} alt={p.caption} />
                </div>
              ) : (
                <div key={i} aria-label={`Photo slot: ${p.caption}`}>
                  <MdPeople size={18} />
                  <span>Photo slot</span>
                  <span>{p.caption}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Officials We've Worked With — portrait person-cards ────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>Officials We've Worked With</h2>
          <p>
            From the Wisconsin State Capitol to the U.S. Senate, these are the elected officials
            GEarheads students met with directly — building relationships that turned advocacy
            visits into legislative outcomes.
          </p>

          <div>
            {PEOPLE.map((person) => {
              const portraitSrc = resolve(person.photo)
              return (
                <div key={person.name} aria-label={`${person.name}, ${person.title}`}>
                  <div aria-label={`Portrait placeholder for ${person.name}`}>
                    {portraitSrc ? (
                      <img src={portraitSrc} alt={`Portrait of ${person.name}`} />
                    ) : (
                      <MdPersonOutline
                        size={32}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div>
                    <span>{person.name}</span>
                    <span>{person.title}</span>
                    <span>{person.note}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 8. Legislators reference grid ─────────────────────────────── */}
      <section>
        <div>
          <p>Legislative Record</p>
          <h2>Legislators We Engaged</h2>
          <p>
            A reference list of the elected officials GEarheads built direct working
            relationships with across three years of state and federal advocacy.
          </p>

          <div>
            {LEGISLATORS.map((l) => (
              <div key={l.name}>
                <span>{initials(l.name)}</span>
                <span>
                  {l.chamber}
                </span>
                <div>
                  <span>{l.name}</span>
                  <span>{l.role}</span>
                  <span>{l.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 9. Closing gallery ────────────────────────────────────────── */}
      <section>
        <div>
          <p>Gallery</p>
          <h2>Three Years in the Rooms Where It Happens</h2>
          <p>
            Photo documentation of GEarheads' advocacy work — from committee rooms at the
            Wisconsin Capitol to the halls of Congress.
          </p>

          <div>
            {CLOSING_GALLERY.map((p, i) => {
              const url = resolve(p.src)
              return url ? (
                <div key={i}>
                  <img src={url} alt={p.caption} />
                </div>
              ) : (
                <div key={i} aria-label={`Photo slot: ${p.caption}`}>
                  <MdImage size={20} aria-hidden="true" />
                  <span>Photo slot</span>
                  <span>{p.caption}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
