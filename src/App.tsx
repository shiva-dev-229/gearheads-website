import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/theme'

// Persistent layout
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Loader from './components/Loader'

// Home page sections — not lazy, in the main bundle
import HeroSection from './components/HeroSection'
import FeaturesGrid from './components/FeaturesGrid'
import SponsorsSection from './components/SponsorsSection'
import Timeline from './components/Timeline'
import FAQSection from './components/FAQSection'

// ─── Lazy-loaded page components ──────────────────────────────────────────────

// About
const AboutPage              = lazy(() => import('./pages/AboutPage'))
const HistoryPage            = lazy(() => import('./pages/about/HistoryPage'))
const MissionPage            = lazy(() => import('./pages/about/MissionPage'))
const CulturePage            = lazy(() => import('./pages/about/CulturePage'))
const AwardsPage             = lazy(() => import('./pages/about/AwardsPage'))
const TeamPage               = lazy(() => import('./pages/TeamPage'))

// Robot
const RobotPage              = lazy(() => import('./pages/RobotPage'))
const GearbotPage            = lazy(() => import('./pages/robot/GearbotPage'))
const SubsystemsPage         = lazy(() => import('./pages/robot/SubsystemsPage'))
const EvolutionPage          = lazy(() => import('./pages/robot/EvolutionPage'))

// Engineering
const EngineeringPage        = lazy(() => import('./pages/EngineeringPage'))
const DesignProcessPage      = lazy(() => import('./pages/engineering/DesignProcessPage'))
const CadPage                = lazy(() => import('./pages/engineering/CadPage'))
const ManufacturingPage      = lazy(() => import('./pages/engineering/ManufacturingPage'))
const TestingPage            = lazy(() => import('./pages/engineering/TestingPage'))

// Programming
const ProgrammingPage        = lazy(() => import('./pages/ProgrammingPage'))
const ControlPage            = lazy(() => import('./pages/programming/ControlPage'))
const AutonomousPage         = lazy(() => import('./pages/programming/AutonomousPage'))
const InnovationsPage        = lazy(() => import('./pages/programming/InnovationsPage'))

// Outreach
const OutreachPage           = lazy(() => import('./pages/OutreachPage'))
const ChildrensHospitalPage  = lazy(() => import('./pages/outreach/ChildrensHospitalPage'))
const VeteransPage           = lazy(() => import('./pages/outreach/VeteransPage'))
const ComputerProjectPage    = lazy(() => import('./pages/outreach/ComputerProjectPage'))
const RookiePage             = lazy(() => import('./pages/outreach/RookiePage'))
const ProductionHubPage      = lazy(() => import('./pages/outreach/ProductionHubPage'))
const DiyCncPage             = lazy(() => import('./pages/outreach/DiyCncPage'))
const MakerFairePage         = lazy(() => import('./pages/outreach/MakerFairePage'))
const FirstAdvocacyPage      = lazy(() => import('./pages/outreach/FirstAdvocacyPage'))
const GeElfunsPage           = lazy(() => import('./pages/outreach/GeElfunsPage'))
const FllMentoringPage       = lazy(() => import('./pages/outreach/FllMentoringPage'))
const CommunityDemosPage     = lazy(() => import('./pages/outreach/CommunityDemosPage'))
const SchoolSupportPage      = lazy(() => import('./pages/outreach/SchoolSupportPage'))

// Seasons
const Season1718Page         = lazy(() => import('./pages/seasons/Season1718Page'))
const Season1819Page         = lazy(() => import('./pages/seasons/Season1819Page'))
const Season2526Page         = lazy(() => import('./pages/seasons/Season2526Page'))
const Season2425Page         = lazy(() => import('./pages/seasons/Season2425Page'))
const Season2324Page         = lazy(() => import('./pages/seasons/Season2324Page'))
const Season2223Page         = lazy(() => import('./pages/seasons/Season2223Page'))
const Season2122Page         = lazy(() => import('./pages/seasons/Season2122Page'))
const Season2021Page         = lazy(() => import('./pages/seasons/Season2021Page'))
const Season1920Page         = lazy(() => import('./pages/seasons/Season1920Page'))

// Standalone
const ImpactPage             = lazy(() => import('./pages/ImpactPage'))
const SponsorsPage           = lazy(() => import('./pages/SponsorsPage'))
const MediaPage              = lazy(() => import('./pages/MediaPage'))
const JoinPage               = lazy(() => import('./pages/JoinPage'))
const ContactPage            = lazy(() => import('./pages/ContactPage'))
const NotFoundPage           = lazy(() => import('./pages/NotFoundPage'))

