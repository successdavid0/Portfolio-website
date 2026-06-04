import { Mail, MapPin, Phone, Send, Twitter, Github, MessageSquare, Clock, CheckCircle2, Globe, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { hasBackend, api } from "../lib/api"

const contactMethods = [
  { icon: Mail,    label: "Email",    value: "successdavidpraise99@gmail.com", href: "mailto:successdavidpraise99@gmail.com" },
  { icon: Phone,   label: "Phone",    value: "+234 906 429 2153",              href: "tel:+2349064292153" },
  { icon: MapPin,  label: "Location", value: "Lagos, Nigeria",                 href: null },
  { icon: Globe,   label: "Portfolio",value: "portfolio-website.vercel.app",   href: "https://portfolio-website-xby4.vercel.app/" },
]

const socialLinks = [
  { icon: Twitter,      href: "https://x.com/AddyyyOnChain",  label: "X" },
  { icon: Github,       href: "https://github.com",            label: "GitHub" },
  { icon: MessageSquare,href: "https://t.me/Addyyyonchain",    label: "Telegram" },
]

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

// EmailJS config — set these in your .env file
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ""
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ""
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ""

const emailjsConfigured = EJS_SERVICE && EJS_TEMPLATE && EJS_KEY

export const ContactSection = () => {
  const formRef = useRef(null)
  const [status, setStatus] = useState("idle") // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    const form = formRef.current

    try {
      // Priority 1: backend API
      if (hasBackend()) {
        await api.sendContact({
          name:    form.name.value,
          email:   form.email.value,
          subject: form.subject.value,
          message: form.message.value,
        })
      // Priority 2: EmailJS
      } else if (emailjsConfigured) {
        await emailjs.sendForm(EJS_SERVICE, EJS_TEMPLATE, form, { publicKey: EJS_KEY })
      // Fallback: mailto link
      } else {
        const { name, email, subject, message } = Object.fromEntries(new FormData(form))
        window.location.href = `mailto:successdavidpraise99@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`
        setStatus("idle")
        return
      }
      setStatus("sent")
      form.reset()
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      console.error("Contact error:", err)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-4 sm:px-6 relative">
      <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto">

        {/* Header */}
        <motion.div {...inView()} className="mb-16">
          <span className="section-num">04 — Contact</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-3">
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              Let's Build Something <span className="text-primary italic">Great.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Have a project in mind? I typically respond within 24 hours.
            </p>
          </div>
          <div className="h-px w-full bg-border mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">

          {/* Left: Info */}
          <motion.div {...inView(0.1)} className="bg-card p-10 space-y-10">

            {/* Availability */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Currently Available</p>
                <p className="text-xs text-muted-foreground">Open to new projects — immediate start</p>
              </div>
            </div>

            {/* Contact methods */}
            <div className="space-y-5">
              {contactMethods.map((m, i) => (
                <div key={i} className="group">
                  {m.href ? (
                    <a href={m.href} className="flex items-center gap-4 hover:text-primary transition-colors">
                      <div className="w-9 h-9 border border-border group-hover:border-primary flex items-center justify-center flex-shrink-0 transition-colors">
                        <m.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-0.5">{m.label}</div>
                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{m.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                        <m.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-0.5">{m.label}</div>
                        <div className="text-sm font-medium">{m.value}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">Connect</p>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
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
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              Average response: within 24 hours
            </div>

            {/* EmailJS setup notice (only shown in dev if not configured) */}
            {!emailjsConfigured && (
              <div className="flex items-start gap-3 p-4 border border-green-500/30 bg-green-500/5 text-green-400 text-xs leading-relaxed">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  Contact form uses mailto fallback. Add <code className="bg-black/40 px-1 rounded">VITE_EMAILJS_*</code> keys to <code className="bg-black/40 px-1 rounded">.env</code> to enable real email sending.
                </span>
              </div>
            )}
          </motion.div>

          {/* Right: Form */}
          <motion.div {...inView(0.15)} className="bg-card p-10">
            <h3 className="font-display font-bold text-2xl mb-8">Send a Message</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name",    label: "Your Name",    type: "text",  placeholder: "John Doe",         required: true },
                { id: "email",   label: "Email Address",type: "email", placeholder: "john@example.com", required: true },
                { id: "subject", label: "Subject",      type: "text",  placeholder: "Project Inquiry",  required: false },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {f.label} {f.required && <span className="text-primary">*</span>}
                  </label>
                  <input
                    type={f.type}
                    id={f.id}
                    name={f.id}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm text-foreground placeholder-muted-foreground transition-colors"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none text-sm text-foreground placeholder-muted-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full folio-button justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "idle"    && <><Send size={15} /> Send Message</>}
                {status === "sending" && <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Send size={15} /></motion.div> Sending...</>}
                {status === "sent"    && <><CheckCircle2 size={15} /> Message Sent!</>}
                {status === "error"   && <><AlertCircle size={15} /> Failed — try emailing directly</>}
              </button>

              {status === "sent" && (
                <p className="text-center text-xs text-green-400">
                  Message delivered. I'll reply within 24 hours.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
