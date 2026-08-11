import { useState, type ComponentType } from 'react'
import {
  MdSchedule,
  MdGroups,
  MdGavel,
  MdMenuBook,
  MdInventory2,
  MdCheckCircle,
  MdVolunteerActivism,
  MdImage,
  MdPeople,
} from 'react-icons/md'
import data from '../../data/rookie-qualifier.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/rookie-qualifier/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const WEBINAR_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  schedule:  MdSchedule,
  groups:    MdGroups,
  gavel:     MdGavel,
  menuBook:  MdMenuBook,
  inventory: MdInventory2,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Data bindings ────────────────────────────────────────────────────────────

const WEBINARS  = data.webinars
const STATS     = data.stats
const EVENT_DAY = data.eventDay
const PHOTOS    = data.photos
const APPROACH  = data.approach

const heroPhotoSrc     = resolve(data.hero.heroPhoto.src)
const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

// ─── Component ────────────────────────────────────────────────────────────────

export default function RookiePage() {
  const [activeWebinar, setActiveWebinar] = useState(0)
  const webinar = WEBINARS[activeWebinar]

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

            <div aria-label={data.hero.heroPhoto.caption}>
              {heroPhotoSrc ? (
                <img src={heroPhotoSrc} alt={data.hero.heroPhoto.caption} />
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
              <MdVolunteerActivism size={20} />
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

      {/* ── 4. Our Approach ───────────────────────────────────────────── */}
      <section>
        <div>
          <p>{APPROACH.label}</p>
          <h2>{APPROACH.heading}</h2>

          <div>
            <div>
              {APPROACH.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div aria-label={`Photo slot: ${APPROACH.inlinePhoto.caption}`}>
              {approachPhotoSrc ? (
                <img src={approachPhotoSrc} alt={APPROACH.inlinePhoto.caption} />
              ) : (
                <div>
                  <MdPeople size={28} />
                  <span>Photo slot</span>
                  <span>{APPROACH.inlinePhoto.caption}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 5. 5-Week Webinar Series stepper ─────────────────────────── */}
      <section>
        <div>
          <p>Pre-Event Preparation</p>
          <h2>5-Week Webinar Series</h2>
          <p>
            Five weeks before the event, GEarheads run a dedicated webinar series for all
            registered rookie teams. Each session covers a different facet of competition — so
            teams arrive knowing what to expect, not learning it the hard way.
          </p>

          <div>
            <div role="tablist" aria-label="Webinar series sessions">
              {WEBINARS.map((w, i) => {
                const Icon = WEBINAR_ICONS[w.iconKey] ?? MdSchedule
                const isActive    = i === activeWebinar
                const isLast      = i === WEBINARS.length - 1

                return (
                  <div key={w.id}>
                    <button
                      role="tab"
                      onClick={() => setActiveWebinar(i)}
                      aria-selected={isActive}
                      aria-label={`Week ${i + 1}: ${w.label}`}
                    >
                      <div>
                        <Icon size={22} />
                      </div>
                      <span>
                        {w.label}
                      </span>
                    </button>
                    {!isLast && <div />}
                  </div>
                )
              })}
            </div>

            <div
              key={activeWebinar}
              role="tabpanel"
              aria-label={`Week ${webinar.step}: ${webinar.label}`}
            >
              <p>Week {webinar.step} of {WEBINARS.length}</p>
              <h3>{webinar.label}</h3>
              <p>{webinar.summary}</p>
              <p>{webinar.detail}</p>
              <span>Session Highlights</span>
              <div>
                {webinar.highlights.map((h, i) => (
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

      {/* ── 6. On Event Day ───────────────────────────────────────────── */}
      <section>
        <div>
          <p>{EVENT_DAY.label}</p>
          <h2>{EVENT_DAY.heading}</h2>
          <p>{EVENT_DAY.subtext}</p>

          <div>
            {EVENT_DAY.cards.map((c) => (
              <div key={c.label}>
                <span>{c.label}</span>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Event</p>
          <div aria-label="Rookie Qualifier photo gallery">
            {PHOTOS.map((p, i) => {
              const url = resolve(p.src)
              return url ? (
                <div key={i}>
                  <img src={url} alt={p.caption} />
                </div>
              ) : (
                <div key={i} aria-label={`Photo placeholder: ${p.caption}`}>
                  <MdImage size={18} />
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
