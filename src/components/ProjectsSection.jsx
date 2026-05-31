import { ExternalLink, Github, ArrowRight, Network, Bot, Code, Cloud, Shield, Zap, Server, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card3D } from "./Card3D"
import { usePortfolio } from "../context/PortfolioContext"

const iconMap = { Network, Code, Bot, Cloud, Shield, Zap, Server, Globe }

const allCategories = ["All", "Network Engineering", "Full-Stack", "Bot Development", "DevOps", "Network Security", "Network Tools"]

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export const ProjectSection = () => {
  const { data } = usePortfolio()
  const [active, setActive] = useState("All")

  const filtered = active === "All" ? data.projects : data.projects.filter(p => p.category === active)

  return (
    <section id="projects" className="py-24 md:py-32 px-4 sm:px-6 relative">
      <div className="absolute right-0 top-32 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto">

        {/* Header */}
        <motion.div {...inView()} className="mb-16">
          <span className="section-num">02 — Projects</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-3">
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight">
              Featured <span className="text-primary italic">Work.</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              Selected projects across network engineering, full-stack development, and intelligent automation.
            </p>
          </div>
          <div className="h-px w-full bg-border mt-8" />
        </motion.div>

        {/* Filters */}
        <motion.div {...inView(0.1)} className="flex flex-wrap gap-2 mb-12">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 border ${
                active === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filtered.map((project, i) => {
            const Icon = iconMap[project.icon] || Code
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Card3D className="group bg-card h-full flex flex-col" intensity={8}>
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Category */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase">
                      {project.category}
                    </div>
                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <h3 className="font-display font-bold text-lg leading-snug mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.highlights.map((h, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 border border-primary/30 text-primary font-medium tracking-wider uppercase">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pb-4 mb-4 border-b border-border">
                      {project.tags.slice(0, 4).map((tag, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground tracking-wide">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between">
                      <a
                        href={project.demoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-primary hover:text-accent transition-colors"
                      >
                        Live Demo <ExternalLink size={12} />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-8 h-8 border border-border hover:border-primary flex items-center justify-center transition-colors group/gh"
                      >
                        <Github size={14} className="text-muted-foreground group-hover/gh:text-primary transition-colors" />
                      </a>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div {...inView(0.2)} className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-10 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Interested in more detailed case studies?
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="folio-button">
              <Github size={16} /> GitHub Profile <ArrowRight size={14} />
            </a>
            <a href="#contact" className="folio-button-outline">
              Discuss Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
