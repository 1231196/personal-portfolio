import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const anchor = (hash) => (isHome ? hash : `/${hash}`)

  const handleHomeClick = (event) => {
    if (isHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    let frameId = 0

    const setGlowPosition = (x, y) => {
      document.documentElement.style.setProperty('--mouse-x', `${x}px`)
      document.documentElement.style.setProperty('--mouse-y', `${y}px`)
    }

    const onPointerMove = (event) => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }

      const { clientX, clientY } = event
      frameId = requestAnimationFrame(() => {
        setGlowPosition(clientX, clientY)
      })
    }

    setGlowPosition(window.innerWidth * 0.5, window.innerHeight * 0.28)
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <main className="terminal-page">
      <div className="terminal-overlay" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="topbar-shell">
        <div className="terminal-wrap terminal-head">
          <Link to="/" className="prompt-home-btn" onClick={handleHomeClick}>
            root@rfaria: ~ $
          </Link>
          <nav className="top-nav" aria-label="Main navigation">
            <a href={anchor('#about')}>/about</a>
            <a href={anchor('#skills')}>/skills</a>
            <a href={anchor('#projects')}>/projects</a>
            <Link to="/blog">/blog</Link>
            <a href={anchor('#education')}>/education</a>
            <a href={anchor('#experience')}>/experience</a>
          </nav>
        </div>
      </header>

      <Outlet />
    </main>
  )
}

export default Layout
