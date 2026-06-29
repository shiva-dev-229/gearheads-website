import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import Loader from './Loader'

interface Props {
  title: string
  icon: React.ReactNode
}

const Page = styled.section`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px ${theme.spacing.marginMobile};
`

const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.neoInsetSm};
  color: ${theme.colors.primary};
  font-size: 64px;
  background: ${theme.colors.surfaceContainerLow};
`

const Title = styled.h1`
  margin: 0;
  font-family: ${theme.fonts.headline};
  font-size: 32px;
  font-weight: 600;
  color: ${theme.colors.onSurface};
  text-align: center;
`

const Subtext = styled.p`
  margin: 0;
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurfaceVariant};
  text-align: center;
`

const HomeLink = styled(Link)`
  font-family: ${theme.fonts.label};
  font-size: 14px;
  color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default function UnderConstruction({ title, icon }: Props) {
  return (
    <Page>
      <IconCircle>{icon}</IconCircle>
      <Loader />
      <Title>{title}</Title>
      <Subtext>This page is under construction — check back soon.</Subtext>
      <HomeLink to="/">← Back to Home</HomeLink>
    </Page>
  )
}
