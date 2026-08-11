import { useEffect } from 'react'
import { MdClose, MdCameraAlt, MdOpenInNew } from 'react-icons/md'

export type MemberType = 'STUDENT' | 'STUDENT MENTOR' | 'COACH'

export interface TeamMember {
  id: string
  name: string
  subteam: string
  grade: string
  type?: MemberType
  photo?: string
  pronouns?: string
  seasons?: string[]
  tags?: string[]
  github?: string
  linkedin?: string
  instagram?: string
  // legacy optional — not displayed
  role?: string
  bio?: string
}

interface Props {
  member: TeamMember
  season: string
  onClose: () => void
}

export default function TeamModal({ member, season, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const allSeasons = member.seasons?.length
    ? member.seasons
    : [season]

  return (
    <div role="dialog" aria-modal="true" aria-label={member.name}>
      <div>
        {member.photo
          ? <img src={member.photo} alt={member.name} />
          : <MdCameraAlt size={44} />
        }
        {member.pronouns && <span>{member.pronouns}</span>}
      </div>

      <div>
        <button type="button" onClick={onClose} aria-label="Close">
          <MdClose size={18} />
          Close
        </button>

        <div>
          <h2>{member.name}</h2>
          <span>Grade {member.grade}</span>
        </div>

        <div>
          <span>Subteam</span>
          <ul>
            <li>{member.subteam}</li>
          </ul>
        </div>

        <div>
          <span>Seasons</span>
          <ul>
            {allSeasons.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {member.tags && member.tags.length > 0 && (
          <div>
            <span>Tags</span>
            <ul>
              {member.tags.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {(member.github || member.linkedin || member.instagram) && (
          <div>
            <span>Links</span>
            <ul>
              {member.github && (
                <li>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    GitHub
                  </a>
                </li>
              )}
              {member.linkedin && (
                <li>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    LinkedIn
                  </a>
                </li>
              )}
              {member.instagram && (
                <li>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
