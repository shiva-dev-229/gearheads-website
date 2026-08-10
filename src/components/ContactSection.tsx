import { useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import {
  MdMail,
  MdLocationOn,
  MdPhone,
  MdCheckCircle,
  MdPrecisionManufacturing,
  MdLaptop,
  MdHandshake,
  MdCampaign,
  MdEmojiEvents,
  MdVolunteerActivism,
  MdInsights,
  MdArrowForward,
  MdExpandMore,
} from 'react-icons/md'
import { theme } from '../styles/theme'
import Loader from './Loader'
import FadeIn from './reactbits/FadeIn'
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

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 36px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop};
  }
`

const SectionHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 34px;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
`

const PathwaysGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const PathwayCard = styled.div<{ $span?: 2 }>`
  position: relative;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
  }

  @media (min-width: 560px) {
    grid-column: ${({ $span }) => ($span === 2 ? 'span 2' : 'span 1')};
    border-radius: 24px;
    padding: 32px;
  }

  @media (min-width: 1024px) {
    grid-column: ${({ $span }) => ($span === 2 ? 'span 2' : 'span 1')};

    &::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: radial-gradient(
        400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(173, 198, 255, 0.1),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
      z-index: 0;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`

const PathwayIconWrap = styled.div`
  position: relative;
  z-index: 1;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 22px;
  flex-shrink: 0;
`

const PathwayTitle = styled.h3`
  position: relative;
  z-index: 1;
  font-family: ${theme.fonts.headline};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: ${theme.colors.onSurface};
`

const PathwayText = styled.p`
  position: relative;
  z-index: 1;
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  flex: 1;
`

const PathwayCtaRow = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.primary};

  svg {
    transition: transform 0.2s;
  }

  ${PathwayCard}:hover & svg {
    transform: translateX(4px);
  }
`

const SponsorshipSection = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  scroll-margin-top: 96px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`

const SponsorshipTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`

const SponsorshipGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const SponsorshipCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1.2;

  p {
    font-family: ${theme.fonts.body};
    font-size: 15px;
    line-height: 1.7;
    color: ${theme.colors.onSurfaceVariant};
  }
`

const BenefitsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  list-style: none;
`

const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`

const BenefitIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.secondary};
  font-size: 17px;
  flex-shrink: 0;
`

const BenefitText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.55;
  color: ${theme.colors.onSurfaceVariant};
  padding-top: 6px;
`

const SponsorshipCtaButton = styled.button`
  align-self: flex-start;
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  background: ${theme.colors.background};
  color: ${theme.colors.primary};
  box-shadow: ${theme.shadows.neoButtonPrimary};
  transition: box-shadow 0.2s;
  cursor: pointer;

  &:active {
    box-shadow: ${theme.shadows.neoButtonPrimaryActive};
  }
`

const ContactBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`

const InfoCard = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`

const InfoIconWrap = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`

const InfoLabel = styled.p<{ $color: string }>`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: 4px;
`

const InfoValue = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurface};
`

const FormCard = styled.div`
  position: relative;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 24px;
  padding: 32px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(ellipse 60% 40% at 90% 10%, ${theme.colors.secondary}07, transparent 70%),
      radial-gradient(ellipse 60% 40% at 10% 90%, ${theme.colors.primary}07, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`

const FormInner = styled.div`
  position: relative;
  z-index: 1;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const FieldGroup = styled.div<{ $full?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};
  }
`

const FieldLabel = styled.label`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  margin-left: 8px;
`

const inputBase = `
  width: 100%;
  background: transparent;
  box-shadow: inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e;
  border-radius: 12px;
  border: none;
  padding: 16px;
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 16px;
  transition: box-shadow 0.25s;

  &::placeholder {
    color: ${theme.colors.onSurfaceVariant}4d;
  }

  &:hover:not(:focus) {
    box-shadow: inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e,
      0 0 0 1px ${theme.colors.outlineVariant}44;
  }

  &:focus {
    box-shadow: inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e,
      0 0 0 2px ${theme.colors.secondary}22, 0 0 0 1px ${theme.colors.secondary}40;
    outline: none;
  }
`

const Input = styled.input`${inputBase}`
const Textarea = styled.textarea`
  ${inputBase}
  resize: none;
`

const SelectWrap = styled.div`
  position: relative;
`

const Select = styled.select`
  ${inputBase}
  appearance: none;
  cursor: pointer;
  padding-right: 44px;
`

const SelectChevron = styled(MdExpandMore)`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: ${theme.colors.onSurfaceVariant};
  font-size: 20px;
  pointer-events: none;
`

const shimmer = keyframes`
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
`

const SubmitButton = styled.button<{ $status: 'idle' | 'loading' | 'success' }>`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${({ $status }) =>
    $status === 'success'
      ? theme.colors.surfaceContainerLow
      : theme.colors.background};
  color: ${({ $status }) =>
    $status === 'success'
      ? theme.colors.secondary
      : theme.colors.primary};
  box-shadow: ${({ $status }) =>
    $status !== 'idle'
      ? theme.shadows.neoButtonPrimaryActive
      : theme.shadows.neoButtonPrimary};
  transition: all 0.3s;
  margin-top: 8px;
  cursor: ${({ $status }) => ($status !== 'idle' ? 'default' : 'pointer')};

  &:hover:not(:disabled) {
    background-image: ${({ $status }) =>
      $status === 'idle'
        ? `linear-gradient(90deg, transparent, ${theme.colors.primary}18, transparent)`
        : 'none'};
    background-size: 200% auto;
    animation: ${({ $status }) => ($status === 'idle' ? shimmer : 'none')} 1.2s linear;
  }

  &:active:not(:disabled) {
    box-shadow: ${theme.shadows.neoButtonPrimaryActive};
  }

  @media (min-width: 768px) {
    grid-column: 1 / -1;
  }
`

