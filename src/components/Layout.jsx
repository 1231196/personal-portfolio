import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const pageRef = useRef(null)

  const anchor = (hash) => (isHome ? hash : `/${hash}`)

  const handleHomeClick = (event) => {
    if (isHome) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    let media
    let resetTyping = () => {}
    const context = gsap.context(() => {
      media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = gsap.timeline({
          defaults: { ease: 'power3.out' },
        })

        intro
          .from('.topbar-shell', { y: -18, autoAlpha: 0, duration: 0.5 })
          .from('.route-view', { autoAlpha: 0, duration: 0.35 }, '-=0.2')
          .from('.hero-copy > *', { y: 22, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '-=0.1')
          .from('.hero-avatar', { scale: 0.86, autoAlpha: 0, duration: 0.7 }, '<')
          .from('.blog-page > *, .blog-post-block > *', { y: 18, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, '-=0.35')

        gsap.utils.toArray('.about-block, .skills-block, .projects-block, .timeline-block').forEach((section) => {
          gsap.from(section.children, {
            y: 28,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('.skills-grid article, .projects-grid article, .blog-grid .blog-card').forEach((card) => {
          gsap.from(card, {
            y: 20,
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          })
        })

        gsap.utils.toArray('.timeline-item').forEach((item) => {
          gsap.from(item, {
            x: item.classList.contains('is-left') ? -24 : 24,
            autoAlpha: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              once: true,
            },
          })
        })

        const typeLines = gsap.utils.toArray('.blog-type-line')
        if (typeLines.length) {
          const originalTexts = typeLines.map((line) => line.textContent || '')
          const typing = gsap.timeline({
            defaults: { ease: 'none' },
            delay: 0.45,
          })

          typeLines.forEach((line, index) => {
            const text = originalTexts[index]
            const state = { characters: 0 }

            line.textContent = ''
            line.classList.add('is-typing')
            typing.to(state, {
              duration: Math.max(0.18, Math.min(1.5, text.length * 0.0065)),
              characters: text.length,
              onUpdate: () => {
                line.textContent = text.slice(0, Math.ceil(state.characters))
              },
              onComplete: () => line.classList.remove('is-typing'),
            })
          })

          resetTyping = () => {
            typeLines.forEach((line, index) => {
              line.textContent = originalTexts[index]
              line.classList.remove('is-typing')
            })
            typing.kill()
          }
        }

        gsap.to('.avatar-core', {
          y: -8,
          duration: 2.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

    }, page)

    return () => {
      resetTyping()
      media?.revert()
      context.revert()
    }
  }, [location.pathname])

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
    <main className="terminal-page" ref={pageRef}>
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

      <div className="route-view">
        <Outlet />
      </div>
    </main>
  )
}

export default Layout
