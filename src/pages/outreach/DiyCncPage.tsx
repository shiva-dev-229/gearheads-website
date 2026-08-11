import { useState, type ComponentType } from 'react'
import {
  MdBuild,
  MdPrecisionManufacturing,
  MdSchool,
  MdRouter,
  MdCheckCircleOutline,
  MdImage,
  MdPeople,
  MdHandshake,
} from 'react-icons/md'
import data from '../../data/diy-cnc.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/hapa bots/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const TEAM_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  build:     MdBuild,
  precision: MdPrecisionManufacturing,
  school:    MdSchool,
  router:    MdRouter,
}

// ─── Component ────────────────────────────────────────────────────────────────

const TEAMS    = data.teams
const PHOTOS   = data.photos
const PARTNERS = data.partners
const GALLERY  = data.closingGallery
const CONCEPT  = data.concept
const APPROACH = data.whyItWorks

// Resolve hero image from hapa-bots folder (only real folder available)
const heroPhotoSrc = (() => {
  const h = data.hero.heroImage
  return h ? resolve(h.src) : null
})()

export default function DiyCncPage() {
  const [activeTeam, setActiveTeam] = useState(0)

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

            <div aria-label="Hero photo slot">
              {heroPhotoSrc ? (
                <img
                  src={heroPhotoSrc}
                  alt={data.hero.heroImage.caption}
                />
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
              <MdBuild size={20} />
            </div>
            <div>
              <span>{data.impact.label}</span>
              <p>{data.impact.text}</p>
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 3. MPCNC concept ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>{CONCEPT.label}</p>
          <h2>{CONCEPT.heading}</h2>
          <p>{CONCEPT.subtext}</p>

          <div>
            <div>
              {CONCEPT.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div aria-label="Photo slot: MPCNC mid-build">
              <div>
                <MdPeople size={28} />
                <span>Photo slot</span>
                <span>{CONCEPT.inlinePhoto.caption}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 4. Why teach teams to build their own machines ────────────── */}
      <section>
        <div>
          <p>{APPROACH.label}</p>
          <h2>{APPROACH.heading}</h2>
          {APPROACH.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div />

      {/* ── 5. Pilot teams accordion ──────────────────────────────────── */}
      <section>
        <div>
          <p>Pilot Teams</p>
          <h2>Who we built with</h2>
          <p>
            Four teams across the 2025–26 season. Click a panel to expand the full story.
          </p>

          <div role="tablist" aria-label="Pilot teams">
            {TEAMS.map((t, i) => {
              const Icon = TEAM_ICONS[t.iconKey] ?? MdBuild
              const isActive = i === activeTeam
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveTeam(i)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${t.name}${t.number !== '—' ? ` — Team ${t.number}` : ''}`}
                >
                  <div>
                    <div>
                      <Icon size={20} />
                    </div>
                    <span>0{i + 1}</span>
                    <span>{t.name}</span>
                  </div>

                  <div
                    role="tabpanel"
                    aria-label={t.name}
                    aria-hidden={!isActive}
                  >
                    {isActive && (
                      <>
                        <span>
                          Pilot team {String(i + 1).padStart(2, '0')}
                        </span>
                        {t.number !== '—' && (
                          <span>FTC #{t.number}</span>
                        )}
                        <h3>{t.name}</h3>
                        <span>{t.location}</span>
                        <p>{t.tagline}</p>
                        <div>
                          {t.description.split('\n\n').map((para, j) => (
                            <p key={j} style={{ margin: 0 }}>{para}</p>
                          ))}
                        </div>
                        <p>Highlights</p>
                        <ul>
                          {t.highlights.map((h, j) => (
                            <li key={j}>
                              <MdCheckCircleOutline size={15} />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. Pilot Teams & Partners ─────────────────────────────────── */}
      <section>
        <div>
          <p>Pilot Teams &amp; Partners</p>
          <h2>The teams and organizations in the pilot</h2>
          <p>
            Logo slots are ready — drop in team and partner logos whenever they are available.
          </p>

          <div>
            {PARTNERS.map((p) => (
              <div key={p.id} aria-label={p.name}>
                <div aria-label={`Logo placeholder for ${p.name}`}>
                  <span>
                    <MdHandshake size={24} />
                  </span>
                </div>
                <div>
                  <span>{p.name}</span>
                  {p.note && <span>{p.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. From the field (original photos) ───────────────────────── */}
      <section>
        <div>
          <p>From The Field</p>
          <h2>Sessions in progress</h2>
          <p>
            Photos from the pilot sessions — real builds, real machines, real teams.
          </p>
          <div aria-label="Program photos">
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

      <div />

      {/* ── 8. Closing gallery ────────────────────────────────────────── */}
      <section>
        <div>
          <p>Gallery</p>
          <h2>Build to cut — the full arc</h2>
          <p>
            Six photo slots covering the complete journey: frame assembly through first
            production cuts on a team-built machine.
          </p>
          <div aria-label="Closing gallery — DIY-CNC program arc">
            {GALLERY.map((p, i) => {
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
