import { useState, useRef, useEffect, type ComponentType } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  MdBuild, MdVolunteerActivism, MdEmojiEvents,
  MdSchool, MdEco, MdLightbulb, MdFavorite, MdPeople,
  MdHandshake, MdStar,
  MdGroups, MdHistory, MdFlag, MdPerson,
  MdForum, MdCloud, MdArchitecture, MdCode, MdApps,
  MdRocketLaunch, MdPublic, MdMilitaryTech, MdSend,
  MdCameraAlt, MdCheckCircle,
} from 'react-icons/md'
import { theme } from '../styles/theme'
import { chipHover } from '../styles/mixins'
import BlurText from '../components/reactbits/BlurText'
import FadeIn from '../components/reactbits/FadeIn'
import StaggerReveal from '../components/reactbits/StaggerReveal'
import BorderGlow from '../components/reactbits/BorderGlow'
import Folder from '../components/reactbits/Folder'
import HoverTitle from '../components/reactbits/HoverTitle'
import CountUpChip from '../components/reactbits/CountUpChip'
import SeasonTimeline from '../components/SeasonTimeline'
import TeamModal from '../components/TeamModal'
import type { TeamMember, MemberType } from '../components/TeamModal'
import FolderModal, { type FolderModalItem } from '../components/FolderModal'
import teamData from '../data/team.json'
import aboutData from '../data/about.json'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SEASONS = teamData.seasons as Array<{ id: string; label: string }>
const MEMBERS_BY_SEASON = teamData.membersBySeason as Record<string, TeamMember[]>

const TOOL_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  forum:        MdForum,
  cloud:        MdCloud,
  architecture: MdArchitecture,
  code:         MdCode,
  apps:         MdApps,
}

const SUBTEAM_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  flag:              MdFlag,
  build:             MdBuild,
  code:              MdCode,
  volunteerActivism: MdVolunteerActivism,
}

const PILLAR_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  build:             MdEmojiEvents,
  volunteerActivism: MdVolunteerActivism,
  school:            MdSchool,
  eco:               MdEco,
}

const VALUE_ICONS: Record<string, ComponentType<{ size?: number; color?: string }>> = {
  lightbulb: MdLightbulb,
  favorite:  MdFavorite,
  people:    MdPeople,
  handshake: MdHandshake,
  star:      MdStar,
}

const ABOUT_COLORS: Record<string, string> = {
  primary:   theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary:  theme.colors.tertiary,
}

const TOOL_COLORS: Record<string, string> = {
  primary:   theme.colors.primary,
  secondary: theme.colors.secondary,
  tertiary:  theme.colors.tertiary,
}

// BorderGlow config per pillar color
const PILLAR_GLOW: Record<string, { glowColor: string; colors: string[] }> = {
  primary:   { glowColor: '225 85 82', colors: ['#adc6ff', '#7aa2e8', '#4a7cd1'] },
  secondary: { glowColor: '148 62 58', colors: ['#4ae183', '#2eab5e', '#0f5a30'] },
  tertiary:  { glowColor: '311 95 82', colors: ['#ffabef', '#c060a0', '#6b003f'] },
}

function memberTypeColor(type: MemberType | undefined): string {
  if (type === 'COACH') return theme.colors.tertiary
  if (type === 'STUDENT MENTOR') return theme.colors.secondary
  return theme.colors.primary
}

// ─── Shared ──────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`

const PageSection = styled.section`
  padding: 36px ${theme.spacing.marginMobile};

  @media (min-width: 768px) {
    padding: 48px ${theme.spacing.marginDesktop};
  }
`

const SectionInner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 50px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  margin-bottom: 20px;
  cursor: default;

  ${chipHover}
`

const ChipDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? theme.colors.secondary};
  flex-shrink: 0;
`

const SectionHeading = styled.div`
  margin-bottom: 20px;

  p {
    font-family: ${theme.fonts.headline} !important;
    font-size: clamp(26px, 4vw, 40px) !important;
    font-weight: 700 !important;
    letter-spacing: -0.03em !important;
    line-height: 1.15 !important;
    color: ${theme.colors.onSurface} !important;
    gap: 0.3em !important;
  }
`

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 660px;
  margin: 0 0 32px;
`

const TimelineIntroText = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.8;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 640px;
  margin: 0 0 32px;
  opacity: 0.85;
`

const IntroAccent = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-weight: 500;
`

const PhotoSlot = styled.div`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  border: 1px dashed ${theme.colors.outlineVariant}33;
`

const PhotoSlotName = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.primary};
  opacity: 0.8;
`

const PhotoSlotDesc = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.5;
  text-align: center;
  max-width: 260px;
`

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    ${theme.colors.outlineVariant}30,
    transparent
  );
  margin: 0;
`

// ─── Hero Section ─────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  padding: 28px ${theme.spacing.marginMobile} 0;

  @media (min-width: 768px) {
    padding: 40px ${theme.spacing.marginDesktop} 0;
  }
`

const HeroInner = styled.div`
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
`

// ── Photo Banner ──────────────────────────────────────────────────────────────

const PhotoBanner = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: ${theme.shadows.neoRaisedLg};
  background: #0d0d0d;
  height: clamp(220px, 32vw, 380px);
`


const BannerPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: #0d0d0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const BannerPlaceholderLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
  opacity: 0.4;
`

const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(13,13,13,0.88), rgba(13,13,13,0.35) 60%);
`

const BannerContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 768px) {
    padding: 40px 48px;
  }
`

const BannerChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 50px;
  background: rgba(19, 19, 19, 0.72);
  backdrop-filter: blur(8px);
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  cursor: default;
  width: fit-content;
`

