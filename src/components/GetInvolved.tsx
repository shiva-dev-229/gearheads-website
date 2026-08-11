import { Link } from 'react-router-dom'

const PATHS = [
  {
    title: 'Students',
    desc: "Grades 6–12, Brookfield/Elmbrook area. No experience required — join Mechanical, Software, Strategy & Docs, or Outreach.",
    to: '/join',
    label: 'Join the team →',
  },
  {
    title: 'Mentors',
    desc: 'Bring industry experience to a student-led team. Technical, business, and outreach mentors are all welcome.',
    to: '/contact',
    label: 'Get in touch →',
  },
  {
    title: 'Sponsors',
    desc: 'About 95% of our budget comes from sponsors and grants — funding parts, fabrication, travel, and outreach.',
    to: '/contact#sponsorship',
    label: 'Sponsor us →',
  },
]

export default function GetInvolved() {
  return (
    <section>
      <h2>Get Involved</h2>
      <p>Three ways to be part of Team #16460.</p>

      <div>
        {PATHS.map((p) => (
          <Link key={p.title} to={p.to}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <span>{p.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
