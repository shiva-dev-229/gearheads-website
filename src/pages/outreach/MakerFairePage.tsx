import type { ComponentType } from 'react'
import {
  MdPlace,
  MdPrecisionManufacturing,
  MdSmartToy,
  MdGroups,
  MdPersonAdd,
  MdVolunteerActivism,
  MdHandshake,
  MdPeople,
  MdImage,
  MdBusiness,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import data from '../../data/maker-faire.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/maker-faire/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  place:                  MdPlace,
  precisionManufacturing: MdPrecisionManufacturing,
  smartToy:               MdSmartToy,
  groups:                 MdGroups,
  personAdd:              MdPersonAdd,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const HIGHLIGHTS = data.highlights
const STATS      = data.stats
const PHOTOS     = data.photos
const PARTNERS   = data.partners
const APPROACH   = data.approach

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

export default function MakerFairePage() {
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

            <div aria-label="Maker Faire hero photo slot">
              {heroPhotoSrc ? (
                <img src={heroPhotoSrc} alt="GEarheads at the Milwaukee Maker Faire" />
              ) : (
                <div>
                  <MdImage size={36} />
                  <span>Photo slot</span>
                  <span>GEarheads booth at Discovery World</span>
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

            <div aria-label={`Photo slot: ${APPROACH.inlinePhoto.caption}`}>
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

      {/* ── 5. Highlights bento grid ──────────────────────────────────── */}
      <section>
        <div>
          <p>Highlights</p>
          <h2>What We Bring to the Floor</h2>
          <p>
            Five years of Maker Faire have taught us exactly what resonates. Live machines running,
            a real competition robot people can drive, and team members who treat every conversation
            as a genuine technical exchange.
          </p>
        </div>

        <div>
          {HIGHLIGHTS.map((item) => {
            const Icon = (ICON_MAP[item.iconKey] ?? MdGroups) as ComponentType<{ size?: number }>
            return (
              <div key={item.id} aria-label={item.title}>
                <div aria-hidden="true">
                  <Icon size={24} />
                </div>
                <div>
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div />

      {/* ── 6. Recruiting callout ─────────────────────────────────────── */}
      <section>
        <div>
          <p>Member Story</p>
          <div>
            <span>{data.recruitingCallout.label}</span>
            <h3>{data.recruitingCallout.title}</h3>
            <p>{data.recruitingCallout.text}</p>
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Venue & Partners ───────────────────────────────────────── */}
      <section>
        <div>
          <p>Venue & Partners</p>
          <h2>Where We Show Up</h2>
          <p>
            The organizations that give GEarheads a platform in front of thousands of makers,
            engineers, and families every November. Logo slots are ready for assets whenever
            they're available.
          </p>

          <div>
            {PARTNERS.map((p) => (
              <div key={p.id} aria-label={`${p.name}, ${p.type}`}>
                <div aria-label={`Logo placeholder for ${p.name}`}>
                  <span>
                    <MdBusiness size={26} />
                  </span>
                </div>
                <div>
                  <span>{p.name}</span>
                  <span>{p.type}</span>
                  <span>{p.note}</span>
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
          <p>From The Event</p>
          <div aria-label="Maker Faire photo gallery">
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
