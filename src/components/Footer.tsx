import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MdOpenInNew } from 'react-icons/md'
import { FaGithub } from 'react-icons/fa'
import { theme } from '../styles/theme'
import logoImg from '../../assets/logos/logo-black-removebg-preview.png'

const FooterWrapper = styled.footer`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  padding: 64px ${theme.spacing.marginMobile} 0;

  @media (min-width: 768px) {
    padding: 80px ${theme.spacing.marginDesktop} 0;
  }
`

const Inner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px 32px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 0 ${theme.spacing.gutter};
    align-items: start;
  }
`

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const BrandLogo = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
`

const BrandName = styled.span`
  font-family: ${theme.fonts.brand};
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: ${theme.colors.onSurface};

  em {
    font-style: normal;
    color: ${theme.colors.secondary};
  }
`

const Tagline = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 280px;
  margin: 0;
`

const NavCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const NavColsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 24px;

  @media (min-width: 768px) {
    display: contents;
  }
`

const ColTitle = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin-bottom: 4px;
`

const NavLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const internalLinkStyles = `
  font-family: ${theme.fonts.body};
  font-size: 15px;
  color: ${theme.colors.onSurfaceVariant};
  text-decoration: none;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${theme.colors.primary};
  }
`

const InternalLink = styled(Link)`
  ${internalLinkStyles}
`

const ExternalLink = styled.a`
  ${internalLinkStyles}
`

const OpenInNewIcon = styled(MdOpenInNew)`
  width: 13px;
  height: 13px;
  flex-shrink: 0;
  opacity: 0.7;
`

const BottomBar = styled.div`
  margin-top: 64px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

const Copyright = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.7;
`

const DevCredit = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${theme.fonts.body};
  font-size: 13px;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.7;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s, opacity 0.2s;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &:hover {
    color: ${theme.colors.primary};
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      <Inner>
        <TopGrid>
          <BrandCol>
            <BrandLogo src={logoImg} alt="GEarheads logo" />
            <BrandName><em>GE</em>arheads</BrandName>
            <Tagline>
              FTC Team #16460 — Brookfield, Wisconsin. Building competitive robots and bringing STEM
              to our community since 2017.
            </Tagline>
          </BrandCol>

          <NavColsGrid>
            <NavCol>
              <ColTitle>Team</ColTitle>
              <NavLinks>
                <li><InternalLink to="/">Home</InternalLink></li>
                <li><InternalLink to="/about">About</InternalLink></li>
                <li><InternalLink to="/team">Meet the Team</InternalLink></li>
                <li><InternalLink to="/about/awards">Awards</InternalLink></li>
                <li><InternalLink to="/join">Join</InternalLink></li>
              </NavLinks>
            </NavCol>

            <NavCol>
              <ColTitle>Technical</ColTitle>
              <NavLinks>
                <li><InternalLink to="/robot">Robot</InternalLink></li>
                <li><InternalLink to="/engineering">Engineering</InternalLink></li>
                <li><InternalLink to="/programming">Programming</InternalLink></li>
              </NavLinks>
            </NavCol>

            <NavCol>
              <ColTitle>Community</ColTitle>
              <NavLinks>
                <li><InternalLink to="/outreach">Outreach</InternalLink></li>
                <li><InternalLink to="/impact">Impact</InternalLink></li>
                <li><InternalLink to="/sponsors">Sponsors</InternalLink></li>
                <li><InternalLink to="/media">Media</InternalLink></li>
              </NavLinks>
            </NavCol>

            <NavCol>
              <ColTitle>Connect</ColTitle>
              <NavLinks>
                <li><InternalLink to="/contact">Contact</InternalLink></li>
                <li>
                  <ExternalLink
                    href="https://instagram.com/ftcgearheads16460"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ftcgearheads16460
                    <OpenInNewIcon />
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    href="https://youtube.com/@ftcgearheads"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ftcgearheads
                    <OpenInNewIcon />
                  </ExternalLink>
                </li>
              </NavLinks>
            </NavCol>
          </NavColsGrid>
        </TopGrid>

        <BottomBar>
          <Copyright>© 2026 FTC GEarheads #16460. All rights reserved.</Copyright>
          <DevCredit
            href="https://github.com/shiva-dev-229"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            Developed by @shiva-dev-229
          </DevCredit>
        </BottomBar>
      </Inner>
    </FooterWrapper>
  )
}
