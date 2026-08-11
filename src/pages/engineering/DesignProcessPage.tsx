import { useState, type ComponentType } from 'react'
import {
  MdFlag, MdArchitecture, MdBuild, MdScience, MdEmojiEvents,
  MdAnalytics, MdWarning, MdGridView, MdCameraAlt,
  MdExpandMore,
} from 'react-icons/md'
import dpData from '../../data/design-process.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const STEP_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  flag:         MdFlag,
  analytics:    MdAnalytics,
  architecture: MdArchitecture,
  build:        MdBuild,
  science:      MdScience,
  trophy:       MdEmojiEvents,
}

const TOOL_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  grid:      MdGridView,
  analytics: MdAnalytics,
  warning:   MdWarning,
}

// ─── Component ────────────────────────────────────────────────────────────────

const STEPS = dpData.steps
const DHF = dpData.dhf
const TOOLS = dpData.tools

export default function DesignProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [dhfOpen, setDhfOpen] = useState<number | null>(null)

  const toggleDhf = (i: number) => setDhfOpen((cur) => (cur === i ? null : i))

  const step = STEPS[activeStep]

  return (
    <div id="design-process">

      {/* ── DHF Section ────────────────────────────────────────────────── */}
      <section>
        <div>
          <p>Foundation</p>
          <h2>The DHF Framework</h2>
          <p>
            A medical-device engineering standard adapted for FTC — where it comes from, what it
            means, and how the team enforces it every build season.
          </p>

          <div>
            {DHF.map((item, i) => {
              const open = dhfOpen === i
              const num = String(i + 1).padStart(2, '0')

              return (
                <div key={item.id}>
                  <button onClick={() => toggleDhf(i)} aria-expanded={open}>
                    <span>{num}</span>
                    <span>{item.question}</span>
                    <span>
                      <MdExpandMore />
                    </span>
                  </button>

                  {open && (
                    <div>
                      <hr />
                      <ul>
                        {item.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <hr />

      {/* ── Process Stepper ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>Season Workflow</p>
          <h2>Step by Step</h2>
          <p>
            An interactive walk through the season process — from game kickoff to the competition
            field. Click any node to explore that stage.
          </p>

          <div>
            <div>
              {STEPS.map((s, i) => {
                const Icon = STEP_ICONS[s.iconKey] ?? MdFlag
                const isActive = i === activeStep
                const isLast = i === STEPS.length - 1
                return (
                  <div key={s.id}>
                    <button
                      onClick={() => setActiveStep(i)}
                      aria-pressed={isActive}
                      aria-label={`Step ${i + 1}: ${s.label}`}
                    >
                      <div>
                        <Icon size={22} />
                      </div>
                      <span>
                        {s.label}
                      </span>
                    </button>
                    {!isLast && <div />}
                  </div>
                )
              })}
            </div>

            <div key={activeStep} role="tabpanel" aria-label={step.label}>
              <p>Step {step.number} of {STEPS.length}</p>
              <h3>{step.label}</h3>
              <p>{step.summary}</p>
              <p>{step.detail}</p>
              <span>Phase Outputs</span>
              <div>
                {step.outputs.map((o, i) => (
                  <div key={i}>{o}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Analysis Tools ─────────────────────────────────────────────── */}
      <section>
        <div>
          <p>Core Toolkit</p>
          <h2>The Three Instruments</h2>
          <p>
            Every design decision runs through the same three tools — used in sequence and
            updated continuously across the season.
          </p>

          <div>
            {TOOLS.map((tool) => {
              const Icon = TOOL_ICONS[tool.iconKey] ?? MdAnalytics
              return (
                <div key={tool.name}>
                  <div>
                    <Icon size={22} />
                  </div>
                  <h4>{tool.name}</h4>
                  <p>{tool.description}</p>
                  <div>
                    <MdCameraAlt size={18} />
                    <span>Screenshot Slot</span>
                    <span>{tool.slotHint}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
