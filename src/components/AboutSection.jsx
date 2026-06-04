import { Code, Network, Bot, Briefcase, MapPin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { usePortfolio } from "../context/PortfolioContext"

const experiences = [
  {
    title: "Network Engineer",
    company: "TalaTech Solutions",
    location: "Remote (Germany)",
    period: "Jan 2024 – Present",
    icon: Network,
    highlights: ["90.7% uptime achievement", "35% latency reduction", "24/7 on-call support"],
  },
  {
    title: "Jr. Systems & Network Admin",
    company: "CloudNine Technologies",
    location: "Remote (UK)",
    period: "Mar 2023 – Dec 2023",
    icon: Network,
    highlights: ["30+ enterprise clients", "99.9% service availability", "Zero downtime migrations"],
  },
  {
    title: "Backend Developer",
    company: "FRDC Security Department",
    location: "Abuja, Nigeria",
    period: "Apr 2022 – Aug 2022",
    icon: Code,
    highlights: ["100+ concurrent users", "40% downtime reduction", "Telegram & Discord bots"],
  },
]

const expertise = [
  { icon: Code,     title: "Full-Stack Development",       desc: "React, Next.js, Node.js, Django — scalable architectures that handle millions of requests." },
  { icon: Network,  title: "Network Engineering",          desc: "VPNs, firewalls, cloud connectivity. AWS, Azure, zero-trust security architectures." },
  { icon: Bot,      title: "Bot Development",              desc: "Intelligent bots for Discord, Telegram, and trading platforms. Expert in automation and payment systems." },
  { icon: Briefcase,title: "Technical Project Management", desc: "Agile methodologies, sprint planning, stakeholder management, delivering on time and on budget." },
]

const inView = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
}

export const About = () => {
  const { data } = usePortfolio()

  return (
    <section id="about" className="py-24 md:py-32 px-4 sm:px-6 relative">
      {/* Subtle left accent bar */}
      <div className="absolute left-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block" />

      <div className="container max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div {...inView} className="mb-20">
          <span className="section-num">01 — About</span>
          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl mt-3 leading-tight">
            Building the Future,<br />
            <span className="text-primary italic">One Line at a Time.</span>
          </h2>
          <div className="h-px w-24 bg-primary mt-6" />
        </motion.div>

        {/* Story + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

          {/* Story */}
          <motion.div {...inView} className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a <span className="text-foreground font-semibold">results-driven Full-Stack Developer</span> with{" "}
              <span className="text-primary font-semibold">6+ years of experience</span> building responsive, user-centric applications that scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My journey spans from <span className="text-foreground font-medium">network engineering</span> at European tech companies to{" "}
              <span className="text-foreground font-medium">full-stack development</span> for government security applications. I've designed systems that maintain{" "}
              <span className="text-primary font-semibold">90.7% uptime</span>, reduced network latency by{" "}
              <span className="text-primary font-semibold">35%</span>, and built bots serving thousands of users daily.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond code, I excel in{" "}
              <span className="text-foreground font-medium">technical project management</span>, leading cross-functional teams with Agile methodologies and mentoring the next generation of developers.
            </p>

            {/* Contact */}
            <div className="flex flex-wrap gap-5 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                Lagos, Nigeria
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                successdavidpraise99@gmail.com
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="folio-button">Get In Touch</a>
              <a href="mailto:successdavidpraise99@gmail.com" className="folio-button-outline">Download CV</a>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div {...inView} className="space-y-0">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Work Experience
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3.5 top-4 bottom-4 w-px bg-border" />

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-12"
                  >
                    {/* Gold dot */}
                    <div className="absolute left-0 top-1.5 w-7 h-7 border border-primary bg-black flex items-center justify-center">
                      <exp.icon className="h-3.5 w-3.5 text-primary" />
                    </div>

                    <div className="border border-border hover:border-primary/40 transition-colors p-5 bg-card">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{exp.title}</h4>
                        <span className="text-xs text-muted-foreground shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-primary text-sm font-medium mb-1">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mb-3">{exp.location}</p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Expertise Grid */}
        <motion.div {...inView} className="mb-16">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Core Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card p-8 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-primary/40 group-hover:border-primary flex items-center justify-center flex-shrink-0 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...inView}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border"
        >
          {data.aboutStats.map((s, i) => (
            <div key={i} className="bg-card p-8 text-center hover:bg-secondary/30 transition-colors group">
              <div className="font-display font-bold text-4xl text-primary mb-2">{s.value}</div>
              <div className="text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
