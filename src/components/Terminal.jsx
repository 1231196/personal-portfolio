import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TerminalWindow from './TerminalWindow'
import blogPosts from '../data/blogPosts'
import {
  profile,
  aboutFacts,
  projects,
  experience,
  skillGroups,
  contact,
} from '../data/portfolio'

const PROMPT = `${profile.user}@${profile.host}`
const FILES = ['about.md', 'projects.md', 'experience.md', 'skills.md', 'contact.md', 'blog.md', 'resume.pdf']
const HIDDEN_FILES = ['.env', '.bash_history', '.flag', '.git']
const SHORTCUTS = ['help', 'ls', 'cat about.md', 'cat projects.md', 'cat experience.md', 'cat skills.md', 'cat contact.md']

const LIVE_STATS_BASE = { cpu: 82, memory: 54, gpu: 38 }
const DISK_USAGE = 61
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function useLiveStat(base, { min, max, step = 6, driftMs = 2200 }) {
  const [display, setDisplay] = useState(base)
  const targetRef = useRef(base)
  const lastRef = useRef(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const pickTarget = () => {
      targetRef.current = clamp(targetRef.current + (Math.random() * step * 2 - step), min, max)
      if (reduceMotion) setDisplay(targetRef.current)
    }
    const driftId = setInterval(pickTarget, driftMs)
    if (reduceMotion) return () => clearInterval(driftId)

    let raf
    lastRef.current = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.08, (now - lastRef.current) / 1000)
      lastRef.current = now
      setDisplay((value) => value + (targetRef.current - value) * Math.min(1, dt * 1.8))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      clearInterval(driftId)
      cancelAnimationFrame(raf)
    }
  }, [min, max, step, driftMs])

  return display
}

const SERVICES = [
  { name: 'aegis.service', status: 'RUNNING' },
  { name: 'rarvis.service', status: 'ACTIVE' },
  { name: 'personal-portfolio.service', status: 'RUNNING' },
]

const ACTIVITY = [
  { time: '23:04', text: 'personal-portfolio.service deployed' },
  { time: '21:17', text: 'aegis.service updated' },
  { time: '19:42', text: 'security review completed' },
]

const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms) })

const SHARK_ART = [
  '                                                                    ###',
  '                                                                    ####',
  '                                                                   ######',
  ' #                                                                 ########',
  '  ##                                                              ##########',
  '   #*                                                            ###########*',
  '    ***                                                          *************',
  '     ***                                                        ****************',
  '      ****                                                     ******************',
  '       ****                                                   **********************************',
  '         ****                                    *****************************************************',
  '          ****                          *******************************************************************',
  '           +++++                  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
  '            +++++          ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=::+',
  '             +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++:   -+++',
  '              ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++:   -+++++',
  '             +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==+++++++++++++++=-=+++++++++',
  '           ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++==+++=:=+++-.=++++++++++++++++++++++=--++++',
  '         =======+++++++===========================================================+-.=++=::=++=.-+======+===========--:::=++++=',
  '       ===========   ===============================================================.:===-.====.:=========-:::::::..::-=++==',
  '      ======                ========================================================.:===-.====.-==========--::..',
  '                                    ===============================================-.-===..===. -==',
  '                                                     ========    ==================. =',
  '                                                                  ============',
  '                                                                  ===========',
  '                                                                   ---------',
  '                                                                    -------',
  '                                                                    ------',
  '                                                                     ----',
  '                                                                     ---',
].join('\n')

function AsciiLogo() {
  return <pre className="ascii-logo" aria-hidden="true">{SHARK_ART}</pre>
}

function StatRow({ label, value }) {
  const hot = value >= 85
  return (
    <div className="sys-row">
      <span className="sys-label">{label}</span>
      <div className="sys-bar">
        <i
          className={`sys-bar-live${hot ? ' sys-bar-hot' : ''}`}
          style={{ transform: `scaleX(${value / 100})` }}
        />
      </div>
      <span className="sys-val">{Math.round(value)}%</span>
    </div>
  )
}

