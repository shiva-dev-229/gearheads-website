import { useState, type ComponentType } from 'react'
import {
  MdLightbulb,
  MdLaunch,
  MdAir,
  MdMemory,
  MdSports,
  MdCardGiftcard,
  MdCheckCircle,
  MdLocalHospital,
  MdPeople,
  MdVolunteerActivism,
  MdImage,
} from 'react-icons/md'
import data from '../../data/childrens-hospital.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/childrens-hospital/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon + color maps ────────────────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  lightbulb:    MdLightbulb,
  launch:       MdLaunch,
  air:          MdAir,
  memory:       MdMemory,
  sports:       MdSports,
  cardGiftcard: MdCardGiftcard,
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

// ─── Constants ────────────────────────────────────────────────────────────────

const ACTIVITIES = data.activities
const STATS_SEASON = data.statsThisSeason
const STATS_ALLTIME = data.statsAllTime
const DELIVERY = data.delivery
const PEOPLE = data.people
const PHOTOS = data.photos

// ─── Resolve hero image ───────────────────────────────────────────────────────

const heroImageKeys = Object.keys(RAW_IMAGES)
const firstHeroImage =
  heroImageKeys.length > 0 ? RAW_IMAGES[heroImageKeys[0]] : null

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChildrensHospitalPage() {
  const [activeActivity, setActiveActivity] = useState(0)

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

            <div aria-label="Program hero image">
              {firstHeroImage ? (
                <img src={firstHeroImage} alt="Children's Hospital program" />
              ) : (
                <div>
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
              <MdLocalHospital size={20} />
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
          <h2>Impact, measured</h2>
          <p>
            Four seasons of sustained programming — every number is real, every session was run inside Children's Wisconsin.
          </p>

          <p>This Season</p>
          <div>
            {STATS_SEASON.map((s) => {
              const parsed = parseStatValue(s.value)
              return (
                <div key={s.label}>
                  {parsed ? (
                    <span>
                      <MdVolunteerActivism size={14} /> {parsed.count}{parsed.suffix}
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

          <p>All Time</p>
          <div>
            {STATS_ALLTIME.map((s) => {
              const parsed = parseStatValue(s.value)
              return (
                <div key={s.label}>
                  {parsed ? (
                    <span>
                      <MdPeople size={14} /> {parsed.count}{parsed.suffix}
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

      {/* ── 4. Activities accordion ───────────────────────────────────── */}
      <section>
        <div>
          <p>Activities</p>
          <h2>What we do in every session</h2>
          <p>
            Six hands-on activities, each chosen because it creates a moment of genuine engineering engagement. Click an activity to expand it.
          </p>

          <div>
            {ACTIVITIES.map((act, i) => {
              const Icon = ACTIVITY_ICONS[act.iconKey] ?? MdLightbulb
              const isActive = i === activeActivity
              return (
                <div
                  key={act.id}
                  onClick={() => setActiveActivity(i)}
                  aria-expanded={isActive}
                  aria-label={act.label}
                >
                  <div>
                    <div>
                      <Icon size={20} />
                    </div>
                    <span>0{i + 1}</span>
                    <span>{act.label}</span>
                  </div>

                  <div aria-hidden={!isActive}>
                    {isActive && (
                      <div>
                        <span>Activity 0{i + 1}</span>
                        <h3>{act.label}</h3>
                        <p>{act.tagline}</p>
                        <p>{act.description}</p>
                        <p>Highlights</p>
                        <ul>
                          {act.highlights.map((h, j) => (
                            <li key={j}>
                              <MdCheckCircle size={15} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 5. Hybrid delivery ────────────────────────────────────────── */}
      <section>
        <div>
          <p>{DELIVERY.label}</p>
          <h2>{DELIVERY.heading}</h2>
          <p>{DELIVERY.subtext}</p>

          <div>
            {DELIVERY.modes.map((mode) => (
              <div key={mode.title}>
                <span>{mode.title}</span>
                <p>{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. People & Partners ──────────────────────────────────────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>The clinicians behind the program</h2>
          <p>
            Two Children's Wisconsin clinicians advise on every aspect of the program — from activity design to patient scheduling to clinical safety.
          </p>

          <div>
            {PEOPLE.map((p) => {
              const photoUrl = resolve(p.photo)
              return (
                <div key={p.name}>
                  <div aria-label={`Portrait photo slot for ${p.name}`}>
                    {photoUrl ? (
                      <img src={photoUrl} alt={p.name} />
                    ) : (
                      <>
                        <span>{initials(p.name)}</span>
                        <span>Photo</span>
                      </>
                    )}
                  </div>
                  <div>
                    <span>{p.name}</span>
                    <span>{p.title}</span>
                    <p>{p.note}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Sessions</p>
          <div>
            <div>
              {PHOTOS.slice(0, 3).map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <div key={i}>
                    <img src={url} alt={p.caption} />
                  </div>
                ) : (
                  <div key={i} aria-label={`Photo slot: ${p.caption}`}>
                    <MdImage size={18} aria-hidden="true" />
                    <span>Photo slot</span>
                    <span>{p.caption}</span>
                  </div>
                )
              })}
            </div>
            <div>
              {PHOTOS.slice(3).map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <div key={i}>
                    <img src={url} alt={p.caption} />
                  </div>
                ) : (
                  <div key={i} aria-label={`Photo slot: ${p.caption}`}>
                    <MdImage size={18} aria-hidden="true" />
                    <span>Photo slot</span>
                    <span>{p.caption}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
