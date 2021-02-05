import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import I1 from "./assets/1.svg";
import I2 from "./assets/2.svg";
import I3 from "./assets/3.svg";
import I4 from "./assets/4.svg";
import I5 from "./assets/5.svg";
import I6 from "./assets/6.svg";
import I7 from "./assets/7.svg";
import { useInView } from "react-intersection-observer";
const FlySuperStars = () => {
    const [ref, inView] = useInView();
    const controls = useAnimation();
    useEffect(() => {
        if (inView) {
            controls.start("start");
        }
    }, [inView]);
    console.log("hello");
    return (
        <>
            <motion.img
                initial={{
                    x: "0",
                    y: "15vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "5vw",
                        y: "15vh",
                    },
                }}
                src={I1}
                alt="I1"
                className="superHero"
            />
            <motion.img
                ref={ref}
                initial={{
                    x: "45vw",
                    y: "90vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "45vw",
                        y: "80vh",
                    },
                }}
                src={I2}
                alt="I2"
                className="superHero"
            />
            <motion.img
                initial={{
                    x: "90vw",
                    y: "60vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "80vw",
                        y: "40vh",
                    },
                }}
                src={I3}
                alt="I3"
                className="superHero"
            />
            <motion.img
                initial={{
                    x: "5vw",
                    y: "50vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "15vw",
                        y: "40vh",
                    },
                }}
                src={I4}
                alt="I4"
                className="superHero"
            />
            <motion.img
                initial={{
                    x: "95vw",
                    y: "15vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "90vw",
                        y: "15vh",
                    },
                }}
                src={I5}
                alt="I5"
                className="superHero"
            />
            <motion.img
                initial={{
                    x: "20vw",
                    y: "85vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "30vw",
                        y: "60vh",
                    },
                }}
                src={I6}
                alt="I6"
                className="superHero"
            />
            <motion.img
                initial={{
                    x: "70vw",
                    y: "85vh",
                }}
                transition={{ duration: 2 }}
                animate={controls}
                variants={{
                    start: {
                        x: "60vw",
                        y: "60vh",
                    },
                }}
                src={I7}
                alt="I7"
                className="superHero"
            />
        </>
    );
};

export default FlySuperStars;
