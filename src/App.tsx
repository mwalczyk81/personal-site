import Navbar from './components/layout/Navbar'
import Bio from './components/sections/Bio'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import { WritingIndex, WritingPostPage } from './components/pages/WritingPages'
import { useDarkMode } from './hooks/useDarkMode'

// No router dependency: the site is static and Vercel rewrites every path to index.html,
// so a plain pathname check is enough for /writing and /writing/:slug.
function getPath(): string {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const path = getPath()

  if (path === '/writing' || path.startsWith('/writing/')) {
    const slug = path.slice('/writing/'.length)
    return (
      <>
        <Navbar isDark={isDark} onToggleDark={toggle} homePath="/" />
        <main>{path === '/writing' ? <WritingIndex /> : <WritingPostPage slug={slug} />}</main>
      </>
    )
  }

  return (
    <>
      <Navbar isDark={isDark} onToggleDark={toggle} />
      <main>
        <Bio />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
