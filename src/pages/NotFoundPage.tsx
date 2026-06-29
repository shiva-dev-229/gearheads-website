import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaCircleExclamation } from 'react-icons/fa6'
import { theme } from '../styles/theme'

const Wrap = styled.div`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
  padding: 40px 20px;
`

const Code = styled.div`
  font-family: ${theme.fonts.headline};
  font-size: 96px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  opacity: 0.15;
  line-height: 1;
`

const Title = styled.h1`
  font-family: ${theme.fonts.headline};
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
`

const Sub = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 400px;
`

const HomeLink = styled(Link)`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  margin-top: 8px;
`

const IconWrap = styled.div`
  font-size: 48px;
  color: ${theme.colors.primary};
  opacity: 0.6;
`

export default function NotFoundPage() {
  return (
    <Wrap>
      <Code>404</Code>
      <IconWrap><FaCircleExclamation /></IconWrap>
      <Title>Page Not Found</Title>
      <Sub>The page you're looking for doesn't exist or may have moved.</Sub>
      <HomeLink to="/">← Back to Home</HomeLink>
    </Wrap>
  )
}
