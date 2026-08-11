import { useState } from 'react'
import {
  MdInbox,
  MdChecklistRtl,
  MdSecurity,
  MdSend,
  MdCheckCircle,
  MdLaptop,
  MdPublic,
  MdPeople,
  MdHandshake,
  MdImage,
  MdBusiness,
  MdExpandMore,
} from 'react-icons/md'
import data from '../../data/computer-project.json'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PipelineStep {
  id: string
  step: string
  label: string
  iconKey: string
  summary: string
  detail: string
  highlights: string[]
}

interface Recipient {
  name: string
  region: string
  description: string
}

interface PartnerOrg {
  name: string
  type: string
  note: string
  logo: string | null
}

interface GrowthEntry {
  season: string
  count: number
  label: string
}

interface Stat {
  value: string
  label: string
  hint: string
}

interface Photo {
  src: string | null
  caption: string
}

// ─── Icon map ─────────────────────────────────────────────────────────────────

const STEP_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  inbox:     MdInbox,
  checklist: MdChecklistRtl,
  security:  MdSecurity,
  send:      MdSend,
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseStatValue(value: string): { count: number; suffix: string } | null {
  const m = value.match(/^(\d+)(.*)$/)
  if (!m) return null
  return { count: parseInt(m[1], 10), suffix: m[2] }
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PIPELINE     = data.pipeline    as PipelineStep[]
const STATS        = data.stats       as Stat[]
const RECIPIENTS   = data.recipients  as Recipient[]
const PARTNER_ORGS = data.partnerOrgs as PartnerOrg[]
const GROWTH       = data.growth      as GrowthEntry[]
const PHOTOS       = data.photos      as Photo[]
const REQUEST      = data.requestForm

type InvolveMode = 'donate' | 'request'

function buildInvolveMailto(
  mode: InvolveMode,
  fields: { name: string; email: string; quantity: string; detail: string; message: string }
): string {
  const subject =
    mode === 'donate'
      ? `Laptop Donation — ${fields.name || 'New donation'}`
      : `Computer Request — ${fields.name || 'New request'}`

  const body =
    mode === 'donate'
      ? [
          `Name: ${fields.name}`,
          `Email: ${fields.email}`,
          `Laptops to donate: ${fields.quantity}`,
          `Condition: ${fields.detail}`,
          '',
          'Details:',
          fields.message,
        ].join('\n')
      : [
          `Team / Organization: ${fields.name}`,
          `Contact email: ${fields.email}`,
          `Machines needed: ${fields.quantity}`,
          `Region: ${fields.detail}`,
          '',
          "What it's for:",
          fields.message,
        ].join('\n')

  return `mailto:${REQUEST.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ComputerProjectPage() {
  const [activeStep, setActiveStep] = useState(0)
  const step = PIPELINE[activeStep]

  const [involveMode, setInvolveMode] = useState<InvolveMode>('donate')
  const [involveFields, setInvolveFields] = useState({
    name: '',
    email: '',
    quantity: '',
    detail: '',
    message: '',
  })

  function handleInvolveSubmit(e: React.FormEvent) {
    e.preventDefault()
    window.location.href = buildInvolveMailto(involveMode, involveFields)
  }

  const heroPhoto: string | null = (data.hero as { heroPhoto: string | null }).heroPhoto

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

            <div aria-label="Hero photo — computer project">
              {heroPhoto ? (
                <img src={heroPhoto} alt="Computer project program" />
              ) : (
                <div>
                  <MdLaptop size={32} />
                  <span>Photo slot</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Impact callout ─────────────────────────────────────────── */}
      <section>
        <div>
          <div aria-label="Global reach impact">
            <div aria-hidden="true">
              <MdPublic size={20} />
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
                      <MdLaptop size={14} /> {parsed.count}{parsed.suffix}
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

      {/* ── 4. The Pipeline stepper ───────────────────────────────────── */}
      <section>
        <div>
          <p>How It Works</p>
          <h2>The Pipeline</h2>
          <p>
            Every laptop follows the same four-step journey — from the moment it arrives at a
            collection point to the day it ships to a student who needs it. Tap any stage to read
            the full story of what happens inside it.
          </p>

          <div>
            <div>
              {PIPELINE.map((p, i) => {
                const Icon = STEP_ICONS[p.iconKey] ?? MdLaptop
                const isActive    = i === activeStep
                const isLast      = i === PIPELINE.length - 1

                return (
                  <div key={p.id}>
                    <button
                      onClick={() => setActiveStep(i)}
                      aria-pressed={isActive}
                      aria-label={`Step ${i + 1}: ${p.label}`}
                    >
                      <div>
                        <Icon size={22} />
                      </div>
                      <span>
                        {p.label}
                      </span>
                    </button>
                    {!isLast && <div />}
                  </div>
                )
              })}
            </div>

            <div key={activeStep} role="tabpanel" aria-label={step.label}>
              <p>Step {step.step} of {PIPELINE.length}</p>
              <h3>{step.label}</h3>
              <p>{step.summary}</p>
              <p>{step.detail}</p>
              <span>What happens here</span>
              <div>
                {step.highlights.map((h, i) => (
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

      {/* ── 5. Where they go ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>Recipients</p>
          <h2>Where They Go</h2>
          <p>
            We match every batch of machines to a specific program — an FTC team trying to run
            Android Studio on borrowed hardware, a community education center, a nonprofit with
            in-country logistics. These are the organizations receiving machines this season and
            historically.
          </p>

          <div aria-label="Inline photo — recipients">
            <MdImage size={24} />
            <span>Photo slot</span>
            <span>In the field — laptops delivered and in use at a recipient program</span>
          </div>

          <div>
            {RECIPIENTS.map((r) => (
              <div key={r.name} aria-label={`Recipient: ${r.name}`}>
                <span>{r.region}</span>
                <h3>{r.name}</h3>
                <p>{r.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 6. People & Partners ──────────────────────────────────────── */}
      <section>
        <div>
          <p>People & Partners</p>
          <h2>Who Makes It Possible</h2>
          <p>
            The project depends on a network of corporate donors, local businesses, and
            distribution partners. Corporate partners supply the bulk of our incoming machines;
            Tech Lit Africa handles international last-mile logistics; local libraries and
            dealerships serve as convenient drop-off points for the community.
          </p>

          <div>
            {PARTNER_ORGS.map((p) => (
              <div key={p.name} aria-label={`Partner: ${p.name}`}>
                <div aria-label={`${p.name} logo placeholder`}>
                  {p.logo ? (
                    <img src={p.logo} alt={`${p.name} logo`} />
                  ) : (
                    <div>
                      <MdBusiness size={22} />
                      <span>Logo</span>
                    </div>
                  )}
                </div>
                <h3>{p.name}</h3>
                <span>{p.type}</span>
                <p>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 6b. Get involved — donate or request ───────────────────────── */}
      <section id="form">
        <div>
          <p>{REQUEST.label}</p>
          <h2>{REQUEST.heading}</h2>
          <p>{REQUEST.subtext}</p>

          <div>
            <div role="tablist" aria-label="Donate or request a machine">
              <button
                type="button"
                role="tab"
                aria-selected={involveMode === 'donate'}
                onClick={() => setInvolveMode('donate')}
              >
                Donate a Laptop
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={involveMode === 'request'}
                onClick={() => setInvolveMode('request')}
              >
                Request a Computer
              </button>
            </div>

            <form onSubmit={handleInvolveSubmit}>
              <div>
                <label htmlFor="cp-name">
                  {involveMode === 'donate' ? 'Your Name' : 'Team / Organization'}
                </label>
                <input
                  id="cp-name"
                  placeholder={involveMode === 'donate' ? 'Your name' : 'e.g. FTC #12345 Ironclads'}
                  value={involveFields.name}
                  onChange={(e) => setInvolveFields((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="cp-email">Contact Email</label>
                <input
                  id="cp-email"
                  type="email"
                  placeholder="you@example.com"
                  value={involveFields.email}
                  onChange={(e) => setInvolveFields((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="cp-quantity">
                  {involveMode === 'donate' ? 'Laptops To Donate' : 'Machines Needed'}
                </label>
                <input
                  id="cp-quantity"
                  placeholder="e.g. 3"
                  value={involveFields.quantity}
                  onChange={(e) => setInvolveFields((f) => ({ ...f, quantity: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label htmlFor="cp-detail">
                  {involveMode === 'donate' ? 'Condition' : 'Region / Location'}
                </label>
                {involveMode === 'donate' ? (
                  <div>
                    <select
                      id="cp-detail"
                      value={involveFields.detail}
                      onChange={(e) => setInvolveFields((f) => ({ ...f, detail: e.target.value }))}
                    >
                      <option value="">Select condition</option>
                      <option value="Working">Working</option>
                      <option value="Not sure">Not sure</option>
                      <option value="Needs repair">Needs repair</option>
                    </select>
                    <MdExpandMore size={18} aria-hidden="true" />
                  </div>
                ) : (
                  <input
                    id="cp-detail"
                    placeholder="e.g. Brookfield, WI"
                    value={involveFields.detail}
                    onChange={(e) => setInvolveFields((f) => ({ ...f, detail: e.target.value }))}
                    required
                  />
                )}
              </div>

              <div>
                <label htmlFor="cp-message">
                  {involveMode === 'donate' ? 'Anything Else?' : "What's It For?"}
                </label>
                <textarea
                  id="cp-message"
                  placeholder={
                    involveMode === 'donate'
                      ? 'Make/model if known, pickup vs. drop-off, timing — whatever helps us plan.'
                      : 'What the machines are for and when you need them by.'
                  }
                  value={involveFields.message}
                  onChange={(e) => setInvolveFields((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <div>
                <button type="submit">
                  {involveMode === 'donate' ? 'Send Donation Details' : 'Send Request'}
                </button>
                <p>
                  This opens your email client with everything filled in. Prefer to email
                  directly? Reach us at <a href={`mailto:${REQUEST.email}`}>{REQUEST.email}</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div />

      {/* ── 7. Five-year growth ───────────────────────────────────────── */}
      <section>
        <div>
          <p>Growth</p>
          <h2>Five Seasons, Six Times the Volume</h2>
          <p>
            What began as a handful of machines in our first season has grown into a structured
            program that scales every year. The jump from 2022–23 to 2025–26 is not accidental —
            it reflects refining the collection pipeline, building partner relationships, and
            expanding our distribution network to match demand.
          </p>

          <div>
            {GROWTH.map((g) => (
              <div key={g.season}>
                <span>{g.season}</span>
                <span>{g.label}</span>
                <span>laptops</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div />

      {/* ── 8. Why It Matters — narrative ────────────────────────────── */}
      <section>
        <div>
          <p>Why It Matters</p>
          <h2>{data.whyItMatters.heading}</h2>
          <div aria-label="Why it matters narrative">
            <p>{data.whyItMatters.body}</p>
            <blockquote>{data.whyItMatters.callout}</blockquote>
          </div>
        </div>
      </section>

      <div />

      {/* ── 9. Photo strip ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>From The Program</p>
          <div>
            {PHOTOS.map((p, i) => (
              <div key={i} aria-label={`Photo slot: ${p.caption}`}>
                <MdPeople size={18} />
                <span>
                  <MdHandshake size={14} />
                  Photo slot
                </span>
                <span>{p.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