const HeroHeading = styled.div`
  p {
    font-family: ${theme.fonts.headline} !important;
    font-size: clamp(28px, 5vw, 48px) !important;
    font-weight: 700 !important;
    letter-spacing: -0.04em !important;
    line-height: 1.05 !important;
    color: ${theme.colors.onSurface} !important;
    gap: 0.25em !important;
    margin: 0 !important;
  }
`

// ── Below-banner content (page surface) ──────────────────────────────────────

const HeroBody = styled.div`
  padding: 28px 0 0;
`

const HeroSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: clamp(13px, 1.5vw, 15px);
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 640px;
  margin: 0 0 24px;
`

const HeroStatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }
`

// ── Mission & Values ──────────────────────────────────────────────────────────

const SubheadLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  margin: 0 0 28px;
  opacity: 0.8;
`

// ── keyframes ────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

const accentPulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
`

// ── Mission quote ─────────────────────────────────────────────────────────────

const MissionWrap = styled.div`
  position: relative;
  width: 100%;
  padding: 24px 28px 24px 36px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInset};
  border-radius: 20px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 24px; bottom: 24px;
    width: 3px; border-radius: 2px;
    background: ${theme.colors.secondary};
    animation: ${accentPulse} 3s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &::before { animation: none; }
  }
`

const MissionHeadline = styled.p`
  font-family: ${theme.fonts.headline};
  font-size: clamp(17px, 2vw, 22px);
  font-style: italic;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.015em;
  color: ${theme.colors.onSurface};
  margin: 0 0 16px;
`

const MissionBody = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 860px;
  margin: 0;
`

// ── Accordion ────────────────────────────────────────────────────────────────

const AccordionOuter = styled.div`
  margin-bottom: 44px;
  animation: ${fadeUp} 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.34s both;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const PillarsAccordion = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  height: 520px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`

const PanelLabelVert = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.38;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  letter-spacing: 0.03em;
  transition: opacity 0.2s;
  user-select: none;
`

const PillarPanel = styled.div<{ $active: boolean }>`
  background: ${theme.colors.background};
  cursor: ${({ $active }) => $active ? 'default' : 'pointer'};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 0;
  flex: ${({ $active }) => $active ? '1 1 0%' : '0 0 72px'};
  transition:
    flex-grow  0.48s cubic-bezier(0.4, 0, 0.2, 1),
    flex-basis 0.48s cubic-bezier(0.4, 0, 0.2, 1);

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.045);
  }

  ${({ $active }) => !$active && `&:hover ${PanelLabelVert} { opacity: 0.65; }`}

  @media (max-width: 767px) {
    flex: ${({ $active }) => $active ? '0 0 340px' : '0 0 56px'};
    transition: flex-basis 0.48s cubic-bezier(0.4, 0, 0.2, 1);
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.045);
  }
`

const PanelStrip = styled.div`
  width: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 18px;
  z-index: 2;
  position: relative;
  background: ${theme.colors.background};

  @media (max-width: 767px) {
    width: 100%;
    flex-direction: row;
    height: 56px;
    padding: 0 20px;
    gap: 14px;
  }
`

const PanelIconWell = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const PanelPhoto = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 72px;
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transition: opacity 0.4s ease-out 0.08s;
  overflow: hidden;

  @media (max-width: 767px) {
    left: 0;
    top: 56px;
  }
`

const PanelPhotoBg = styled.div<{ $colorKey: string; $active: boolean }>`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: ${({ $active }) => $active ? 'scale(1)' : 'scale(1.04)'};
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $colorKey }) => $colorKey === 'primary' && `
    background-color: #0c141e;
    background-image:
      radial-gradient(ellipse at 25% 35%, #1c2e48 0%, #0c141e 55%),
      radial-gradient(ellipse at 75% 70%, #0f1e30 0%, transparent 50%);
  `}
  ${({ $colorKey }) => $colorKey === 'secondary' && `
    background-color: #0b1710;
    background-image:
      radial-gradient(ellipse at 65% 30%, #142a18 0%, #0b1710 55%),
      radial-gradient(ellipse at 20% 75%, #0e2014 0%, transparent 50%);
  `}
  ${({ $colorKey }) => $colorKey === 'tertiary' && `
    background-color: #190d16;
    background-image:
      radial-gradient(ellipse at 40% 40%, #2c1228 0%, #190d16 55%),
      radial-gradient(ellipse at 80% 65%, #1f0d1a 0%, transparent 50%);
  `}
`

const PanelSpotlight = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    500px circle at var(--sx, -500px) var(--sy, -500px),
    rgba(173, 198, 255, 0.08) 0%,
    rgba(74, 225, 131, 0.04) 40%,
    transparent 70%
  );
`

const PanelScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.96) 0%,
    rgba(10, 10, 10, 0.55) 28%,
    rgba(10, 10, 10, 0.1) 58%,
    transparent 100%
  );
`

const PanelContent = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 28px 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  z-index: 2;
`

const PanelContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`

const PanelPhotoTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: clamp(22px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${theme.colors.onSurface};
  margin: 0;
`

const PanelPhotoDesc = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${theme.colors.onSurfaceVariant};
  max-width: 500px;
  margin: 0;
`

const PanelContentRight = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  padding-bottom: 2px;
`

const PanelPhotoStat = styled.span<{ $color: string }>`
  font-family: ${theme.fonts.headline};
  font-size: clamp(28px, 3.2vw, 44px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  white-space: nowrap;
  color: ${({ $color }) => $color};
`

const PanelPhotoStatLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.4;
  text-align: right;
  line-height: 1.5;
  white-space: pre-line;
`

// ── Bottom grid: values + principles ────────────────────────────────────────

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 0;
  align-items: stretch;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const BottomColLabel = styled.p`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.32;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.colors.outlineVariant}12;
  margin: 0;
`

const ValuesColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${theme.colors.outlineVariant}14;
  padding-right: 56px;

  @media (max-width: 767px) {
    border-right: none;
    padding-right: 0;
  }
`

const ValuesList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ValueRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  border-bottom: ${({ $last }) => $last ? 'none' : `1px solid ${theme.colors.outlineVariant}10`};
  flex: 1;
  animation: ${fadeUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const ValueIconWell = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const ValueLabel = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${theme.colors.onSurface};
  flex: 1;
`

const ValueNum = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.08em;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.22;
`

const PrinciplesColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 56px;

  @media (max-width: 767px) {
    padding-left: 0;
  }
`

const PrinciplesList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PrinRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 0;
  border-bottom: ${({ $last }) => $last ? 'none' : `1px solid ${theme.colors.outlineVariant}10`};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.colors.onSurfaceVariant};
  flex: 1;
  transition: color 0.18s;
  cursor: default;
  animation: ${fadeUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;

  &:hover { color: ${theme.colors.onSurface}; }
  svg { flex-shrink: 0; margin-top: 3px; color: ${theme.colors.secondary}; opacity: 0.75; }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`

const PrinKey = styled.span`
  color: ${theme.colors.onSurface};
  font-weight: 500;
`

// ─── Culture ──────────────────────────────────────────────────────────────────

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: start;
  }
`

const CulturePointsStagger = styled(StaggerReveal)`
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const CulturePoint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CulturePointEyebrow = styled.span<{ $color: string }>`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`

const CulturePointBody = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 15px;
  line-height: 1.75;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
`

const CultureRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
`

const FolderRow = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`

const FolderBlock = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
`

const FolderBlockLabel = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
`

const FolderBlockHint = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${theme.colors.outlineVariant};
`

// ─── Team ────────────────────────────────────────────────────────────────────

const TeamGroupSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 56px;

  @media (min-width: 768px) {
    grid-template-columns: 1.3fr 1fr;
    align-items: start;
  }
`

const TeamGroupPhoto = styled(PhotoSlot)`
  min-height: 360px;
  border-radius: 24px;
`

const TeamQuickStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TeamStatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 16px;
  padding: 18px 20px;
  transition: box-shadow 0.2s;

  &:hover { box-shadow: ${theme.shadows.neoRaisedLg}; }
`

const TeamStatIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`

const TeamStatText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const TeamStatValue = styled.span`
  font-family: ${theme.fonts.headline};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  line-height: 1;
`

const TeamStatMeta = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
`

const SeasonTabsWrap = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
  margin-bottom: 40px;
  width: 100%;

  &::-webkit-scrollbar { display: none; }
`

const SeasonTabs = styled.div`
  position: relative;
  display: inline-flex;
  gap: 4px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoInsetSm};
  border-radius: 50px;
  padding: 4px;
  min-width: max-content;
`

const ActivePill = styled.div<{ $animated: boolean }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  border-radius: 50px;
  background: ${theme.colors.surfaceContainerHighest};
  box-shadow: ${theme.shadows.neoRaisedSm};
  pointer-events: none;
  z-index: 0;
  transition: ${({ $animated }) => $animated
    ? 'left 0.38s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    : 'none'};
`

const SeasonTab = styled.button<{ $active: boolean }>`
  font-family: ${theme.fonts.label};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 10px 22px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  background: transparent;
  position: relative;
  z-index: 1;
  transition: color 0.2s;
  color: ${({ $active }) => $active ? theme.colors.onSurface : theme.colors.onSurfaceVariant};

  &:hover {
    color: ${({ $active }) => $active ? theme.colors.onSurface : theme.colors.primary};
  }
`

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const MemberCard = styled.button`
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaised};
  border-radius: 16px;
  padding: 18px 12px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;
  width: 100%;

  &:hover {
    box-shadow: ${theme.shadows.neoRaisedLg};
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: ${theme.shadows.neoInset};
    transform: translateY(0);
  }
`

const MemberAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${theme.colors.surfaceContainerHigh};
  box-shadow: ${theme.shadows.neoInset};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`

const MemberAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MemberCardName = styled.h4`
  font-family: ${theme.fonts.headline};
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.onSurface};
  margin: 0;
  line-height: 1.2;
`

const MemberCardRole = styled.span<{ $color: string }>`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
`

const MemberCardSubteam = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  background: ${theme.colors.surfaceContainerHigh};
  padding: 5px 11px;
  border-radius: 50px;
`

// ─── Join Section ─────────────────────────────────────────────────────────────

const TEAM_EMAIL = 'gearheads16460@gmail.com'

const JoinSection = styled.section`
  position: relative;
  padding: 80px ${theme.spacing.marginMobile} 112px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: -80px;
    right: -60px;
    width: 560px;
    height: 560px;
    background: radial-gradient(ellipse, ${theme.colors.secondary}07 0%, transparent 65%);
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 96px ${theme.spacing.marginDesktop} 128px;
  }
`

const JoinGrid = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 56px;
  align-items: start;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.25fr;
    gap: 80px;
    align-items: center;
  }
`

const JoinCopy = styled.div`
  display: flex;
  flex-direction: column;
