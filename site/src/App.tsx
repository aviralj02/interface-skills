import { Outlet, Route, Routes } from 'react-router'
import { RouteEffects } from './components/RouteEffects'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { ContentResilienceDemo } from './demos/content-resilience/ContentResilienceDemo'
import { DestructiveActionsDemo } from './demos/destructive-actions/DestructiveActionsDemo'
import { InterfaceStatesDemo } from './demos/interface-states/InterfaceStatesDemo'
import { DEMO_PATHS } from './demos/registry'
import { UxWritingDemo } from './demos/ux-writing/UxWritingDemo'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { SkillPage } from './pages/SkillPage'

function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        {/* Demos are full-viewport stages with no site chrome, so a screen recording is just the demo. */}
        <Route path={DEMO_PATHS.destructiveActions} element={<DestructiveActionsDemo />} />
        <Route path={DEMO_PATHS.uxWriting} element={<UxWritingDemo />} />
        <Route path={DEMO_PATHS.interfaceStates} element={<InterfaceStatesDemo />} />
        <Route path={DEMO_PATHS.contentResilience} element={<ContentResilienceDemo />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/skills/:name" element={<SkillPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
