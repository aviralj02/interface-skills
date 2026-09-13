import { Route, Routes } from 'react-router'
import { RouteEffects } from './components/RouteEffects'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { SkillPage } from './pages/SkillPage'

export function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <RouteEffects />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills/:name" element={<SkillPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
