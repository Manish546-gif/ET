import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

// SVG icon components (no emojis)
const IconMonitor = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
)

const IconBrush = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.07" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1 3.5 1 2.21 0 4-1.79 4-4v-.02c0-1.66-1.35-3.02-2.5-3.02z" />
  </svg>
)

const IconCode = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const IconShield = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconZap = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconDollarOff = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="2" x2="22" y2="22" />
    <path d="M12 2v2M12 20v2M6 6H4a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H2M18 6h2a2 2 0 0 1 0 4h-2" />
  </svg>
)

const IconUsers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const SERVICES = [
  {
    id: 'website',
    label: 'Website redesign',
    Icon: IconMonitor,
    desc: 'Redesign that converts',
    tag: 'Popular'
  },
  {
    id: 'brand',
    label: 'Brand creation',
    Icon: IconBrush,
    desc: 'Identity from scratch',
    tag: null
  },
  {
    id: 'software',
    label: 'Software development',
    Icon: IconCode,
    desc: 'Products that scale',
    tag: 'New'
  }
]

const TRUST_BADGES = [
  { Icon: IconDollarOff, label: 'No hidden fees' },
  { Icon: IconShield,    label: 'NDA on request' },
  { Icon: IconZap,       label: 'Fast turnaround' },
]

const FloatingDot = ({ x, y, delay, size = 4 }) => (
  <motion.div
    style={{
      position: 'absolute', left: x, top: y,
      width: size, height: size, borderRadius: '50%',
      background: '#1a1a1a', opacity: 0.06, pointerEvents: 'none'
    }}
    animate={{ y: [0, -12, 0], opacity: [0.06, 0.14, 0.06] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
)

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', service: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
    }
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '80px 16px 60px' : '100px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Floating decorative dots */}
      <FloatingDot x="8%"  y="18%" delay={0}   size={6} />
      <FloatingDot x="92%" y="24%" delay={1.2} size={4} />
      <FloatingDot x="15%" y="72%" delay={2.1} size={5} />
      <FloatingDot x="88%" y="68%" delay={0.7} size={7} />
      <FloatingDot x="50%" y="10%" delay={1.8} size={4} />

      {/* Rotating rings */}
      {!isMobile && (
      <motion.div
        style={{
          position: 'absolute', top: -180, right: -180,
          width: 480, height: 480, borderRadius: '50%',
          border: '1px solid #1a1a1a0d', pointerEvents: 'none'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      )}
      {!isMobile && (
      <motion.div
        style={{
          position: 'absolute', top: -80, right: -80,
          width: 280, height: 280, borderRadius: '50%',
          border: '1px solid #1a1a1a0a', pointerEvents: 'none'
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          margin: '0 auto', width: '100%', maxWidth: 1400,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.3fr)',
          gap: isMobile ? '48px' : '80px',
          position: 'relative', zIndex: 1
        }}
      >
        {/* ── LEFT ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 12 }}>
          <div>
            <motion.p variants={itemVariants} style={{
              marginBottom: 20,
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#b84a2d'
            }}>
              Hit Us Up
            </motion.p>

            <motion.h1 variants={itemVariants} style={{
              marginBottom: 24,
              fontFamily: "'Georgia', serif",
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: '#1a1a1a'
            }}>
              Skip the<br />small talk.<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Let&apos;s <span style={{ fontFamily: "'Passions Conflict', cursive", color: '#b84a2d', fontSize: '1.15em' }}>cook.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', bottom: 2, left: 0, right: 0, height: 3,
                    background: '#b84a2d', transformOrigin: 'left'
                  }}
                />
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{
              marginBottom: 40,
              fontSize: '1rem', fontWeight: 300,
              lineHeight: 1.75, color: '#1a1a1a90',
              maxWidth: 360
            }}>
              We don't do boring. We only take on projects that push boundaries. Drop your info, pick your poison, and let's make something unforgettable.
            </motion.p>

            {/* Trust badges with icons */}
            <motion.div variants={itemVariants} style={{
              display: 'flex', flexDirection: 'column', gap: 12,
              marginBottom: 48,
              borderTop: '1px solid #1a1a1a10', paddingTop: 28
            }}>
              {TRUST_BADGES.map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    border: '1px solid #1a1a1a14',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={14} color="#1a1a1a70" />
                  </div>
                  <span style={{
                    fontSize: '0.8rem', fontWeight: 400,
                    color: '#1a1a1a70', letterSpacing: '0.01em'
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Social proof */}
          <motion.div variants={itemVariants} style={{
            display: 'flex', alignItems: 'center', gap: 12, marginTop: 8
          }}>
            <div style={{ display: 'flex' }}>
              {['#E8C4A2', '#B5C9D6', '#C9B8D6', '#A2C4A6'].map((c, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: c, border: '2px solid #fff',
                  marginLeft: i === 0 ? 0 : -8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <IconUsers size={12} color="#fff" />
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#1a1a1a70', margin: 0, lineHeight: 1.4 }}>
              <strong style={{ color: '#1a1a1a', fontWeight: 600 }}>47 brands</strong> trusted us<br />this quarter alone.
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT / FORM ── */}
        <motion.div variants={itemVariants} style={{ paddingTop: 12 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%', minHeight: 420,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #1a1a1a10', borderRadius: 16,
                  padding: '60px 40px', textAlign: 'center',
                  background: '#fafaf9'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: '#b84a2d', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M5 13L10.5 18.5L21 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <h2 style={{ fontFamily: "'Georgia', serif", fontSize: '2rem', fontWeight: 400, color: '#1a1a1a', marginBottom: 12 }}>We got it.</h2>
                <p style={{ fontSize: '0.95rem', color: '#1a1a1a70', lineHeight: 1.7, maxWidth: 280 }}>
                  Expect a reply within 24 hours. We review every submission personally.
                </p>
                <motion.button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '', service: '' }) }}
                  style={{
                    marginTop: 32, padding: '10px 24px',
                    border: '1px solid #1a1a1a30', borderRadius: 6,
                    background: 'transparent', fontSize: '0.75rem',
                    fontWeight: 600, letterSpacing: '0.12em',
                    textTransform: 'uppercase', cursor: 'pointer', color: '#1a1a1a',
                    fontFamily: 'inherit', transition: 'background 0.2s, color 0.2s'
                  }}
                  whileHover={{ background: '#b84a2d', color: '#fff' }}
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                  {[
                    { key: 'name',  label: 'Name',  type: 'text',  placeholder: 'John Doe' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' }
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label style={{
                        display: 'block', marginBottom: 10,
                        fontSize: '0.62rem', fontWeight: 700,
                        letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: focused === key ? '#b84a2d' : '#1a1a1a60',
                        transition: 'color 0.2s'
                      }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={formData[key]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        onFocus={() => setFocused(key)}
                        onBlur={() => setFocused(null)}
                        style={{
                          width: '100%', boxSizing: 'border-box',
                          background: 'transparent', border: 'none',
                          borderBottom: `1.5px solid ${focused === key ? '#b84a2d' : '#1a1a1a22'}`,
                          padding: '10px 0',
                          fontSize: '1rem', fontWeight: 300,
                          color: '#1a1a1a', outline: 'none',
                          transition: 'border-color 0.25s',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Service selector */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 14,
                    fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: '#1a1a1a60'
                  }}>
                    What's the move?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
                    {SERVICES.map(({ id, label, Icon, desc, tag }) => {
                      const isSelected = formData.service === label
                      return (
                        <motion.button
                          key={id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: label })}
                          style={{
                            position: 'relative',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: 120, padding: '14px 16px',
                            border: isSelected ? '1.5px solid #b84a2d' : '1px solid #1a1a1a18',
                            borderRadius: 10,
                            background: isSelected ? '#b84a2d08' : '#ffffff',
                            cursor: 'pointer', textAlign: 'left',
                            transition: 'border-color 0.25s, background 0.25s'
                          }}
                          whileHover={{ y: -3, boxShadow: '0 6px 24px #1a1a1a0c' }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {tag && (
                            <span style={{
                              position: 'absolute', top: 10, right: 10,
                              fontSize: '0.55rem', fontWeight: 700,
                              letterSpacing: '0.12em', textTransform: 'uppercase',
                              padding: '2px 7px', borderRadius: 100,
                              background: isSelected ? '#b84a2d' : '#b84a2d12',
                              color: isSelected ? '#fff' : '#b84a2d',
                              transition: 'background 0.25s, color 0.25s'
                            }}>
                              {tag}
                            </span>
                          )}
                          <div style={{
                            width: 30, height: 30, borderRadius: 7,
                            background: isSelected ? '#b84a2d' : '#1a1a1a08',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.25s'
                          }}>
                            <Icon size={15} color={isSelected ? '#ffffff' : '#1a1a1a80'} />
                          </div>
                          <div>
                            <p style={{
                              margin: 0, fontSize: '0.78rem', fontWeight: 600,
                              color: isSelected ? '#b84a2d' : '#1a1a1a80',
                              transition: 'color 0.25s', lineHeight: 1.3
                            }}>
                              {label}
                            </p>
                            <p style={{
                              margin: '3px 0 0', fontSize: '0.65rem', fontWeight: 400,
                              color: '#1a1a1a50', letterSpacing: '0.02em'
                            }}>
                              {desc}
                            </p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block', marginBottom: 10,
                    fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: focused === 'message' ? '#b84a2d' : '#1a1a1a60',
                    transition: 'color 0.2s'
                  }}>
                    Tell us about the project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Give us the brief — scope, timeline, any inspirations..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: '#1a1a1a03',
                      border: `1px solid ${focused === 'message' ? '#b84a2d' : '#1a1a1a14'}`,
                      borderRadius: 10, padding: '14px 16px',
                      fontSize: '0.95rem', fontWeight: 300,
                      color: '#1a1a1a', outline: 'none',
                      resize: 'none', lineHeight: 1.7,
                      transition: 'border-color 0.25s',
                      fontFamily: 'inherit'
                    }}
                  />
                  <p style={{
                    margin: '6px 0 0', textAlign: 'right',
                    fontSize: '0.65rem', color: '#1a1a1a40'
                  }}>
                    {formData.message.length} / 500
                  </p>
                </div>

                {/* Submit row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                  <p style={{ fontSize: '0.72rem', color: '#1a1a1a50', margin: 0, lineHeight: 1.5 }}>
                    We reply within<br /><strong style={{ color: '#1a1a1a80' }}>24 hours</strong>, guaranteed.
                  </p>
                  <motion.button
                    type="submit"
                    style={{
                      position: 'relative', overflow: 'hidden',
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: '#1a1a1a', color: '#fff',
                      border: 'none', borderRadius: 8,
                      padding: '16px 28px', cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      variants={{ hover: { x: 0 }, initial: { x: '-101%' } }}
                      initial="initial"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: 'absolute', inset: 0, background: '#b84a2d', zIndex: 0 }}
                    />
                    <span style={{
                      position: 'relative', zIndex: 1,
                      fontSize: '0.68rem', fontWeight: 700,
                      letterSpacing: '0.18em', textTransform: 'uppercase'
                    }}>
                      Send It
                    </span>
                    <motion.svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ position: 'relative', zIndex: 1 }}
                      variants={{ hover: { x: 4 }, initial: { x: 0 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.button>
                </div>

                {/* Fine print */}
                <p style={{ fontSize: '0.65rem', color: '#1a1a1a38', margin: 0, lineHeight: 1.6 }}>
                  By submitting you agree to our{' '}
                  <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
                  {' '}No spam, ever. We hate it as much as you do.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default ContactSection