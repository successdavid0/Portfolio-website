import { ArrowDown, Code2, Network, Bot } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const roles = [
    "Full-Stack Developer",
    "Network Engineer",
    "Bot Architect",
    "Web3 Specialist",
    "Technical Leader"
]

export const HeroSection = () =>{
    const [roleIndex, setRoleIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return(
        <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden pt-24 sm:pt-28 md:pt-32"
        >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
            
            {/* Glowing Orbs */}
            <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            <div className="container max-w-6xl mx-auto text-center z-10">
                <div className="space-y-6 md:space-y-8">
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-xs sm:text-sm md:text-base text-muted-foreground tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2"
                    >
                        Welcome to My Portfolio
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight px-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="block">Hi, I'm</span>
                        <span className="text-glow text-primary block mt-4">
                            Success David Praise
                        </span>
                    </motion.h1>

                    {/* Rotating Roles */}
                    <motion.div
                        className="h-16 md:h-20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.p
                            key={roleIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl sm:text-2xl md:text-4xl font-semibold bg-gradient-to-r from-primary via-red-600 to-primary bg-clip-text text-transparent"
                        >
                            {roles[roleIndex]}
                        </motion.p>
                    </motion.div>

                    {/* Value Proposition */}
                    <motion.p 
                        className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        Building scalable web applications, secure network infrastructures, and intelligent bots.
                        <br className="hidden md:block" />
                        <span className="text-foreground font-semibold">4+ years</span> of transforming complex challenges into elegant solutions.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6 px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <a href="#projects" className="folio-button group">
                            View My Work
                            <Code2 className="inline-block ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        </a>
                        <a 
                            href="#contact" 
                            className="px-6 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300 hover:scale-105"
                        >
                            Get In Touch
                        </a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-16 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        {[
                            { icon: Code2, label: "Projects Delivered", value: "50+" },
                            { icon: Network, label: "Uptime Achievement", value: "99.7%" },
                            { icon: Bot, label: "Bots Deployed", value: "15+" },
                            { icon: Code2, label: "Technologies", value: "20+" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group"
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
                <ArrowDown className="h-5 w-5 text-primary"/>
            </motion.div>
        </section>
    )
}