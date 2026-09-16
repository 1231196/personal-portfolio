import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation()
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.term-window', { autoAlpha: 0, duration: 0.45, ease: 'power2.out' })
      })
    }, page)

    return () => context.revert()
  }, [location.pathname])

  return (
    <main className="portfolio-page" ref={pageRef}>
      <div className="cursor-glow" aria-hidden="true" />
      <div className="route-view"><Outlet /></div>
    </main>
  )
}

export default Layout