// ─── Layout shells ────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 80px;
`

const TimelineWrapper = styled.div`
  width: 100%;
  max-width: ${theme.spacing.containerMax};
  margin: 0 auto;
  padding: 0 ${theme.spacing.marginMobile};
  margin-bottom: 16px;

  @media (min-width: 768px) {
    padding: 0 ${theme.spacing.marginDesktop};
  }
`

const LoaderPage = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`

// ─── Home page ────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <SponsorsSection />
      <TimelineWrapper>
        <Timeline />
      </TimelineWrapper>
      <FAQSection />
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <PageWrapper>
          <Header />
          <ScrollToTop />
          <Main>
            <Suspense fallback={<LoaderPage><Loader showText /></LoaderPage>}>
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* About */}
                <Route path="/about"            element={<AboutPage />} />
                <Route path="/about/history"    element={<HistoryPage />} />
                <Route path="/about/mission"    element={<MissionPage />} />
                <Route path="/about/culture"    element={<CulturePage />} />
                <Route path="/about/awards"     element={<AwardsPage />} />
                <Route path="/team"             element={<TeamPage />} />

                {/* Robot */}
                <Route path="/robot"                 element={<RobotPage />} />
                <Route path="/robot/gearboticus"     element={<GearbotPage />} />
                <Route path="/robot/subsystems"      element={<SubsystemsPage />} />
                <Route path="/robot/evolution"       element={<EvolutionPage />} />

                {/* Engineering */}
                <Route path="/engineering"                    element={<EngineeringPage />} />
                <Route path="/engineering/design-process"     element={<DesignProcessPage />} />
                <Route path="/engineering/cad"                element={<CadPage />} />
                <Route path="/engineering/manufacturing"      element={<ManufacturingPage />} />
                <Route path="/engineering/testing"            element={<TestingPage />} />

                {/* Programming */}
                <Route path="/programming"                    element={<ProgrammingPage />} />
                <Route path="/programming/control"            element={<ControlPage />} />
                <Route path="/programming/autonomous"         element={<AutonomousPage />} />
                <Route path="/programming/innovations"        element={<InnovationsPage />} />

                {/* Outreach */}
                <Route path="/outreach"                          element={<OutreachPage />} />
                <Route path="/outreach/childrens-hospital"       element={<ChildrensHospitalPage />} />
                <Route path="/outreach/veterans"                 element={<VeteransPage />} />
                <Route path="/outreach/computer-project"         element={<ComputerProjectPage />} />
                <Route path="/outreach/rookie-qualifier"         element={<RookiePage />} />
                <Route path="/outreach/production-hub"           element={<ProductionHubPage />} />
                <Route path="/outreach/diy-cnc"                  element={<DiyCncPage />} />
                <Route path="/outreach/maker-faire"              element={<MakerFairePage />} />
                <Route path="/outreach/first-advocacy"           element={<FirstAdvocacyPage />} />
                <Route path="/outreach/ge-elfuns"                element={<GeElfunsPage />} />
                <Route path="/outreach/fll-mentoring"            element={<FllMentoringPage />} />
                <Route path="/outreach/community-demos"          element={<CommunityDemosPage />} />
                <Route path="/outreach/school-support"           element={<SchoolSupportPage />} />

                {/* Seasons */}
                <Route path="/seasons/2017-18" element={<Season1718Page />} />
                <Route path="/seasons/2018-19" element={<Season1819Page />} />
                <Route path="/seasons/2025-26" element={<Season2526Page />} />
                <Route path="/seasons/2024-25" element={<Season2425Page />} />
                <Route path="/seasons/2023-24" element={<Season2324Page />} />
                <Route path="/seasons/2022-23" element={<Season2223Page />} />
                <Route path="/seasons/2021-22" element={<Season2122Page />} />
                <Route path="/seasons/2020-21" element={<Season2021Page />} />
                <Route path="/seasons/2019-20" element={<Season1920Page />} />

                {/* Standalone */}
                <Route path="/impact"    element={<ImpactPage />} />
                <Route path="/sponsors"  element={<SponsorsPage />} />
                <Route path="/media"     element={<MediaPage />} />
                <Route path="/join"      element={<JoinPage />} />
                <Route path="/contact"   element={<ContactPage />} />

                {/* Redirects */}
                <Route path="/robot/current"               element={<Navigate to="/robot/gearboticus" replace />} />
                <Route path="/engineering/cad-mechanical"  element={<Navigate to="/engineering/cad" replace />} />
                <Route path="/outreach/computer-refurbishing" element={<Navigate to="/outreach/computer-project" replace />} />
                <Route path="/new-members"                 element={<Navigate to="/join" replace />} />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Main>
          <Footer />
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}
