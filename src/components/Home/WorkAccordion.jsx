import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqItems = [
  {
    id: 1,
    question: "How fast can you actually ship?",
    answer: "Faster than you'd expect. Most projects go from signed brief to live in 3–6 weeks depending on scope. We don't do 6-month agency timelines. We move with urgency because we know time is money — yours and ours."
  },
  {
    id: 2,
    question: "What makes you different from every other studio?",
    answer: "We treat every project like it's our own company launching. That means obsessing over conversion, not just aesthetics. We ask the uncomfortable questions — why does this exist, who actually cares, what's the one thing it must do. Most studios skip that part."
  },
  {
    id: 3,
    question: "Do you take on small projects?",
    answer: "Depends on the project, not the budget. A sharp rebrand for a one-person business can be more exciting than a bloated enterprise site. Tell us what you're building and we'll tell you if we're the right fit — honestly."
  },
  {
    id: 4,
    question: "What does working with you actually look like?",
    answer: "No Slack purgatory. No 47-slide decks to approve a button color. We work in short focused sprints, share progress early and often, and keep one point of contact on both sides. You'll always know where things stand."
  },
  {
    id: 5,
    question: "What if we hate the first direction?",
    answer: "Then we got our wires crossed early — and that's on us to catch in the brief stage. We don't lock you into one direction and pray. We explore, get your read fast, and pivot before we've burned hours on the wrong thing."
  },
  {
    id: 6,
    question: "Can you handle the full stack — design through development?",
    answer: "Yes. Design, frontend, backend, CMS, integrations. We've shipped everything from marketing sites to SaaS dashboards to custom e-commerce. If it lives on a screen, we can build it."
  },
]

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="8" y1="2" x2="8" y2="14" />
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
)

const IconMinus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="2" y1="8" x2="14" y2="8" />
  </svg>
)

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 7H13M13 7L7 1M13 7L7 13" />
  </svg>
)

// ─── Accordion Item ───────────────────────────────────────────────────────────
const AccordionItem = ({ item, isOpen, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    style={{
      borderBottom: '1px solid #1a1a1a0e',
    }}
  >
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '24px 0',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24,
        background: 'none', border: 'none',
        cursor: 'pointer', textAlign: 'left',
        fontFamily: 'inherit',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700,
          letterSpacing: '0.15em', color: '#1a1a1a28',
          fontVariantNumeric: 'tabular-nums',
          minWidth: 20, flexShrink: 0,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontSize: '1rem', fontWeight: 500,
          color: isOpen ? '#1a1a1a' : '#1a1a1a',
          lineHeight: 1.4, letterSpacing: '-0.01em',
          transition: 'color 0.2s',
        }}>
          {item.question}
        </span>
      </div>

      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
          border: isOpen ? '1px solid #b84a2d' : '1px solid #1a1a1a18',
          background: isOpen ? '#b84a2d' : 'transparent',
          color: isOpen ? '#fff' : '#1a1a1a70',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s, border-color 0.25s, color 0.25s',
        }}
      >
        <IconPlus />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.06 }}
            style={{
              margin: 0, paddingBottom: 28, paddingLeft: 36,
              fontSize: '0.92rem', fontWeight: 300,
              lineHeight: 1.8, color: '#1a1a1a65',
              maxWidth: 560,
            }}
          >
            {item.answer}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

// ─── Main Section ─────────────────────────────────────────────────────────────
const WorkAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: isMobile ? '80px 0' : '120px 0',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number watermark */}
      <div style={{
        position: 'absolute', right: -20, top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: "'Georgia', serif",
        fontSize: 'clamp(180px, 22vw, 320px)',
        fontWeight: 700, lineHeight: 1,
        color: '#1a1a1a03',
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.05em',
      }}>
        FAQ
      </div>

      <div style={{ maxWidth: 1500, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.45fr)',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'start',
        }}>

          {/* ── Left ── */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 96 }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{
                margin: '0 0 16px',
                fontSize: '0.6rem', fontWeight: 700,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: '#b84a2d',
              }}
            >
              Still curious?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: '0 0 20px',
                fontFamily: "'Georgia', serif",
                fontSize: 'clamp(2.6rem, 4vw, 3.8rem)',
                fontWeight: 400, lineHeight: 1.05,
                letterSpacing: '-0.025em', color: '#1a1a1a',
              }}
            >
              Common<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                questions.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute', bottom: 4, left: 0, right: 0,
                    height: 3, background: '#b84a2d', transformOrigin: 'left',
                  }}
                />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                margin: '0 0 40px',
                fontSize: '0.95rem', fontWeight: 300,
                lineHeight: 1.75, color: '#1a1a1a60',
                maxWidth: 300,
              }}
            >
              We've answered the ones you're probably too polite to ask.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}
            >
              <motion.a
                href="#contact"
                style={{
                  position: 'relative', overflow: 'hidden',
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: '#1a1a1a', color: '#fff',
                  padding: '14px 24px', borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: '0.68rem', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontFamily: 'inherit',
                }}
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  variants={{ hover: { x: 0 }, initial: { x: '-101%' } }}
                  initial="initial"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0, background: '#b84a2d', zIndex: 0 }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>Still have questions?</span>
                <motion.span
                  variants={{ hover: { x: 4 }, initial: { x: 0 } }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative', zIndex: 1, display: 'flex' }}
                >
                  <IconArrow />
                </motion.span>
              </motion.a>

              <span style={{ fontSize: '0.72rem', color: '#1a1a1a40', paddingLeft: 2 }}>
                We reply within 24h.
              </span>
            </motion.div>

            {/* Decorative count */}
            </div>

          {/* ── Right / Accordion ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header rule */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 8, paddingBottom: 16,
              borderBottom: '1px solid #1a1a1a0e',
            }}>
              <span style={{
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: '#1a1a1a30',
              }}>
                Question
              </span>
              <span style={{
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: '#1a1a1a30',
              }}>
                {openIndex >= 0 ? `${String(openIndex + 1).padStart(2, '0')} / ${String(faqItems.length).padStart(2, '0')}` : '—'}
              </span>
            </div>

            {faqItems.map((item, i) => (
              <AccordionItem
                key={item.id}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default WorkAccordion