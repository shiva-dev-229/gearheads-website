import { Link } from 'react-router-dom'
import rawEntries from '../data/timeline.json'

export default function Timeline() {
  return (
    <section>
      <h2>Timeline</h2>
      <p>A decade of FIRST robotics, engineering growth, and outreach.</p>

      <div>
        {rawEntries.map((entry) => (
          <Link key={entry.title} to={entry.path}>
            <div>{entry.year}</div>
            <h3>{entry.title}</h3>
            <p>{entry.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
