import { useState, type ComponentType } from 'react'
import {
  MdMyLocation,
  MdTimeline,
  MdRoute,
  MdCameraEnhance,
  MdCheckCircleOutline,
  MdArrowOutward,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import autonomousData from '../../data/autonomous.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  myLocation:   MdMyLocation,
  timeline:     MdTimeline,
  route:        MdRoute,
  cameraEnhance: MdCameraEnhance,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AutonomousSection() {
  const [activeStage, setActiveStage] = useState(0)
  const pipeline = autonomousData.pipeline

  return (
    <div id="autonomous">
      {/* ── 1. Navigation Pipeline ───────────────────────────────────── */}
      <section>
        <div>
          <p>The Pipeline</p>
          <h2>How Autonomous Works</h2>
          <p>
            Four stages run together every autonomous period. Click a stage to expand it.
          </p>

          <div>
            {pipeline.map((stage, i) => {
              const Icon = ICON_MAP[stage.iconKey] as ComponentType<{ size?: number }>
              const isActive = i === activeStage
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(i)}
                  aria-expanded={isActive}
                  aria-label={stage.label}
                >
                  <div>
                    <div>
                      <Icon size={20} />
                    </div>
                    <span>0{i + 1}</span>
                    <span>{stage.label}</span>
                  </div>

                  {isActive && (
                    <div aria-hidden={!isActive}>
                      <span>
                        Stage 0{i + 1}
                      </span>
                      <h3>{stage.label}</h3>
                      <p>{stage.tagline}</p>
                      <p>{stage.description}</p>
                      <p>Key points</p>
                      <ul>
                        {stage.points.map((pt, j) => (
                          <li key={j}>
                            <MdCheckCircleOutline size={15} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      {stage.link && (
                        <a
                          href={stage.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {stage.link.label}
                          <MdArrowOutward size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
