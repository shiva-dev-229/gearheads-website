import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import BlurText from './reactbits/BlurText'
import BorderGlow from './reactbits/BorderGlow'
import robotImg from '../assets/photos/home/robot-removebg-preview.png'

const floatDrift = keyframes`
  from { transform: translateY(0px); }
  to   { transform: translateY(-8px); }
`

const floatAnimation = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${floatDrift} 7s ease-in-out infinite alternate;
  }
`

const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 36px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  @media (min-width: 768px) {
    padding: ${theme.spacing.sectionPaddingLg} ${theme.spacing.marginDesktop};
    flex-direction: row;
  }
`

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  z-index: 10;
`

const Badge = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 50px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`

const GreenDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(74, 225, 131, 1);
  box-shadow: 0 0 8px rgba(74, 225, 131, 0.8);
  display: inline-block;
  flex-shrink: 0;
`

const BadgeText = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
`

const Headline = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.2;
  color: ${theme.colors.onSurface};
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 768px) {
    font-size: 52px;
  }
`

const HeadlineAccent = styled.span`
  color: ${theme.colors.primary};
`

const SubHeadline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 560px;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 16px;

  @media (min-width: 640px) {
    flex-direction: row;
    width: auto;
  }
`

const BtnGlowWrap = styled.div`
  .border-glow-inner {
    padding: 0;
  }
`

const PrimaryBtnInner = styled.a`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 16px 32px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  color: ${theme.colors.primary};
`

const SecondaryBtnInner = styled(Link)`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 16px 32px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  color: ${theme.colors.onSurface};

  &:hover {
    color: ${theme.colors.primary};
  }
`

const VisualWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;

  @media (min-width: 768px) {
    height: 560px;
  }
`

const AmbientGlow = styled.div`
  position: absolute;
  width: 140%;
  height: 140%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse 60% 55% at 50% 50%,
    rgba(75, 142, 255, 0.07) 0%,
    rgba(75, 142, 255, 0.03) 45%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
`

const RobotImage = styled.img`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 8px 40px rgba(74, 225, 131, 0.10)) drop-shadow(0 0 24px rgba(75, 142, 255, 0.08));
  ${floatAnimation}

  @media (min-width: 768px) {
    max-width: 480px;
  }
`

const glowProps = {
  backgroundColor: '#131313',
  borderRadius: 50,
  glowColor: '217 100 84',
  colors: ['#adc6ff', '#4ae183', '#adc6ff'] as string[],
  glowRadius: 20,
  glowIntensity: 0.8,
  edgeSensitivity: 25,
  coneSpread: 22,
  fillOpacity: 0.08,
  animated: false,
}

export default function HeroSection() {
  return (
    <Section>
      <TextContent>
        <Badge>
          <GreenDot />
          <BadgeText>Student-Led FTC Robotics</BadgeText>
        </Badge>

        <Headline>
          <BlurText
            text="FTC Team GEarheads"
            animateBy="words"
            delay={120}
            stepDuration={0.4}
            direction="top"
          />
          <HeadlineAccent>
            <BlurText
              text="#16460"
              animateBy="characters"
              delay={80}
              stepDuration={0.35}
              direction="bottom"
            />
          </HeadlineAccent>
        </Headline>

        <SubHeadline>
          The GEarheads are a student-led FTC team from Wisconsin that builds competitive robots
          and brings hands-on STEM to the community through demos, workshops, and events.
        </SubHeadline>

        <ButtonRow>
          <BtnGlowWrap>
            <BorderGlow {...glowProps}>
              <PrimaryBtnInner
                href="https://www.instagram.com/ftcgearheads16460/"
                target="_blank"
                rel="noopener noreferrer"
              >
                View us in Action
              </PrimaryBtnInner>
            </BorderGlow>
          </BtnGlowWrap>
          <BtnGlowWrap>
            <BorderGlow {...glowProps}>
              <SecondaryBtnInner to="/contact">Connect</SecondaryBtnInner>
            </BorderGlow>
          </BtnGlowWrap>
        </ButtonRow>
      </TextContent>

      <VisualWrapper>
        <AmbientGlow />
        <RobotImage src={robotImg} alt="Gearheads FTC robot" />
      </VisualWrapper>
    </Section>
  )
}
