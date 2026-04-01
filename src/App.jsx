import { useEffect } from 'react'

function App() {
  const dataSkills = ['RAG Pipelines', 'LlamaIndex', 'Vector Databases', 'Embeddings', 'Prompt Engineering']
  const securitySkills = ['Networking', 'Linux', 'OWASP Top 10', 'Burp Suite', 'Nmap']
  const engineeringSkills = ['Git', 'Docker', 'APIs', 'Databases', 'Bash']
  const languageSkills = ['JavaScript', 'Python', 'Java', 'C', 'C#']
  const educationItems = [
    {
      period: 'SEP. 2023 - JUL. 2026',
      title: 'Porto Polytechnic Institute',
      description: "Bachelor's in Informatics and Computing Engineering",
    },
    {
      period: 'OCT. 2025 - NOV. 2025',
      title: 'Cisco Networking Academy',
      description: 'Introduction to Cybersecurity',
    },
  ]

  const experienceItems = [
    {
      period: 'feb 2026 - present · 3 months',
      title: 'Full-stack Developer',
      company: 'Its Possible Tech · Internship',
      location: 'Portugal · Hybrid',
    },
    {
      period: 'sep 2025 - feb 2026 · 6 months',
      title: 'Full-stack Developer',
      company: 'Pentabay Softwares · Part-time',
    },
    {
      period: 'jul 2025 - aug 2025 · 2 months',
      title: 'Full Stack Developer',
      company: 'Pentabay Softwares · Internship',
    },
  ]

  const projectItems = [
    {
      title: 'RAG Playground',
      description: 'Experimenting with LlamaIndex, retrieval chains, and vector search quality.',
    },
    {
      title: 'Security Labs',
      description: 'Hands-on pentesting notes, small CTF scripts, and vulnerability writeups.',
    },
  ]

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const downloadCv = () => {
    const link = document.createElement('a')
    link.href = '/Rodrigo_Faria_CV.pdf'
    link.download = 'Rodrigo_Faria_CV.pdf'
    document.body.appendChild(link)
    link.click()
    link.remove()
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
          <button type="button" className="prompt-home-btn" onClick={scrollToTop}>root@rfaria: ~ $</button>
          <nav className="top-nav" aria-label="Main navigation">
            <a href="#about">/about</a>
            <a href="#skills">/skills</a>
            <a href="#projects">/projects</a>
            <a href="#education">/education</a>
            <a href="#experience">/experience</a>
          </nav>
        </div>
      </header>

      <section className="terminal-wrap hero-block">
        <div className="hero-layout">
          <article className="hero-copy">
            <p className="hello-line">Hello, I&apos;m</p>
            <h1>RODRIGO FARIA</h1>
            <p className="role-line">Computer Engineer & Aspiring Penetration Tester</p>

            <p className="quote-line">&gt; I build intelligent systems - and know how to break them.</p>

            <div className="cta-row">
              <button type="button" onClick={downloadCv}>[&gt;_ download_cv</button>
              <div className="cta-social" id="contact-links" aria-label="Social links">
                <a href="https://github.com/1231196" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.17-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.36 1.1 2.94.84.09-.67.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.74-.1-.26-.44-1.3.1-2.72 0 0 .85-.28 2.79 1.04a9.4 9.4 0 0 1 5.08 0c1.94-1.32 2.79-1.04 2.79-1.04.55 1.42.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.94-2.35 4.81-4.59 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" fill="currentColor" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/rodrigo-faria05/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12M5.6 10h2.68v8.4H5.6V10Zm4.28 0h2.57v1.15h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.8 3.2 4.13v4.52h-2.68v-4c0-.96-.02-2.2-1.33-2.2-1.34 0-1.54 1.05-1.54 2.14v4.06H9.88V10Z" fill="currentColor" />
                  </svg>
                </a>
                <a href="mailto:rodrigofaria@gmail.com" aria-label="Email">
                  <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 4.8 8-4.8V8l-8 4.8L4 8Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          <div className="hero-avatar" aria-hidden="true">
            <div className="avatar-core">
              
              <img src="/logo.jpg" alt="Rodrigo Faria avatar" className="avatar-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="terminal-wrap about-block" id="about">
        <p className="prompt-line">root@rfaria: /about $</p>

        <div className="about-layout">
          <article>
            <h2>About Me</h2>
            <p>Computer Engineering student focused on:</p>
            <ul>
              <li>Artificial Intelligence</li>
              <li>Cybersecurity (Pentesting)</li>
              <li>Building robust systems</li>
            </ul>
            <p className="status-line">
              &gt; Currently: studying pentesting and building AI-based projects.
            </p>
          </article>

          <div className="about-avatar" aria-hidden="true">
            <div className="about-terminal-card">
              <div className="about-terminal-head">
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-dot" />
              </div>
              <p className="about-status-line"><span>status</span><span className="status-value">Coding or Sleeping.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="terminal-wrap skills-block" id="skills">
        <p className="prompt-line">root@rfaria: /skills $ </p>

        <div className="skills-grid">
          <article>
            <h3>AI</h3>
            <ul>
              {dataSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Cyber</h3>
            <ul>
              {securitySkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Development</h3>
            <ul>
              {engineeringSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h3>Languages</h3>
            <ul>
              {languageSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="star-mark" aria-hidden="true" />
      </section>

      <section className="terminal-wrap projects-block" id="projects">
        <p className="prompt-line">root@rfaria: /projects $ ls</p>
        <h2 className="timeline-title">projects</h2>
        <div className="projects-grid">
          {projectItems.map((project) => (
            <article key={project.title} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="terminal-wrap timeline-block" id="education">
        <p className="prompt-line">root@rfaria: /education $ cat education.md</p>
        <h2 className="timeline-title">education</h2>
        <div className="timeline">
          {educationItems.map((item, index) => (
            <article
              key={item.title + item.period}
              className={`timeline-item ${index % 2 === 0 ? 'is-right' : 'is-left'}`}
            >
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-node" aria-hidden="true" />
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="terminal-wrap timeline-block experience-block" id="experience">
        <p className="prompt-line">root@rfaria: /experience $ cat experience.md</p>
        <h2 className="timeline-title">experience</h2>

        <div className="timeline">
          {experienceItems.map((item, index) => (
            <article
              key={item.title + item.period}
              className={`timeline-item ${index % 2 === 0 ? 'is-right' : 'is-left'}`}
            >
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-node" aria-hidden="true" />
              <div className="timeline-content">
                <h3>{item.title}</h3>
                {item.company ? <p>{item.company}</p> : null}
                {item.companyMeta ? <p>{item.companyMeta}</p> : null}
                {item.location ? <p>{item.location}</p> : null}
                {item.bullets ? (
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {item.skills ? <p>{item.skills}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

export default App
