import { ArrowUp, Mail, Github, Twitter, Linkedin, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const quickLinks = [
  { name: "Home",     href: "#hero" },
  { name: "About",    href: "#about" },
  { name: "Skills",   href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact" },
]

const services = [
  "Full-Stack Development",
  "Network Engineering",
  "Bot Development",
  "Technical Consulting",
  "Project Management",
]

const socialLinks = [
  { icon: Github,       href: "https://github.com",                        label: "GitHub" },
  { icon: Twitter,      href: "https://x.com/kolBigsnow",                  label: "Twitter" },
  { icon: Linkedin,     href: "https://www.linkedin.com/in/success-david", label: "LinkedIn" },
  { icon: MessageSquare,href: "https://t.me/chil_Snowman",                 label: "Telegram" },
]

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="border-t border-border">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary text-sm">S</span>
              </div>
              <span className="font-semibold tracking-wider text-foreground">success.dev</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building scalable web applications, secure networks, and intelligent automation.
            </p>
            <a
              href="mailto:successdavidpraise99@gmail.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-primary" />
              successdavidpraise99@gmail.com
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.name}>
                  <a href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s} className="text-sm text-muted-foreground">{s}</li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Connect</h4>
            <div className="flex gap-2 mb-6">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 border border-border hover:border-primary flex items-center justify-center group transition-colors"
                >
                  <s.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <a href="#contact" className="folio-button text-xs px-5 py-2.5">
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} success.dev. Crafted with precision in Lagos, Nigeria.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 border border-border hover:border-primary flex items-center justify-center group transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
