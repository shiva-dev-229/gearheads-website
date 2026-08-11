import { type ComponentType } from 'react'
import {
  MdDashboard,
  MdSensors,
  MdTune,
  MdWidgets,
  MdCameraEnhance,
  MdScience,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import innovationsData from '../../data/innovations.json'

// ─── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, IconType> = {
  dashboard:     MdDashboard,
  sensors:       MdSensors,
  tune:          MdTune,
  widgets:       MdWidgets,
  cameraEnhance: MdCameraEnhance,
  science:       MdScience,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InnovationsSection() {
  return (
    <div id="innovations">
      {/* ── 1. Bento Grid ────────────────────────────────────────────── */}
      <section>
        <div>
          <p>What We've Built</p>
          <h2>Techniques &amp; Tooling</h2>
          <p>
            Each of these solves a problem we hit on the field — and each one carries forward from
            season to season.
          </p>

          <div>
            {innovationsData.innovations.map((item) => {
              const Icon = ICON_MAP[item.iconKey] as ComponentType<{ size?: number }>
              return (
                <div key={item.id}>
                  <div>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div>
                      <span>{item.tag}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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
