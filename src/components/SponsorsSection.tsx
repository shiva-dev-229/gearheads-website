import sponsorsData from '../data/sponsors.json'

const logoModules = import.meta.glob('../assets/sponsor-logos/*.png', { eager: true, import: 'default' }) as Record<string, string>
const resolveLogo = (filename: string) => logoModules[`../assets/sponsor-logos/${filename}`] ?? ''

const SPONSORS = sponsorsData.map(s => ({ ...s, image: resolveLogo(s.image) }))

export default function SponsorsSection() {
  return (
    <section>
      <div>
        <h2>Our Sponsors</h2>
        <p>
          About 95% of our ~$12K annual budget comes from sponsors and grants like these —
          funding parts, fabrication, competition travel, and outreach.
        </p>

        <div>
          {SPONSORS.map((s) => {
            const hasLink = !!s.website && s.website !== 'N/A'
            const content = (
              <>
                <img src={s.image} alt={s.name} />
                <span>{s.name}</span>
              </>
            )
            return hasLink ? (
              <a key={s.name} href={s.website} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={s.name}>{content}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
