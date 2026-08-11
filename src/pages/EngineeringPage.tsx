import { useState } from 'react'
import { MdCheckCircleOutline } from 'react-icons/md'
import engineeringData from '../data/engineering.json'
import DesignProcessSection from './engineering/DesignProcessPage'
import CadSection from './engineering/CadPage'
import ManufacturingSection from './engineering/ManufacturingPage'
import TestingSection from './engineering/TestingPage'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase {
  id: string
  number: number
  label: string
  title: string
  description: string
  bullets: string[]
}

interface Stat {
  value: string
  label: string
  hint: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHASES = engineeringData.phases as Phase[]
const STATS = engineeringData.stats as Stat[]

// ─── Component ────────────────────────────────────────────────────────────────

export default function EngineeringPage() {
  const [activePhase, setActivePhase] = useState(0)

  const phase = PHASES[activePhase]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>Engineering</div>

            <h1>How We Engineer</h1>

            <p>
              Every design decision we make is tracked in a{' '}
              <strong>Design History File (DHF)</strong> — the same professional
              engineering framework used by{' '}
              <strong>GE Healthcare</strong> for medical products like MRI, CT, and
              X-Ray machines. From game breakdown to final fabrication, our process
              applies the same rigor to FTC robotics that industry applies to
              safety-critical hardware: define requirements first, hypothesize and
              prototype against them, then fabricate and validate.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Three-Phase Explorer ──────────────────────────── */}
      <section>
        <div>
          <div>
            <div>Build Process</div>
          </div>

          <h2>Three-Phase Development</h2>

          <p>
            Our season runs on a disciplined three-phase process matched to 2-week sprint
            cycles across the 8-month competition season. Each phase has clear outputs
            before the next begins.
          </p>

          <div role="tablist" aria-label="Build phases">
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={activePhase === i}
                aria-controls={`panel-${p.id}`}
                onClick={() => setActivePhase(i)}
              >
                <span>{p.number}</span>
                <div>
                  <span>{p.label}</span>
                  <span>{p.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div
            key={phase.id}
            role="tabpanel"
            id={`panel-${phase.id}`}
            aria-label={`Phase ${phase.number}: ${phase.title}`}
          >
            <div>
              <span>Phase {phase.number} — {phase.label}</span>
              <h3>{phase.title}</h3>
              <p>{phase.description}</p>
              <hr />
            </div>
            <div>
              <ul>
                {phase.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span>
                      <MdCheckCircleOutline size={16} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Stats ─────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>By The Numbers</div>

            <div>
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.value}</span>
                  <span>{stat.label}</span>
                  <span>{stat.hint}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr />
      <DesignProcessSection />
      <hr />
      <CadSection />
      <hr />
      <ManufacturingSection />
      <hr />
      <TestingSection />
    </div>
  )
}
