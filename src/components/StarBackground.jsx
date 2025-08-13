import { useState, useEffect } from "react";

// id, size, x,y, opacity, animation durarion

export const StarBackground = () => {
    const [stars, setStars] = useState([]);
    const [medeors, setMedeors] = useState([]);


    //making the window. simpler 
    let w = window

    //the use effect to the background
    useEffect(() => {
        generateStars();
        generateMedeors();

        const handleResize = () => {
            generateStars();
        };

        w.addEventListener('resize', handleResize);

        return () => w.removeEventListener('resize', handleResize);
    }, []);

    //the code stars resposible 
    const generateStars = () => {
        const numberOfstars = Math.floor(
            ( w.innerWidth * w.innerHeight) / 10000
        );

        const newStars = [];

        for (let i = 0; i < numberOfstars; i++) {
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.5,
                animationDuration: Math.random() * 4 + 2,
            });
        }
        setStars(newStars);
    
    };

     //the code stars resposible 
    const generateMedeors = () => {


        const numberOfmedeors = 20;
        const newMedeors = [];

        for (let i = 0; i < numberOfmedeors; i++) {
            newMedeors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 90,
                y: Math.random() * 50,
                delay: Math.random() * 15,
                animationDuration: Math.random() * 5 + 6,
            });
        }
        setMedeors(newMedeors);
    };

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {stars.map((star,) =>
            (
                <div key={star.id} className="star animate-pulse-subtle" 
                style={{
                    width: star.size + "px",
                    height: star.size + "px",
                    left: star.x + "%",
                    top: star.y + "%",
                    opacity: star.opacity,
                    animationDuration: star.animationDuration + "s",
                }}/>
            ))}

            {medeors.map((medeor) =>
            (
                <div key={medeor.id} className="meteor animate-meteor" 
                style={{
                    width: medeor.size * 35  + "px",
                    height: medeor.size + "px",
                    left: medeor.x + "%",
                    top: medeor.y + "%",
                    animationDelay: medeor.delay,
                    animationDuration: medeor.animationDuration + "s",
                }}/>
            ))}
        </div>
    );
};