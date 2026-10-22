import { Outlet, Route, Routes, useLocation } from 'react-router'
import { RouteEffects } from './components/RouteEffects'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { SkillPage } from './pages/SkillPage'

function SiteLayout() {
  // The home hero runs under a transparent header; every other page starts below it.
  const overlay = useLocation().pathname === '/'
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader overlay={overlay} />
      <main id="main" className={`flex-1 ${overlay ? '-mt-14' : ''}`}>
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
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/skills/:name" element={<SkillPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
