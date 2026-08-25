import { useState } from 'react'
import styled from 'styled-components'
import { MdExpandMore } from 'react-icons/md'
import { theme } from '../styles/theme'
import faqs from '../data/faq.json'

// ─── Section shell ────────────────────────────────────────────────────────────

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 36px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 28px;

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

// ─── Accordion list ───────────────────────────────────────────────────────────

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 768px;
  margin: 0 auto;
  width: 100%;
`

// ─── Row card ─────────────────────────────────────────────────────────────────

type Accent = 'blue' | 'green'

const accentColor = (accent: Accent) =>
  accent === 'blue' ? theme.colors.primary : theme.colors.secondary

const FAQItem = styled.div<{ $open: boolean; $accent: Accent }>`
  background: ${({ $open }) => ($open ? theme.colors.surfaceRaised : theme.colors.surface)};
  border-radius: ${theme.rounded.md};
  overflow: hidden;
  border: 1px solid
    ${({ $open }) => ($open ? theme.colors.hairlineStrong : theme.colors.hairline)};
  transition: background 0.22s ease, border-color 0.22s ease;

  &:hover {
    border-color: ${theme.colors.hairlineStrong};
  }
`

// ─── Question button ──────────────────────────────────────────────────────────

const FAQButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  text-align: left;
  background: none;

  @media (min-width: 768px) {
    padding: 22px 24px;
  }
`

const FAQNumber = styled.span<{ $open: boolean; $accent: Accent }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 28px;
  color: ${({ $open, $accent }) => ($open ? accentColor($accent) : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.45)};
  transition: color 0.22s, opacity 0.22s;
`

const FAQQuestion = styled.span`
  flex: 1;
  font-family: ${theme.fonts.body};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: ${theme.colors.onSurface};

  @media (min-width: 768px) {
    font-size: 15px;
  }
`

const FAQChevron = styled.div<{ $open: boolean; $accent: Accent }>`
  font-size: 22px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.22s ease, color 0.22s ease, opacity 0.22s;
  color: ${({ $open, $accent }) => ($open ? accentColor($accent) : theme.colors.onSurfaceVariant)};
  opacity: ${({ $open }) => ($open ? 1 : 0.5)};
`

// ─── Collapse ─────────────────────────────────────────────────────────────────

const Collapse = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease ${({ $open }) => ($open ? '0.05s' : '0s')};
`

const CollapseInner = styled.div`
  overflow: hidden;
`

// ─── Answer content ───────────────────────────────────────────────────────────

const FAQAnswerWrap = styled.div<{ $accent: Accent }>`
  padding: 0 20px 20px;

  @media (min-width: 768px) {
    padding: 0 24px 22px;
  }
`

const Hairline = styled.div<{ $accent: Accent }>`
  height: 1px;
  background: ${({ $accent }) => `${accentColor($accent)}25`};
  margin-bottom: 16px;
`

const FAQAnswerText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 68ch;
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((cur) => (cur === i ? null : i))

  return (
    <Section id="faq">
      <SectionHeader>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <SectionSubtitle>
          Everything you want to know about Team #16460, the GEarheads.
        </SectionSubtitle>
      </SectionHeader>

      <FAQList>
        {faqs.map((faq, i) => {
          const open = openIndex === i
          const accent: Accent = i % 2 === 0 ? 'blue' : 'green'
          const num = String(i + 1).padStart(2, '0')

          return (
            <FAQItem key={i} $open={open} $accent={accent}>
              <FAQButton onClick={() => toggle(i)} aria-expanded={open}>
                <FAQNumber $open={open} $accent={accent}>{num}</FAQNumber>
                <FAQQuestion>{faq.question}</FAQQuestion>
                <FAQChevron $open={open} $accent={accent}>
                  <MdExpandMore />
                </FAQChevron>
              </FAQButton>

              <Collapse $open={open}>
                <CollapseInner>
                  <FAQAnswerWrap $accent={accent}>
                    <Hairline $accent={accent} />
                    <FAQAnswerText>{faq.answer}</FAQAnswerText>
                  </FAQAnswerWrap>
                </CollapseInner>
              </Collapse>
            </FAQItem>
          )
        })}
      </FAQList>
    </Section>
  )
}
