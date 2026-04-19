import Navbar from './components/layout/Navbar'
import Bio from './components/sections/Bio'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import { useDarkMode } from './hooks/useDarkMode'

export default function App() {
  const { isDark, toggle } = useDarkMode()

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