function SystemStatus() {
  const cpu = useLiveStat(LIVE_STATS_BASE.cpu, { min: 40, max: 97, step: 5, driftMs: 1300 })
  const memory = useLiveStat(LIVE_STATS_BASE.memory, { min: 32, max: 72, step: 3, driftMs: 1600 })
  const gpu = useLiveStat(LIVE_STATS_BASE.gpu, { min: 10, max: 90, step: 7, driftMs: 1100 })

  return (
    <div className="sys-status">
      <p className="sys-status-title">// SYSTEM STATUS</p>
      <StatRow label="CPU" value={cpu} />
      <StatRow label="MEMORY" value={memory} />
      <StatRow label="DISK" value={DISK_USAGE} />
      <StatRow label="GPU" value={gpu} />
    </div>
  )
}

function Neofetch() {
  return (
    <div className="neofetch">
      <AsciiLogo />
      <div className="neofetch-info">
        <p className="nf-id">{PROMPT}</p>
        <div className="nf-rule" aria-hidden="true" />
        <div className="nf-row"><span className="nf-key">OS</span><span>{profile.os}</span></div>
        <div className="nf-row"><span className="nf-key">Role</span><span>{profile.role}</span></div>
        <div className="nf-row"><span className="nf-key">Location</span><span>{profile.location}</span></div>
        <div className="nf-row"><span className="nf-key">Stack</span><span>{profile.stack}</span></div>
        <div className="nf-row"><span className="nf-key">Focus</span><span>{profile.focus}</span></div>
        <div className="nf-row"><span className="nf-key">Status</span><span className="nf-ok">{profile.status}</span></div>
      </div>
    </div>
  )
}

function ServiceList() {
  return (
    <div className="ps-list">
      {SERVICES.map((s) => (
        <div className="ps-row" key={s.name}>
          <span className="ps-name">{s.name}</span>
          <span className="ps-state">{s.status}</span>
        </div>
      ))}
    </div>
  )
}

function ActivityLog() {
  return (
    <div className="dash-activity">
      {ACTIVITY.map((a) => (
        <p className="dash-activity-row" key={a.time + a.text}><span className="dash-time">{a.time}</span>{a.text}</p>
      ))}
    </div>
  )
}

function Dashboard({ onRunCommand }) {
  return (
    <div className="dash">
      <div className="dash-header">
        <span className="dash-user">{PROMPT}</span>
        <span className="dash-online"><i className="dash-dot" aria-hidden="true" /> ONLINE</span>
      </div>
      <div className="dash-top">
        <div className="dash-col-left">
          <AsciiLogo />
          <SystemStatus />
        </div>
        <div className="dash-col-right">
          <p className="dash-cmd">$ neofetch</p>
          <div className="dash-ident">
            <p className="dash-name">{profile.name}</p>
            <p className="dash-sub">{profile.role}</p>
            <p className="dash-sub">{profile.location}</p>
          </div>
          <div className="dash-hr" aria-hidden="true" />
          <p className="dash-cmd">$ ps aux</p>
          <ServiceList />
        </div>
        <div className="dash-col-activity">
          <p className="dash-cmd">$ activity</p>
          <ActivityLog />
        </div>
      </div>
      <div className="dash-section">
        <p className="dash-cmd">$ ls</p>
        <p className="term-line ls-row">
          {FILES.map((file) => (
            <button key={file} type="button" className="ls-file" onClick={() => onRunCommand(`cat ${file}`)}>{file}</button>
          ))}
        </p>
      </div>
    </div>
  )
}

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const width = canvas.clientWidth || 320
    const height = 150
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    const fontSize = 12
    const columns = Math.max(1, Math.floor(width / fontSize))
    const drops = new Array(columns).fill(0).map(() => Math.random() * -20)
    const chars = 'アイウエオカキクケコ01スセソABCDEF{}<>/*'
    let raf
    const start = performance.now()

    const draw = (now) => {
      ctx.fillStyle = 'rgba(8, 8, 10, 0.16)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.93 ? '#ffb3b3' : '#ff3b3b'
        ctx.fillText(char, i * fontSize, y * fontSize)
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 1
      })
      if (now - start < 4200) {
        raf = requestAnimationFrame(draw)
      }
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="matrix-wrap">
      <canvas ref={canvasRef} className="matrix-canvas" />
    </div>
  )
}

function Prompt({ cmd }) {
  return (
    <p className="term-line term-prompt">
      <span className="ps1">{PROMPT}</span><span className="ps-sep">:~$</span> {cmd}
    </p>
  )
}

