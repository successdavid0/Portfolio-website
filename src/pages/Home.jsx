import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/Starbackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/Herosection"; 
import { About } from "../components/AboutSection";
import { Skills } from "../components/SkillsSection";
import { ProjectSection } from "../components/ProjectsSection";
import {ContactSection} from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
    return(
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Theme toggle (light and Dark mode) */}
                <ThemeToggle/>
            {/* Background Effect */}
                <StarBackground/>
            {/* Nav bar  */}
                <Navbar/>
            {/* Main ontent  */}
            <main>
                <HeroSection />
                <About />
                <Skills/>
                <ProjectSection/>
                <ContactSection/>
            </main>

            {/* Footer  */}
            <Footer/>
        </div>
    );
};