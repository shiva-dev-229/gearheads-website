import type { CourseModule } from './tutorial-types'

export const courseResources = [
  {
    label: 'Full Webinar Playlist on YouTube',
    url: 'https://www.youtube.com/playlist?list=PLzROtTUW-3IVsJ7QBjEy4T3zAMEjPOz20',
  },
]

export const modules: CourseModule[] = [
  {
    id: 'session-1',
    slug: 'engineering-portfolio',
    number: '01',
    meta: '31:00',
    title: 'Webinar #1 — The Engineering Portfolio',
    description: 'What judges look for in a written engineering portfolio, and how to structure one.',
    body: [],
    youtubeId: 'dNUU8JYTxSc',
    concepts: ['Engineering portfolio', 'Documentation habits', 'Design process', 'Iteration & testing'],
  },
  {
    id: 'session-2',
    slug: 'awards-and-judging',
    number: '02',
    meta: '21:19',
    title: 'Webinar #2 — Awards and Judging',
    description: 'How the judged-award interview process works at a qualifier.',
    body: [],
    youtubeId: 'nk_HQ3JYwBY',
    concepts: ['Judged-award interviews', 'Inspire / Think / Connect', 'Team presentation'],
  },
  {
    id: 'session-3',
    slug: 'robot-reliability',
    number: '03',
    meta: '19:51',
    title: 'Webinar #3 — Robot Reliability',
    description: 'Pre-qualifier robot checkout and failure-proofing.',
    body: [],
    youtubeId: '9DzgfPTXsOw',
    concepts: ['Robot checkout', 'Failure-proofing', 'Spare-parts planning'],
  },
  {
    id: 'session-4',
    slug: 'team-roles',
    number: '04',
    meta: '16:38',
    title: 'Webinar #4 — Team Roles',
    description: 'Dividing responsibilities across the team for competition day.',
    body: [],
    youtubeId: 'n5eoneAxWnM',
    concepts: ['Competition-day roles', 'Driver / coach / pit crew', 'Scouting', 'Knowledge redundancy'],
  },
  {
    id: 'session-5',
    slug: 'packing-and-logistics',
    number: '05',
    meta: '18:22',
    title: 'Webinar #5 — Packing and Logistics',
    description: 'What to bring to a qualifier, and day-of scheduling.',
    body: [],
    youtubeId: 'dDB7PoiMAAo',
    concepts: ['Pit-box checklist', 'Toolkit', 'Day-of logistics', 'Match scheduling'],
  },
]
