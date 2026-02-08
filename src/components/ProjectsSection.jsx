import { ExternalLink, Github, ArrowRight, Network, Bot, Code, Cloud, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
    
    {
        id: 2,
        title: "Cloud Infrastructure Automation Platform",
        category: "DevOps",
        description: "Comprehensive automation tool for provisioning and managing cloud infrastructure across AWS and Azure with Infrastructure-as-Code approach.",
        image: "/projects/project 2.jpg",
        tags: ["AWS", "Python", "Terraform", "Ansible", "Docker"],
        icon: Cloud,
        highlights: ["50+ VPCs Managed", "4hrs → 15min Deployment", "200+ EC2 Instances"],
        demoURL: "https://portfolio-website-xby4.vercel.app/",
        githubUrl: "#",
    },
    {
        id: 5,
        title: "VPN & Multi-Site Security Gateway",
        category: "Network Security",
        description: "Enterprise-grade VPN gateway system for secure remote access with 150+ concurrent connections across 5 countries.",
        image: "/projects/project 4.jpg",
        tags: ["OpenVPN", "WireGuard", "Python", "React", "IPSec"],
        icon: Shield,
        highlights: ["99.8% Uptime", "Zero Breaches", "250+ Connections"],
        demoURL: "https://chip-chop-beta.vercel.app",
        githubUrl: "#",
    },
    {
        id: 3,
        title: "Distributed Microservices Platform",
        category: "Full-Stack",
        description: "Microservices-based architecture with load-balanced network infrastructure handling 1000+ requests per day.",
        image: "/projects/project 3.jpg",
        tags: ["Node.js", "Kubernetes", "Redis", "PostgreSQL", "Docker"],
        icon: Code,
        highlights: ["10K+ Req/min", "99.95% Uptime", "Multi-Cloud"],
        demoURL: "https://white-bay.vercel.app",
        githubUrl: "#",
    },
    {
        id: 4,
        title: "Telegram Food Distribution & Payment Bot",
        category: "Bot Development",
        description: "Scalable Telegram bot for automated food ordering system with integrated payment confirmation and real-time database monitoring.",
        image: "/projects/project 6.jpg",
        tags: ["Python", "Telegram API", "PostgreSQL", "Redis", "Stripe"],
        icon: Bot,
        highlights: ["1000+ Users", "Real-time Updates", "Payment Integration"],
        demoURL: "https://t.me/Chowdome_bot",
        githubUrl: "#",
    },
    {
        id: 6,
        title: "Network Diagnostic & Troubleshooting Suite",
        category: "Network Tools",
        description: "Comprehensive network diagnostic toolkit including ping, traceroute, port scanning, DNS analysis, and packet inspection.",
        image: "/projects/project 5.jpg",
        tags: ["Python", "Scapy", "Socket", "Flask API", "React"],
        icon: Zap,
        highlights: ["Multi-Tool Suite", "PDF/CSV Reports", "API Integration"],
        demoURL: "https://blue-ark-frontend.vercel.app",
        githubUrl: "#",
    },
    {
        id: 1,
        title: "Enterprise Network Monitoring Dashboard",
        category: "Network Engineering",
        description: "Real-time network monitoring dashboard tracking bandwidth usage, latency, and server uptime across multi-region infrastructure for 50+ devices.",
        image: "/projects/project 1.jpg",
        tags: ["Node.js", "React.js", "WebSocket", "Prometheus", "Grafana"],
        icon: Network,
        highlights: ["99.9% Uptime", "60% Faster Troubleshooting", "24/7 Monitoring"],
        demoURL: "https://portfolio-website-xby4.vercel.app/",
        githubUrl: "#",
    }
];

const categories = ["All", "Network Engineering", "Full-Stack", "Bot Development", "DevOps", "Network Security"];

export const ProjectSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All" 
        ? projects 
        : projects.filter(project => project.category === activeCategory);

    return(
        <section id="projects" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
            
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"> 
                        Featured <span className="text-glow text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        A curated collection of projects showcasing expertise across network engineering, 
                        full-stack development, and intelligent automation systems.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2 rounded-full transition-all duration-300 font-semibold ${
                                activeCategory === category
                                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                    : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border hover:border-primary/50"
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
                        >
                            {/* Image Section */}
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold">
                                    {project.category}
                                </div>
                                {/* Icon */}
                                <div className="absolute bottom-4 left-4 z-20 p-3 rounded-xl bg-primary/20 backdrop-blur-md border border-primary/30">
                                    <project.icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                {/* Title */}
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Highlights */}
                                <div className="flex flex-wrap gap-2">
                                    {project.highlights.map((highlight, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                                            {highlight}
                                        </span>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                                    {project.tags.slice(0, 4).map((tag, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 4 && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                                            +{project.tags.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <motion.a 
                                        href={project.demoURL}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-semibold transition-all duration-300 group/btn"
                                    >
                                        <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                        <span>Live Demo</span>
                                    </motion.a>
                                    <motion.a 
                                        href={project.githubUrl}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <Github size={20} className="text-foreground hover:text-primary transition-colors" />
                                    </motion.a>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-accent/10 transition-all duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-6">
                        Interested in seeing more projects and detailed case studies?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            className="folio-button inline-flex items-center gap-2 mx-auto sm:mx-0"
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github size={20} />
                            View GitHub Profile
                            <ArrowRight size={16} />
                        </a>
                        <a 
                            href="#contact"
                            className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary/10 font-semibold transition-all duration-300 inline-flex items-center gap-2 mx-auto sm:mx-0"
                        >
                            Discuss Your Project
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};