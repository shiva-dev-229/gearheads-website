import { useState } from 'react'
import { MdHandshake, MdMailOutline, MdOpenInNew } from 'react-icons/md'
import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { sections, courseResources, emailTemplate } from '../../data/sponsorship-guide'

// ─── Page shell ────────────────────────────────────────────────────────────────

const PageRoot = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 40px ${theme.spacing.marginMobile} 96px;

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop} 120px;
  }
`

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = styled.div`
  margin: 0 0 56px;
`

const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

const EyebrowIconWell = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: ${theme.colors.primary}18;
  border: 1px solid ${theme.colors.primary}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const EyebrowLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.12em;
`

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${theme.colors.onSurface};
  margin: 0 0 14px;

  @media (min-width: 768px) {
    font-size: 44px;
  }
`

const HeroSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

// ─── Guide sections (flat article flow, no per-section cards) ─────────────────

const GuideList = styled.div``

const GuideSectionEl = styled.article`
  & + & {
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid ${theme.colors.outlineVariant}26;
  }
`

const GuideHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 6px;
`

const GuideNumber = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: ${theme.colors.secondary};
  flex-shrink: 0;
`

const GuideTitle = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
  color: ${theme.colors.onSurface};
  margin: 0;

  @media (min-width: 768px) {
    font-size: 23px;
  }
`

const GuideDescription = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13.5px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 16px;
`

const GuideBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurface};
  margin: 0 0 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const TipCallout = styled.div`
  border-left: 3px solid ${theme.colors.secondary}cc;
  border-radius: 0 10px 10px 0;
  padding: 14px 20px;
  margin: 20px 0 0;
  background: ${theme.colors.surfaceContainerLow};
`

const TipLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
  display: block;
`

const TipText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  color: ${theme.colors.onSurfaceVariant};
  line-height: 1.6;
  margin: 0;
`

// ─── Email template section ────────────────────────────────────────────────────

const TemplateSection = styled.div`
  margin-top: 56px;
  padding-top: 48px;
  border-top: 1px solid ${theme.colors.outlineVariant}26;
`

const TemplateHeading = styled.h2`
  font-family: ${theme.fonts.display};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 8px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`

const TemplateIntro = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14.5px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 24px;
`

const EmailOuter = styled.div`
  background: ${theme.colors.surfaceContainerLowest};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${theme.colors.outlineVariant}26;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}44;
    box-shadow: 0 0 0 1px ${theme.colors.primary}16, 0 0 28px ${theme.colors.primary}10;
  }
`

const EmailHeader = styled.div`
  background: ${theme.colors.surfaceContainerHigh};
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const EmailHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.onSurfaceVariant};
`

const EmailHeaderLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const CopyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.08em;
  color: ${theme.colors.onSurfaceVariant};
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`

const EmailBody = styled.div`
  padding: 24px 28px 28px;
`

const EmailSubjectRow = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.outlineVariant}26;
`

const EmailSubjectLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.onSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
`

const EmailSubjectValue = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.onSurface};
`

const EmailParagraph = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurface};
  margin: 0 0 18px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const EmailSignoff = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.8;
  color: ${theme.colors.onSurface};
  white-space: pre-line;
  margin: 18px 0 0;
`

const Placeholder = styled.span`
  font-weight: 600;
  color: ${theme.colors.primary};
  background: ${theme.colors.primary}14;
  border-radius: 5px;
  padding: 1px 5px;
`

const PLACEHOLDER_RE = /(\[[A-Z ]+\])/g

function renderWithPlaceholders(text: string) {
  return text.split(PLACEHOLDER_RE).map((chunk, i) =>
    PLACEHOLDER_RE.test(chunk) ? (
      <Placeholder key={i}>{chunk}</Placeholder>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  )
}

function buildPlainTextEmail() {
  return [
    `Subject: ${emailTemplate.subject}`,
    '',
    emailTemplate.greeting,
    '',
    ...emailTemplate.paragraphs.flatMap(p => [p, '']),
    emailTemplate.signoff,
  ].join('\n')
}

// ─── Resources footer ──────────────────────────────────────────────────────────

const ResourcesSection = styled.div`
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid ${theme.colors.outlineVariant}26;
`

const ResourcesLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  color: ${theme.colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 12px;
`

const ResourceLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background: ${theme.colors.surfaceContainerLow};
  color: ${theme.colors.onSurface};
  font-family: ${theme.fonts.body};
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.primary};
  }
`

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SponsorshipGuidePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(buildPlainTextEmail())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <PageRoot>
      <Hero>
        <Eyebrow>
          <EyebrowIconWell>
            <MdHandshake size={17} />
          </EyebrowIconWell>
          <EyebrowLabel>Sponsorship Guide</EyebrowLabel>
        </Eyebrow>
        <HeroTitle>How to Get a Sponsor</HeroTitle>
        <HeroSubtitle>
          Finding sponsors, pitching them, and following up — with a ready-to-send email
          template below.
        </HeroSubtitle>
      </Hero>

      <GuideList>
        {sections.map(section => (
          <GuideSectionEl key={section.id}>
            <GuideHead>
              <GuideNumber>{section.number}</GuideNumber>
              <GuideTitle>{section.title}</GuideTitle>
            </GuideHead>
            <GuideDescription>{section.description}</GuideDescription>
            {section.body.map((para, j) => (
              <GuideBody key={j}>{para}</GuideBody>
            ))}
            <TipCallout>
              <TipLabel>Tip</TipLabel>
              <TipText>{section.tip}</TipText>
            </TipCallout>
          </GuideSectionEl>
        ))}
      </GuideList>

      <TemplateSection>
        <TemplateHeading>Copy-Paste Sponsorship Email</TemplateHeading>
        <TemplateIntro>Fill in the highlighted blanks, then copy it into your email.</TemplateIntro>

        <EmailOuter>
          <EmailHeader>
            <EmailHeaderLeft>
              <MdMailOutline size={15} />
              <EmailHeaderLabel>New Message</EmailHeaderLabel>
            </EmailHeaderLeft>
            <CopyButton onClick={handleCopy} aria-label="Copy email template to clipboard">
              {copied ? '✓ COPIED' : 'COPY'}
            </CopyButton>
          </EmailHeader>
          <EmailBody>
            <EmailSubjectRow>
              <EmailSubjectLabel>Subject:</EmailSubjectLabel>
              <EmailSubjectValue>{emailTemplate.subject}</EmailSubjectValue>
            </EmailSubjectRow>

            <EmailParagraph>{renderWithPlaceholders(emailTemplate.greeting)}</EmailParagraph>
            {emailTemplate.paragraphs.map((para, i) => (
              <EmailParagraph key={i}>{renderWithPlaceholders(para)}</EmailParagraph>
            ))}
            <EmailSignoff>{renderWithPlaceholders(emailTemplate.signoff)}</EmailSignoff>
          </EmailBody>
        </EmailOuter>
      </TemplateSection>

      <ResourcesSection>
        <ResourcesLabel>Resources</ResourcesLabel>
        {courseResources.map(resource => (
          <ResourceLink key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer">
            {resource.label}
            <MdOpenInNew size={15} />
          </ResourceLink>
        ))}
      </ResourcesSection>
    </PageRoot>
  )
}
