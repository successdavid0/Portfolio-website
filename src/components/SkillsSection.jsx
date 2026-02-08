import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code, Server, Wrench, Network, Bot, Cloud, Shield, Database } from "lucide-react";

const skills = [
    // Frontend
    { name: "HTML5/CSS3", level: 95, category: "frontend", years: 4, icon: "🎨" },
    { name: "JavaScript (ES6+)", level: 90, category: "frontend", years: 4, icon: "⚡" },
    { name: "React.js", level: 90, category: "frontend", years: 4, icon: "⚛️" },
    { name: "Next.js", level: 85, category: "frontend", years: 3, icon: "▲" },
    { name: "TypeScript", level: 80, category: "frontend", years: 2, icon: "📘" },
    { name: "Tailwind CSS", level: 95, category: "frontend", years: 3, icon: "🎯" },
    
    // Backend
    { name: "Python", level: 95, category: "backend", years: 5, icon: "🐍" },
    { name: "Node.js", level: 90, category: "backend", years: 4, icon: "💚" },
    { name: "Django", level: 95, category: "backend", years: 4, icon: "🎸" },
    { name: "Express.js", level: 85, category: "backend", years: 3, icon: "🚂" },
    { name: "FastAPI", level: 80, category: "backend", years: 2, icon: "⚡" },
    { name: "GraphQL", level: 70, category: "backend", years: 2, icon: "◆" },
    
    // Databases
    { name: "PostgreSQL", level: 85, category: "database", years: 4, icon: "🐘" },
    { name: "MongoDB", level: 80, category: "database", years: 3, icon: "🍃" },
    { name: "MySQL", level: 80, category: "database", years: 3, icon: "🐬" },
    
    // Network & Cloud
    { name: "AWS (VPC, EC2, S3)", level: 85, category: "networking", years: 3, icon: "☁️" },
    { name: "Docker", level: 85, category: "networking", years: 3, icon: "🐳" },
    { name: "VPN/Firewalls", level: 65, category: "networking", years: 4, icon: "🔒" },
    { name: "Network Security", level: 80, category: "networking", years: 4, icon: "🛡️" },
    
    // Bot Development
    { name: "Telegram Bots", level: 95, category: "bots", years: 4, icon: "✈️" },
    { name: "Discord Bots", level: 90, category: "bots", years: 3, icon: "🎮" },
    { name: "Trading Bots", level: 85, category: "bots", years: 2, icon: "📈" },
    
    // Tools & DevOps
    { name: "Git/GitHub", level: 95, category: "tools", years: 5, icon: "🔀" },
    { name: "CI/CD Pipelines", level: 65, category: "tools", years: 3, icon: "🔄" },
    { name: "VS Code", level: 95, category: "tools", years: 5, icon: "💻" },
];

const categories = [
    { id: "all", label: "All Skills", icon: Code },
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "networking", label: "Network/Cloud", icon: Network },
    { id: "bots", label: "Bots", icon: Bot },
    { id: "tools", label: "DevOps/Tools", icon: Wrench }
];

export const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "all" || skill.category === activeCategory
    );

    return (
        <section 
            id="skills" 
            className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
            
            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Technical <span className="text-glow text-primary">Expertise</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Mastering the full stack from frontend to infrastructure, with 6+ years of hands-on experience
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
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-300 capitalize font-semibold flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base",
                                activeCategory === category.id
                                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                    : "bg-card/50 backdrop-blur-sm text-foreground hover:bg-card border border-border hover:border-primary/50"
                            )}
                        >
                            <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">{category.label}</span>
                            <span className="xs:hidden">{category.label.split(' ')[0]}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                        >
                            {/* Glow Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative z-10">
                                {/* Icon & Name */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-3xl">{skill.icon}</span>
                                    <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                                        {skill.years}+ years
                                    </span>
                                </div>
                                
                                <h3 className="font-bold text-lg mb-4 group-hover:text-primary transition-colors">
                                    {skill.name}
                                </h3>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Proficiency</span>
                                        <span className="text-primary font-semibold">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: index * 0.05 }}
                                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Skills Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-red-600/5 to-primary/10 border border-primary/20"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        Beyond <span className="text-primary">Technical Skills</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { 
                                icon: Shield, 
                                title: "Project Management", 
                                desc: "Agile, Scrum, stakeholder management, technical roadmap planning" 
                            },
                            { 
                                icon: Cloud, 
                                title: "Marketing & Growth", 
                                desc: "Community building, content strategy, Web3 marketing, social media" 
                            },
                            { 
                                icon: Network, 
                                title: "Leadership", 
                                desc: "Team coordination, code reviews, mentorship, cross-functional collaboration" 
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.03 }}
                                className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm"
                            >
                                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Add shimmer animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);