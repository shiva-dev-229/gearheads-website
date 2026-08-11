import { Link } from 'react-router-dom'
import { MdCheckCircle } from 'react-icons/md'
import robotImg from '../assets/photos/home/robot-removebg-preview.png'

const FACTS = [
  '100% CAD-first design in Onshape — no part is fabricated before a full CAD review',
  'FMEA and Monte Carlo simulation catch failure modes before the build, not after',
  'CNC-milled aluminum, 3D-printed mechanisms — nearly the whole robot made in-house',
  "GE HealthCare's Design History File framework, adapted for a competition robot",
]

export default function RobotShowcase() {
  return (
    <section>
      <div>
        <img src={robotImg} alt="Gearheads FTC robot" />
      </div>

      <div>
        <h2>Built In-House, Season After Season</h2>
        <p>
          DECODE, our current season, runs on a 100% custom-fabricated robot — the third full
          iteration this year alone. Every subsystem follows the same Define / Hypothesize /
          Fabricate engineering process we've used since POWERPLAY.
        </p>

        <div>
          {FACTS.map((f) => (
            <div key={f}>
              <MdCheckCircle size={18} />
              <span>{f}</span>
            </div>
          ))}
        </div>

        <Link to="/engineering">See our engineering process →</Link>
      </div>
    </section>
  )
}
