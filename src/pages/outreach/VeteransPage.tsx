import type { ComponentType } from 'react'
import {
  MdExtension,
  MdPrecisionManufacturing,
  MdRocketLaunch,
  MdVolunteerActivism,
  MdImage,
  MdPeople,
  MdHandshake,
} from 'react-icons/md'
import data from '../../data/veterans.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/veterans/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  extension:              MdExtension,
  precisionManufacturing: MdPrecisionManufacturing,
  rocketLaunch:           MdRocketLaunch,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const ACTIVITIES = data.activities
const STATS = data.stats
const PEOPLE = data.people
const HOW = data.howItRuns
const PHOTOS = data.photos
const APPROACH = data.approach

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

export default function VeteransPage() {
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

            <div>
              {heroPhotoSrc ? (
                <img src={heroPhotoSrc} alt="GEarheads veterans outreach session" />
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
                      <MdHandshake size={14} /> {parsed.count}{parsed.suffix}
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

            <div aria-label="Photo slot: inline approach image">
              {approachPhotoSrc ? (
                <img
                  src={approachPhotoSrc}
                  alt={APPROACH.inlinePhoto.caption}
                />
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

      {/* ── 5. Activities: FLL / CNC / Model Rockets ──────────────────── */}
      <section>
        <div>
          <p>Programs</p>
          <h2>What We Run</h2>

          <div>
            {ACTIVITIES.map((a) => {
              const Icon = ACTIVITY_ICONS[a.iconKey] ?? MdExtension
              const photoUrl = resolve(a.photo.src)
              return (
                <div key={a.id}>
                  <div>
                    <div>
                      <div aria-hidden="true">
                        <Icon size={20} />
                      </div>
                      <h3>{a.heading}</h3>
                    </div>
                    <p>{a.text}</p>
                  </div>

                  {photoUrl ? (
                    <div>
                      <img src={photoUrl} alt={a.heading} />
                    </div>
                  ) : (
                    <div aria-label={`Photo slot: ${a.photo.caption}`}>
                      <MdImage size={18} aria-hidden="true" />
                      <span>Photo slot</span>
                      <span>{a.photo.caption}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. How it runs ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>Structure</p>
          <h2>How It Runs</h2>
          <p>
            Consistent, predictable sessions — so veterans can build skills week over week without
            having to start over.
          </p>

          <div>
            {HOW.map((h) => (
              <div key={h.label}>
                <span>{h.value}</span>
                <span>{h.label}</span>
                <p>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. People & Partners ──────────────────────────────────────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>The People Behind It</h2>
          <p>
            VA staff and GEarheads mentors who make every session run. Portrait slots are ready
            for headshots whenever they're available.
          </p>

          <div>
            {PEOPLE.map((p) => (
              <div key={p.name} aria-label={`${p.name}, ${p.role}`}>
                <div aria-label={`Portrait placeholder for ${p.name}`}>
                  <span>
                    <MdPeople size={22} />
                  </span>
                </div>
                <div>
                  <span>{p.name}</span>
                  <span>{p.role}</span>
                  {p.note && <span>{p.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 8. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Sessions</p>
          <div aria-label="Veterans outreach photo gallery">
            {PHOTOS.map((p, i) => {
              const url = resolve(p.src)
              return url ? (
                <div key={i}>
                  <img src={url} alt={p.caption} />
                </div>
              ) : (
                <div key={i} aria-label={`Photo placeholder: ${p.caption}`}>
                  <MdPeople size={18} />
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