`

const JoinHeading = styled.h2`
  font-family: ${theme.fonts.headline};
  font-size: clamp(32px, 4.5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${theme.colors.onSurface};
  margin: 16px 0 16px;
  line-height: 1.1;
`

const JoinSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  line-height: 1.7;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0 0 40px;
  opacity: 0.8;
`

const PerkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`

const Perk = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`

const PerkIcon = styled.div<{ $color: string }>`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${theme.colors.background};
  box-shadow: ${theme.shadows.neoRaisedSm};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`

const PerkText = styled.div`
  padding-top: 3px;
`

const PerkTitle = styled.span`
  display: block;
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${theme.colors.onSurface};
  margin-bottom: 3px;
`

const PerkDesc = styled.span`
  font-family: ${theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.65;
`

const JoinCard = styled.div`
  background: ${theme.colors.surfaceContainerLow};
  border-radius: 28px;
  overflow: hidden;
  box-shadow: ${theme.shadows.neoRaisedLg};
  border: 1px solid ${theme.colors.outlineVariant}1a;
`

const CardAccent = styled.div`
  height: 3px;
  background: linear-gradient(
    to right,
    ${theme.colors.secondary}90,
    ${theme.colors.primary}60,
    ${theme.colors.tertiary}40
  );
`

const CardBody = styled.div`
  padding: 36px 28px 40px;

  @media (min-width: 520px) {
    padding: 40px 44px 48px;
  }
`

const CardHeader = styled.div`
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.colors.outlineVariant}18;
`

const CardTitle = styled.h3`
  font-family: ${theme.fonts.headline};
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${theme.colors.onSurface};
  margin: 0 0 5px;
`

const CardSubtitle = styled.p`
  font-family: ${theme.fonts.body};
  font-size: 14px;
  line-height: 1.5;
  color: ${theme.colors.onSurfaceVariant};
  margin: 0;
  opacity: 0.65;
`

const FieldStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`

const FieldLabel = styled.label`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.secondary};
  opacity: 0.7;
`

const FieldInput = styled.input`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurface};
  background: ${theme.colors.background};
  border: 1.5px solid transparent;
  border-radius: 12px;
  padding: 15px 18px;
  box-shadow: ${theme.shadows.neoInset};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${theme.colors.onSurfaceVariant};
    opacity: 0.25;
  }
  &:focus {
    border-color: ${theme.colors.secondary}55;
    box-shadow: ${theme.shadows.neoInset}, 0 0 0 3px ${theme.colors.secondary}14;
  }
`

const FieldSelect = styled.select`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurface};
  background: ${theme.colors.background};
  border: 1.5px solid transparent;
  border-radius: 12px;
  padding: 15px 48px 15px 18px;
  box-shadow: ${theme.shadows.neoInset};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%234ae183' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  transition: border-color 0.2s, box-shadow 0.2s;

  option {
    background: ${theme.colors.surfaceContainerLow};
    color: ${theme.colors.onSurface};
  }
  &:focus {
    border-color: ${theme.colors.secondary}55;
    box-shadow: ${theme.shadows.neoInset}, 0 0 0 3px ${theme.colors.secondary}14;
  }
`

const FieldTextarea = styled.textarea`
  font-family: ${theme.fonts.body};
  font-size: 16px;
  color: ${theme.colors.onSurface};
  background: ${theme.colors.background};
  border: 1.5px solid transparent;
  border-radius: 12px;
  padding: 15px 18px;
  box-shadow: ${theme.shadows.neoInset};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 160px;
  line-height: 1.65;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${theme.colors.onSurfaceVariant};
    opacity: 0.25;
  }
  &:focus {
    border-color: ${theme.colors.secondary}55;
    box-shadow: ${theme.shadows.neoInset}, 0 0 0 3px ${theme.colors.secondary}14;
  }
`

const SubmitRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 8px;
`

const SubmitHint = styled.span`
  font-family: ${theme.fonts.label};
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.onSurfaceVariant};
  opacity: 0.35;
`

