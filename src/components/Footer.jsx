import { ArrowUp, Code2, Mail, Github, Twitter, Linkedin, MessageSquare, Heart } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/kolBigsnow", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/success-david", label: "LinkedIn" },
    { icon: MessageSquare, href: "https://t.me/chil_Snowman", label: "Telegram" },
];

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative overflow-hidden border-t border-border/50">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
            
            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                                <Code2 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">
                                <span className="text-glow text-primary">Success</span>
                                <span className="text-foreground"> Dev</span>
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Building scalable web applications, secure network infrastructures, and intelligent automation solutions.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:successdavidpraise99@gmail.com" className="hover:text-primary transition-colors">
                                successdavidpraise99@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-lg font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {["Full-Stack Development", "Network Engineering", "Bot Development", "Technical Consulting", "Project Management"].map((service) => (
                                <li key={service}>
                                    <span className="text-sm text-muted-foreground inline-flex items-center gap-2 group">
                                        <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-lg font-bold mb-4">Connect</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Let's work together on your next project
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 rounded-lg bg-card/50 border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                                    title={social.label}
                                >
                                    <social.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 inline-block px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300"
                        >
                            Get In Touch
                        </motion.a>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-sm text-muted-foreground text-center md:text-left"
                        >
                            &copy; {new Date().getFullYear()} Success David Praise. Crafted with{" "}
                            <Heart className="inline h-4 w-4 text-primary animate-pulse" /> in Lagos, Nigeria
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6"
                        >
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Terms of Service
                            </a>
                        </motion.div>

                        {/* Scroll to Top */}
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </footer>
    );
};