import Navbar from './components/layout/Navbar'
import Bio from './components/sections/Bio'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Bio />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