function downloadCv() {
  const link = document.createElement('a')
  link.href = '/Rodrigo_CV.pdf'
  link.download = 'Rodrigo_Faria_CV.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function Terminal() {
  const [lines, setLines] = useState([])
  const [draft, setDraft] = useState('')
  const [ready, setReady] = useState(false)
  const [cmdHistory, setCmdHistory] = useState([])
  const historyPos = useRef(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const idRef = useRef(0)
  const mountedRef = useRef(true)
  const startedRef = useRef(false)

  const push = (node) => {
    idRef.current += 1
    setLines((prev) => [...prev, { id: idRef.current, node }])
  }

  const pushEntry = (cmd, output) => {
    push(
      <div className="term-entry" key={idRef.current + 1}>
        <Prompt cmd={cmd} />
        {output}
      </div>,
    )
  }

  const catFile = (file) => {
    switch (file) {
      case 'about.md':
        return (
          <dl className="cat-kv">
            {aboutFacts.map(([key, value]) => (
              <div className="cat-kv-row" key={key}><dt>{key}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        )
      case 'projects.md':
        return (
          <div className="term-output proj-list">
            {projects.map((project) => (
              <div className="proj-block" key={project.title}>
                <p className="proj-title">## {project.title}</p>
                <p className="proj-desc">{project.description}</p>
                <p className="proj-tags">tags: {project.tags.join(', ')}</p>
                {project.private ? (
                  <p className="proj-link proj-private">&gt; private repository</p>
                ) : (
                  <a className="proj-link" href={project.github} target="_blank" rel="noreferrer">&gt; {project.github.replace('https://', '')}</a>
                )}
              </div>
            ))}
          </div>
        )
      case 'experience.md':
        return (
          <div className="term-output exp-list">
            {experience.map((item) => (
              <div className="exp-block" key={item.role}>
                <p className="exp-head"><span className="exp-year">{item.year}</span> {item.role} — {item.company}</p>
                <p className="exp-details">{item.details}</p>
              </div>
            ))}
          </div>
        )
      case 'skills.md':
        return (
          <div className="term-output skills-list">
            {skillGroups.map((group) => (
              <div className="skill-block" key={group.title}>
                <p className="skill-block-title">## {group.title}</p>
                {group.skills.map(([name, level]) => (
                  <div className="skill-item" key={name}>
                    <span>{name}</span>
                    <div className="skill-bar"><i style={{ width: `${level}%` }} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      case 'contact.md':
        return (
          <dl className="cat-kv">
            <div className="cat-kv-row"><dt>email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
            <div className="cat-kv-row"><dt>phone</dt><dd><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></dd></div>
            <div className="cat-kv-row"><dt>location</dt><dd>{contact.location}</dd></div>
            <div className="cat-kv-row"><dt>linkedin</dt><dd><a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/rodrigo-faria05</a></dd></div>
            <div className="cat-kv-row"><dt>github</dt><dd><a href={contact.github} target="_blank" rel="noreferrer">github.com/1231196</a></dd></div>
          </dl>
        )
      case 'blog.md':
        return (
          <div className="term-output blog-list">
            {blogPosts.map((post) => (
              <div className="blog-item" key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="proj-title">## {post.title}</Link>
                <p className="proj-desc">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )
      case 'resume.pdf':
        downloadCv()
        return <p className="term-line term-ok">Downloading Rodrigo_Faria_CV.pdf…</p>
      case '.git':
        return <p className="term-line term-error">cat: .git: Is a directory</p>
      case '/etc/passwd':
        return (
          <pre className="term-line hidden-file">{[
            'root:x:0:0:root:/root:/bin/bash',
            'rodrigo:x:1000:1000:Rodrigo Faria,,,:/home/rodrigo:/bin/zsh',
            'shark:x:1337:1337:the mascot:/home/shark:/usr/sbin/nologin',
          ].join('\n')}</pre>
        )
      case '.env':
        return (
          <pre className="term-line hidden-file">{[
            '# .env',
            '# relax — this is a static site, nothing runs server-side.',
            'COFFEE_LEVEL=critical',
            'MOOD=curious',
            'REAL_SECRETS=none',
            'HIRE_ME=true',
          ].join('\n')}</pre>
        )
      case '.bash_history':
        return (
          <pre className="term-line hidden-file">{[
            'whoami',
            'ls -la',
            'cat .flag',
            'git commit -m "fix shark ascii art"',
            'git commit -m "fix shark ascii art again"',
            'npm run build',
            'echo "if you\'re reading this, hi :)"',
          ].join('\n')}</pre>
        )
      case '.flag':
        return (
          <div className="term-output">
            <p className="term-line term-ok flag-line">FLAG{'{'}y0u_f0und_th3_hidden_sh3ll{'}'}</p>
            <p className="term-line hidden-file">nice work poking around. if you actually do this for a living, let&apos;s talk: {contact.email}</p>
          </div>
        )
      default:
        return <p className="term-line term-error">cat: {file}: No such file or directory</p>
    }
  }

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) {
      pushEntry('', null)
      return
    }
    const tokens = trimmed.split(/\s+/)
    const cmd = tokens[0].toLowerCase()
    const rest = tokens.slice(1).join(' ')
    let output

    switch (cmd) {
      case 'help':
        output = (
          <div className="term-output help-list">
            <p className="help-row"><span>help</span>show this message</p>
            <p className="help-row"><span>ls</span>list files</p>
            <p className="help-row"><span>cat &lt;file&gt;</span>{FILES.join(' · ')}</p>
            <p className="help-row"><span>neofetch</span>show system info</p>
            <p className="help-row"><span>ps</span>list running services</p>
            <p className="help-row"><span>activity</span>recent activity log</p>
            <p className="help-row"><span>whoami</span>who am i</p>
            <p className="help-row"><span>resume</span>download my CV</p>
            <p className="help-row"><span>open github</span>open my GitHub profile</p>
            <p className="help-row"><span>open linkedin</span>open my LinkedIn profile</p>
            <p className="help-row"><span>blog</span>read the blog</p>
            <p className="help-row"><span>clear</span>clear the terminal</p>
          </div>
        )
        break
      case 'ls': {
        const showHidden = /^-(a|la|al|all)$/.test(rest)
        const list = showHidden ? [...FILES, ...HIDDEN_FILES] : FILES
        output = (
          <p className="term-line ls-row">
            {list.map((file) => (
              <button key={file} type="button" className={`ls-file${file.startsWith('.') ? ' ls-file-hidden' : ''}`} onClick={() => runCommand(`cat ${file}`)}>{file}</button>
            ))}
          </p>
        )
        break
      }
      case 'cat':
        output = rest ? catFile(rest) : <p className="term-line term-error">usage: cat &lt;file&gt;</p>
        break
      case 'neofetch':
        output = <Neofetch />
        break
      case 'whoami':
        output = <p className="term-line whoami-line">{profile.whoami}</p>
        break
      case 'resume':
      case 'cv':
        downloadCv()
        output = <p className="term-line term-ok">Downloading Rodrigo_Faria_CV.pdf…</p>
        break
      case 'blog':
        output = catFile('blog.md')
        break
      case 'ps':
        output = <ServiceList />
        break
      case 'activity':
        output = <ActivityLog />
        break
      case 'open':
        if (rest === 'github' || rest === 'linkedin') {
          const url = rest === 'github' ? contact.github : contact.linkedin
          window.open(url, '_blank', 'noopener,noreferrer')
          output = <p className="term-line term-ok">Opening {url}…</p>
        } else {
          output = <p className="term-line term-error">usage: open github | open linkedin</p>
        }
        break
      case 'sudo':
        if (rest === '-l' || rest === '-ll') {
          output = (
            <pre className="term-line hidden-file">{[
              'Matching Defaults entries for rodrigo on archfolio:',
              '    !visible, !exploitable',
              '',
              'User rodrigo may run the following commands on archfolio:',
              '    (ALL) NOPASSWD: /usr/bin/whoami',
              '    (ALL) NOPASSWD: /usr/bin/ls',
              '    (ALL) NOPASSWD: /usr/bin/cat',
              '',
              "that's it. no real root here — it's a static site.",
            ].join('\n')}</pre>
          )
        } else {
          output = (
            <div className="term-output">
              <p className="term-line term-error access-denied">[ACCESS DENIED]</p>
              <p className="term-line term-error">Nice try.</p>
            </div>
          )
        }
        break
      case 'id':
        output = <p className="term-line hidden-file">uid=1000(rodrigo) gid=1000(rodrigo) groups=1000(rodrigo),27(sudo),1337(sharks)</p>
        break
      case 'flag':
        output = catFile('.flag')
        break
      case 'nmap':
        output = (
          <pre className="term-line hidden-file">{[
            `Starting Nmap against ${profile.host}...`,
            'PORT     STATE    SERVICE',
            '443/tcp  open     https',
            '22/tcp   filtered ssh',
            '31337/tcp closed  elite',
            '',
            'Nmap done: 1 host up. Nothing else to see — this is a static site.',
          ].join('\n')}</pre>
        )
        break
      case 'sqlmap':
        output = <p className="term-line hidden-file">no database back here to inject — just React and vibes.</p>
        break
      case 'hydra':
      case 'john':
      case 'hashcat':
        output = <p className="term-line hidden-file">there's no login form to crack. respect the craft, but wrong target.</p>
        break
      case 'nikto':
        output = <p className="term-line hidden-file">- Scan complete: 0 vulnerabilities found, 1 shark detected.</p>
        break
      case 'metasploit':
      case 'msfconsole':
        output = <p className="term-line hidden-file">msf6 &gt; exploit -- nothing to exploit here, just a portfolio.</p>
        break
      case 'matrix':
        output = <MatrixRain />
        break
      case 'clear':
        setLines([])
        return
      default:
        output = <p className="term-line term-error">zsh: command not found: {cmd} — type &apos;help&apos;</p>
    }

    pushEntry(raw, output)
  }

  const submitDraft = () => {
    if (!ready) return
    const value = draft
    setDraft('')
    if (value.trim()) {
      setCmdHistory((prev) => [...prev, value])
      historyPos.current = -1
    }
    runCommand(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitDraft()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitDraft()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!cmdHistory.length) return
      const nextPos = historyPos.current < 0 ? cmdHistory.length - 1 : Math.max(0, historyPos.current - 1)
      historyPos.current = nextPos
      setDraft(cmdHistory[nextPos])
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyPos.current < 0) return
      const nextPos = historyPos.current + 1
      if (nextPos >= cmdHistory.length) {
        historyPos.current = -1
        setDraft('')
      } else {
        historyPos.current = nextPos
        setDraft(cmdHistory[nextPos])
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true
    if (startedRef.current) return undefined
    startedRef.current = true
    // eslint-disable-next-line no-console
    console.log(
      '%cstop.%c\n\nthis console is a browser feature for developers — and, apparently, for you.\nsince you\'re here: the terminal is a real shell. try `ls -a`, `id`, or `sudo -l`.\n',
      'color:#ff3b3b;font-size:32px;font-weight:700;font-family:monospace;',
      'color:#9a9a9a;font-size:13px;font-family:monospace;',
    )
    const play = async () => {
      await sleep(500)
      if (!mountedRef.current) return
      setReady(true)
      inputRef.current?.focus()
    }
    play()
    return () => { mountedRef.current = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (lines.length === 0) return
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const footer = (
    <div className="term-shortcuts">
      <span className="term-shortcuts-label">shortcuts:</span>
      {SHORTCUTS.map((shortcut) => (
        <button key={shortcut} type="button" className="shortcut-pill" onClick={() => ready && runCommand(shortcut)}>{shortcut}</button>
      ))}
    </div>
  )

  return (
    <TerminalWindow
      title={ready ? 'zsh' : 'neofetch'}
      bodyRef={bodyRef}
      onBodyClick={() => inputRef.current?.focus()}
      footer={footer}
      bodyClassName="shell-body"
    >
      <Dashboard onRunCommand={runCommand} />
      {lines.map((line) => <div key={line.id}>{line.node}</div>)}
      {ready && (
        <form className="term-line term-input-row" onSubmit={handleSubmit}>
          <span className="ps1">{PROMPT}</span><span className="ps-sep">:~$</span>
          <input
            ref={inputRef}
            className="term-input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal command input"
          />
        </form>
      )}
    </TerminalWindow>
  )
}

export default Terminal
