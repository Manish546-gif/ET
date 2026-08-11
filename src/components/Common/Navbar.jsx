import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { meta: 'Projects (08)', label: 'Work', sectionId: 'work' },
  { meta: 'Who we are', label: 'About', sectionId: 'about' },
  { meta: 'Get in touch', label: 'Contact', sectionId: 'contact' },
]

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el)
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    let rafId = 0

    const updateProgress = () => {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = maxScrollable > 0 ? window.scrollY / maxScrollable : 0
      setScrollProgress(Math.max(0, Math.min(1, nextProgress)))
      rafId = 0
    }

    const requestUpdate = () => {
      if (rafId) {
        return
      }

      rafId = window.requestAnimationFrame(updateProgress)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)

      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const progressStyle = useMemo(
    () => ({
      transform: `scaleX(${scrollProgress})`,
    }),
    [scrollProgress],
  )

  return (
    <header className='fixed inset-x-0 top-0 z-50 border-y  font-black border-black/20 bg-transparent'>
      <div className='mx-auto max-w-480'>
        <div className='hidden h-17 grid-cols-[.20fr_2fr_1.3fr] md:grid'>
          <div className='flex items-center border-r border-black/30 px-10'>
            <button
              onClick={() => scrollToSection('top')}
              className=' inline-flex items-center gap-3'
              aria-label='Go to home page'
            >
              <span className='font-["Germania_One"] text-3xl font-medium leading-none'>
                ET<span className='text-[#b84a2d]'>.</span>
              </span>
            </button>
          </div>

          <div className=' flex items-center border-r border-black/50 px-8'>
            <p className='max-w-[28ch] text-xs font-small font-extralight leading-snug'>
              A studio crafting captivating
              <br />
              digital experiences.
            </p>
          </div>

          <nav className='grid grid-cols-3'  aria-label='Primary navigation'>
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.label}
                className={`border-r border-black/50 font-light px-8 pt-2 transition-colors duration-200 ${
                  index === NAV_ITEMS.length - 1 ? 'border-r-0' : ''
                }`}
                onHoverStart={() => setHoveredItem(item.label)}
                onHoverEnd={() => setHoveredItem(null)}
                animate={{
                  backgroundColor: hoveredItem === item.label ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => scrollToSection(item.sectionId)}
                  className='group flex flex-col justify-center gap-0.5 text-left w-full'
                >
                  <span className='text-[11px] tracking-tight transition-colors duration-200 group-hover:text-[#b84a2d]'>{item.meta}</span>
                  <span className='flex items-center justify-between text-2xl leading-none tracking-[-0.015em]'>
                    <motion.span className='relative block h-[1em] overflow-hidden'>
                      <motion.span
                        className='block text-[#1a1a1a] transition-colors duration-200 group-hover:text-[#b84a2d]'
                        animate={{
                          y: hoveredItem === item.label ? -24 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        {item.label}
                      </motion.span>
                      <motion.span
                        className='absolute left-0 top-full block text-[#b84a2d]'
                        animate={{
                          y: hoveredItem === item.label ? -24 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        {item.label}
                      </motion.span>
                    </motion.span>
                    <motion.span className='relative block w-[0.8em] overflow-hidden text-xl text-[#b84a2d]' aria-hidden='true'>
                      <motion.span
                        className='block'
                        animate={{
                          x: hoveredItem === item.label ? 14 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        &rarr;
                      </motion.span>
                      <motion.span
                        className='absolute inset-y-0 right-full block'
                        animate={{
                          x: hoveredItem === item.label ? 14 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        &rarr;
                      </motion.span>
                    </motion.span>
                  </span>
                </button>
              </motion.div>
            ))}
            </nav>
          </div>

          <div className='flex h-16 items-center justify-between px-5 md:hidden'>
          <button
            onClick={() => scrollToSection('top')}
            aria-label='Go to home page'
            className=' font-["Germania_One"] text-3xl leading-none'
          >
            ET<span className='text-[#b84a2d]'>.</span>
          </button>

          <nav className=' flex items-center gap-4 text-xs font-medium' aria-label='Mobile navigation'>
            {NAV_ITEMS.map((item) => (
              <button key={item.label} onClick={() => scrollToSection(item.sectionId)} className='opacity-85 hover:opacity-100 transition-opacity'>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 h-[0.06rem] w-full bg-white/20'>
        <div className='h-full origin-left bg-[#b84a2d] transition-transform duration-150 ease-out' style={progressStyle} />
      </div>
    </header>
  )
}

export default Navbar
