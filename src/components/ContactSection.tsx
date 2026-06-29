import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { MdMail, MdLocationOn, MdPhone, MdCheckCircle } from 'react-icons/md'
import { theme } from '../styles/theme'
import Loader from './Loader'

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 48px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 768px) {
    padding: 64px ${theme.spacing.marginDesktop};
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
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 40px;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
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
    <Section id="contact-us">
      <SectionHeader>
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionSubtitle>
          Interested in sponsoring, joining, or collaborating with Team #16460? We'd love to hear from you.
        </SectionSubtitle>
      </SectionHeader>

      <ContactBody>
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
