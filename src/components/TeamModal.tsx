import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { MdClose, MdCameraAlt, MdOpenInNew } from 'react-icons/md'
import { theme } from '../styles/theme'
import { chipHover } from '../styles/mixins'

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

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const cardIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(14px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${overlayIn} 0.18s ease;
`

const Card = styled.div`
  background: ${theme.colors.surfaceContainerLow};
  box-shadow: ${theme.shadows.neoRaisedLg};
  border-radius: 28px;
  border: 1px solid ${theme.colors.outlineVariant}22;
  width: 100%;
  max-width: 680px;
  overflow: hidden;
  animation: ${cardIn} 0.28s cubic-bezier(0.34, 1.4, 0.64, 1);
  display: flex;
  flex-direction: column;

  @media (min-width: 560px) {
    flex-direction: row;
    min-height: 360px;
  }
`

const PhotoSide = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px 24px;
  min-height: 200px;

  @media (min-width: 560px) {
    width: 240px;
    flex-shrink: 0;
    min-height: auto;
  }
`

const Avatar = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: ${theme.colors.surfaceContainerHighest};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Pronouns = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
`

const InfoSide = styled.div`
  flex: 1;
  padding: 36px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow-y: auto;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  color: ${theme.colors.onSurfaceVariant};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.18s, box-shadow 0.18s;
  flex-shrink: 0;

  &:hover { color: ${theme.colors.onSurface}; box-shadow: ${theme.shadows.neoRaised}; }
  &:active { box-shadow: ${theme.shadows.neoInsetSm}; }
`

const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 44px;
`

const Name = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0;
  line-height: 1.1;
`

const GradeLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.65;
`

const SectionLabel = styled.span`
  display: block;
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  margin-bottom: 8px;
`

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Chip = styled.span<{ $accent?: string }>`
  font-family: ${theme.fonts.label};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent ?? theme.colors.onSurfaceVariant};
  background: ${theme.colors.background};
  padding: 7px 14px;
  border-radius: 50px;
  box-shadow: ${theme.shadows.neoRaisedSm};
  border: 1px solid ${({ $accent }) => $accent ? `${$accent}28` : `${theme.colors.outlineVariant}18`};

  ${chipHover}
`

const SocialChip = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.label};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  background: ${theme.colors.background};
  padding: 7px 14px;
  border-radius: 50px;
  box-shadow: ${theme.shadows.neoRaisedSm};
  border: 1px solid ${theme.colors.outlineVariant}18;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.18s, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    color: ${theme.colors.onSurface};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neoRaised};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.neoInsetSm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: color 0.18s, box-shadow 0.18s;
    &:hover { transform: none; }
    &:active { transform: none; }
  }
`

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
    <Overlay onClick={onClose}>
      <Card onClick={e => e.stopPropagation()}>
        <PhotoSide>
          <Avatar>
            {member.photo
              ? <AvatarImg src={member.photo} alt={member.name} />
              : <MdCameraAlt size={44} color={theme.colors.outlineVariant} style={{ opacity: 0.3 }} />
            }
          </Avatar>
          {member.pronouns && <Pronouns>{member.pronouns}</Pronouns>}
        </PhotoSide>

        <InfoSide>
          <CloseBtn onClick={onClose} aria-label="Close">
            <MdClose size={18} />
          </CloseBtn>

          <NameBlock>
            <Name>{member.name}</Name>
            <GradeLabel>Grade {member.grade}</GradeLabel>
          </NameBlock>

          <div>
            <SectionLabel>Subteam</SectionLabel>
            <ChipsRow>
              <Chip $accent={theme.colors.primary}>{member.subteam}</Chip>
            </ChipsRow>
          </div>

          <div>
            <SectionLabel>Seasons</SectionLabel>
            <ChipsRow>
              {allSeasons.map(s => (
                <Chip key={s} $accent={theme.colors.secondary}>{s}</Chip>
              ))}
            </ChipsRow>
          </div>

          {member.tags && member.tags.length > 0 && (
            <div>
              <SectionLabel>Tags</SectionLabel>
              <ChipsRow>
                {member.tags.map(t => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </ChipsRow>
            </div>
          )}

          {(member.github || member.linkedin || member.instagram) && (
            <div>
              <SectionLabel>Links</SectionLabel>
              <ChipsRow>
                {member.github && (
                  <SocialChip href={member.github} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    GitHub
                  </SocialChip>
                )}
                {member.linkedin && (
                  <SocialChip href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    LinkedIn
                  </SocialChip>
                )}
                {member.instagram && (
                  <SocialChip href={member.instagram} target="_blank" rel="noopener noreferrer">
                    <MdOpenInNew size={13} />
                    Instagram
                  </SocialChip>
                )}
              </ChipsRow>
            </div>
          )}
        </InfoSide>
      </Card>
    </Overlay>
  )
}