const SubmitBtn = styled.button`
  font-family: ${theme.fonts.label};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.background};
  background: ${theme.colors.secondary};
  border: none;
  border-radius: 50px;
  padding: 16px 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
  box-shadow: 0 0 0 1px rgba(74,225,131,0.4);
  transition: box-shadow 0.18s, transform 0.12s;

  &:hover {
    box-shadow: 0 0 0 1px rgba(74,225,131,0.6), ${theme.shadows.glowGreen};
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: inset 0 0 0 1px rgba(74,225,131,0.5);
    transform: translateY(0);
  }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeSeason, setActiveSeason] = useState('2025-26')
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [subteamsOpen, setSubteamsOpen] = useState(false)
  const [joinForm, setJoinForm] = useState({
    name: '', email: '', grade: '', school: '', subteam: '', message: '',
  })
  const [activeCard, setActiveCard] = useState(0)

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Joining GEarheads — ${joinForm.name}`)
    const body = encodeURIComponent(
      `Hi GEarheads Team,\n\nI'm interested in joining the team!\n\n` +
      `Name: ${joinForm.name}\n` +
      `Email: ${joinForm.email}\n` +
      `Grade: ${joinForm.grade}\n` +
      `School: ${joinForm.school}\n` +
      `Interested Subteam: ${joinForm.subteam}\n\n` +
      `About me:\n${joinForm.message}\n\n` +
      `—\nSent from gearheads.org`
    )
    window.open(`mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`, '_self')
  }

  const setJoinField = (field: keyof typeof joinForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setJoinForm(prev => ({ ...prev, [field]: e.target.value }))

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pillAnimated = useRef(false)
  const [pill, setPill] = useState({ x: 0, w: 0, animated: false })

  useEffect(() => {
    const idx = SEASONS.findIndex(s => s.id === activeSeason)
    const el = tabRefs.current[idx]
    if (!el) return
    const animated = pillAnimated.current
    setPill({ x: el.offsetLeft, w: el.offsetWidth, animated })
    pillAnimated.current = true
  }, [activeSeason])

  const activeSeasonLabel = SEASONS.find(s => s.id === activeSeason)?.label ?? ''
  const activeMembers = MEMBERS_BY_SEASON[activeSeason] ?? []

  const toolModalItems: FolderModalItem[] = teamData.tools.map(tool => {
    const Icon = TOOL_ICONS[tool.iconKey]
    return { icon: <Icon size={20} />, color: TOOL_COLORS[tool.colorKey], title: tool.name, description: tool.fullDesc, url: tool.url }
  })

  const subteamModalItems: FolderModalItem[] = teamData.subteams.map(s => {
    const Icon = SUBTEAM_ICONS[s.iconKey]
    return {
      icon: <Icon size={20} />,
      color: TOOL_COLORS[s.colorKey],
      title: s.name,
      description: s.desc,
      detail: { fullDesc: s.fullDesc, projects: s.projects, url: s.url, linkLabel: s.linkLabel },
    }
  })

  const subteamPaperItems = teamData.subteams.slice(0, 3).map(s => {
    const Icon = SUBTEAM_ICONS[s.iconKey]
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><Icon size={20} color={TOOL_COLORS[s.colorKey]} /></div>
  })

  const toolPaperItems = teamData.tools.slice(0, 3).map(tool => {
    const Icon = TOOL_ICONS[tool.iconKey]
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}><Icon size={20} color={TOOL_COLORS[tool.colorKey]} /></div>
  })

  return (
    <PageWrapper>
      {toolsOpen && (
        <FolderModal
          title="Tools We Use"
          accentColor={theme.colors.primary}
          items={toolModalItems}
          onClose={() => setToolsOpen(false)}
        />
      )}
      {subteamsOpen && (
        <FolderModal
          title="Our Subteams"
          accentColor={theme.colors.secondary}
          items={subteamModalItems}
          onClose={() => setSubteamsOpen(false)}
        />
      )}
      {selectedMember && (
        <TeamModal
          member={selectedMember}
          season={activeSeasonLabel}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* ── Hero + Mission (one section) ────────────────────────────── */}
      <HeroSection>
        <HeroInner>

          {/* 1. Photo Banner */}
          <StaggerReveal variant="rise" stagger={0} duration={350} distance={40}>
            <PhotoBanner>
              <BannerPlaceholder>
                <MdCameraAlt size={28} color={theme.colors.outlineVariant} style={{ opacity: 0.3 }} />
                <BannerPlaceholderLabel>about-hero-bg.jpg — full-team group photo</BannerPlaceholderLabel>
              </BannerPlaceholder>
              <BannerOverlay />
              <BannerContent>
                <BannerChip>
                  <ChipDot />
                  FTC Team #16460 · Brookfield, WI
                </BannerChip>
                <HeroHeading>
                  <HoverTitle text="About GEarheads" delay={40} />
                </HeroHeading>
              </BannerContent>
            </PhotoBanner>
          </StaggerReveal>

          {/* 2. Subtitle + Stats (page surface) */}
          <HeroBody>
            <StaggerReveal variant="rise" stagger={0} duration={350} distance={40}>
              <HeroSubtitle>
                A student-led FIRST Tech Challenge team from Brookfield, Wisconsin — building
                competitive robots, running transformative outreach programs, and growing the FIRST
                ecosystem since 2017.
              </HeroSubtitle>
            </StaggerReveal>

            <HeroStatsRow>
              <StaggerReveal variant="pop" stagger={60} duration={260} inline>
                <CountUpChip
                  icon={<MdRocketLaunch size={13} color={theme.colors.primary} />}
                  prefix="Est. " countTo={2017}
                />
                <CountUpChip
                  icon={<MdPublic size={13} color={theme.colors.secondary} />}
                  countTo={3} suffix="× World Championship"
                />
                <CountUpChip
                  icon={<MdMilitaryTech size={13} color={theme.colors.tertiary} />}
                  countTo={9} suffix=" Seasons"
                />
                <CountUpChip
                  icon={<MdGroups size={13} color={theme.colors.primary} />}
                  prefix="Team #" countTo={16460}
                />
              </StaggerReveal>
            </HeroStatsRow>

            {/* 3. Mission & Values */}
            <SubheadLabel>Mission &amp; Values</SubheadLabel>

            <MissionWrap>
              <MissionHeadline>
                We build machines that compete on the world stage, run programs that transform lives,
                and develop students who will lead the next generation of engineers and innovators.
              </MissionHeadline>
              <MissionBody>
                Founded in Brookfield, Wisconsin, GEarheads is a student-led FTC robotics team driven by
                three beliefs: that competition sharpens excellence, that outreach multiplies impact, and
                that every student — regardless of background — deserves access to real engineering.
              </MissionBody>
            </MissionWrap>

            <AccordionOuter>
              <BorderGlow
                glowColor={PILLAR_GLOW[aboutData.pillars[activeCard].colorKey].glowColor}
                colors={PILLAR_GLOW[aboutData.pillars[activeCard].colorKey].colors}
                borderRadius={20}
                backgroundColor={theme.colors.background}
                glowRadius={48}
                fillOpacity={0.35}
              >
                <PillarsAccordion>
                  {aboutData.pillars.map((p, i) => {
                    const Icon = PILLAR_ICONS[p.iconKey]
                    const color = ABOUT_COLORS[p.colorKey]
                    const isActive = i === activeCard
                    return (
                      <PillarPanel key={p.title} $active={isActive} onClick={() => setActiveCard(i)}>
                        <PanelStrip>
                          <PanelIconWell>
                            <Icon size={20} color={color} />
                          </PanelIconWell>
                          <PanelLabelVert>{p.title}</PanelLabelVert>
                        </PanelStrip>

                        <PanelPhoto
                          $visible={isActive}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            e.currentTarget.style.setProperty('--sx', (e.clientX - rect.left) + 'px')
                            e.currentTarget.style.setProperty('--sy', (e.clientY - rect.top) + 'px')
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.setProperty('--sx', '-500px')
                            e.currentTarget.style.setProperty('--sy', '-500px')
                          }}
                        >
                          <PanelPhotoBg $colorKey={p.colorKey} $active={isActive} />
                          <PanelSpotlight />
                          <PanelScrim />
                          <PanelContent>
                            <PanelContentLeft>
                              <PanelPhotoTitle>{p.title}</PanelPhotoTitle>
                              <PanelPhotoDesc>{p.desc}</PanelPhotoDesc>
                            </PanelContentLeft>
                            <PanelContentRight>
                              <PanelPhotoStat $color={color}>{p.stat}</PanelPhotoStat>
                              <PanelPhotoStatLabel>{p.statLabel}</PanelPhotoStatLabel>
                            </PanelContentRight>
                          </PanelContent>
                        </PanelPhoto>
                      </PillarPanel>
                    )
                  })}
                </PillarsAccordion>
              </BorderGlow>
            </AccordionOuter>

            <BottomSection>
              <ValuesColumn>
                <BottomColLabel>Core Values</BottomColLabel>
                <ValuesList>
                  {aboutData.values.map((v, i) => {
                    const Icon = VALUE_ICONS[v.iconKey]
                    const color = ABOUT_COLORS[v.colorKey]
                    return (
                      <ValueRow
                        key={v.label}
                        $last={i === aboutData.values.length - 1}
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <ValueIconWell>
                          <Icon size={18} color={color} />
                        </ValueIconWell>
                        <ValueLabel>{v.label}</ValueLabel>
                        <ValueNum>0{i + 1}</ValueNum>
                      </ValueRow>
                    )
                  })}
                </ValuesList>
              </ValuesColumn>
              <PrinciplesColumn>
                <BottomColLabel>Operating Principles</BottomColLabel>
                <PrinciplesList>
                  {aboutData.principles.map((p, i) => (
                    <PrinRow
                      key={p}
                      $last={i === aboutData.principles.length - 1}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <MdCheckCircle size={16} />
                      <span>
                        <PrinKey>{p.split('—')[0].trim()}</PrinKey>
                        {p.includes('—') ? ` — ${p.split('—').slice(1).join('—').trim()}` : ''}
                      </span>
                    </PrinRow>
                  ))}
                </PrinciplesList>
              </PrinciplesColumn>
            </BottomSection>

          </HeroBody>
        </HeroInner>
      </HeroSection>

      {/* ── Team Culture ──────────────────────────────────────────── */}
      <PageSection>
        <SectionInner>
          <FadeIn direction="none">
            <Chip><ChipDot $color={theme.colors.tertiary} /><MdGroups size={13} style={{ marginRight: 2 }} />How We Work</Chip>
          </FadeIn>

          <SectionHeading>
            <BlurText
              text="Team Culture"
              delay={80}
              animateBy="words"
              direction="bottom"
              stepDuration={0.45}
            />
          </SectionHeading>

          <FadeIn>
            <SectionSubtitle style={{ marginBottom: 64 }}>
              Every design decision, outreach initiative, budget call, and strategic direction is
              made by students. Mentors advise; students decide.
            </SectionSubtitle>
          </FadeIn>

          <FadeIn delay={60}>
            <CultureGrid>
              <CulturePointsStagger variant="slide" stagger={60}>
                <CulturePoint>
                  <CulturePointEyebrow $color={theme.colors.primary}>Student-led</CulturePointEyebrow>
                  <CulturePointBody>Every design, budget, and outreach decision belongs to the team. Mentors bring expertise and a sounding board — students bring direction.</CulturePointBody>
                </CulturePoint>
                <CulturePoint>
                  <CulturePointEyebrow $color={theme.colors.secondary}>Sprint culture</CulturePointEyebrow>
                  <CulturePointBody>An eight-month season built on two-week cycles. Each sprint ends with a progress demo, a short retro, and updated goals for the next cycle.</CulturePointBody>
                </CulturePoint>
                <CulturePoint>
                  <CulturePointEyebrow $color={theme.colors.tertiary}>Open to everyone</CulturePointEyebrow>
                  <CulturePointBody>Grades 6–12, zero experience required. New members join as Student Mentors and grow into contributors and leads across seasons.</CulturePointBody>
                </CulturePoint>
                <CulturePoint>
                  <CulturePointEyebrow $color={theme.colors.secondary}>Multi-season pipeline</CulturePointEyebrow>
                  <CulturePointBody>Skills compound year over year. Newcomer → contributor → lead — the same path every current senior has walked.</CulturePointBody>
                </CulturePoint>
              </CulturePointsStagger>

              <CultureRight>
                <PhotoSlot style={{ minHeight: 260, width: '100%' }}>
                  <MdCameraAlt size={28} color={theme.colors.outlineVariant} style={{ opacity: 0.35 }} />
                  <PhotoSlotName>culture-photo</PhotoSlotName>
                  <PhotoSlotDesc>Team at work or play — build space, competition floor, or team event.</PhotoSlotDesc>
                </PhotoSlot>
                <FolderRow>
                  <FolderBlock onClick={() => setSubteamsOpen(true)}>
                    <Folder color={theme.colors.secondary} items={subteamPaperItems} scale={0.68} onClick={() => setSubteamsOpen(true)} />
                    <FolderBlockLabel>Subteams</FolderBlockLabel>
                    <FolderBlockHint>4 subteams · click to open</FolderBlockHint>
                  </FolderBlock>
                  <FolderBlock onClick={() => setToolsOpen(true)}>
                    <Folder color={theme.colors.primary} items={toolPaperItems} scale={0.68} onClick={() => setToolsOpen(true)} />
                    <FolderBlockLabel>Tools We Use</FolderBlockLabel>
                    <FolderBlockHint>5 tools · click to open</FolderBlockHint>
                  </FolderBlock>
                </FolderRow>
              </CultureRight>
            </CultureGrid>
          </FadeIn>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <PageSection id="team">
        <SectionInner>
          <FadeIn direction="none">
            <Chip><ChipDot $color={theme.colors.primary} /><MdGroups size={13} style={{ marginRight: 2 }} />The People</Chip>
          </FadeIn>

          <SectionHeading>
            <BlurText
              text="Meet the Team"
              delay={80}
              animateBy="words"
              direction="bottom"
              stepDuration={0.45}
            />
          </SectionHeading>

          <FadeIn>
            <SectionSubtitle>
              Students from grades 6–12 across the Brookfield School District and surrounding
              communities — organized into four subteams, led entirely by students.
            </SectionSubtitle>
          </FadeIn>

          <FadeIn delay={60}>
            <TeamGroupSection>
              <TeamGroupPhoto>
                <MdCameraAlt size={40} color={theme.colors.outlineVariant} style={{ opacity: 0.35 }} />
                <PhotoSlotName>team-group</PhotoSlotName>
                <PhotoSlotDesc>
                  Full-team posed group photo. Consistent lighting, neutral background preferred.
                  Landscape recommended.
                </PhotoSlotDesc>
              </TeamGroupPhoto>

              <TeamQuickStats>
                {[
                  { icon: MdGroups, color: theme.colors.primary, value: '6–12', meta: 'Grade range' },
                  { icon: MdRocketLaunch, color: theme.colors.secondary, value: '9', meta: 'Competitive seasons' },
                  { icon: MdPublic, color: theme.colors.tertiary, value: '3×', meta: 'World championship' },
                  { icon: MdMilitaryTech, color: theme.colors.primary, value: '5', meta: 'Consecutive award seasons' },
                ].map((s) => {
                  const Icon = s.icon
                  return (
                    <TeamStatRow key={s.meta}>
                      <TeamStatIcon $color={s.color}><Icon size={20} /></TeamStatIcon>
                      <TeamStatText>
                        <TeamStatValue>{s.value}</TeamStatValue>
                        <TeamStatMeta>{s.meta}</TeamStatMeta>
                      </TeamStatText>
                    </TeamStatRow>
                  )
                })}
              </TeamQuickStats>
            </TeamGroupSection>
          </FadeIn>

          <FadeIn delay={80}>
            <SeasonTabsWrap>
              <SeasonTabs>
                <ActivePill
                  $animated={pill.animated}
                  style={{ left: pill.x, width: pill.w }}
                />
                {SEASONS.map((s, i) => (
                  <SeasonTab
                    key={s.id}
                    ref={el => { tabRefs.current[i] = el }}
                    $active={activeSeason === s.id}
                    onClick={() => setActiveSeason(s.id)}
                  >
                    {s.label}
                  </SeasonTab>
                ))}
              </SeasonTabs>
            </SeasonTabsWrap>
          </FadeIn>

          <MembersGrid>
            {activeMembers.map((member) => (
              <MemberCard
                key={member.id}
                onClick={() => setSelectedMember(member)}
                aria-label={`View ${member.name} profile`}
              >
                <MemberAvatar>
                  {member.photo
                    ? <MemberAvatarImg src={member.photo} alt={member.name} />
                    : <MdPerson size={24} color={theme.colors.outlineVariant} style={{ opacity: 0.45 }} />
                  }
                </MemberAvatar>
                <MemberCardName>{member.name}</MemberCardName>
                <MemberCardRole $color={memberTypeColor(member.type)}>{member.type ?? 'STUDENT'}</MemberCardRole>
                <MemberCardSubteam>{member.subteam}</MemberCardSubteam>
              </MemberCard>
            ))}
          </MembersGrid>
        </SectionInner>
      </PageSection>

      <Divider />

      {/* ── Season History Timeline ───────────────────────────────────── */}
      <PageSection id="history">
        <SectionInner>
          <FadeIn direction="none">
            <Chip><ChipDot $color={theme.colors.primary} /><MdHistory size={13} style={{ marginRight: 2 }} />Our Journey</Chip>
          </FadeIn>

          <SectionHeading>
            <BlurText
              text="Nine Seasons of GEarheads"
              delay={70}
              animateBy="words"
              direction="bottom"
              stepDuration={0.45}
            />
          </SectionHeading>

          <FadeIn>
            <TimelineIntroText>
              From a{' '}
              <IntroAccent $color={theme.colors.onSurfaceVariant}>5th-grade FLL team in 2017</IntroAccent>
              {' '}to{' '}
              <IntroAccent $color={theme.colors.primary}>back-to-back Worlds appearances</IntroAccent>
              {' '}and a{' '}
              <IntroAccent $color={theme.colors.secondary}>1st Place CONNECT Award</IntroAccent>
              {' '}— nine seasons, every one below.
            </TimelineIntroText>
          </FadeIn>
        </SectionInner>

        <div style={{ padding: `0 ${theme.spacing.marginMobile}` }}>
          <SeasonTimeline />
        </div>
      </PageSection>

      <Divider />

      {/* ── Interested in joining? ─────────────────────────────────────────── */}
      <JoinSection>
        <JoinGrid>
          <JoinCopy>
            <FadeIn direction="none">
              <Chip>
                <ChipDot $color={theme.colors.secondary} />
                <MdHandshake size={13} style={{ marginRight: 2 }} />
                Get Involved
              </Chip>
            </FadeIn>

            <FadeIn delay={40}>
              <JoinHeading>Interested<br />in joining?</JoinHeading>
              <JoinSubtitle>
                Applications are open year-round. Fill this out and we'll reach out — takes two minutes.
              </JoinSubtitle>
            </FadeIn>

            <FadeIn delay={80}>
              <PerkList>
                <Perk>
                  <PerkIcon $color={theme.colors.secondary}><MdBuild size={16} /></PerkIcon>
                  <PerkText>
                    <PerkTitle>Hands-on engineering</PerkTitle>
                    <PerkDesc>Design and build real competition robots from scratch.</PerkDesc>
                  </PerkText>
                </Perk>
                <Perk>
                  <PerkIcon $color={theme.colors.primary}><MdStar size={16} /></PerkIcon>
                  <PerkText>
                    <PerkTitle>Real competition experience</PerkTitle>
                    <PerkDesc>Qualify and compete at regional and world-level events.</PerkDesc>
                  </PerkText>
                </Perk>
                <Perk>
                  <PerkIcon $color={theme.colors.tertiary}><MdFavorite size={16} /></PerkIcon>
                  <PerkText>
                    <PerkTitle>A team that cares</PerkTitle>
                    <PerkDesc>Student-led, mentor-supported, genuinely fun.</PerkDesc>
                  </PerkText>
                </Perk>
              </PerkList>
            </FadeIn>
          </JoinCopy>

          <FadeIn delay={60}>
            <JoinCard>
              <CardAccent />
              <CardBody>
                <CardHeader>
                  <CardTitle>Apply to join</CardTitle>
                  <CardSubtitle>
                    We'll reach out to schedule a visit. Applications are open all year.
                  </CardSubtitle>
                </CardHeader>

                <form onSubmit={handleJoinSubmit}>
                  <FieldStack>
                    <FieldRow>
                      <Field>
                        <FieldLabel htmlFor="join-name">Full Name</FieldLabel>
                        <FieldInput
                          id="join-name"
                          type="text"
                          placeholder="Your full name"
                          value={joinForm.name}
                          onChange={setJoinField('name')}
                          required
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="join-email">Email</FieldLabel>
                        <FieldInput
                          id="join-email"
                          type="email"
                          placeholder="you@example.com"
                          value={joinForm.email}
                          onChange={setJoinField('email')}
                          required
                        />
                      </Field>
                    </FieldRow>

                    <Field>
                      <FieldLabel htmlFor="join-school">School</FieldLabel>
                      <FieldSelect
                        id="join-school"
                        value={joinForm.school}
                        onChange={setJoinField('school')}
                        required
                      >
                        <option value="" disabled>Select your school...</option>
                        <option>Wisconsin Hills Middle School</option>
                        <option>Brookfield Central High School</option>
                        <option>Brookfield East High School</option>
                        <option>Pilgrim Park Middle School</option>
                        <option>Other (Homeschool, moving, etc.)</option>
                      </FieldSelect>
                    </Field>

                    <FieldRow>
                      <Field>
                        <FieldLabel htmlFor="join-subteam">Subteam Interest</FieldLabel>
                        <FieldSelect
                          id="join-subteam"
                          value={joinForm.subteam}
                          onChange={setJoinField('subteam')}
                          required
                        >
                          <option value="" disabled>Which subteam?</option>
                          <option>Mechanical</option>
                          <option>Software</option>
                          <option>Outreach</option>
                          <option>Strategy & Documentation</option>
                          <option>Not sure yet</option>
                        </FieldSelect>
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="join-grade">Grade</FieldLabel>
                        <FieldSelect
                          id="join-grade"
                          value={joinForm.grade}
                          onChange={setJoinField('grade')}
                          required
                        >
                          <option value="" disabled>Your grade...</option>
                          <option value="6th Grade">6th Grade</option>
                          <option value="7th Grade">7th Grade</option>
                          <option value="8th Grade">8th Grade</option>
                          <option value="9th Grade">9th Grade</option>
                          <option value="10th Grade">10th Grade</option>
                          <option value="11th Grade">11th Grade</option>
                          <option value="12th Grade">12th Grade</option>
                          <option value="Other">Other</option>
                        </FieldSelect>
                      </Field>
                    </FieldRow>

                    <Field>
                      <FieldLabel htmlFor="join-message">About you</FieldLabel>
                      <FieldTextarea
                        id="join-message"
                        placeholder="What draws you to robotics? Any skills or experience? What are you hoping to learn?"
                        value={joinForm.message}
                        onChange={setJoinField('message')}
                        required
                      />
                    </Field>
                  </FieldStack>

                  <SubmitRow>
                    <SubmitHint>Opens your email app</SubmitHint>
                    <SubmitBtn type="submit">
                      <MdSend size={13} />
                      Send Application
                    </SubmitBtn>
                  </SubmitRow>
                </form>
              </CardBody>
            </JoinCard>
          </FadeIn>
        </JoinGrid>
      </JoinSection>
    </PageWrapper>
  )
}
