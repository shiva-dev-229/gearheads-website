import { Link } from 'react-router-dom'
import { MdArrowForward, MdHandshake } from 'react-icons/md'
import data from '../data/outreach.json'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const STATS = data.stats
const CATEGORIES = data.categories

export default function OutreachPage() {
  return (
    <div>

      {/* ── 1. Hero ───────────────────────────────────────────────────── */}
      <section>
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
      </section>

      <div />

      {/* ── 2. Top-line metrics ───────────────────────────────────────── */}
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

      {/* ── 3. Program grid ───────────────────────────────────────────── */}
      <section>
        <div>
          <p>Programs</p>
          <h2>Everything We Run</h2>
          <p>
            Twelve programs across four categories — each one student-led, hands-on, and built to last.
          </p>

          <div>
            {CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <div>
                  <p>Category</p>
                  <h3>{cat.label}</h3>
                  <p>{cat.description}</p>
                </div>

                <div>
                  {cat.pages.map((page) => (
                    <Link
                      key={page.slug}
                      to={`/outreach/${page.slug}`}
                      aria-label={`${page.title} — ${page.description}`}
                    >
                      <div>
                        <span>{page.title}</span>
                        <span aria-hidden="true">
                          <MdArrowForward size={14} />
                        </span>
                      </div>
                      <p>{page.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
