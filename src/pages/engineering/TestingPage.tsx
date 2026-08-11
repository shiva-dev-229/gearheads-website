import { useState, type ComponentType } from 'react'
import {
  MdScience,
  MdAnalytics,
  MdBuild,
  MdCheckCircle,
  MdEvent,
  MdTune,
  MdWarning,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import testingData from '../../data/testing.json'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  science:     MdScience,
  analytics:   MdAnalytics,
  build:       MdBuild,
  checkCircle: MdCheckCircle,
  event:       MdEvent,
  tune:        MdTune,
  warning:     MdWarning,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestingSection() {
  const [activeStage, setActiveStage] = useState(0)

  const activeStageData = testingData.iterationLoop[activeStage]

  return (
    <div id="testing">

      {/* ── 2. Iteration Loop ────────────────────────────────────────── */}
      <section>
        <div>
          <p>Engineering Process</p>
          <h2>The Iteration Loop</h2>
          <p>
            Click a stage to see what the team actually does at each step.
          </p>

          <div>
            <div>
              {testingData.iterationLoop.map((stage, i) => {
                const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
                const isActive = i === activeStage
                const isLast = i === testingData.iterationLoop.length - 1

                return (
                  <div key={stage.id}>
                    <button
                      onClick={() => setActiveStage(i)}
                      aria-pressed={isActive}
                      aria-label={`Stage: ${stage.label}`}
                    >
                      <div>
                        <Icon size={22} />
                      </div>
                      <span>
                        {stage.label}
                      </span>
                    </button>
                    {!isLast && <div />}
                  </div>
                )
              })}
            </div>

            <div key={activeStage}>
              <p>
                Stage {activeStage + 1} of {testingData.iterationLoop.length}
              </p>
              <h3>{activeStageData.description}</h3>
              <p>{activeStageData.details}</p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── 3. Testing Workflow ───────────────────────────────────────── */}
      <section>
        <div>
          <p>Process</p>
          <h2>Testing Workflow</h2>
          <p>
            From pre-competition baselines through post-event FMEA updates, every testing session
            follows a structured sequence.
          </p>

          <div>
            {testingData.testingWorkflow.map((item, i) => {
              const Icon = ICON_MAP[item.iconKey] as ComponentType<{ size?: number }>
              return (
                <div key={i}>
                  <div>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span>{item.step}</span>
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <hr />

      {/* ── 4. FMEA Section ──────────────────────────────────────────── */}
      <section>
        <div>
          <p>Failure Analysis</p>
          <div>
            <h2>{testingData.fmea.title}</h2>
            <span>DECODE 2025–26</span>
          </div>
          <div>
            <p>
              These examples are drawn from the DECODE robot's mark iterations — failure modes
              identified through structured FMEA analysis after each testing session and
              competition. The team ranks them by severity and likelihood, then commits to a fix
              only when the Monte Carlo model shows it improves projected match performance.
            </p>

            <div>
              {testingData.fmea.examples.map((ex, i) => (
                <div key={i}>
                  <div>{ex.season}</div>
                  <div>
                    <div>
                      <span>Failure mode</span>
                      <span>{ex.failure}</span>
                    </div>
                    <div>
                      <span>Fix applied</span>
                      <span>{ex.fix}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
