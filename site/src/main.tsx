import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import './index.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

console.info(
  '%cInterface Skills%c\nEvery state handled, including this console.\nSource: https://github.com/aviralj02/interface-skills\nBuilt by Aviral Jain · https://heyaviral.com',
  'font: 600 14px ui-sans-serif, system-ui; color: #2f5fe0',
  'font: 12px ui-monospace, monospace; line-height: 1.6',
)

// Pre-rendered pages hydrate; the dev server renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
