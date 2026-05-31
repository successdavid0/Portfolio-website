const KEY = 'sdp_portfolio_v1'

export const defaultHeroStats = [
  { value: "27+", label: "Projects" },
  { value: "90.7%", label: "Uptime" },
  { value: "7+", label: "Bots Built" },
  { value: "6+", label: "Yrs Exp." },
]

export const defaultAboutStats = [
  { label: "Years Experience", value: "6+" },
  { label: "Clients Served", value: "25+" },
  { label: "Projects Completed", value: "30+" },
  { label: "Success Rate", value: "99%" },
]

export const defaultProjects = [
  {
    id: 1,
    title: "Enterprise Network Monitoring Dashboard",
    category: "Network Engineering",
    description: "Real-time network monitoring dashboard tracking bandwidth usage, latency, and server uptime across multi-region infrastructure for 50+ devices.",
    image: "/projects/project 1.jpg",
    tags: ["Node.js", "React.js", "WebSocket", "Prometheus", "Grafana"],
    icon: "Network",
    highlights: ["99.9% Uptime", "60% Faster Troubleshooting", "24/7 Monitoring"],
    demoURL: "https://portfolio-website-xby4.vercel.app/",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Cloud Infrastructure Automation Platform",
    category: "DevOps",
    description: "Comprehensive automation tool for provisioning and managing cloud infrastructure across AWS and Azure with Infrastructure-as-Code approach.",
    image: "/projects/project 2.jpg",
    tags: ["AWS", "Python", "Terraform", "Ansible", "Docker"],
    icon: "Cloud",
    highlights: ["50+ VPCs Managed", "4hrs → 15min Deployment", "200+ EC2 Instances"],
    demoURL: "https://portfolio-website-xby4.vercel.app/",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Distributed Microservices Platform",
    category: "Full-Stack",
    description: "Microservices-based architecture with load-balanced network infrastructure handling 1000+ requests per day.",
    image: "/projects/project 3.jpg",
    tags: ["Node.js", "Kubernetes", "Redis", "PostgreSQL", "Docker"],
    icon: "Code",
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
    icon: "Bot",
    highlights: ["1000+ Users", "Real-time Updates", "Payment Integration"],
    demoURL: "https://t.me/Chowdome_bot",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "VPN & Multi-Site Security Gateway",
    category: "Network Security",
    description: "Enterprise-grade VPN gateway system for secure remote access with 150+ concurrent connections across 5 countries.",
    image: "/projects/project 4.jpg",
    tags: ["OpenVPN", "WireGuard", "Python", "React", "IPSec"],
    icon: "Shield",
    highlights: ["99.8% Uptime", "Zero Breaches", "250+ Connections"],
    demoURL: "https://chip-chop-beta.vercel.app",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Network Diagnostic & Troubleshooting Suite",
    category: "Network Tools",
    description: "Comprehensive network diagnostic toolkit including ping, traceroute, port scanning, DNS analysis, and packet inspection.",
    image: "/projects/project 5.jpg",
    tags: ["Python", "Scapy", "Socket", "Flask API", "React"],
    icon: "Zap",
    highlights: ["Multi-Tool Suite", "PDF/CSV Reports", "API Integration"],
    demoURL: "https://blue-ark-frontend.vercel.app",
    githubUrl: "#",
  },
]

export const defaultSkills = [
  { name: "HTML5/CSS3", level: 95, category: "frontend", years: 4, icon: "🎨" },
  { name: "JavaScript (ES6+)", level: 90, category: "frontend", years: 4, icon: "⚡" },
  { name: "React.js", level: 90, category: "frontend", years: 4, icon: "⚛️" },
  { name: "Next.js", level: 85, category: "frontend", years: 3, icon: "▲" },
  { name: "TypeScript", level: 80, category: "frontend", years: 2, icon: "📘" },
  { name: "Tailwind CSS", level: 95, category: "frontend", years: 3, icon: "🎯" },
  { name: "Python", level: 95, category: "backend", years: 5, icon: "🐍" },
  { name: "Node.js", level: 90, category: "backend", years: 4, icon: "💚" },
  { name: "Django", level: 95, category: "backend", years: 4, icon: "🎸" },
  { name: "Express.js", level: 85, category: "backend", years: 3, icon: "🚂" },
  { name: "FastAPI", level: 80, category: "backend", years: 2, icon: "⚡" },
  { name: "GraphQL", level: 70, category: "backend", years: 2, icon: "◆" },
  { name: "PostgreSQL", level: 85, category: "database", years: 4, icon: "🐘" },
  { name: "MongoDB", level: 80, category: "database", years: 3, icon: "🍃" },
  { name: "MySQL", level: 80, category: "database", years: 3, icon: "🐬" },
  { name: "AWS (VPC, EC2, S3)", level: 85, category: "networking", years: 3, icon: "☁️" },
  { name: "Docker", level: 85, category: "networking", years: 3, icon: "🐳" },
  { name: "VPN/Firewalls", level: 65, category: "networking", years: 4, icon: "🔒" },
  { name: "Network Security", level: 80, category: "networking", years: 4, icon: "🛡️" },
  { name: "Telegram Bots", level: 95, category: "bots", years: 4, icon: "✈️" },
  { name: "Discord Bots", level: 90, category: "bots", years: 3, icon: "🎮" },
  { name: "Trading Bots", level: 85, category: "bots", years: 2, icon: "📈" },
  { name: "Git/GitHub", level: 95, category: "tools", years: 5, icon: "🔀" },
  { name: "CI/CD Pipelines", level: 65, category: "tools", years: 3, icon: "🔄" },
  { name: "VS Code", level: 95, category: "tools", years: 5, icon: "💻" },
]

const getDefaults = () => ({
  projects: defaultProjects,
  skills: defaultSkills,
  heroStats: defaultHeroStats,
  aboutStats: defaultAboutStats,
})

export const getPortfolioData = () => {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored) return { ...getDefaults(), ...JSON.parse(stored) }
  } catch {}
  return getDefaults()
}

export const savePortfolioData = (data) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {}
}

export const resetPortfolioData = () => {
  localStorage.removeItem(KEY)
}
