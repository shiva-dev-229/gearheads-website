import { useState, type ComponentType } from 'react'
import {
  MdBuild,
  MdArchitecture, MdCheckCircle,
  MdMemory, MdLayers, MdHardware,
  MdTune, MdOutlineSquareFoot, MdOpenInNew,
} from 'react-icons/md'
import manufacturingData from '../../data/manufacturing.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const MACHINE_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  build:        MdBuild,
  precision:    MdTune,
  area:         MdOutlineSquareFoot,
  layers:       MdLayers,
  hardware:     MdHardware,
}

const PROCESS_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  architecture: MdArchitecture,
  settings:     MdTune,
  build:        MdBuild,
  check:        MdCheckCircle,
}

// ─── Type for machine (handles optional externalLink) ─────────────────────────

type ExternalLinkType = { url: string; label: string }
type Machine = {
  id: string
  label: string
  fullName: string
  iconKey: string
  colorKey: string
  tagline: string
  description: string
  externalLink?: ExternalLinkType
  makes: string[]
  materials: string[]
  photoLabel: string
  photoHint: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ManufacturingSection() {
  const [activeMachine, setActiveMachine] = useState(manufacturingData.machines[0].id)

  const { fabStat, processSteps, productionHub } = manufacturingData

  function selectMachine(id: string) {
    if (id === activeMachine) return
    setActiveMachine(id)
  }

  return (
    <div id="manufacturing">

      {/* ── Machine Selector ── */}
      <section>
        <div>
          <div>Machine Shop</div>

          <h2>The shop floor.</h2>
          <p>
            Three CNC mills and a 3D printing station — each filling a different role in the
            build pipeline. Select a machine to see what it makes, what it cuts, and why the
            team uses it.
          </p>

          <div role="list" aria-label="Machine roster">
            {manufacturingData.machines.map(m => {
              const machineTyped = m as Machine
              const Icon = MACHINE_ICONS[m.iconKey] ?? MdBuild
              const isActive = m.id === activeMachine
              return (
                <div
                  key={m.id}
                  onClick={() => selectMachine(m.id)}
                  role="listitem"
                  aria-label={`Select ${machineTyped.fullName}`}
                >
                  <div>
                    <div>
                      <Icon size={17} />
                    </div>
                    <span>{m.label}</span>
                  </div>

                  {isActive && (
                    <div>
                      <div>
                        <span>
                          <MdMemory size={12} />
                          {m.label}
                        </span>
                        <h3>{machineTyped.fullName}</h3>
                        <p>{machineTyped.tagline}</p>
                      </div>

                      <div>
                        <div>
                          <p>What it makes</p>
                          <ul>
                            {machineTyped.makes.map(item => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>

                          <p>Materials</p>
                          <div>
                            {machineTyped.materials.map(mat => (
                              <span key={mat}>{mat}</span>
                            ))}
                          </div>

                          {machineTyped.externalLink && (
                            <a
                              href={machineTyped.externalLink.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${machineTyped.externalLink.label} in a new tab`}
                            >
                              <MdOpenInNew size={11} />
                              {machineTyped.externalLink.label}
                            </a>
                          )}
                        </div>

                        <div>
                          <p>About this station</p>
                          <p>{machineTyped.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <hr />

      {/* ── Custom-fabrication stat ── */}
      <section>
        <div>
          <div>Custom Fabrication</div>

          <div>
            <div>
              <div>
                <div>~{fabStat.rangeHigh}%</div>
                <p>Custom-Fabricated Parts — recent seasons</p>
                <p>{fabStat.context}</p>
              </div>

              <div>
                <p>
                  <strong>Production Hub:</strong> {productionHub.description}
                </p>
              </div>
            </div>

            <div>
              <div>
                <div>
                  <span>Freight Frenzy 2021–22</span>
                  <span>~{fabStat.rangeLow}%</span>
                </div>
                <div>
                  <div />
                </div>
              </div>

              <div>
                <div>
                  <span>POWERPLAY 2022–23</span>
                  <span>~100%</span>
                </div>
                <div>
                  <div />
                </div>
              </div>

              <div>
                <div>
                  <span>CENTERSTAGE 2023–24</span>
                  <span>~100%</span>
                </div>
                <div>
                  <div />
                </div>
              </div>

              <div>
                <div>
                  <span>Into the Deep 2024–25</span>
                  <span>100%</span>
                </div>
                <div>
                  <div />
                </div>
              </div>

              <div>
                <div>
                  <span>DECODE 2025–26 (3 iterations)</span>
                  <span>100%</span>
                </div>
                <div>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── Process Flow ── */}
      <section>
        <div>
          <div>Build Pipeline</div>

          <h2>From file to field.</h2>
          <p>
            Every part follows the same path — from a fully-constrained CAD model
            through toolpath generation, then onto the appropriate machine, and
            finally into the assembled robot.
          </p>

          <div>
            {processSteps.map((step, i) => {
              const Icon = PROCESS_ICONS[step.iconKey] ?? MdBuild
              return (
                <div key={step.id}>
                  <span>Step {String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <Icon size={20} />
                  </div>
                  <h4>{step.label}</h4>
                  <p>{step.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
