function App() {
  const dataSkills = ['RAG Pipelines', 'LlamaIndex', 'Vector Databases', 'Embeddings', 'Prompt Engineering']
  const securitySkills = ['Networking', 'Linux', 'OWASP Top 10', 'Burp Suite', 'Nmap']
  const engineeringSkills = ['Git', 'Docker', 'APIs', 'Databases', 'Bash']
  const languageSkills = ['React', 'JavaScript', 'Python', 'Java', 'C', 'C#']
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

  return (
    <main className="terminal-page">
      <div className="terminal-overlay" aria-hidden="true" />

      <header className="topbar-shell">
        <div className="terminal-wrap terminal-head">
          <p className="prompt-line">root@rfaria: ~ $</p>
          <nav className="top-nav" aria-label="Main navigation">
            <a href="#about">/about</a>
            <a href="#skills">/skills</a>
            <a href="#education">/education</a>
            <a href="#experience">/experience</a>
            <a href="#contact">/contact</a>
          </nav>
        </div>
      </header>

      <section className="terminal-wrap hero-block">
        <div className="hero-layout">
          <article className="hero-copy">
            <p className="hello-line">Hello, I&apos;m</p>
            <h1>RODRIGO FARIA</h1>
            <p className="role-line">AI Engineer & Aspiring Penetration Tester</p>

            <p className="quote-line">&gt; I build intelligent systems - and know how to break them.</p>

            <div className="cta-row" id="contact">
              <button type="button">[&gt;_ view_projects</button>
              <button type="button">[&gt;_ download_cv</button>
              <button type="button">[&gt;_ contact</button>
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
          <div className="about-avatar" aria-hidden="true">
            <div className="about-core" />
          </div>

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
            <h3>Languages / Technologies</h3>
            <ul>
              {languageSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="star-mark" aria-hidden="true" />
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
