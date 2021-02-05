import React, { useEffect, useRef, useState } from "react";

import firstSectionImg from "./assets/firstsection.svg";
import logo from "./assets/LogoW.svg";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import FlySuperStars from "./FlySuperStars";

import "./LandingPage.scss";
import "./NavBar.scss";

const LandingPage = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useViewportScroll(ref);
    const opacity = useTransform(scrollYProgress, [-0, -0.5, -1], [0, 0, 1]);

    return (
        <div ref={ref} className="landingPageContainer">
            <motion.div style={{ opacity }} className="NavBarContainer">
                <h1 className="NavBar-header">UCKITO</h1>
                <div className="NavBar-options">
                    <h5 className="NavBar-option">Sign In</h5>
                    <h5 className="NavBar-option">Sign Up</h5>
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
                    <h5 className="first-section__signOptions-option">
                        Sign In
                    </h5>
                    <h5 className="first-section__signOptions-option">
                        Sign Up
                    </h5>
                    <h5 className="first-section__signOptions-option">Help</h5>
                </div>
                <div className="first-section__header-and-sub">
                    <div className="first-section__header">BUCKITO</div>
                    <div className="first-section__sub">
                        Let’s Recreate your Bucket-list of Movies!
                    </div>
                    <div className="first-section__button">Let’s Binge</div>
                </div>
            </div>
            <div className="second-section">
               
                <div className="second-section__headingSubHeading">
                    <div className="second-section__heading">
                        Find Incredible movies to watch
                    </div>
                    <div className="second-section__subheading">
                        with over 10,000 movies for you to choose from.
                    </div>
                </div>
            </div>
            <div className="third-section">
                <div className="footer-container"></div>
            </div>
        </div>
    );
};

export default LandingPage;
