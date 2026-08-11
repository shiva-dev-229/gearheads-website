import { useState, type ComponentType } from 'react'
import {
  MdGavel,
  MdSmartToy,
  MdMic,
  MdFamilyRestroom,
  MdCheckCircleOutline,
  MdImage,
  MdPeople,
  MdVolunteerActivism,
} from 'react-icons/md'
import data from '../../data/fll-mentoring.json'

// ─── Image resolution ──────────────────────────────────────────────────────────
// No fll-mentoring folder exists yet — resolver will always return null

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/fll-mentoring/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon map ──────────────────────────────────────────────────────────────────

const ACTIVITY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  gavel:  MdGavel,
  robot:  MdSmartToy,
  mic:    MdMic,
  family: MdFamilyRestroom,
}

// ─── Component ─────────────────────────────────────────────────────────────────

const ACTIVITIES = data.activities
const PEOPLE = data.people
const PHOTOS = data.photos
const APPROACH = data.approach

export default function FllMentoringPage() {
  const [activeStage, setActiveStage] = useState(0)

  return (
    <div>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
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

            <div aria-label="FLL Mentoring hero photo slot">
              <div>
                <MdImage size={36} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Impact callout ───────────────────────────────────────────── */}
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

      {/* ── 3. Our Approach ─────────────────────────────────────────────── */}
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
              {resolve(APPROACH.inlinePhoto.src) ? null : (
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

      {/* ── 4. Activities — Horizontal Accordion ────────────────────────── */}
      <section>
        <div>
          <p>Activities</p>
          <h2>What We Do at FLL Events</h2>
          <p>
            Four distinct roles at FLL tournaments — each designed to meet students, parents,
            and the event itself where they need us most. Click an activity to expand it.
          </p>
        </div>

        <div role="tablist" aria-label="FLL mentoring activities">
          {ACTIVITIES.map((act, i) => {
            const ActIcon = ACTIVITY_ICONS[act.iconKey] as ComponentType<{ size?: number }>
            const isActive = i === activeStage

            return (
              <div
                key={act.id}
                onClick={() => setActiveStage(i)}
                role="tab"
                aria-selected={isActive}
                aria-label={act.label}
              >
                <div>
                  <div>
                    <ActIcon size={20} />
                  </div>
                  <span>0{i + 1}</span>
                  <span>{act.label}</span>
                </div>

                <div
                  role="tabpanel"
                  aria-hidden={!isActive}
                >
                  {isActive && (
                    <div key={act.id}>
                      <span>Activity 0{i + 1}</span>
                      <h3>{act.label}</h3>
                      <p>{act.tagline}</p>
                      <p>{act.description}</p>
                      <p>Highlights</p>
                      <ul>
                        {act.highlights.map((pt, j) => (
                          <li key={j}>
                            <MdCheckCircleOutline size={15} />
                            {pt}
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
      </section>

      <div />

      {/* ── 5. People & Partners ────────────────────────────────────────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>Faces Behind the Work</h2>
          <p>
            FLL judges, coached teams, parent coaches, and event coordinators who make this
            work possible. Portrait slots are ready for headshots when available.
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

      {/* ── 6. Photo gallery ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Events</p>
          <h2>FLL in Action</h2>

          <div aria-label="FLL mentoring photo gallery">
            {PHOTOS.map((p, i) => {
              const url = resolve(p.src)
              return url ? null : (
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
