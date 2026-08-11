import type { ComponentType } from 'react'
import {
  MdMenuBook,
  MdLocalLibrary,
  MdSchool,
  MdScience,
  MdVolunteerActivism,
  MdImage,
  MdPeople,
  MdHandshake,
  MdPlace,
} from 'react-icons/md'
import data from '../../data/community-demos.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/**/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

function resolve(file: string | null, folder?: string): string | null {
  if (!file) return null
  const needle = folder ? `/${folder}/${file}` : `/${file}`
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith(needle))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const VENUE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  menuBook:     MdMenuBook,
  localLibrary: MdLocalLibrary,
  school:       MdSchool,
  science:      MdScience,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Static data ──────────────────────────────────────────────────────────────

type PhotoEntry = { src: string | null; caption: string; folder?: string }

const VENUES   = data.venues
const STATS    = data.stats
const PHOTOS   = data.photos as PhotoEntry[]
const PARTNERS = data.partners
const APPROACH = data.approach

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src, p.folder)
    if (url) return url
  }
  return null
})()

const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

// ─── Component ────────────────────────────────────────────────────────────────

export default function CommunityDemosPage() {
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

            <div aria-label="Community demo hero image">
              {heroPhotoSrc ? (
                <img src={heroPhotoSrc} alt="GEarheads at a community demo event" />
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

            <div aria-label="Photo slot: community demo in action">
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

      {/* ── 5. Venues bento grid ──────────────────────────────────────── */}
      <section>
        <div>
          <p>Where We Show Up</p>
          <h2>Demo Venues</h2>
          <p>
            Each venue reaches a different slice of the Elmbrook community — from families
            browsing library programs to high schoolers choosing their extracurriculars.
          </p>
        </div>

        <div>
          {VENUES.map((venue) => {
            const Icon = VENUE_ICONS[venue.iconKey] ?? MdSchool
            return (
              <div key={venue.id} aria-label={venue.title}>
                <div aria-hidden="true">
                  <Icon size={24} />
                </div>
                <div>
                  <span>{venue.tag}</span>
                  <h3>{venue.title}</h3>
                  <p>{venue.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div />

      {/* ── 6. Venues & Partners ──────────────────────────────────────── */}
      <section>
        <div>
          <p>Venues & Partners</p>
          <h2>Who Makes It Possible</h2>
          <p>
            The organizations that open their doors and give us the room to run a demo. Logo
            slots are ready — add an image whenever it's available.
          </p>

          <div>
            {PARTNERS.map((p) => (
              <div key={p.id} aria-label={`${p.name}, ${p.type}`}>
                <div aria-label={`Logo placeholder for ${p.name}`}>
                  <span>
                    <MdPlace size={22} />
                  </span>
                </div>
                <div>
                  <span>{p.name}</span>
                  <span>{p.type}</span>
                  {p.note && <span>{p.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Events</p>
          <div aria-label="Community demos photo gallery">
            {PHOTOS.map((p, i) => {
              const url = resolve(p.src, p.folder)
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
