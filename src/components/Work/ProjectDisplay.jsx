import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import project1 from '../../assets/project1.png'
import project2 from '../../assets/project2.png'
import project3 from '../../assets/project3.png'
import project4 from '../../assets/project4.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    name: 'One Earth Properties',
    category: 'React',
    description:
      'A full real-estate platform built in React — listing search, scheduling, and tours, wrapped in motion that makes browsing feel alive.',
    tags: ['UI/UX', 'Animations', 'Development'],
    link: '#',
    image: project1,
    accent: '#ff5b3c',
    dark: false,
  },
  {
    id: '02',
    name: 'ET',
    category: 'UI/UX & Development',
    description:
      'A character render study — skin shading, subsurface texture work, and lighting, set inside a quiet, moody interface shell.',
    tags: ['Rendering', 'Textures', 'UI/UX'],
    link: '#',
    image: project2,
    accent: '#7c9fff',
    dark: false,
  },
  {
    id: '03',
    name: 'Learnkins',
    category: 'Learning Platform',
    description:
      'An interactive learning platform for kids — built on React and GSAP so every lesson has a little motion to keep it moving.',
    tags: ['React', 'Motion', 'gsap'],
    link: '#',
    image: project3,
    accent: '#ffd23c',
    dark: false,
  },
  {
    id: '04',
    name: '3D Wolf',
    category: 'Three.js & WebGL',
    description:
      'A real-time WebGL wolf for the browser — fur shading and dynamic lighting, framed inside a Webflow front end.',
    tags: ['Webflow', 'UI/UX', 'Animation'],
    link: '#',
    image: project4,
    accent: '#3cffb0',
    dark: true,
  },
]

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ•/_×'

function scrambleText(el, finalText, duration = 0.7) {
  if (!el) return
  const len = finalText.length
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - start) / (duration * 1000))
    let out = ''
    for (let i = 0; i < len; i++) {
      const ch = finalText[i]
      if (ch === ' ' || ch === '&') out += ch
      else if (t * len * 1.4 > i) out += ch
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    }
    el.textContent = out
    if (t < 1) requestAnimationFrame(tick)
    else el.textContent = finalText
  }
  requestAnimationFrame(tick)
}

