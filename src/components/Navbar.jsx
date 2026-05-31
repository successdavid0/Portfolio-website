import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home",     href: "#hero" },
  { name: "About",    href: "#about" },
  { name: "Skills",   href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact" },
]

export const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [active, setActive]       = useState("hero")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navItems.map(n => n.href.slice(1))
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 120 && bottom >= 120) { setActive(id); break }
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-black/90 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between max-w-7xl">

        {/* Monogram / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary text-sm leading-none">S</span>
          </div>
          <span className="hidden sm:block text-sm font-medium tracking-[0.15em] uppercase text-foreground/80 group-hover:text-foreground transition-colors">
            success.dev
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm tracking-wider transition-colors duration-200",
                active === item.href.slice(1)
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              {item.name}
              {active === item.href.slice(1) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-4 right-4 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-6 px-5 py-2 text-sm font-semibold tracking-wider uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full inset-x-0 bg-black border-t border-white/5 md:hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block py-3 border-b border-white/5 text-sm tracking-wider transition-colors",
                      active === item.href.slice(1) ? "text-primary" : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block mt-4 py-3 text-center text-sm font-semibold tracking-wider uppercase bg-primary text-primary-foreground hover:bg-accent transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
