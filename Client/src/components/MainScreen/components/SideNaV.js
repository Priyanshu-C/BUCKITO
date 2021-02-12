import React, { useRef, useState } from "react";
import "./SideNaV.scss";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
const SideNaV = ({
    handleSidebarSelection,
    showSidenav,
    setShowSidenav,
    handleMadeForYou,
    sidebarSelection,
}) => {
    const sidepanelContainer = useRef();
    const handleSidePanel = (e) => {
        if (e.target == sidepanelContainer.current) setShowSidenav((e) => !e);
    };
    console.log(sidebarSelection);
    return (
        <>
            <AiOutlineMenu
                className="sidepanel__open"
                onClick={() => setShowSidenav((e) => !e)}
            />
            {/* sidepanel start */}
            <AnimatePresence>
                {showSidenav && (
                    <motion.div
                        initial={{ x: "-100vw" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100vw" }}
                        transition={{ type: "ease" }}
                        ref={sidepanelContainer}
                        onClick={handleSidePanel}
                        className="sidepanel-container"
                    >
                        <div className="sidepanel">
                            <div className="sidepanel__header-and-button">
                                <div className="sidepanel__header-and-button__header"></div>
                                <div
                                    onClick={() => setShowSidenav((e) => !e)}
                                    className="sidepanel__close"
                                >
                                    <AiOutlineClose />
                                </div>
                            </div>
                            <div className="sidepanel__content">
                                <li
                                    onClick={handleSidebarSelection}
                                    className="sidepanel__content__link"
                                    style={
                                        sidebarSelection === "Now Playing"
                                            ? {
                                                  color: "cyan",
                                              }
                                            : null
                                    }
                                >
                                    Now Playing
                                </li>
                                <li
                                    onClick={handleSidebarSelection}
                                    className="sidepanel__content__link"
                                    style={
                                        sidebarSelection === "Popular"
                                            ? {
                                                  color: "cyan",
                                              }
                                            : null
                                    }
                                >
                                    Popular
                                </li>
                                <li
                                    onClick={handleSidebarSelection}
                                    className="sidepanel__content__link"
                                    style={
                                        sidebarSelection === "Upcoming"
                                            ? {
                                                  color: "cyan",
                                              }
                                            : null
                                    }
                                >
                                    Upcoming
                                </li>
                                <li
                                    onClick={handleMadeForYou}
                                    className="sidepanel__content__link"
                                    style={
                                        sidebarSelection === "Made for you"
                                            ? {
                                                  color: "cyan",
                                              }
                                            : null
                                    }
                                >
                                    Made for you
                                </li>
                                <li
                                    onClick={handleSidebarSelection}
                                    className="sidepanel__content__link"
                                    style={
                                        sidebarSelection === "Trending Now"
                                            ? {
                                                  color: "cyan",
                                              }
                                            : null
                                    }
                                >
                                    Trending Now
                                </li>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SideNaV;
