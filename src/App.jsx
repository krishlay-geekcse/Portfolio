import React, { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import profileImg from './assets/profile.jpeg'
import studentHubImg from './assets/StudentHub.jpeg'
import notesImg from './assets/notes.jpeg'
import photoEditorImg from './assets/photoedit.jpeg'
import resumePdf from './assets/KrishlayNEW.pdf'

/* ─── Data ─── */
const ROLES = ['Full Stack Developer', 'React.js Engineer', 'Next.js Developer', ]

const SKILLS = {
  Frontend: {
    icon: '◈',
    color: '#b0b0b0',
    items: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  Backend: {
    icon: '⬡',
    color: '#a78bfa',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
  },
  Database: {
    icon: '⬢',
    color: '#34d399',
    items: ['MongoDB', 'MySQL', 'Mongoose ODM'],
  },
  'Dev Tools': {
    icon: '⚙',
    color: '#f472b6',
    items: ['Git & GitHub', 'Figma', 'VS Code', 'Postman', 'Responsive Design', 'API Integration'],
  },
}

const PROJECTS = [
  {
    num: '01',
    title: 'StudentHub',
    desc: 'StudentHub is a smart platform that helps students discover essential services like PGs, hostels, mess facilities, restaurants, laundry, and medical stores near their college. It provides location-based search, map integration, and an AI chatbot to help students quickly find reliable services around campus across India.',
    stack: ['React.js', 'Node.js', 'Map Integration', 'AI Chatbot', 'Location Search'],
    accent: '#b0b0b0',
    img: studentHubImg,
    github: 'https://github.com/krishlay-geekcse/StudentHub',
    liveDemo: 'https://studenthubnest.netlify.app',
  },
  {
    num: '02',
    title: 'Notes Manager',
    desc: 'A dynamic notes application built with React. Features include adding, deleting, and managing notes with a clean responsive layout and seamless user experience.',
    stack: ['React.js', 'JavaScript', 'Vite', 'CSS'],
    accent: '#909090',
    img: notesImg,
    github: 'https://github.com/krishlay-geekcse/Notes-Project',
  },
  {
    num: '03',
    title: 'Photo Editor',
    desc: 'A web-based photo editing tool that lets users apply filters, adjustments, and transformations to images directly in the browser using vanilla JavaScript.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    accent: '#a0a0a0',
    img: photoEditorImg,
    github: 'https://github.com/krishlay-geekcse/PhotoEditor',
  },
]

const PROFILES = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/krishlay-singh-399750315', icon: 'in', color: '#0a66c2' },
  { label: 'GitHub', url: 'https://github.com/krishlay-geekcse', icon: '⌘', color: '#f0f6fc' },
  { label: 'LeetCode', url: 'https://leetcode.com/u/krishlaysingh/', icon: '{ }', color: '#ffa116' },
  { label: 'Twitter / X', url: 'https://x.com/KrishlaySi91238', icon: '𝕏', color: '#1d9bf0' },
]

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'contact', label: 'Contact' },
]

const ABOUT_HIGHLIGHTS = [
  { icon: '🎓', label: 'Education', value: "B.Tech CSE — Tula's Institute" },
  { icon: '🏛️', label: 'University', value: 'Uttarakhand Technical University' },
  { icon: '💼', label: 'Focus', value: 'Full Stack Development' },
  { icon: '🎨', label: 'Side', value: 'Freelance UI/UX Design' },
]

const STATS = [
  { end: 10, suffix: '+', label: 'Projects Built' },
  { end: 10, suffix: '+', label: 'Technologies' },
  { end: 1000, suffix: '+', label: 'Lines of Code' },
]

const MARQUEE_ITEMS = [
  'React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB',
  'MySQL', 'REST APIs', 'Tailwind CSS', 'Git', 'Figma', 'JavaScript', 'TypeScript',
]

/* ═════════════════════════════════════
   Hooks & Components
   ═════════════════════════════════════ */

// ── Typewriter ──
function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIdx((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)))
      }, isDeleting ? deletingSpeed : typingSpeed)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIdx, words, typingSpeed, deletingSpeed, pause])

  return text
}

// ── Animated Counter ──
function useCounter(end, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, trigger])
  return count
}

