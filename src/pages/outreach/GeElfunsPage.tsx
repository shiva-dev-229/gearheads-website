import { useState, type ComponentType } from 'react'
import {
  MdPresentToAll,
  MdAccountTree,
  MdTravelExplore,
  MdLink,
  MdCheckCircle,
  MdPeople,
  MdHandshake,
  MdImage,
} from 'react-icons/md'
import data from '../../data/ge-elfuns.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/ge-elfuns/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const FACET_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  presenter:  MdPresentToAll,
  pipeline:   MdAccountTree,
  awareness:  MdTravelExplore,
  connection: MdLink,
}

// ─── Component ────────────────────────────────────────────────────────────────

const FACETS = data.facets
const PEOPLE = data.people
const PHOTOS = data.photos
const APPROACH = data.approach

const heroPhotoSrc = resolve(data.hero.heroPhoto.src)
const approachPhotoSrc = resolve(APPROACH.inlinePhoto.src)

export default function GeElfunsPage() {
  const [activeFacet, setActiveFacet] = useState(0)

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
              <MdHandshake size={20} />
            </div>
            <div>
              <span>{data.impact.label}</span>
              <p>{data.impact.text}</p>
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 3. Why This Partnership (Approach) ───────────────────────── */}
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

      {/* ── 4. Partnership facets — horizontal accordion ──────────────── */}
      <section>
        <div>
          <p>Partnership Facets</p>
          <h2>Four dimensions of the relationship.</h2>
          <p>
            The GE Elfuns partnership is broader than a single presentation. It spans how
            the team tells its story, the mentorship potential it unlocks, the communities
            it reaches, and the shared history that makes all of it meaningful.
          </p>

          <div aria-label="Partnership facets accordion">
            {FACETS.map((f, i) => {
              const Icon = FACET_ICONS[f.iconKey] ?? MdLink
              const isActive = i === activeFacet

              return (
                <div
                  key={f.id}
                  onClick={() => setActiveFacet(i)}
                  aria-expanded={isActive}
                  aria-label={f.label}
                >
                  <div>
                    <div>
                      <Icon size={20} />
                    </div>
                    <span>0{i + 1}</span>
                    <span>{f.label}</span>
                  </div>

                  <div aria-hidden={!isActive}>
                    {isActive && (
                      <div>
                        <span>Facet 0{i + 1}</span>
                        <h3>{f.label}</h3>
                        <p>{f.tagline}</p>
                        <p>{f.description}</p>
                        <p>Key points</p>
                        <ul>
                          {f.highlights.map((h, j) => (
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

      {/* ── 5. People & Partners ──────────────────────────────────────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>The people behind the partnership.</h2>
          <p>
            The GE Elfuns organization and the contacts who make this relationship work.
            Portrait and logo slots are ready to fill whenever assets are available.
          </p>

          <div>
            {PEOPLE.map((p) => (
              <div key={p.name} aria-label={`${p.name}, ${p.role}`}>
                {p.type === 'partner' ? (
                  <div aria-label={`Logo placeholder for ${p.name}`}>
                    <span>
                      <MdHandshake size={24} />
                    </span>
                  </div>
                ) : (
                  <div aria-label={`Portrait placeholder for ${p.name}`}>
                    <span>
                      <MdPeople size={22} />
                    </span>
                  </div>
                )}
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

      {/* ── 6. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Partnership</p>
          <div aria-label="GE Elfuns partnership photo gallery">
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
