import { cn } from "@/lib/utils";
import { Menu, X, Code2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Detect active section
            const sections = navItems.map(item => item.href.slice(1));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed w-full z-50 transition-all duration-500",
                isScrolled
                    ? "py-2 md:py-3 bg-background/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(220,38,38,0.15)] border-b border-primary/20"
                    : "py-3 md:py-5 bg-background/40 backdrop-blur-md"
            )}
            style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
            }}
        >
            <div className="container flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#hero"
                    className="text-xl font-bold flex items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                        <Code2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="relative">
                        <span className="text-glow text-primary">Success</span>
                        <span className="text-foreground"> Dev</span>
                    </span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-4 py-2 rounded-lg transition-all duration-300 font-medium relative",
                                activeSection === item.href.slice(1)
                                    ? "text-primary"
                                    : "text-foreground/70 hover:text-primary"
                            )}
                        >
                            {item.name}
                            {activeSection === item.href.slice(1) && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                                    transition={{ type: "spring", duration: 0.5 }}
                                />
                            )}
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300"
                    >
                        Hire Me
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50 relative"
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Mobile Menu - App Style */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-background/95 md:hidden backdrop-blur-2xl z-40"
                            style={{
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)"
                            }}
                        >
                            {/* App-like Header */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/50 to-transparent" />
                            
                            {/* Menu Content */}
                            <div className="h-full flex flex-col items-center justify-center px-8 pb-20">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col space-y-4 w-full max-w-sm"
                                >
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.name}
                                            href={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + index * 0.08 }}
                                            className={cn(
                                                "p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 text-left group",
                                                activeSection === item.href.slice(1)
                                                    ? "bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                                                    : "bg-card/30 border border-border/50 hover:border-primary/50 hover:bg-card/50"
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className={cn(
                                                    "text-xl font-semibold transition-colors",
                                                    activeSection === item.href.slice(1)
                                                        ? "text-primary"
                                                        : "text-foreground group-hover:text-primary"
                                                )}>
                                                    {item.name}
                                                </span>
                                                <svg
                                                    className={cn(
                                                        "w-5 h-5 transition-all",
                                                        activeSection === item.href.slice(1)
                                                            ? "text-primary opacity-100"
                                                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                                    )}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </motion.a>
                                    ))}
                                    
                                    {/* CTA Button */}
                                    <motion.a
                                        href="#contact"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + navItems.length * 0.08 }}
                                        className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-xl text-center shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-95 transition-transform"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Hire Me
                                    </motion.a>
                                </motion.div>
                            </div>

                            {/* App-like Bottom Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-foreground/20 rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};
