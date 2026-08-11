import { useState, type ComponentType } from 'react'
import {
  MdPrecisionManufacturing,
  MdPrint,
  MdFlashOn,
  MdColorLens,
  MdCheckCircle,
  MdSports,
  MdEngineering,
  MdGroup,
  MdImage,
  MdPeople,
  MdHandshake,
  MdAcUnit,
  MdGroups,
  MdBuild,
  MdExpandMore,
} from 'react-icons/md'
import data from '../../data/production-hub.json'

// ─── Image resolution ─────────────────────────────────────────────────────────

const RAW_IMAGES = import.meta.glob(
  '../../assets/photos/outreach/production-hub/*',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>

const resolve = (file: string | null): string | null => {
  if (!file) return null
  const entry = Object.entries(RAW_IMAGES).find(([p]) => p.endsWith('/' + file))
  return entry ? entry[1] : null
}

// ─── Icon maps ────────────────────────────────────────────────────────────────

const SERVICE_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  precisionManufacturing: MdPrecisionManufacturing,
  print:                  MdPrint,
  flashOn:                MdFlashOn,
  colorLens:              MdColorLens,
}

const PARTNER_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  sports:      MdSports,
  engineering: MdEngineering,
  ac_unit:     MdAcUnit,
  group:       MdGroup,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Component ────────────────────────────────────────────────────────────────

const SERVICES  = data.services
const STATS     = data.stats
const PARTNERS  = data.partners
const PHOTOS    = data.photos
const HOW       = data.howItWorks
const REQUEST   = data.requestForm

const heroPhotoSrc    = resolve(data.hero.heroPhoto.src)
const approachPhotoSrc = resolve(HOW.inlinePhoto.src)
const VIDEO = data.video

function buildRequestMailto(fields: {
  team: string
  contact: string
  email: string
  service: string
  message: string
}): string {
  const subject = `Production Hub Request — ${fields.team || 'New request'}`
  const body = [
    `Team: ${fields.team}`,
    `Contact name: ${fields.contact}`,
    `Contact email: ${fields.email}`,
    `Service requested: ${fields.service}`,
    '',
    'What we need:',
    fields.message,
    '',
    '(Attach your design file — Onshape link, STL, or DXF — before sending.)',
  ].join('\n')
  return `mailto:${REQUEST.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ProductionHubPage() {
  const [requestFields, setRequestFields] = useState({
    team: '',
    contact: '',
    email: '',
    service: SERVICES[0]?.title ?? '',
    message: '',
  })

  function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.location.href = buildRequestMailto(requestFields)
  }

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

            <div aria-label="Production Hub fabrication space">
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
                      <MdPrecisionManufacturing size={14} /> {parsed.count}{parsed.suffix}
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

      {/* ── 4. How It Works — prose + inline photo ────────────────────── */}
      <section>
        <div>
          <p>{HOW.label}</p>
          <h2>{HOW.heading}</h2>

          <div>
            <div>
              {HOW.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div aria-label={`Photo slot: ${HOW.inlinePhoto.caption}`}>
              {approachPhotoSrc ? (
                <img src={approachPhotoSrc} alt={HOW.inlinePhoto.caption} />
              ) : (
                <div>
                  <MdBuild size={28} />
                  <span>Photo slot</span>
                  <span>{HOW.inlinePhoto.caption}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 5. Services bento grid ────────────────────────────────────── */}
      <section>
        <div>
          <p>Services</p>
          <h2>What We Make</h2>
          <p>
            Four fabrication services, each targeting a different part of the robot-building
            workflow. Any team in the region can request a run — no equipment required on their
            end.
          </p>
        </div>

        <div>
          {SERVICES.map((item) => {
            const Icon = SERVICE_ICONS[item.iconKey] ?? MdPrecisionManufacturing
            return (
              <div key={item.id} aria-label={item.title}>
                <div aria-hidden="true">
                  <Icon size={24} />
                </div>
                <div>
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div aria-label={`${item.title} highlights`}>
                    {item.highlights.map((h, hi) => (
                      <div key={hi}>
                        <span aria-hidden="true">
                          <MdCheckCircle size={14} />
                        </span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div />

      {/* ── 5b. Request a part ────────────────────────────────────────── */}
      <section id="form">
        <div>
          <p>{REQUEST.label}</p>
          <h2>{REQUEST.heading}</h2>
          <p>{REQUEST.subtext}</p>

          <div>
            <form onSubmit={handleRequestSubmit}>
              <div>
                <label htmlFor="rq-team">Team Name</label>
                <input
                  id="rq-team"
                  placeholder="e.g. FTC #12345 Ironclads"
                  value={requestFields.team}
                  onChange={(e) => setRequestFields((f) => ({ ...f, team: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="rq-contact">Contact Name</label>
                <input
                  id="rq-contact"
                  placeholder="Your name"
                  value={requestFields.contact}
                  onChange={(e) => setRequestFields((f) => ({ ...f, contact: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="rq-email">Contact Email</label>
                <input
                  id="rq-email"
                  type="email"
                  placeholder="you@example.com"
                  value={requestFields.email}
                  onChange={(e) => setRequestFields((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="rq-service">Service Needed</label>
                <div>
                  <select
                    id="rq-service"
                    value={requestFields.service}
                    onChange={(e) => setRequestFields((f) => ({ ...f, service: e.target.value }))}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                  <MdExpandMore size={18} aria-hidden="true" />
                </div>
              </div>

              <div>
                <label htmlFor="rq-message">What Do You Need?</label>
                <textarea
                  id="rq-message"
                  placeholder="Describe the part — dimensions, material, deadline, and anything else we should know."
                  value={requestFields.message}
                  onChange={(e) => setRequestFields((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <div>
                <button type="submit">
                  Send Request
                </button>
                <p>
                  This opens your email client with everything filled in — attach your design
                  file before sending. Prefer to email directly? Reach us at{' '}
                  <a href={`mailto:${REQUEST.email}`}>{REQUEST.email}</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. Teams We Support ───────────────────────────────────────── */}
      <section>
        <div>
          <p>Teams Served</p>
          <h2>Who We've Worked With</h2>
          <p>
            Every team below received parts, coaching, or fabrication support through the
            Production Hub. Some have since built their own manufacturing capability — which is
            exactly the point.
          </p>

          <div>
            {PARTNERS.map((p) => {
              const Icon = PARTNER_ICONS[p.iconKey] ?? MdGroups
              const logoUrl = resolve(p.logoSrc)
              return (
                <div key={p.id} aria-label={p.name}>
                  <div aria-label={`Logo placeholder for ${p.name}`}>
                    {logoUrl ? (
                      <img src={logoUrl} alt={`${p.name} logo`} />
                    ) : (
                      <span aria-hidden="true">
                        <Icon size={26} />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3>{p.name}</h3>
                    <span>{p.tag}</span>
                    <p>{p.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. In-action video ────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>
              <p>{VIDEO.label}</p>
              <h2>{VIDEO.heading}</h2>
              <p>{VIDEO.subtext}</p>
            </div>
            <div>
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO.youtubeId}`}
                title={VIDEO.heading}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <div />

      {/* ── 8. Photo gallery ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Shop</p>
          <div aria-label="Production Hub photo gallery">
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
