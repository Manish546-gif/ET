import { useRef } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.png";
import landing2 from "../../assets/landing2.jpg";

const EASE = [0.16, 1, 0.3, 1];

const HEADLINE_LINES = [
  ["We", "craft", "digital"],
  ["experiences", "that"],
  ["resonate."],
];

const SCRIPT_WORDS = new Set(["digital", "resonate."]);

const SERVICES = [
  {
    index: "01",
    title: "Web Design & Development",
    copy: "Fast, responsive, hand-crafted websites engineered to convert.",
    image: image3,
    alt: "Ét. web design project preview",
  },
  {
    index: "02",
    title: "Digital Branding",
    copy: "Identity systems, art direction and a visual language that stands out.",
    image: image4,
    alt: "Ét. branding project preview",
  },
  {
    index: "03",
    title: "Web Apps & Interfaces",
    copy: "Dashboards and tools with interfaces people actually enjoy using.",
    image: image2,
    alt: "Ét. web app interface preview",
  },
];

const PILLARS = [
  {
    title: "Strategy first",
    copy: "Every pixel earns its place. We design with intent, not decoration.",
  },
  {
    title: "Crafted to scale",
    copy: "Clean, accessible code that stays fast and easy to maintain.",
  },
  {
    title: "Built to convert",
    copy: "Typography, rhythm and hierarchy that move people to act.",
  },
];

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroWord = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const ArrowDown = () => (
  <svg
    className="h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const ArrowUpRight = () => (
  <svg
    className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const ParallaxImage = ({ src, alt, className }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div
      ref={ref}
      className={`relative aspect-[4/5] overflow-hidden bg-[#ece7dc] ${className ?? ""}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute -top-[10%] left-0 h-[120%] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] will-change-transform"
        style={reduceMotion ? undefined : { y }}
      />
    </div>
  );
};

const Eyebrow = ({ children }) => (
  <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#6b6458]">
    <span className="h-px w-8 bg-[#b84a2d]" aria-hidden="true" />
    {children}
  </p>
);

const SectionHeading = ({ children }) => (
  <h2 className="mt-6 max-w-[18ch] font-serif text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-tight text-[#141210]">
    {children}
  </h2>
);

const Accent = ({ children }) => (
  <em className="font-['Passions_Conflict'] text-[1.15em] font-normal text-[#b84a2d] not-italic">
    {children}
  </em>
);

export default function LandingPage({ isReady }) {
  return (
    <MotionConfig reducedMotion="user">
      <main className="grain relative overflow-x-clip bg-[#f5f2ec] text-[#141210] antialiased">
        <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[8vw] top-[4vh] select-none font-['Germania_One'] text-[44vw] leading-none text-[#141210]/[0.05]"
          >
            ÉT.
          </div>

          <div className="relative z-10 flex items-center justify-end px-5 pt-5 sm:px-8">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6b6458]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b84a2d] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b84a2d]" />
              </span>
              Available for projects
            </span>
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-5 py-20 sm:px-8 lg:px-12">
            <h1 className="font-serif text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-tight text-[#141210]">
              <motion.span
                className="block"
                variants={heroContainer}
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
              >
                {HEADLINE_LINES.map((line, lineIndex) => (
                  <span key={lineIndex} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                    {line.map((word, wordIndex) => (
                      <motion.span
                        key={`${lineIndex}-${wordIndex}`}
                        variants={heroWord}
                        className={`mr-[0.22em] inline-block ${
                          SCRIPT_WORDS.has(word)
                            ? "font-['Passions_Conflict'] text-[1.12em] text-[#b84a2d]"
                            : ""
                        }`}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
              className="mt-10 max-w-[46rem]"
            >
              <p className="font-sans text-lg leading-relaxed text-[#6b6458] sm:text-xl">
                We&apos;re Ét. — a small studio turning bold ideas into fast,
                beautiful websites, brands and web apps that people remember.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#141210] px-7 py-3.5 text-sm font-semibold text-[#f5f2ec] transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  View our work
                  <ArrowDown />
                </a>
                <a
                  href="#contact"
                  className="group -my-2 inline-flex items-center gap-2 border-b border-[#141210]/30 py-2 text-sm font-semibold text-[#141210] transition-colors duration-150 hover:border-[#b84a2d] hover:text-[#b84a2d]"
                >
                  Start a project
                  <ArrowUpRight />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="scroll-mt-10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                <ParallaxImage
                  src={landing2}
                  alt="The Ét. studio at work"
                />
              </motion.div>

              <motion.div
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Eyebrow>Who we are</Eyebrow>
                <SectionHeading>
                  Design that feels <Accent>human</Accent>.
                </SectionHeading>
                <p className="mt-6 max-w-[60ch] font-sans text-lg leading-relaxed text-[#6b6458]">
                  Ét. is a two-person studio that believes great digital work is
                  a blend of craft and restraint. We pair editorial typography
                  with obsessive attention to detail — so every project feels
                  considered, on every screen.
                </p>

                <ul className="mt-12">
                  {PILLARS.map((pillar, index) => (
                    <motion.li
                      key={pillar.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid gap-2 border-t border-[#141210]/10 py-6 sm:grid-cols-[1fr_2fr] sm:gap-8"
                    >
                      <h3 className="font-['Germania_One'] text-xl tracking-wide text-[#b84a2d]">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-[#6b6458]">{pillar.copy}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="scroll-mt-10 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Eyebrow>What we do</Eyebrow>
              <SectionHeading>
                Services built to <Accent>move</Accent> your project forward.
              </SectionHeading>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-8"
            >
              {SERVICES.map((service) => (
                <motion.a
                  key={service.title}
                  href="#contact"
                  variants={reveal}
                  className="group block"
                >
                  <ParallaxImage src={service.image} alt={service.alt} />
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-medium text-[#141210]">
                      {service.title}
                    </h3>
                    <span className="font-mono text-sm text-[#6b6458]">
                      {service.index}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[40ch] font-sans text-[#6b6458]">
                    {service.copy}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-36">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden bg-[#141210] px-6 py-20 text-[#f5f2ec] sm:px-12 lg:px-20 lg:py-28"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -top-14 select-none font-['Germania_One'] text-[13rem] leading-none text-[#f5f2ec]/[0.05]"
            >
              Ét.
            </span>
            <div className="relative">
              <h2 className="max-w-[16ch] font-serif text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Let&apos;s build something that{" "}
                <em className="font-['Passions_Conflict'] text-[1.15em] text-[#b84a2d] not-italic">
                  resonates
                </em>
                .
              </h2>
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#f5f2ec]/25 px-7 py-3.5 text-sm font-semibold text-[#f5f2ec] transition-colors duration-150 hover:border-[#f5f2ec] hover:bg-[#f5f2ec] hover:text-[#141210] active:scale-[0.97]"
              >
                Start a project
                <ArrowUpRight />
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );

  
}