const StatCounter = ({ end, suffix, label }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCounter(end, end > 100 ? 2000 : 1200, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="stat" ref={ref}>
      <span className="stat-num">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

// ── Magnetic Button (Maze-style) ──
const MagneticWrap = ({ children, className = '', strength = 0.3 }) => {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }, [strength])
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }, [])

  return (
    <div ref={ref} className={`magnetic-wrap ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

// ── 3D Tilt Card with Border Spotlight (Maze-style) ──
const TiltCard = ({ children, className = '', intensity = 8 }) => {
  const ref = useRef(null)
  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - y) * intensity
    const rotateY = (x - 0.5) * intensity
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    el.style.setProperty('--spot-x', `${x * 100}%`)
    el.style.setProperty('--spot-y', `${y * 100}%`)
  }, [intensity])
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }, [])

  return (
    <div ref={ref} className={`tilt-card ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

// ── Text Split Reveal (Maze-style word-by-word) ──
const SplitText = ({ text, className = '', tag: Tag = 'h2' }) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`split-text ${visible ? 'split-visible' : ''} ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="split-word" style={{ transitionDelay: `${i * 0.06}s` }}>
          {word}
        </span>
      ))}
    </Tag>
  )
}

// ── Floating Particles Canvas (Maze-style ambient) ──
const Particles = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const particles = []

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 180, 180, ${p.opacity})`
        ctx.fill()
      })
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(180, 180, 180, ${0.04 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
}

/* ═════════════════════════════════════
   App
   ═════════════════════════════════════ */
const App = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const typedRole = useTypewriter(ROLES, 90, 50, 2200)

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)

    const sectionIds = NAV.map((n) => n.id)
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    const sectionObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.25, rootMargin: '-15% 0px -40% 0px' },
    )
    sections.forEach((s) => sectionObs.observe(s))

    const revealObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          const children = e.target.querySelectorAll('.stagger-child')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('stagger-visible'), i * 120)
          })
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((t) => revealObs.observe(t))

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0)
      setShowBackToTop(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      const px = (e.clientX / window.innerWidth - 0.5) * 20
      const py = (e.clientY / window.innerHeight - 0.5) * 20
      setParallax({ x: px, y: py })
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      sectionObs.disconnect()
      revealObs.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  const handleNavClick = useCallback(() => setMobileMenuOpen(false), [])

  return (
    <div className={`portfolio ${isLoaded ? 'loaded' : ''}`}>
      <Particles />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="progress-track" aria-hidden="true">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="cursor-glow" aria-hidden="true" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Orbs with parallax */}
      <div className="orb orb-1" aria-hidden="true" style={{ transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)` }} />
      <div className="orb orb-2" aria-hidden="true" style={{ transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)` }} />
      <div className="orb orb-3" aria-hidden="true" style={{ transform: `translate(${parallax.x * 0.8}px, ${parallax.y * 0.8}px)` }} />

      <div className="grid-lines" aria-hidden="true" />

      {/* ── Nav ── */}
      <nav className="top-nav">
        <MagneticWrap strength={0.15}>
          <a href="#home" className="brand" onClick={handleNavClick}>
            <span className="brand-icon">K</span>
            <span className="brand-text">Krishlay</span>
          </a>
        </MagneticWrap>

        <div className="nav-right-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Toggle navigation">
            <span /><span /><span />
          </button>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'nav-open' : ''}`}>
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onClick={handleNavClick}>
              {item.label}
            </a>
          ))}
          <MagneticWrap strength={0.25}>
            <a href={resumePdf} download="Krishlay_Singh_Resume.pdf" className="nav-cta">Resume</a>
          </MagneticWrap>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="section hero reveal" id="home">
        <div className="hero-content">
        <div className="hero-inner">

          <h1 className="hero-title">
            <span className="hero-line hero-line-1">Hi, I'm</span>
            <span className="hero-line hero-line-2">
              <span className="gradient-text">Krishlay Singh</span>
            </span>
          </h1>

          <div className="typewriter-wrap">
            <span className="typewriter-prefix">I'm a </span>
            <span className="typewriter-text">{typedRole}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-sub">
            I craft high-performance, scalable web applications with modern JavaScript.
            Specializing in <strong>React.js</strong>, <strong>Next.js</strong>, and the MERN stack —
            turning ideas into production-ready products.
          </p>

          <div className="cta-group">
            <MagneticWrap strength={0.25}>
              <a href="#projects" className="btn btn-primary btn-shine">
                <span>View My Work</span>
                <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
              </a>
            </MagneticWrap>
            <MagneticWrap strength={0.25}>
              <a href="#contact" className="btn btn-outline"><span>Get in Touch</span></a>
            </MagneticWrap>
            <MagneticWrap strength={0.25}>
              <a href={resumePdf} download="Krishlay_Singh_Resume.pdf" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Resume</span>
              </a>
            </MagneticWrap>
          </div>

          <div className="stats-strip">
            {STATS.map((s) => (
              <StatCounter key={s.label} end={s.end} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-photo-ring" />
          <div className="hero-photo-ring hero-photo-ring-2" />
          <div className="hero-photo-glow" />
          <img src={profileImg} alt="Krishlay Singh" className="hero-photo-img" />
        </div>
        </div>

        {/* Scroll-down indicator */}
        <div className="scroll-indicator">
          <span className="scroll-text">SCROLL DOWN</span>
          <div className="scroll-line"><div className="scroll-dot" /></div>
        </div>

        <div className="hero-shapes" aria-hidden="true" style={{ transform: `translateY(-50%) translate(${parallax.x * 2}px, ${parallax.y * 2}px)` }}>
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          <div className="hero-ring hero-ring-3" />
        </div>
      </header>

      <main>
        {/* ── About ── */}
        <section className="section reveal" id="about">
          <div className="section-header">
            <div className="section-label">About Me</div>
            <SplitText text="Background & Education" />
            <div className="section-line" />
          </div>
          <div className="about-layout">
            <div className="about-text">
              <p>
                I'm a <strong>B.Tech Computer Science</strong> student at <strong>Tula's Institute</strong>,
                affiliated with <strong>Uttarakhand Technical University</strong>. As a Full Stack Developer,
                I have a strong foundation in the modern JavaScript ecosystem with hands-on experience building
                scalable web applications.
              </p>
              <p>
                My expertise spans from crafting pixel-perfect React frontends to designing High-performance Node.js
                backends with RESTful APIs. I work with MongoDB and MySQL for data persistence, and bring
                freelance UI/UX experience in wireframing, prototyping, and building clean interfaces.
                I prioritize <strong>maintainable architecture</strong>, <strong>performance optimization</strong>,
                and <strong>practical business outcomes</strong>.
              </p>
            </div>
            <div className="about-highlights">
              {ABOUT_HIGHLIGHTS.map((h, i) => (
                <TiltCard className="highlight-card stagger-child" key={i} intensity={6}>
                  <span className="highlight-icon">{h.icon}</span>
                  <div className="highlight-info">
                    <span className="highlight-label">{h.label}</span>
                    <span className="highlight-value">{h.value}</span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="section reveal" id="skills">
          <div className="section-header">
            <div className="section-label">Expertise</div>
            <SplitText text="Technical Skills" />
            <div className="section-line" />
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span className="marquee-chip" key={i}>{item}</span>
              ))}
            </div>
          </div>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([category, data]) => (
              <TiltCard className="skill-card stagger-child" key={category} intensity={5}>
                <div className="skill-card-head">
                  <span className="skill-icon" style={{ color: data.color }}>{data.icon}</span>
                  <h3>{category}</h3>
                </div>
                <div className="skill-tags">
                  {data.items.map((s) => <span className="skill-tag" key={s}>{s}</span>)}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="section reveal" id="experience">
          <div className="section-header">
            <div className="section-label">Career</div>
            <SplitText text="Professional Experience" />
            <div className="section-line" />
          </div>
          <div className="timeline">
            <article className="exp-card stagger-child">
              <div className="exp-timeline-dot" />
              <div className="exp-content">
                <div className="exp-header">
                  <div className="exp-title-group">
                    <h3>Full Stack Developer</h3>
                    <span className="exp-company">Personal & Academic Projects</span>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-badge">Remote</span>
                    <span className="exp-date">2023 — Present</span>
                  </div>
                </div>
                <ul>
                  <li>Developed multiple full-stack applications using the MERN stack architecture</li>
                  <li>Implemented RESTful APIs with proper authentication and error handling</li>
                  <li>Built responsive, accessible frontends with React.js and Next.js</li>
                  <li>Practiced clean code principles, version control, and agile methodologies</li>
                </ul>
                <div className="exp-tools">
                  {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Git'].map((t) => <span key={t} className="exp-tool">{t}</span>)}
                </div>
              </div>
            </article>
            <article className="exp-card stagger-child">
              <div className="exp-timeline-dot" />
              <div className="exp-content">
                <div className="exp-header">
                  <div className="exp-title-group">
                    <h3>Freelance UI/UX Designer</h3>
                    <span className="exp-company">Self-Employed</span>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-badge exp-badge-blue">Remote</span>
                    <span className="exp-date">2024</span>
                  </div>
                </div>
                <ul>
                  <li>Collaborated with clients to define product goals, user flows, and interface direction</li>
                  <li>Created wireframes and interactive prototypes for web-focused product experiences</li>
                  <li>Built clean, reusable design systems ensuring consistency and faster dev handoff</li>
                  <li>Translated UI/UX concepts into functional, responsive applications using React</li>
                </ul>
                <div className="exp-tools">
                  {['Figma', 'React.js', 'CSS3', 'Responsive Design'].map((t) => <span key={t} className="exp-tool">{t}</span>)}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="section reveal" id="projects">
          <div className="section-header">
            <div className="section-label">Portfolio</div>
            <SplitText text="Featured Projects" />
            <div className="section-line" />
            <p className="section-desc">
              Selected work showcasing full-stack architecture, performance optimization, and modern UI engineering.
            </p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <TiltCard className="project-card stagger-child" key={p.num} intensity={8}>
                <div className="project-card-spotlight" style={{ '--accent': p.accent }} />
                <div className="project-img-wrap">
                  <img src={p.img} alt={p.title} className="project-img" />
                </div>
                <div className="project-card-inner">
                  <div className="project-top">
                    <span className="project-num">{p.num}</span>
                    <div className="project-links">
                      <MagneticWrap strength={0.4}>
                        <a href={p.github} target="_blank" rel="noreferrer" className="project-link-icon" title="View on GitHub">↗</a>
                      </MagneticWrap>
                    </div>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  {p.liveDemo && (
                    <div className="project-actions">
                      <a href={p.liveDemo} target="_blank" rel="noreferrer" className="project-live-btn">
                        Live Demo
                      </a>
                    </div>
                  )}
                  <div className="project-stack">
                    {p.stack.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="https://github.com/krishlay-geekcse" target="_blank" rel="noreferrer" className="btn btn-outline">
              View More Projects <span className="btn-icon">↗</span>
            </a>
          </div>
        </section>

        {/* ── Profiles ── */}
        <section className="section reveal" id="profiles">
          <div className="section-header">
            <div className="section-label">Connect</div>
            <SplitText text="Coding Profiles" />
            <div className="section-line" />
          </div>
          <div className="profiles-grid">
            {PROFILES.map((p) => (
              <MagneticWrap key={p.label} strength={0.15} className="profile-magnetic">
                <a href={p.url} className="profile-link stagger-child" target="_blank" rel="noreferrer" style={{ '--profile-color': p.color }}>
                  <div className="profile-icon-wrap">
                    <span className="profile-icon">{p.icon}</span>
                  </div>
                  <div className="profile-info">
                    <span className="profile-name">{p.label}</span>
                    <span className="profile-url">View Profile →</span>
                  </div>
                  <span className="profile-arrow">↗</span>
                </a>
              </MagneticWrap>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="section reveal" id="contact">
          <div className="section-header">
            <div className="section-label">Reach Out</div>
            <SplitText text="Let's Build Something Great" />
            <div className="section-line" />
            <p className="section-desc">
              Open to full-time roles, internships, and collaboration on scalable web products.
              Let's discuss how I can contribute to your team.
            </p>
          </div>
          <div className="contact-grid">
            <TiltCard className="contact-card stagger-child" intensity={5}>
              <a href="tel:+918521864917" className="contact-card-link">
                <div className="contact-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span className="contact-info">
                  <span className="contact-type">Phone</span>
                  <span className="contact-val">+91 8521864917</span>
                </span>
              </a>
            </TiltCard>
            <TiltCard className="contact-card stagger-child" intensity={5}>
              <a href="mailto:krishlaysingh98@gmail.com" className="contact-card-link">
                <div className="contact-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span className="contact-info">
                  <span className="contact-type">Email</span>
                  <span className="contact-val">krishlaysingh98@gmail.com</span>
                </span>
              </a>
            </TiltCard>
            <TiltCard className="contact-card stagger-child" intensity={5}>
              <a href="https://www.linkedin.com/in/krishlay-singh-399750315" className="contact-card-link" target="_blank" rel="noreferrer">
                <div className="contact-icon-wrap contact-icon-linkedin">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <span className="contact-info">
                  <span className="contact-type">LinkedIn</span>
                  <span className="contact-val">Krishlay Singh</span>
                </span>
              </a>
            </TiltCard>
            <TiltCard className="contact-card stagger-child" intensity={5}>
              <a href="https://github.com/krishlay-geekcse" className="contact-card-link" target="_blank" rel="noreferrer">
                <div className="contact-icon-wrap contact-icon-github">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </div>
                <span className="contact-info">
                  <span className="contact-type">GitHub</span>
                  <span className="contact-val">krishlay-geekcse</span>
                </span>
              </a>
            </TiltCard>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-icon">K</span>
            <span>Krishlay Singh</span>
          </div>
          <div className="footer-links">
            {PROFILES.map((p) => (
              <MagneticWrap key={p.label} strength={0.3}>
                <a href={p.url} target="_blank" rel="noreferrer" className="footer-social">{p.icon}</a>
              </MagneticWrap>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Krishlay Singh. Crafted with React & passion.</p>
        </div>
      </footer>

      {/* Back to top */}
      <MagneticWrap strength={0.35}>
        <button className={`back-to-top ${showBackToTop ? 'show' : ''}`} onClick={scrollToTop} aria-label="Back to top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      </MagneticWrap>
    </div>
  )
}

export default App
