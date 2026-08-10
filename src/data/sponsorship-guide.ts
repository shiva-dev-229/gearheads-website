import type { CourseModule } from './tutorial-types'

export const courseResources = [
  {
    label: 'FIRST — Fundraising & Sponsorship Guide',
    url: 'https://www.firstinspires.org/resource-library/ftc/team-fundraising-resources',
  },
]

export const modules: CourseModule[] = [
  {
    id: 'module-1',
    slug: 'why-sponsors-say-yes',
    number: '01',
    title: 'Why Sponsors Actually Say Yes',
    description: 'The mindset shift that makes the rest of this guide work.',
    body: [
      "Most rookie teams treat sponsorship like a fundraiser: they ask for money and hope someone feels generous. That works maybe once. What actually gets you a second and third season of support is treating it like a trade — you're offering something back, not just asking for a check.",
      "A local business gets its name on a robot that shows up at a public event, a mention on your team Instagram, a line on your pit-display banner, and a genuine story about local kids doing real engineering. A parent's employer often has a matching-donation or STEM-outreach budget that's already sitting there unused — you're not asking them to dig into their own pocket, you're helping them spend money they already have earmarked.",
      "Before you write a single email, decide what you can realistically offer in return: logo placement, social shoutouts, a thank-you at your qualifier, an invite to see the robot in person. Write that list down first. It'll shape everything else — your pitch, your email, and who you approach.",
    ],
    tip: "Money isn't the only ask. In-kind donations (machine shop time, printer filament, office space for a build night, a truck to haul the robot cart) solve real problems and cost the giver less to say yes to.",
    concepts: ['Value exchange', 'In-kind donations', 'Matching gifts', 'Sponsor mindset'],
  },
  {
    id: 'module-2',
    slug: 'building-your-list',
    number: '02',
    title: 'Building Your List',
    description: 'Where to find businesses that are actually likely to say yes.',
    body: [
      "Start close to home. Every team member's parent or guardian works somewhere — ask what their employer's community-giving or STEM programs look like. This is by far your highest-odds source, because there's already a relationship and, often, a budget line for exactly this.",
      "Next, look at businesses your team already touches: the print shop that makes your banners, the hardware store where you buy stock material, the engineering or manufacturing companies within a short drive of your school. Local, not national — a regional office can approve a $500 sponsorship on the spot; a national HQ has to route it through five people.",
      "Keep a simple spreadsheet: business name, contact person, how you're connected to them, what you're asking for, and status (not contacted / emailed / meeting set / declined / sponsor). This sounds obvious, but it's the difference between a real campaign and a scattered pile of emails nobody follows up on.",
    ],
    tip: "Ask your coaches and mentors who they know. A warm introduction from an adult the business already trusts will out-perform a cold email from a 15-year-old every time.",
    concepts: ['Warm leads', 'Local businesses', 'Employer matching', 'Sponsor tracking sheet'],
  },
  {
    id: 'module-3',
    slug: 'getting-your-pitch-ready',
    number: '03',
    title: 'Getting Your Pitch Ready',
    description: 'The one page and the one story you need before you advertise yourselves.',
    body: [
      "Before you approach anyone, build a single-page team profile: who you are, your team number, your results, what the money funds, and what the sponsor gets back. Keep it to one page — a business owner skimming between meetings will read one page and ignore five.",
      "Advertising yourselves isn't about a big marketing push — it's about being visible in the places a future sponsor might already be looking. Post your competition results and build progress on Instagram or wherever your team already posts. Show up at community events (maker faires, library demos, school nights) with the robot running — a business owner who sees your robot in person before you ever ask for money is a much easier yes.",
      "Bring the robot, or at least good photos and video of it, to every conversation. People sponsor what they can picture, and 'a robotics team' is abstract — a 40-pound machine driving across a table is not.",
    ],
    tip: "Put your sponsors' logos somewhere public — your site, your pit banner, your social bio — as soon as they say yes. Seeing themselves already represented is what turns a one-time donor into a repeat one.",
    concepts: ['One-page pitch', 'Team visibility', 'Community events', 'Social proof'],
  },
  {
    id: 'module-4',
    slug: 'writing-the-email',
    number: '04',
    title: 'Writing the Email',
    description: 'A structure that gets read, plus what to avoid.',
    body: [
      "Keep it under 200 words. A sponsorship email is not the place to tell your team's whole history — it's the place to earn a reply. Subject line should say exactly what this is: something like \"Local FTC Robotics Team — Quick Sponsorship Ask\" beats anything vague or cute.",
      "Structure: one line on who you are and your connection to them (mention the parent/employee by name if that's your in), one line on what you're asking for and by when, two or three lines on what they get in return, and a clear next step (\"Could we grab 15 minutes on a call, or would you rather I just send our one-pager?\"). Attach the one-page profile from the last lesson — don't make them ask for it.",
      "Write it yourself, in your own voice. A generic AI-drafted form letter reads exactly like what it is, and a business owner who gets a dozen of those a week can tell instantly. The personal detail — why you specifically reached out to them — is the part that can't be templated, so make sure it's actually in there.",
    ],
    tip: "Always send from a real name, not \"FTC Team #12345.\" People reply to people. Have one or two students who are comfortable writing be the ones who send these, and have a mentor proofread before it goes out.",
    concepts: ['Email structure', 'Subject lines', 'Personalization', 'Clear ask'],
  },
  {
    id: 'module-5',
    slug: 'following-up',
    number: '05',
    title: 'Following Up (Without Being Annoying)',
    description: 'What happens after you hit send — for both a yes and a silence.',
    body: [
      "No reply in a week is normal, not a rejection. Send one polite follow-up — a single line, not a repeat of your original email — about a week later. If there's still nothing after that, move on and check back next season. Badgering a business that hasn't responded burns the relationship for future years.",
      "When someone says yes, thank them immediately, then follow through on every single thing you promised: the logo goes up, the social post goes out, the invite to see the robot actually gets sent. This is the step teams skip most often, and it's the reason so many sponsors don't renew.",
      "At the end of the season, send every sponsor a short recap — what the team accomplished, a photo, a genuine thank-you — even the ones who only gave a small amount. That email is what turns a one-season donor into a five-season one, and it costs you fifteen minutes to write.",
    ],
    tip: "Set a calendar reminder to send season-end thank-yous. It's the easiest, highest-return five minutes of the entire sponsorship process, and it's the first thing that gets forgotten in the post-competition rush.",
    concepts: ['Follow-up cadence', 'Sponsor care', 'Season recap', 'Renewal'],
  },
]
