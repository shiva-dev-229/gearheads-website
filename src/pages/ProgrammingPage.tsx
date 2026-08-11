import { useState } from 'react'
import { MdCheckCircleOutline } from 'react-icons/md'
import programmingData from '../data/programming.json'
import ControlSection from './programming/ControlPage'
import AutonomousSection from './programming/AutonomousPage'
import InnovationsSection from './programming/InnovationsPage'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Layer {
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

const LAYERS = programmingData.layers as Layer[]
const STATS = programmingData.stats as Stat[]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgrammingPage() {
  const [activeLayer, setActiveLayer] = useState(0)

  const layer = LAYERS[activeLayer]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>Software</div>

            <h1>How We Program</h1>

            <p>
              Our robot code is built in <strong>Java</strong> on the FTC SDK and structured in
              clear layers — hardware abstraction at the base, closed-loop control on top,
              autonomous navigation above that, and live tooling wrapped around all of it. The
              goal is software that's <strong>reliable, tunable, and reusable</strong>: a proven
              foundation we carry from season to season instead of rebuilding from scratch every
              year.
            </p>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Layer Explorer ────────────────────────────────── */}
      <section>
        <div>
          <div>
            <div>Software Stack</div>
          </div>

          <h2>Built in Layers</h2>

          <p>
            Each layer builds on the one below it — and each one is designed to work the same way
            no matter what the game is. Click a layer to see how it works.
          </p>

          <div role="tablist" aria-label="Software layers">
            {LAYERS.map((l, i) => (
              <button
                key={l.id}
                role="tab"
                aria-selected={activeLayer === i}
                aria-controls={`layer-panel-${l.id}`}
                onClick={() => setActiveLayer(i)}
              >
                <span>{l.number}</span>
                <div>
                  <span>{l.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div
            key={layer.id}
            role="tabpanel"
            id={`layer-panel-${layer.id}`}
            aria-label={`Layer ${layer.number}: ${layer.title}`}
          >
            <div>
              <span>Layer {layer.number} — {layer.label}</span>
              <h3>{layer.title}</h3>
              <p>{layer.description}</p>
              <hr />
            </div>
            <div>
              <ul>
                {layer.bullets.map((bullet, i) => (
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
            <div>At a Glance</div>

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
      <ControlSection />
      <hr />
      <AutonomousSection />
      <hr />
      <InnovationsSection />
    </div>
  )
}