const contactDetails = [
  {
    icon: <MdMail />,
    label: 'Email',
    value: 'ftcgearheads@gmail.com',
    color: theme.colors.primary,
  },
  {
    icon: <MdLocationOn />,
    label: 'Address',
    value: '16900 Gebhardt Rd. Brookfield, WI 53005',
    color: theme.colors.secondary,
  },
  {
    icon: <MdPhone />,
    label: 'Phone',
    value: '+1 (262)-408-9209',
    color: theme.colors.tertiary,
  },
]

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [reason, setReason] = useState(contactData.reasons[0].value)
  const formRef = useRef<HTMLDivElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    }, 1200)
  }

  function goToFormAs(value: string) {
    setReason(value)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handlePathwayMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <Section id="contact-us">
      <SectionHeader>
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionSubtitle>
          Interested in sponsoring, requesting a computer, working with Production Hub, or just
          saying hi? Here's every way to reach Team #16460.
        </SectionSubtitle>
      </SectionHeader>

      <FadeIn>
        <PathwaysGrid>
          {contactData.pathways.map(pathway => {
            const Icon = PATHWAY_ICONS[pathway.iconKey]
            const cardProps = {
              $span: pathway.span === 2 ? (2 as const) : undefined,
              onMouseMove: handlePathwayMouseMove,
            }
            const inner = (
              <>
                <PathwayIconWrap>
                  <Icon />
                </PathwayIconWrap>
                <PathwayTitle>{pathway.title}</PathwayTitle>
                <PathwayText>{pathway.description}</PathwayText>
                <PathwayCtaRow>
                  {pathway.cta} <MdArrowForward />
                </PathwayCtaRow>
              </>
            )
            return pathway.type === 'link' ? (
              <PathwayCard key={pathway.id} as={Link} to={pathway.to} {...cardProps}>
                {inner}
              </PathwayCard>
            ) : (
              <PathwayCard key={pathway.id} as="a" href={pathway.to} {...cardProps}>
                {inner}
              </PathwayCard>
            )
          })}
        </PathwaysGrid>
      </FadeIn>

      <FadeIn>
        <SponsorshipSection id="sponsorship">
          <SponsorshipTitle>{contactData.sponsorship.title}</SponsorshipTitle>
          <SponsorshipGrid>
            <SponsorshipCopy>
              {contactData.sponsorship.paragraphs.map(paragraph => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </SponsorshipCopy>
            <BenefitsList>
              {contactData.sponsorship.benefits.map(benefit => {
                const Icon = BENEFIT_ICONS[benefit.iconKey]
                return (
                  <BenefitItem key={benefit.iconKey}>
                    <BenefitIconWrap>
                      <Icon />
                    </BenefitIconWrap>
                    <BenefitText>{benefit.text}</BenefitText>
                  </BenefitItem>
                )
              })}
            </BenefitsList>
          </SponsorshipGrid>
          <SponsorshipCtaButton type="button" onClick={() => goToFormAs('sponsorship')}>
            {contactData.sponsorship.cta}
          </SponsorshipCtaButton>
        </SponsorshipSection>
      </FadeIn>

      <ContactBody ref={formRef}>
        <InfoCard>
          {contactDetails.map((item) => (
            <InfoItem key={item.label}>
              <InfoIconWrap style={{ color: item.color }}>{item.icon}</InfoIconWrap>
              <div>
                <InfoLabel $color={item.color}>{item.label}</InfoLabel>
                <InfoValue>{item.value}</InfoValue>
              </div>
            </InfoItem>
          ))}
        </InfoCard>

        <FormCard>
          <FormInner>
            <Form onSubmit={handleSubmit}>
              <FieldGroup $full>
                <FieldLabel>Reason for Contact</FieldLabel>
                <SelectWrap>
                  <Select value={reason} onChange={e => setReason(e.target.value)}>
                    {contactData.reasons.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </Select>
                  <SelectChevron />
                </SelectWrap>
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Name</FieldLabel>
                <Input type="text" placeholder="Your Name" />
              </FieldGroup>

              <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="your@email.com" />
              </FieldGroup>

              <FieldGroup $full>
                <FieldLabel>Subject</FieldLabel>
                <Input type="text" placeholder="How can we help?" />
              </FieldGroup>

              <FieldGroup $full>
                <FieldLabel>Message</FieldLabel>
                <Textarea placeholder="Your message..." rows={4} />
              </FieldGroup>

              <SubmitButton type="submit" $status={status} disabled={status !== 'idle'}>
                {status === 'idle' && 'Send Message'}
                {status === 'loading' && <><Loader size={16} /> Sending…</>}
                {status === 'success' && <><MdCheckCircle /> Sent!</>}
              </SubmitButton>
            </Form>
          </FormInner>
        </FormCard>
      </ContactBody>
    </Section>
  )
}
