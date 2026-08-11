import { useState } from 'react'
import {
  MdSchool,
  MdExpandMore,
  MdImage,
  MdPeople,
} from 'react-icons/md'
import data from '../../data/school-support.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/school-support/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Component ────────────────────────────────────────────────────────────────

const FACETS = data.facets
const STATS = data.stats
const PHOTOS = data.photos

const heroPhotoSrc = (() => {
  for (const p of PHOTOS) {
    const url = resolve(p.src)
    if (url) return url
  }
  return null
})()

export default function SchoolSupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i))

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
                <img src={heroPhotoSrc} alt="GEarheads school district partnership" />
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
              <MdSchool size={20} />
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
          <div>
            <p>By The Numbers</p>
            <div>
              {STATS.map((s) => (
                <div key={s.label}>
                  <span>{s.value}</span>
                  <span>{s.label}</span>
                  <span>{s.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 4. Partnership Facets accordion ───────────────────────────── */}
      <section>
        <div>
          <div>
            <p>Partnership Facets</p>
            <h2>How the District Shows Up</h2>
            <p>
              Four structural commitments from Elmbrook that define what school support actually
              looks like in practice — click any row to read the full story.
            </p>

            <div role="list">
              {FACETS.map((facet, i) => {
                const open = openIndex === i
                const num = String(i + 1).padStart(2, '0')
                return (
                  <div key={facet.id} role="listitem">
                    <button
                      onClick={() => toggle(i)}
                      aria-expanded={open}
                      aria-controls={`facet-body-${facet.id}`}
                    >
                      <span>{num}</span>
                      <span>{facet.question}</span>
                      <div aria-hidden="true">
                        <MdExpandMore />
                      </div>
                    </button>

                    {open && (
                      <div>
                        <div id={`facet-body-${facet.id}`}>
                          <div />
                          <p>{facet.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 5. Photo strip ────────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <p>School Support In Action</p>
            <div>
              {PHOTOS.map((p, i) => {
                const url = resolve(p.src)
                return url ? (
                  <div key={i}>
                    <img src={url} alt={p.caption} />
                  </div>
                ) : (
                  <div key={i}>
                    <MdPeople size={18} />
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
