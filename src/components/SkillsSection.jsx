import { useState } from "react";
import {cn} from "@/lib/utils";

const skills =[
    //Frontend
    {name: "HTML/CSS", level: 95, category: "frontend"},
    {name: "JavaScript", level: 80, category: "frontend"},
    {name: "React", level: 80, category: "frontend"},
    {name: "Typescript", level: 75, category: "frontend"},
    {name: "TailWind CSS", level: 80, category: "frontend"},
    {name: "Next.js", level: 75, category: "frontend"},
    {name: "Python", level: 90, category: "backend"},

    //backEnd
    {name: "Node.JS", level: 80, category: "backend"},
    {name: "Django", level: 95, category: "backend"},
    {name: "MongoDB", level: 75, category: "backend"},
    {name: "PostgreSql", level: 50, category: "backend"},
    {name: "GraphQL", level: 20, category: "backend"},

    //Tools
    {name: "Git/GitHub", level: 75, category: "tools"},
    {name: "Docker", level: 60, category: "tools"},
    {name: "VS Code", level: 80, category: "tools"},
];

const categories = ["all", "frontend", "backend", "tools"]

export const Skills = () => {

    const [activeCategory, setActiveCategory] = useState("all")

    const filteredSkills = skills.filter(
        (skills) => activeCategory === "all" || skills.category === activeCategory

    );

    return (
        <section 
        id="skills" 
        className="py-24 px-4 relative bg-secondary/30"
        >
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    My <span className="text-primary"> Skills</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-5 mb-12">
                    {categories.map((category,key) => (
                        <button 
                        key={key} 
                        onClick={() => setActiveCategory(category)}
                        className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                            activeCategory === category 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary/70 text-forefround hover:bd-secondary"
                        )}>
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {filteredSkills.map((skills,key) => (
                            <div 
                            key={key} 
                            className="bg-card p-6 rounded-lg shadow-xs card-hover"
                            > 
                                <div className="text-left mb-4">
                                    <h3 className="font-semibold text-lg"> {skills.name} </h3>
                                </div>
                                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden" >
                                <div className="bg-primary h-2 rounded-full origin-left animate-[grow_3.5s_ease-out]" 
                                    style={{width:skills.level + "%"}}
                                />
                                </div>
                                <div className="text-right mt-1">
                                    <spam className="text-sm text-muted-foreground">{skills.level}%</spam>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}