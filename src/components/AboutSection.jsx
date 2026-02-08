import { Code, Network, Bot, Briefcase, Award, Users, TrendingUp, MapPin, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

const experiences = [
    {
        title: "Network Engineer",
        company: "TalaTech Solutions",
        location: "Remote (Germany)",
        period: "January 2024 – Present",
        icon: Network,
        highlights: [
            "90.7% uptime achievement",
            "35% latency reduction",
            "24/7 on-call support"
        ]
    },
    {
        title: "Junior Systems & Network Administrator",
        company: "CloudNine Technologies",
        location: "Remote (UK)",
        period: "March 2023 – December 2023",
        icon: Network,
        highlights: [
            "30+ enterprise clients",
            "99.9% service availability",
            "Zero downtime migrations"
        ]
    },
    {
        title: "Backend Developer",
        company: "FRDC Security Department",
        location: "Abuja, Nigeria",
        period: "April 2022 – August 2022",
        icon: Code,
        highlights: [
            "100+ concurrent users",
            "40% downtime reduction",
            "Telegram & Discord bots"
        ]
    }
]

const expertise = [
    {
        icon: Code,
        title: "Full-Stack Development",
        description: "Building responsive, high-performance web applications with React, Next.js, Node.js, and Django. Expert in creating scalable architectures that handle millions of requests.",
        color: "from-red-500 to-orange-500"
    },
    {
        icon: Network,
        title: "Network Engineering",
        description: "Designing and maintaining robust network infrastructure including VPNs, firewalls, and cloud connectivity. Specialized in AWS, Azure, and zero-trust security architectures.",
        color: "from-orange-500 to-red-600"
    },
    {
        icon: Bot,
        title: "Bot Development & Automation",
        description: "Creating intelligent bots for Discord, Telegram, and trading platforms. Expert in automation, payment systems, and real-time data processing with Python and Node.js.",
        color: "from-red-600 to-rose-500"
    },
    {
        icon: Briefcase,
        title: "Technical Project Management",
        description: "Leading cross-functional teams with Agile methodologies. Expert in sprint planning, stakeholder management, and delivering complex projects on time and within budget.",
        color: "from-rose-500 to-red-500"
    }
]

export const About = () => {
    return(
        <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        About <span className="text-glow text-primary">Me</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Transforming complex technical challenges into elegant, scalable solutions
                    </p>
                </motion.div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20">
                    {/* Left: Professional Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="inline-block">
                            <h3 className="text-3xl md:text-4xl font-bold mb-2">
                                Building the Future, <br/>
                                <span className="text-primary">One Line at a Time</span>
                            </h3>
                            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed">
                            I'm a <span className="text-foreground font-semibold">results-driven Full-Stack Developer</span> with <span className="text-primary font-semibold">6+ years of experience</span> building responsive, user-centric applications that scale.
                        </p>

                        <p className="text-muted-foreground leading-relaxed">
                            My journey spans from <span className="text-foreground font-semibold">network engineering</span> at European tech companies to <span className="text-foreground font-semibold">full-stack development</span> for government security applications. I've designed systems that maintain <span className="text-primary font-semibold">90.7% uptime</span>, reduced network latency by <span className="text-primary font-semibold">35%</span>, and built bots serving <span className="text-primary font-semibold">thousands of users daily</span>.
                        </p>

                        <p className="text-muted-foreground leading-relaxed">
                            Beyond code, I excel in <span className="text-foreground font-semibold">technical project management</span>, leading cross-functional teams using Agile methodologies. I'm passionate about continuous learning, staying at the forefront of emerging technologies, and mentoring the next generation of developers.
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="text-sm">Lagos, Nigeria</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-sm">successdavidpraise99@gmail.com</span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="#contact" className="folio-button text-center">  
                                Get In Touch
                            </a>
                            <a 
                                href="mailto:successdavidpraise99@gmail.com" 
                                className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 font-semibold text-center"
                            >  
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Experience Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold mb-6">Recent Experience</h3>
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 pb-8 border-l-2 border-primary/30 last:border-l-0 last:pb-0"
                            >
                                <div className="absolute -left-[17px] top-0 p-2 rounded-full bg-primary/20 border-4 border-background">
                                    <exp.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group">
                                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{exp.title}</h4>
                                    <p className="text-muted-foreground font-semibold text-sm">{exp.company}</p>
                                    <p className="text-muted-foreground text-xs mb-3">{exp.location} | {exp.period}</p>
                                    <ul className="space-y-1">
                                        {exp.highlights.map((highlight, i) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Expertise Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {expertise.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                            
                            <div className="relative z-10">
                                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-red-600/5 to-primary/10 border border-primary/20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: Award, label: "Years Experience", value: "6+" },
                            { icon: Users, label: "Clients Served", value: "25+" },
                            { icon: Code, label: "Projects Completed", value: "30+" },
                            { icon: TrendingUp, label: "Success Rate", value: "99%" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="space-y-2"
                            >
                                <stat.icon className="h-8 w-8 text-primary mx-auto" />
                                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}