export interface GuideSection {
  id: string
  number: string
  title: string
  description: string
  body: string[]
  tip: string
}

export const courseResources = [
  {
    label: 'FIRST — Fundraising & Sponsorship Guide',
    url: 'https://www.firstinspires.org/resource-library/ftc/team-fundraising-resources',
  },
]

export const sections: GuideSection[] = [
  {
    id: 'why-sponsors-say-yes',
    number: '01',
    title: 'Why Sponsors Actually Say Yes',
    description: 'The mindset shift that makes the rest of this guide work.',
    body: [
      "Treat sponsorship like a trade, not a favor — a business gets logo placement, social shoutouts, and a real story about local kids doing engineering. Decide what you can offer before you write a single email; it shapes everything else.",
    ],
    tip: "Money isn't the only ask — shop time, filament, or a truck for competition day cost less to say yes to.",
  },
  {
    id: 'building-your-list',
    number: '02',
    title: 'Building Your List',
    description: 'Where to find businesses that are actually likely to say yes.',
    body: [
      "Start with parents and guardians — ask about their employer's community-giving programs. It's your highest-odds lead. Then look at businesses your team already touches: your print shop, hardware store, local manufacturers. Local beats national; a regional office can say yes on the spot.",
    ],
    tip: 'Ask your mentors who they know. A warm introduction beats a cold email every time.',
  },
  {
    id: 'getting-your-pitch-ready',
    number: '03',
    title: 'Getting Your Pitch Ready',
    description: 'The one page and the one story you need before you approach anyone.',
    body: [
      "Build a one-page team profile — who you are, your results, what the money funds, what the sponsor gets back. Then show up where sponsors already are: maker faires, demos, school nights, robot in hand. People sponsor what they can picture.",
    ],
    tip: "Put sponsor logos up publicly as soon as they say yes — it's what turns a one-time donor into a repeat one.",
  },
  {
    id: 'writing-the-email',
    number: '04',
    title: 'Writing the Email',
    description: 'A structure that gets read.',
    body: [
      "Keep it under 200 words: who you are, what you're asking for, what they get back, and a clear next step. Attach your one-pager so they don't have to ask. The template below has the boilerplate done — you're just filling in the sponsor.",
    ],
    tip: 'Send from a real name, not "FTC Team #12345." People reply to people.',
  },
  {
    id: 'following-up',
    number: '05',
    title: 'Following Up (Without Being Annoying)',
    description: 'What happens after you hit send.',
    body: [
      "No reply in a week is normal — send one short follow-up, then move on. When someone says yes, thank them immediately and follow through on everything you promised; that's the step most teams skip. At season's end, send every sponsor a short recap.",
    ],
    tip: "Set a calendar reminder for season-end thank-yous — the highest-return five minutes of the whole process.",
  },
]

export const emailTemplate = {
  subject: 'Local FTC Robotics Team — Quick Sponsorship Ask',
  greeting: 'Hi [CONTACT NAME],',
  paragraphs: [
    "My name is [YOUR NAME], a student on FTC Team #16460, the GEarheads — a student-led robotics team in Brookfield, Wisconsin. I'm reaching out to [COMPANY NAME] because [WHAT THEY DO IN THE COMMUNITY].",
    'Each season we design and build a competition robot from scratch. Right now we need [WHAT YOU NEED]. In return, [COMPANY NAME] would get [WHAT YOU PROVIDE].',
    'Would you be open to a quick 15-minute call, or should I send our one-page team profile?',
  ],
  signoff: 'Thanks for considering it,\n[YOUR NAME]\nFTC Team #16460 — GEarheads',
}
