import { useState, type ComponentType } from 'react'
import {
  MdFlag,
  MdArchitecture,
  MdBuild,
  MdAutorenew,
  MdExpandMore,
  MdCameraAlt,
  MdComputer,
  MdPeople,
  MdSchema,
} from 'react-icons/md'
import cadData from '../../data/cad.json'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const WORKFLOW_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  MdFlag:        MdFlag,
  MdArchitecture: MdArchitecture,
  MdBuild:       MdBuild,
  MdAutorenew:   MdAutorenew,
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CadSection() {
  const [openLesson, setOpenLesson] = useState<string | null>(null)

  const onshapeFacts = [
    {
      iconKey: 'computer',
      icon: <MdComputer size={18} />,
      title: 'Web-Based — Runs on Chromebooks',
      body: 'Onshape is the main CAD software the team uses. Because it is entirely web-based, every team member can open and edit the model from a school-issued Chromebook — no local installation or hardware upgrade required.',
    },
    {
      iconKey: 'people',
      icon: <MdPeople size={18} />,
      title: 'Real-Time Multi-Member Collaboration',
      body: 'Multiple members design subsystems simultaneously in the same document. Onshape handles live merges, so the mechanical lead and the drivetrain lead can work in the same assembly at the same time.',
    },
    {
      iconKey: 'schema',
      icon: <MdSchema size={18} />,
      title: 'Joints Define Motion',
      body: 'The team organizes every CAD design into subsystems and uses joints to define how parts move. This confirms that moving parts have enough space and allows the team to experiment with more complex features like linkages.',
    },
  ]

  return (
    <div id="cad">

      {/* ── Onshape ──────────────────────────────────────── */}
      <section>
        <div>
          <div>Our CAD Platform</div>
          <h2>Why Onshape?</h2>
          <p>
            Web-based, real-time, and accessible from any Chromebook. The platform the whole
            team can use without friction.
          </p>

          <div>
            <div>
              {onshapeFacts.map((fact) => (
                <div key={fact.iconKey}>
                  <div>{fact.icon}</div>
                  <div>
                    <span>{fact.title}</span>
                    <span>{fact.body}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <MdCameraAlt size={22} />
              <span>cad-screen</span>
              <span>Onshape open with subsystem model — robot assembly view</span>
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* ── 100% CAD Workflow ─────────────────────────────── */}
      <section>
        <div>
          <div>Design Process</div>
          <h2>100% CAD Workflow</h2>
          <p>
            The whole robot is CAD-designed in the first few weeks after kickoff. Software and
            mechanical development run in parallel — each subsystem has a CAD model before any
            part is cut.
          </p>

          <div>
            {cadData.workflowSteps.map((step, i) => {
              const Icon = WORKFLOW_ICONS[step.iconKey]
              return (
                <div key={step.id}>
                  <span>Phase {String(i + 1).padStart(2, '0')}</span>
                  <div>
                    {Icon && <Icon size={20} />}
                  </div>
                  <span>{step.title}</span>
                  <p>{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <hr />

      {/* ── Lessons Learned ──────────────────────────────── */}
      <section>
        <div>
          <div>Lessons Learned</div>
          <h2>What We Discovered</h2>
          <p>
            Integration and version-control insights built up over multiple seasons of 100%
            CAD-first development.
          </p>

          <div>
            {cadData.lessons.map((lesson, i) => {
              const isOpen = openLesson === lesson.id
              const num = String(i + 1).padStart(2, '0')
              return (
                <div key={lesson.id}>
                  <button
                    onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                    aria-expanded={isOpen}
                  >
                    <span>{num}</span>
                    <span>{lesson.title}</span>
                    <span>
                      <MdExpandMore />
                    </span>
                  </button>

                  {isOpen && (
                    <div>
                      <hr />
                      <p>{lesson.body}</p>
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
