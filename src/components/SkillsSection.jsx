import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Code, Server, Wrench, Network, Bot, Database } from "lucide-react"
import { Card3D } from "./Card3D"

import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiPython, SiNodedotjs, SiDjango, SiExpress, SiFastapi,
  SiPostgresql, SiMongodb, SiMysql,
  SiDocker, SiCloudflare, SiWireshark,
  SiTelegram, SiDiscord, SiBinance,
  SiGit, SiGithubactions, SiGithub,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"

const skills = [
  // Frontend
  { name: "HTML5",        Icon: SiHtml5,            color: "#E34F26", category: "frontend",   years: 6 },
  { name: "CSS3",         Icon: SiCss,              color: "#1572B6", category: "frontend",   years: 6 },
  { name: "JavaScript",   Icon: SiJavascript,       color: "#F7DF1E", category: "frontend",   years: 5 },
  { name: "React.js",     Icon: SiReact,            color: "#61DAFB", category: "frontend",   years: 4 },
  { name: "Next.js",      Icon: SiNextdotjs,        color: "#ffffff", category: "frontend",   years: 3 },
  { name: "TypeScript",   Icon: SiTypescript,       color: "#3178C6", category: "frontend",   years: 3 },
  { name: "Tailwind CSS", Icon: SiTailwindcss,      color: "#06B6D4", category: "frontend",   years: 3 },
  // Backend
  { name: "Python",       Icon: SiPython,           color: "#3776AB", category: "backend",    years: 5 },
  { name: "Node.js",      Icon: SiNodedotjs,        color: "#339933", category: "backend",    years: 4 },
  { name: "Django",       Icon: SiDjango,           color: "#092E20", category: "backend",    years: 4 },
  { name: "Express.js",   Icon: SiExpress,          color: "#ffffff", category: "backend",    years: 3 },
  { name: "FastAPI",      Icon: SiFastapi,          color: "#009688", category: "backend",    years: 2 },
  // Database
  { name: "PostgreSQL",   Icon: SiPostgresql,       color: "#4169E1", category: "database",   years: 4 },
  { name: "MongoDB",      Icon: SiMongodb,          color: "#47A248", category: "database",   years: 3 },
  { name: "MySQL",        Icon: SiMysql,            color: "#4479A1", category: "database",   years: 3 },
  // Network / Cloud
  { name: "AWS",          Icon: FaAws,              color: "#FF9900", category: "networking", years: 3 },
  { name: "Docker",       Icon: SiDocker,           color: "#2496ED", category: "networking", years: 3 },
  { name: "Cloudflare",   Icon: SiCloudflare,       color: "#F38020", category: "networking", years: 2 },
  { name: "Wireshark",    Icon: SiWireshark,        color: "#1679A7", category: "networking", years: 4 },
  // Bots
  { name: "Telegram Bot", Icon: SiTelegram,         color: "#26A5E4", category: "bots",       years: 4 },
  { name: "Discord Bot",  Icon: SiDiscord,          color: "#5865F2", category: "bots",       years: 3 },
  { name: "Trading Bots", Icon: SiBinance,          color: "#F0B90B", category: "bots",       years: 2 },
  // Tools / DevOps
  { name: "Git",          Icon: SiGit,              color: "#F05032", category: "tools",      years: 6 },
  { name: "GitHub",       Icon: SiGithub,           color: "#ffffff", category: "tools",      years: 5 },
  { name: "CI/CD",        Icon: SiGithubactions,    color: "#2088FF", category: "tools",      years: 3 },
]

const categories = [
  { id: "all",        label: "All",           icon: Code },
  { id: "frontend",   label: "Frontend",      icon: Code },
  { id: "backend",    label: "Backend",       icon: Server },
  { id: "database",   label: "Database",      icon: Database },
  { id: "networking", label: "Network/Cloud", icon: Network },
  { id: "bots",       label: "Bots",          icon: Bot },
  { id: "tools",      label: "DevOps",        icon: Wrench },
]

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = skills.filter(
    s => activeCategory === "all" || s.category === activeCategory
  )

  return (
    <section id="skills" className="py-24 md:py-32 px-4 sm:px-6 relative">
      <div className="absolute left-0 top-0 w-[350px] h-[350px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="section-num">03 — Skills</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-3">
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              Technical <span className="text-primary italic">Expertise.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              6+ years of hands-on experience from frontend to infrastructure.
            </p>
          </div>
          <div className="h-px w-full bg-border mt-8" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border",
                activeCategory === cat.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              <cat.icon className="h-3 w-3" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card3D className="group bg-card p-6 h-full flex flex-col items-center text-center gap-4" intensity={10}>
                <div className="relative z-10 flex flex-col items-center gap-3 w-full">
                  {/* Brand logo */}
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}30` }}
                  >
                    <skill.Icon size={26} style={{ color: skill.color }} />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-xs leading-snug text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>

                  {/* Years badge */}
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase border border-border px-2 py-0.5">
                    {skill.years}+ yr
                  </span>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft skills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
        >
          {[
            { title: "Project Management", desc: "Agile, Scrum, stakeholder management, technical roadmap planning" },
            { title: "Marketing & Growth",  desc: "Community building, content strategy, Web3 marketing, social media" },
            { title: "Leadership",          desc: "Team coordination, code reviews, mentorship, cross-functional collaboration" },
          ].map((item, i) => (
            <div key={i} className="bg-card p-8 group hover:bg-secondary/40 transition-colors">
              <div className="h-px w-8 bg-primary mb-6" />
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
