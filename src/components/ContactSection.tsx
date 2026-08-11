import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  MdMail,
  MdLocationOn,
  MdPhone,
  MdPrecisionManufacturing,
  MdLaptop,
  MdHandshake,
  MdCampaign,
  MdEmojiEvents,
  MdVolunteerActivism,
  MdInsights,
} from 'react-icons/md'
import contactData from '../data/contact.json'

const PATHWAY_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  precisionManufacturing: MdPrecisionManufacturing,
  laptop: MdLaptop,
  handshake: MdHandshake,
}

const BENEFIT_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  campaign: MdCampaign,
  emojiEvents: MdEmojiEvents,
  volunteerActivism: MdVolunteerActivism,
  insights: MdInsights,
}

const contactDetails = [
  { icon: <MdMail />, label: 'Email', value: 'ftcgearheads@gmail.com' },
  { icon: <MdLocationOn />, label: 'Address', value: '16900 Gebhardt Rd. Brookfield, WI 53005' },
  { icon: <MdPhone />, label: 'Phone', value: '+1 (262)-408-9209' },
]

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [reason, setReason] = useState(contactData.reasons[0].value)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    }, 1200)
  }

  return (
    <section id="contact-us">
      <h2>Get in Touch</h2>
      <p>
        Interested in sponsoring, requesting a computer, working with Production Hub, or just
        saying hi? Here's every way to reach Team #16460.
      </p>

      <div>
        {contactData.pathways.map(pathway => {
          const Icon = PATHWAY_ICONS[pathway.iconKey]
          const inner = (
            <>
              <Icon />
              <h3>{pathway.title}</h3>
              <p>{pathway.description}</p>
              <span>{pathway.cta}</span>
            </>
          )
          return pathway.type === 'link' ? (
            <Link key={pathway.id} to={pathway.to}>{inner}</Link>
          ) : (
            <a key={pathway.id} href={pathway.to}>{inner}</a>
          )
        })}
      </div>

      <div id="sponsorship">
        <h3>{contactData.sponsorship.title}</h3>
        {contactData.sponsorship.paragraphs.map(paragraph => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
        <ul>
          {contactData.sponsorship.benefits.map(benefit => {
            const Icon = BENEFIT_ICONS[benefit.iconKey]
            return (
              <li key={benefit.iconKey}>
                <Icon /> {benefit.text}
              </li>
            )
          })}
        </ul>
        <a href="#contact-form">{contactData.sponsorship.cta}</a>
      </div>

      <div>
        {contactDetails.map((item) => (
          <div key={item.label}>
            {item.icon}
            <p>{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <label>
          Reason for Contact
          <select value={reason} onChange={e => setReason(e.target.value)}>
            {contactData.reasons.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>

        <label>
          Name
          <input type="text" placeholder="Your Name" />
        </label>

        <label>
          Email
          <input type="email" placeholder="your@email.com" />
        </label>

        <label>
          Subject
          <input type="text" placeholder="How can we help?" />
        </label>

        <label>
          Message
          <textarea placeholder="Your message..." rows={4} />
        </label>

        <button type="submit" disabled={status !== 'idle'}>
          {status === 'idle' && 'Send Message'}
          {status === 'loading' && 'Sending…'}
          {status === 'success' && 'Sent!'}
        </button>
      </form>
    </section>
  )
}
