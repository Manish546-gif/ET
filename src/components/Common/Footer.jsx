import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { name: 'Instagram',   url: 'https://www.instagram.com/ellisiumtechnologies/' },
  { name: 'Twitter / X', url: 'https://twitter.com/ellisiumtech' },
  { name: 'LinkedIn',    url: 'https://www.linkedin.com/in/ellisium-technologies-90739b418/' },
]

const NAV_LINKS      = ['Home', 'Work', 'About', 'Contact']
const SERVICE_LINKS  = ['Website redesign', 'Brand creation', 'Software dev', 'UI / UX design']
const LEGAL_LINKS    = ['Privacy Policy', 'Terms of Use']
const MARQUEE_TEXT   = ['Brand Identity', 'Web Design', 'Development', 'UI / UX', 'Strategy', 'Motion']

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconArrowUp = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 13V1M7 1L1 7M7 1L13 7" />
  </svg>
)

const IconArrowUpRight = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 13 13" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 11L11 2M11 2H4M11 2V9" />
  </svg>
)

const IconDot = ({ size = 5 }) => (
  <svg width={size} height={size} viewBox="0 0 5 5" fill="currentColor">
    <circle cx="2.5" cy="2.5" r="2.5" />
  </svg>
)

// ─── Primitives ───────────────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ width: '100%', height: '1px', background: '#1a1a1a0e' }} />
)

const ColLabel = ({ children }) => (
  <p style={{
    margin: '0 0 22px', fontSize: '0.58rem', fontWeight: 700,
    letterSpacing: '0.28em', textTransform: 'uppercase', color: '#b84a2d',
  }}>
    {children}
  </p>
)

const UnderlineLink = ({ children, href, onClick, dim = false, style = {} }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover="hover"
    style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: '0.85rem', fontWeight: 400,
      color: dim ? '#1a1a1a45' : '#1a1a1a80',
      textDecoration: 'none', cursor: 'pointer',
      letterSpacing: '0.01em', lineHeight: 1,
      ...style,
    }}
  >
    {children}
    <motion.span
      variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
      initial="initial"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', bottom: -3, left: 0, right: 0,
        height: '1px', background: '#b84a2d', transformOrigin: 'left',
      }}
    />
  </motion.a>
)