export default function ProjectShowcase() {
  const sectionRef     = useRef(null)
  const pinRef          = useRef(null)
  const imagePanelRef   = useRef(null)
  const slideRefs       = useRef([])
  const blobRefs        = useRef([])
  const miniRingRef     = useRef(null)
  const ghostNumRef     = useRef(null)
  const nameRef         = useRef(null)
  const categoryRef     = useRef(null)
  const descRef         = useRef(null)
  const tagRefs         = useRef([])
  const railFillRef     = useRef(null)
  const thumbRefs       = useRef([])
  const lastIndexRef    = useRef(0)
  const firstRunRef     = useRef(true)
  const stRef           = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  const proj  = PROJECTS[activeIndex]
  const chars = useMemo(() => Array.from(proj.name), [proj.name])

  // ───────────────────────── Master scroll-driven sequence ─────────────────────────
  useGSAP(() => {
    const total = PROJECTS.length
    const transitions = total - 1
    const ringR = 26
    const ringCircumference = 2 * Math.PI * ringR
    const SKEW = 12

    gsap.set(slideRefs.current, (i) => i === 0
      ? { clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' }
      : { clipPath: `polygon(0% 100%, 100% ${100 - SKEW}%, 100% 100%, 0% 100%)`, scale: 1.12 })

    if (miniRingRef.current) {
      miniRingRef.current.style.strokeDasharray = `${ringCircumference}`
      miniRingRef.current.style.strokeDashoffset = `${ringCircumference}`
    }

    blobRefs.current.forEach((b, i) => {
      if (!b || reduceMotion) return
      gsap.to(b, {
        x: () => gsap.utils.random(-40, 40),
        y: () => gsap.utils.random(-30, 30),
        duration: 7 + i * 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    stRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${transitions * window.innerHeight}`,
      pin: pinRef.current,
      anticipatePin: 1,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        const raw = p * transitions

        for (let i = 1; i < total; i++) {
          const slide = slideRefs.current[i]
          if (!slide) continue
          const local = gsap.utils.clamp(0, 1, i - raw)
          const topY = local * 100
          const p2 = gsap.utils.clamp(0, 100, topY - SKEW)

          if (reduceMotion) {
            gsap.set(slide, { autoAlpha: 1 - local, clipPath: 'polygon(0% 0%,100% 0%,100% 100%,0% 100%)' })
          } else {
            gsap.set(slide, {
              clipPath: `polygon(0% ${topY}%, 100% ${p2}%, 100% 100%, 0% 100%)`,
              scale: 1 + local * 0.18,
              rotateZ: (i % 2 === 0 ? 1 : -1) * local * 3,
              filter: `blur(${local * 14}px) brightness(${1 - local * 0.25})`,
            })
          }
        }

        if (miniRingRef.current) {
          miniRingRef.current.style.strokeDashoffset = `${ringCircumference * (1 - p)}`
        }
        if (railFillRef.current) {
          railFillRef.current.style.height = `${p * 100}%`
        }

        const nextIndex = Math.min(total - 1, Math.floor(raw + 0.5))
        if (nextIndex !== lastIndexRef.current) {
          lastIndexRef.current = nextIndex
          setActiveIndex(nextIndex)
        }
      },
    })
  }, { dependencies: [reduceMotion] })

  // ───────────────────────── Per-project reveal ─────────────────────────
  useEffect(() => {
    const dur = firstRunRef.current ? 0.9 : 0.6
    const ease = 'power4.out'

    const charEls = nameRef.current ? nameRef.current.querySelectorAll('.char') : []
    gsap.fromTo(charEls,
      { yPercent: 120, rotateX: -90, autoAlpha: 0 },
      { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: dur, ease, stagger: 0.018 },
    )

    if (categoryRef.current) scrambleText(categoryRef.current, proj.category, 0.7)

    gsap.fromTo(descRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: dur * 0.85, ease, delay: 0.1 },
    )

    if (tagRefs.current.length) {
      gsap.fromTo(tagRefs.current,
        { autoAlpha: 0, y: 12, skewY: 4 },
        { autoAlpha: 1, y: 0, skewY: 0, duration: 0.45, ease, stagger: 0.07, delay: 0.2 },
      )
    }

    gsap.fromTo(ghostNumRef.current,
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
    )

    gsap.to(thumbRefs.current, {
      scale: (i) => (i === activeIndex ? 1.08 : 1),
      filter: (i) => (i === activeIndex ? 'grayscale(0)' : 'grayscale(0.7) brightness(0.6)'),
      borderColor: (i) => (i === activeIndex ? proj.accent : 'rgba(255,255,255,0.15)'),
      duration: 0.5,
      ease: 'power3.out',
    })

    if (!reduceMotion) {
      gsap.to(blobRefs.current, { backgroundColor: proj.accent, duration: 1, ease: 'sine.inOut' })
    }
    gsap.to(miniRingRef.current, { stroke: proj.accent, duration: 0.5 })

    firstRunRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const handleProjectClick = () => {
    const link = proj?.link
    if (!link || link === '#') return
    if (/^https?:\/\//i.test(link)) window.open(link, '_blank', 'noopener,noreferrer')
    else window.location.href = link
  }

  const handleThumbClick = (i) => {
    const st = stRef.current
    if (!st) return
    const target = st.start + (st.end - st.start) * (i / (PROJECTS.length - 1))
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const panelTextColor = '#111111'
  const panelSoftColor = 'rgba(17,17,17,0.55)'

  return (
    <section ref={sectionRef} id="work" style={{ height: `${PROJECTS.length * 100}vh`, background: '#ffffff' }}>
      <div ref={pinRef} className="relative flex h-screen w-full flex-col md:flex-row overflow-hidden">

        {/* ───────── Left half — image ───────── */}
        <div ref={imagePanelRef} className="relative h-1/2 w-full md:h-full md:w-1/2 overflow-hidden">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              ref={(el) => { if (el) slideRefs.current[i] = el }}
              className="absolute inset-0"
              style={{ zIndex: i + 1, willChange: 'clip-path, transform, filter' }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
                style={{ animation: 'kenburns 9s ease-in-out infinite alternate' }}
              />
            </div>
          ))}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              zIndex: 21,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }}
          />
        </div>

        {/* ───────── Divider — filmstrip navigator ───────── */}
        <div
          className="absolute z-40 hidden md:flex flex-col items-center"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', height: '60vh', width: 64 }}
        >
          <div className="relative w-px flex-1" style={{ background: 'rgba(0,0,0,0.15)' }}>
            <div ref={railFillRef} className="absolute left-0 top-0 w-px" style={{ height: '0%', background: '#111' }} />
          </div>
          <div className="absolute top-0 flex h-full flex-col justify-between gap-2 py-1">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleThumbClick(i)}
                ref={(el) => { if (el) thumbRefs.current[i] = el }}
                className="overflow-hidden rounded-md border-2 transition-shadow"
                style={{ width: 56, height: 38, borderColor: 'rgba(0,0,0,0.15)', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
              >
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ───────── Right half — detail panel ───────── */}
        <div className="relative flex h-1/2 w-full md:h-full md:w-1/2 flex-col justify-center px-[6vw] md:px-[5vw]" style={{ background: '#ffffff' }}>

          {/* Top row — ring counter */}
          <div className="relative z-10 mb-6 flex items-center gap-3">
            <svg viewBox="0 0 64 64" width="40" height="40" className="-rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
              <circle ref={miniRingRef} cx="32" cy="32" r="26" fill="none" stroke={proj.accent} strokeWidth="1.5" strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.05s linear, stroke 0.4s ease' }} />
            </svg>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, letterSpacing: '0.18em', color: panelSoftColor, textTransform: 'uppercase' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')} &nbsp;·&nbsp; Featured Work
            </p>
          </div>

          {/* Ghost index number behind the title */}
          <span
            ref={ghostNumRef}
            className="pointer-events-none absolute select-none"
            style={{
              top: '14%', left: '5vw',
              fontFamily: '"Passion", serif',
              fontSize: 'clamp(140px, 22vw, 280px)',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `1px ${proj.accent}40`,
              zIndex: 0,
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </span>

          {/* Name */}
          <h2
            ref={nameRef}
            className="relative z-10"
            style={{
              display: 'flex', flexWrap: 'wrap',
              fontFamily: '"Passion", serif',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              lineHeight: 0.95, letterSpacing: '-0.02em',
              color: panelTextColor, perspective: 400,
            }}
          >
            {chars.map((c, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
                <span className="char" style={{ display: 'inline-block', willChange: 'transform' }}>
                  {c === ' ' ? '\u00A0' : c}
                </span>
              </span>
            ))}
          </h2>

          {/* Category */}
          <p
            ref={categoryRef}
            className="relative z-10 mt-3"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: proj.accent }}
          >
            {proj.category}
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="relative z-10 mt-5 max-w-md"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, lineHeight: 1.6, color: panelSoftColor }}
          >
            {proj.description}
          </p>

          {/* Tags */}
          <div className="relative z-10 mt-6 flex flex-wrap gap-3">
            {proj.tags.map((tag, i) => (
              <span
                key={tag}
                ref={(el) => { if (el) tagRefs.current[i] = el }}
                className="rounded-full border px-3 py-1"
                style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: panelTextColor, borderColor: 'rgba(0,0,0,0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Visit link */}
          <button
            type="button"
            onClick={handleProjectClick}
            className="group relative z-10 mt-9 flex w-fit items-center gap-2"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: panelTextColor }}
          >
            View Project
            <span className="transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: proj.accent }}>
              →
            </span>
            <span
              className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
              style={{ background: proj.accent }}
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-1%, 1%); }
        }
      `}</style>
    </section>
  )
}