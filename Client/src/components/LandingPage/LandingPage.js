import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import firstSectionImg from "./assets/firstsection.svg";
import logo from "./assets/LogoW.svg";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import FlySuperStars from "./FlySuperStars";
import director from "./assets/director.png";
import { useHistory } from "react-router-dom";
import "./LandingPage.scss";
import "./NavBar.scss";

const LandingPage = () => {
    const history = useHistory();
    const ref = useRef(null);
    const { scrollYProgress } = useViewportScroll(ref);
    const opacity = useTransform(scrollYProgress, [-0, -0.5, -1], [0, 0, 1]);
    const [refMagicDiv, inView] = useInView();
    useEffect(() => {
        console.log(inView);
    }, [inView]);
    const goToLogin = () => {
        history.push("/login");
    };
    return (
        <div ref={ref} className="landingPageContainer">
            <motion.div style={{ opacity }} className="NavBarContainer">
                <h1 className="NavBar-header">UCKITO</h1>
                <div className="NavBar-options">
                    <h5 onClick={goToLogin} className="NavBar-option">
                        Sign In
                    </h5>
                    <h5 onClick={goToLogin} className="NavBar-option">
                        Sign Up
                    </h5>
                    <h5 className="NavBar-option">Help</h5>
                </div>
            </motion.div>
            <img src={logo} alt="logo" className="landingPageContainer__logo" />
            <img
                src={firstSectionImg}
                alt="firstSectionImg"
                className="first-section__image"
            />
            <div className="first-section">
                <div className="first-section__signOptions">
                    <h5
                        onClick={goToLogin}
                        className="first-section__signOptions-option"
                    >
                        Sign In
                    </h5>
                    <h5
                        onClick={goToLogin}
                        className="first-section__signOptions-option"
                    >
                        Sign Up
                    </h5>
                    <h5 className="first-section__signOptions-option">Help</h5>
                </div>
                <div className="first-section__header-and-sub">
                    <div className="first-section__header">BUCKITO</div>
                    <div className="first-section__sub">
                        Let’s Recreate your Bucket-list of Movies!
                    </div>
                    <div
                        onClick={() => history.push("/main")}
                        className="first-section__button"
                    >
                        Let’s Binge
                    </div>
                </div>
            </div>
            <div className="second-section">
                <div className="second-section__director">
                    <img
                        src={director}
                        alt=""
                        className="second-section__director-img"
                    />
                </div>

                <div className="second-section__headingSubHeading">
                    <div className="second-section__heading">
                        Find Incredible movies to watch
                    </div>
                    <motion.div
                        inherit={{ width: "50%" }}
                        animate={inView ? "inView" : ""}
                        variants={{
                            inView: {
                                width: "1%",
                                transition: {
                                    type: "easeInOut",
                                    duration: 1,
                                    delay: 0.25,
                                },
                            },
                        }}
                        ref={refMagicDiv}
                        className="second-section__magic-divider"
                    ></motion.div>
                </div>
            </div>
            <div className="third-section">
                <div className="third-section__additionalInfo">
                    <h5 className="third-section__additionalInfo-info">
                        Realtime Recommendations
                    </h5>
                    <span className="third-section__additionalInfo-info">
                        :
                    </span>
                    <h5 className="third-section__additionalInfo-info">
                        10000+ Movies
                    </h5>
                    <span className="third-section__additionalInfo-info">
                        :
                    </span>
                    <h5 className="third-section__additionalInfo-info">
                        Your personalized bucket-list
                    </h5>
                </div>
                <div className="third-section__footer-container"></div>
            </div>
        </div>
    );
};

export default LandingPage;
