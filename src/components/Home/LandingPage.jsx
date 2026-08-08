import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.png";
import landing1 from "../../assets/landing1.jpg";
import landing2 from "../../assets/landing2.jpg";

gsap.registerPlugin(ScrollTrigger);

const PANEL_COUNT = 3;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionImg = motion.img;
const MotionP = motion.p;
const HOVER_TEXT_COLOR = "#ffffff";
const HEADING_LINES = ["Innovation-driven", "digital studio", "tech agency"];
const SERVICES = [
  {
    num: "1",
    title: ["Dashboard", "Design"],
    desc: "Built to decode complexity, our dashboards transform data into elegant and intuitive interfaces.",
    image: image2,
  },
  {
    num: "2",
    title: ["Web & App", "Design"],
    desc: "Crafted for clarity and growth, our web and app experiences are designed to engage and scale seamlessly.",
    image: image3,
  },
  {
    num: "3",
    title: ["Branding", "Identity"],
    desc: "From strategy and messaging to visual identity, each brand is designed to be scalable, sustainable, and impactful across every digital platform.",
    image: image4,
  },
];

const firstPanelGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
};

const headingLetterVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    rotateX: 95,
    transformPerspective: 900,
    transformOrigin: "50% 100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const panelItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const rightImageVariants = {
  hidden: {
    opacity: 0,
    x: 90,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ServicePanel({ item, index, isReady }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative flex flex-1 cursor-pointer flex-col overflow-hidden border-r border-[#d3d0ca] px-10 mt-17 pb-10 last:border-r-0 first:border-l"
      initial={{ opacity: 0 }}
      animate={isReady ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image})` }}
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.08 }}
        transition={{
          opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#14120e]"
        initial={false}
        animate={{ opacity: isHovered ? 0.35 : 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <motion.p
          className="select-none font-serif text-[10rem] font-normal leading-[0.85] tracking-[-0.04em] transition-colors duration-500 md:text-[12rem]"
          style={{ color: isHovered ? HOVER_TEXT_COLOR : "#2f3138" }}
          initial={{ y: 30, opacity: 0 }}
          animate={isReady ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + index * 0.1 }}
        >
          {item.num}
        </motion.p>

        {/* <div className="flex-1" /> */}

        <div className="mb-10 mt-6">
          {item.title.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block font-serif text-[4rem] font-normal leading-[1.05] tracking-[-0.02em] transition-colors duration-500"
                style={{ color: isHovered ? HOVER_TEXT_COLOR : "#2f3138" }}
                initial={{ y: "105%" }}
                animate={isReady ? { y: 0 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 + index * 0.1 + i * 0.08 }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p
          className="mt-6 max-w-xs text-[1.2rem] font-light leading-[1.7] transition-colors duration-500 md:mt-15 md:pt-6"
          style={{ color: isHovered ? HOVER_TEXT_COLOR : "#8f8f8f" }}
          initial={{ opacity: 0, y: 12 }}
          animate={isReady ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 + index * 0.1 }}
        >
          {item.desc}
        </motion.p>

        <motion.a
          href="#"
          className="mt-4 inline-flex w-fit items-center gap-2 text-[0.68rem] uppercase tracking-widest text-[#0b0b0b] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          View work
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M1.5 6.5h10M8 2.5l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

const LandingPage = ({ isReady }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isPanelOneHovered, setIsPanelOneHovered] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const travelDistance = () => {
        if (!trackRef.current) return 0;
        return trackRef.current.scrollWidth - window.innerWidth;
      };

      gsap.to(trackRef.current, {
        x: () => -travelDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${travelDistance()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen border-b-1 border-b-black overflow-hidden"
    >
      <div
        ref={trackRef}
        className="relative flex h-full"
        style={{ width: `${PANEL_COUNT * 100}vw` }}
      >
        <article className="relative h-screen w-screen shrink-0 bg-[#ffffff]  pl-10 ">
          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.9fr] md:gap-0">
            <MotionDiv
              className="grid h-full min-h-0 grid-rows-[auto_auto_auto] content-between gap-6 mt-20 md:pr-10"
              variants={firstPanelGroupVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
            >
              <MotionH1
                variants={headingContainerVariants}
                className="text-4xl font-serif leading-[1.14] tracking-[0.02em] text-[#2f3138] md:text-[5.5rem]"
              >
                {HEADING_LINES.map((line, lineIndex) => (
                  <span key={lineIndex} className="block overflow-hidden ">
                    {line.split("").map((letter, letterIndex) => (
                      <MotionDiv
                        key={`${lineIndex}-${letterIndex}-${letter}`}
                        variants={headingLetterVariants}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </MotionDiv>
                    ))}
                  </span>
                ))}
              </MotionH1>
              <MotionDiv variants={panelItemVariants}>
                <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-[0.7fr_1.2fr]">
                  <MotionImg
                    variants={panelItemVariants}
                    src={landing1}
                    alt="Studio visual"
                    className="h-44 rounded-xl w-54 object-cover md:h-52"
                  />
                  <MotionP
                    variants={panelItemVariants}
                    className="max-w-[36ch] self-end text-sm leading-relaxed text-[#36352e] md:text-xl"
                  >
                    We shape premium digital products with thoughtful UX, bold
                    visual direction, and motion that feels precise and alive.
                  </MotionP>
                </div>
              </MotionDiv>

              <MotionP
                variants={panelItemVariants}
                className="text-lg font-medium text-[#6d6857] md:text-xl"
              >
                Scroll For More
              </MotionP>
            </MotionDiv>

            <MotionDiv
              variants={rightImageVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
              className="h-full border overflow-hidden border-[#9c957f]/50 bg-[#cdc3ad]/50"
            >
              <img
                src={landing2}
                alt="Studio visual"
                className="h-full w-full object-cover"
              />
            </MotionDiv>
          </div>
        </article>

        <article className="relative h-screen w-screen shrink-0 overflow-hidden bg-[#ffffff] pl-8 pt-8  text-[#2f3138] md:pl-14 md:pt-17 ">
          {/* Subtle animated grain texture overlay */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px",
            }}
          />

          <div className="relative z-10 flex h-full flex-col md:flex-row">
            {/* ── LEFT PANEL ── */}
            <MotionDiv
              variants={firstPanelGroupVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
              className="flex h-full flex-col border-r border-[#d3d0ca] pr-0 pb-8 md:w-[67%] md:pr-14 md:pb-0"
            >
              {/* Tagline */}
              <MotionP
                variants={panelItemVariants}
                className="mt-5 text-[0.85rem] tracking-[0.01em] text-[#a19485]"
              >
                • Our mission
              </MotionP>

              {/* Headline — word-by-word reveal */}
              <MotionH1
                variants={panelItemVariants}
                className="mt-4 max-w-5xl font-serif text-[2.75rem] font-normal leading-[1.15] tracking-[-0.02em] md:text-[3.9rem]"
              >
                {[
                  "Redefine the digital landscape by",
                  " crafting elegant, human-centered experiences that seamlessly blend",
                  "beauty and functionality",
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    className="block overflow-hidden"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={isReady ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.2 + i * 0.12,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </MotionH1>

              <div className="mt-8 flex flex-col gap-5">
                {/* Body copy */}
                <MotionP
                  variants={panelItemVariants}
                  className="max-w-xl text-[1.2rem] font-light leading-[1.7] text-[#1a1919]"
                >
                 Ellisium Technology’s work is driven by innovation and precision, delivering high-performance digital experiences through modern development, user-focused design, and scalable solutions that reflect our commitment to excellence and impactful storytelling.
                </MotionP>

                {/* CTA links */}
                <MotionDiv
                  variants={panelItemVariants}
                  className="flex flex-wrap mt-10 justify-between gap-8"
                >
                  {["Experience the Work", "Inquire"].map((label, i) => (
                    <motion.a
                      key={label}
                      href="#"
                      className="group relative text-[1.5rem] tracking-[0.01em] text-[#181717]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isReady ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.85 + i * 0.1,
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <span>{label}</span>
                      {/* animated underline */}
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#4a4a4a] transition-transform duration-300 ease-out group-hover:scale-x-110" />
                      <motion.span
                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#2f3138]"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.a>
                  ))}
                </MotionDiv>
              </div>

              {/* Bottom awards strip */}
              <motion.div
                className="mt-auto flex items-center gap-6 pt-6 pb-6"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.1 }}
              >
                {[
                  "Innovation Driven",
  "Performance Optimized",
  "User-Centric Design",
  "Scalable Solutions"
                ].map((award) => (
                  <span
                    key={award}
                    className="text-[0.68rem]  tracking-[0.08em] text-[#151515] uppercase"
                  >
                    {award}
                  </span>
                ))}
              </motion.div>
            </MotionDiv>

            {/* ── RIGHT PANEL ── */}
            <MotionDiv
              variants={rightImageVariants}
              initial="hidden"
              animate={isReady ? "visible" : "hidden"}
              className="group relative flex h-full flex-col overflow-hidden pl-0 pt-4 md:w-[33%] md:self-end md:pl-10 md:pt-0"
              onHoverStart={() => setIsPanelOneHovered(true)}
              onHoverEnd={() => setIsPanelOneHovered(false)}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image1})` }}
                initial={false}
                animate={{ opacity: isPanelOneHovered ? 1 : 0, scale: isPanelOneHovered ? 1 : 1.08 }}
                transition={{
                  opacity: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                }}
              />

              <motion.div
                className="pointer-events-none absolute inset-0 bg-[#14120e]"
                initial={false}
                animate={{ opacity: isPanelOneHovered ? 0.35 : 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="relative z-10 flex h-full flex-col">
              {/* Giant number */}
              <motion.p
                className="font-serif text-[10rem] font-normal leading-[0.85] tracking-[-0.04em] transition-colors duration-500 md:text-[12rem]"
                style={{ color: isPanelOneHovered ? HOVER_TEXT_COLOR : "#2f3138" }}
                initial={{ opacity: 0, y: 60 }}
                animate={isReady ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
              >
                1
              </motion.p>

              {/* Service heading — staggered lines */}
              <h2 className="mt-6 font-serif text-[4rem] font-normal leading-[1.05] tracking-[-0.02em]">
                {["UX/UI", "Design"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="block overflow-hidden transition-colors duration-500"
                    style={{ color: isPanelOneHovered ? HOVER_TEXT_COLOR : "#2f3138" }}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={isReady ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4 + i * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

             

              {/* Service description */}
              <motion.p
                className="mt-6 max-w-xs text-[1.2rem] font-light leading-[1.7] transition-colors duration-500 md:mt-15 md:pt-6"
                style={{ color: isPanelOneHovered ? HOVER_TEXT_COLOR : "#8f8f8f" }}
                initial={{ opacity: 0, y: 16 }}
                animate={isReady ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.75,
                }}
              >
                Transform complex data into intuitive, visually refined
                dashboards that empower confident decision-making.
              </motion.p>

              <motion.a
                href="#"
                className="mt-4 inline-flex w-fit items-center gap-2 text-[0.68rem] uppercase tracking-widest text-[#000000] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                View work
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M1.5 6.5h10M8 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>

              </div>

             
              
            </MotionDiv>
          </div>
        </article>

        <article className="flex h-screen w-screen shrink-0 bg-[#ffffff] text-[#222224]">
          {SERVICES.map((item, i) => (
            <ServicePanel key={item.num} item={item} index={i} isReady={isReady} />
          ))}
        </article>
      </div>
    </section>
  );
};

export default LandingPage;
