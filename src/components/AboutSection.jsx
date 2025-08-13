import { Code,User, Briefcase } from "lucide-react"


export const About = () => {
    return(
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About<span className="text-primary"> Me </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold"> Passionate Web Developer, Project andCommunity manager</h3>

                        <p className="text-muted-foreground">
                            With over 3 years of experience in web development and Bot development, 
                            I specialize in creating responsive and high performance website, web application and effective Telegram Bots for Trading and alot more.
                            I also have experience and Project and Community Management, specialize in the Community growth,
                            project marketing and alot more.
                        </p>

                        <p className="text-muted-foreground">
                            i'm Passionate about creating solving complex problems, i consistently learn every single day
                            sharping my techinical skill both i my programming and the manager field. I enjoy working with teams 
                            and learning new things.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center ">
                            <a href="#contact" className="folio-button">  
                                Get in touch
                            </a>

                            <a href="#contact" className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">  
                                Download CV
                            </a>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                        <h4 className="font-semibold text-lg">Web Development</h4>
                                        <p className=" text-muted-foreground">
                                            Creating responsive websites and web application with
                                            morden frameworks.
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                        <h4 className="font-semibold text-lg">Bot Development</h4>
                                        <p className=" text-muted-foreground">
                                            I Build simple and complex bots for trading, Contact, payment and alot more,
                                            on telegram, X and discord.
                                        </p>
                                </div>
                            </div>
                        </div>
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                        <h4 className="font-semibold text-lg">Project and Community Manager</h4>
                                        <p className=" text-muted-foreground">
                                            Leading projects, communities for conception to completion with aglie methodologies and stratagies for marketing community growth and so much more.
                                        </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    
    )
}