// ─── Marquee ─────────────────────────────────────────────────────────────────
const Marquee = () => {
  const track = [...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT]
  return (
    <div style={{
      overflow: 'hidden', borderTop: '1px solid #1a1a1a0e',
      borderBottom: '1px solid #1a1a1a0e',
      padding: '18px 0',
    }}>
      <motion.div
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: 0, whiteSpace: 'nowrap', width: 'max-content' }}
      >
        {track.map((t, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            paddingRight: 20,
          }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: i % 2 === 0 ? '#1a1a1a' : '#b84a2d',
            }}>
              {t}
            </span>
            <span style={{ color: '#b84a2d80' }}>
              <IconDot size={4} />
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Main Grid ───────────────────────────────────────────────────────────────
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const MainGrid = ({ isInView, isMobile }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate={isInView ? 'visible' : 'hidden'}
    style={{
      padding: isMobile ? '40px 20px 36px' : '60px 56px 52px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '2.2fr 1fr 1fr 1.1fr',
      gap: isMobile ? '32px' : '48px',
      alignItems: 'start',
    }}
  >
    {/* Brand column */}
    <motion.div variants={itemVariants}>
      <motion.button
        onClick={() => scrollToSection('top')}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: "'Germania One', serif",
          fontSize: '5rem', lineHeight: 0.9,
          letterSpacing: '-0.02em', color: '#1a1a1a',
          display: 'block', marginBottom: 22,
        }}
        whileHover={{ letterSpacing: '0.02em' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        ET
      </motion.button>

      <p style={{
        margin: '0 0 32px', fontSize: '0.9rem', fontWeight: 300,
        lineHeight: 1.8, color: '#1a1a1a60', maxWidth: 260,
      }}>
        A studio crafting captivating digital experiences that redefine the landscape.
      </p>

      {/* Social pills */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {SOCIAL_LINKS.map((s) => (
          <motion.a
            key={s.name}
            href={s.url}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 13px',
              border: '1px solid #1a1a1a14', borderRadius: 100,
              fontSize: '0.68rem', fontWeight: 500,
              color: '#1a1a1a65', textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
            whileHover={{
              borderColor: '#b84a2d',
              color: '#b84a2d',
              y: -2,
            }}
            transition={{ duration: 0.2 }}
          >
            {s.name}
            <IconArrowUpRight size={10} />
          </motion.a>
        ))}
      </div>
    </motion.div>

    {/* Menu */}
    <motion.div variants={itemVariants}>
      <ColLabel>Menu</ColLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {NAV_LINKS.map((item) => (
          <UnderlineLink key={item} onClick={() => scrollToSection(item.toLowerCase())}>
            {item}
          </UnderlineLink>
        ))}
      </div>
    </motion.div>

    {/* Services */}
    <motion.div variants={itemVariants}>
      <ColLabel>Services</ColLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {SERVICE_LINKS.map((s) => (
          <UnderlineLink key={s} href="#">{s}</UnderlineLink>
        ))}
      </div>
    </motion.div>

    {/* Contact */}
    <motion.div variants={itemVariants}>
      <ColLabel>Contact</ColLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <UnderlineLink href="mailto:ellisiumtechnologies@gmail.com">
          ellisiumtechnologies@gmail.com
        </UnderlineLink>
        <UnderlineLink href="tel:+917070173507">
          +91 7070173507
        </UnderlineLink>
        <div style={{
          marginTop: 8,
          padding: '14px 16px',
          border: '1px solid #1a1a1a0c',
          borderRadius: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.6rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#1a1a1a50',
            }}>
              Available now
            </span>
          </div>
          <p style={{
            margin: 0, fontSize: '0.78rem', fontWeight: 300,
            color: '#1a1a1a55', lineHeight: 1.65,
          }}>
            Based in India.<br />Working worldwide.
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
)

// ─── Bottom Bar ──────────────────────────────────────────────────────────────
const BottomBar = ({ isInView, isMobile }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : {}}
    transition={{ duration: 0.6, delay: 0.4 }}
    style={{
      padding: isMobile ? '16px 20px' : '18px 56px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
    }}
  >
    <p style={{
      margin: 0, fontSize: '0.65rem', fontWeight: 500,
      letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a30',
    }}>
      © {new Date().getFullYear()} Ellisium Technology. All rights reserved.
    </p>

    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      {LEGAL_LINKS.map((t) => (
        <UnderlineLink key={t} href="#" dim style={{ fontSize: '0.65rem' }}>
          {t}
        </UnderlineLink>
      ))}

      <div style={{ width: '1px', height: 14, background: '#1a1a1a14' }} />

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'none', border: '1px solid #1a1a1a18',
          borderRadius: 6, padding: '7px 14px',
          fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#1a1a1a50', cursor: 'pointer', fontFamily: 'inherit',
        }}
        whileHover={{ borderColor: '#b84a2d', color: '#b84a2d', y: -2 }}
        transition={{ duration: 0.2 }}
      >
        Back to top
        <IconArrowUp size={12} />
      </motion.button>
    </div>
  </motion.div>
)

// ─── Root ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <footer
      ref={ref}
      style={{
        background: '#ffffff',
        borderTop: '1px solid #1a1a1a0c',
        fontFamily: "'Inter', sans-serif",
        color: '#1a1a1a',
        overflow: 'hidden',
      }}
    >
      <MainGrid  isInView={isInView} isMobile={isMobile} />
      <Divider />
      <BottomBar isInView={isInView} isMobile={isMobile} />
    </footer>
  )
}

export default Footer