import { ArrowDown, ArrowRight, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { usePortfolio } from "../context/PortfolioContext"

const roles = [
  "Full-Stack Developer",
  "Network Engineer",
  "Bot Architect",
  "Web3 Specialist",
  "Technical Leader",
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

export const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0)
  const { data } = usePortfolio()

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="relative h-screen flex flex-row-reverse overflow-hidden">

      {/* ── RIGHT: Full-height portrait ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block w-[42%] lg:w-[40%] xl:w-[42%] flex-shrink-0 relative"
      >
        {/* Photo */}
        <img
          src="/profile.png"
          alt="success.dev"
          className="w-full h-full object-cover object-top"
        />
        {/* Left-edge gradient fade into black */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {/* Gold bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent" />

        {/* Floating location tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-6 flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-white/70 tracking-wider">Lagos, Nigeria</span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Content ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 relative pt-20 lg:pt-0">

        {/* Subtle top-right grain/texture orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Label row */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-4 mb-8">
          <span className="section-num">Portfolio 2025</span>
          <span className="accent-line w-12" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-wider">Available</span>
          </span>
        </motion.div>

        {/* Name */}
        <div className="mb-6 overflow-hidden">
          <motion.h1
            {...fadeUp(0.35)}
            className="font-display font-black leading-[0.9] tracking-tight text-foreground"
            style={{ fontSize: "clamp(3.5rem, 7vw, 7rem)" }}
          >
            success
            <br />
            <span className="text-glow text-primary italic">.dev</span>
          </motion.h1>
        </div>

        {/* Accent divider */}
        <motion.div {...fadeUp(0.5)} className="flex items-center gap-4 mb-6">
          <div className="h-px w-14 bg-primary" />
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Rotating role */}
        <motion.div {...fadeUp(0.55)} className="h-8 flex items-center mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-muted-foreground"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p {...fadeUp(0.65)} className="text-muted-foreground leading-relaxed max-w-lg text-base mb-10">
          Building scalable web applications, secure network infrastructures, and intelligent bots.{" "}
          <span className="text-foreground font-medium">6+ years</span> of turning complex
          challenges into elegant, high-performance solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.75)} className="flex flex-wrap gap-4 mb-12">
          <a href="#projects" className="folio-button">
            View Work <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#contact" className="folio-button-outline">
            Get In Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.85)}
          className="flex flex-wrap gap-8 pt-8 border-t border-border"
        >
          {data.heroStats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-bold text-2xl sm:text-3xl text-primary">
                {s.value}
              </div>
              <div className="text-xs text-muted-foreground tracking-wider uppercase mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile photo — shown only on small screens */}
      <div className="absolute inset-0 md:hidden -z-10">
        <img src="/profile.png" alt="" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-background/80" />
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase rotate-90 origin-center translate-x-6">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  )
}
