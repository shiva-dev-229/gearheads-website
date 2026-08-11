import type { ComponentType } from 'react'
import { MdEmojiEvents, MdVolunteerActivism, MdSchool, MdEco } from 'react-icons/md'
import aboutData from '../data/about.json'

const PILLAR_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  build: MdEmojiEvents,
  volunteerActivism: MdVolunteerActivism,
  school: MdSchool,
  eco: MdEco,
}

export default function FeaturesGrid() {
  return (
    <section>
      <h2>What We Do</h2>
      <p>
        Team #16460, the Gearheads — a student-led FTC team from Brookfield, Wisconsin, since
        2017. We compete for World Championships, run outreach we treat as identity-defining
        rather than optional, and grow the next generation of engineers along the way.
      </p>

      <div>
        {aboutData.pillars.map((p) => {
          const Icon = PILLAR_ICONS[p.iconKey]
          return (
            <article key={p.title}>
              <Icon size={22} />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <p><strong>{p.stat}</strong> {p.statLabel}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
