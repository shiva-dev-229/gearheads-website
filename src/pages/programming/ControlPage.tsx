import { useState, type ComponentType } from 'react'
import {
  MdFlag,
  MdSensors,
  MdCompareArrows,
  MdTune,
  MdBolt,
  MdOutput,
  MdSpeed,
  MdSportsEsports,
  MdLoop,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import controlData from '../../data/control.json'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  flag:          MdFlag,
  sensors:       MdSensors,
  compareArrows: MdCompareArrows,
  tune:          MdTune,
  bolt:          MdBolt,
  settingsMotion: MdOutput,
  speed:         MdSpeed,
  sportsEsports: MdSportsEsports,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ControlSection() {
  const [activeStage, setActiveStage] = useState(0)

  const loop = controlData.controlLoop
  const activeData = loop[activeStage]

  return (
    <div id="control">
      {/* ── 1. The Control Loop ──────────────────────────────────────── */}
      <section>
        <div>
          <p>How It Works</p>
          <h2>The Control Loop</h2>
          <p>
            Closed-loop control is a cycle that repeats continuously while a mechanism moves.
            Step through each stage to see what happens on every pass.
          </p>

          <div>
            <div>
              {loop.map((stage, i) => {
                const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
                const isActive = i === activeStage
                const isLast = i === loop.length - 1
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

            <div>
              <MdLoop size={14} />
              Then repeats every cycle
            </div>

            <div key={activeStage}>
              <p>
                Stage {activeStage + 1} of {loop.length}
              </p>
              <h3>{activeData.label} — {activeData.description}</h3>
              <p>{activeData.details}</p>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── 3. Techniques ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>In Practice</p>
          <h2>Control Techniques</h2>
          <p>
            The control loop is the foundation. On top of it, these techniques are what make the
            robot's motion smooth, fast, and easy to tune.
          </p>

          <div>
            {controlData.techniques.map((tech) => {
              const Icon = ICON_MAP[tech.iconKey] as ComponentType<{ size?: number }>
              return (
                <div key={tech.id}>
                  <div>
                    <Icon size={22} />
                  </div>
                  <h3>{tech.title}</h3>
                  <p>{tech.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
