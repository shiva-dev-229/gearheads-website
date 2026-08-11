import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  title: string
  icon: ReactNode
}

export default function UnderConstruction({ title, icon }: Props) {
  return (
    <section>
      <div>{icon}</div>
      <h1>{title}</h1>
      <p>This page is under construction — check back soon.</p>
      <Link to="/">← Back to Home</Link>
    </section>
  )
}
