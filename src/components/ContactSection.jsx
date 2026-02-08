import { Mail, MapPin, Phone, Send, Twitter, Linkedin, Github, MessageSquare, Clock, CheckCircle2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, sending, sent

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('sending');
        
        // Simulate form submission
        setTimeout(() => {
            setFormStatus('sent');
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "Email",
            value: "successdavidpraise99@gmail.com",
            href: "mailto:successdavidpraise99@gmail.com",
            color: "from-red-500 to-orange-500"
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+234 906 429 2153",
            href: "tel:+2349064292153",
            color: "from-orange-500 to-red-600"
        },
        {
            icon: MapPin,
            title: "Location",
            value: "Lagos, Nigeria",
            href: null,
            color: "from-red-600 to-rose-500"
        },
        {
            icon: Globe,
            title: "Portfolio",
            value: "portfolio-website.vercel.app",
            href: "https://portfolio-website-xby4.vercel.app/",
            color: "from-rose-500 to-red-500"
        }
    ];

    const socialLinks = [
        { icon: Twitter, href: "https://x.com/kolBigsnow/status/1944618793415712800", label: "Twitter" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/success-david", label: "LinkedIn" },
        { icon: Github, href: "https://github.com", label: "GitHub" },
        { icon: MessageSquare, href: "https://t.me/chil_Snowman", label: "Telegram" }
    ];

    return(
        <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
            
            {/* Animated Background Elements */}
            <motion.div 
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        Let's Create Something <span className="text-glow text-primary">Extraordinary</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Have a project in mind? Let's discuss how I can help bring your vision to life.
                        I typically respond within 24 hours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Availability Status */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-red-600/5 to-primary/10 border border-primary/20"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="relative">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                                </div>
                                <h3 className="font-bold text-lg">Currently Available</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Open to new projects and collaborations. Next availability: Immediate
                            </p>
                        </motion.div>

                        {/* Contact Methods */}
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={index}
                                    href={method.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, x: 5 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group"
                                >
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color} bg-opacity-10`}>
                                        <method.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">{method.title}</h4>
                                        <p className="text-foreground group-hover:text-primary transition-colors font-medium">
                                            {method.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-4">
                            <h4 className="font-bold text-lg mb-4">Connect With Me</h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                                        title={social.label}
                                    >
                                        <social.icon className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Response Time */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-card/30 backdrop-blur-sm"
                        >
                            <Clock className="h-5 w-5 text-primary" />
                            <p className="text-sm text-muted-foreground">
                                <span className="text-foreground font-semibold">Average response time:</span> Within 24 hours
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border"
                    >
                        <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Your Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="Project Inquiry"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "folio-button w-full flex items-center justify-center gap-2 relative overflow-hidden",
                                    formStatus === 'sending' && "opacity-80 cursor-not-allowed"
                                )}
                            >
                                {formStatus === 'idle' && (
                                    <>
                                        Send Message
                                        <Send size={16} />
                                    </>
                                )}
                                {formStatus === 'sending' && (
                                    <>
                                        Sending...
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Send size={16} />
                                        </motion.div>
                                    </>
                                )}
                                {formStatus === 'sent' && (
                                    <>
                                        Message Sent!
                                        <CheckCircle2 size={16} />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <p className="text-xs text-muted-foreground mt-4 text-center">
                            By sending a message, you agree to our privacy policy
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};