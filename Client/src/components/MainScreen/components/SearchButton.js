import React, { useEffect, useRef } from "react";
import anime from "animejs";
import "./SearchButton.scss";
import { FaSistrix } from "react-icons/fa";
const SearchButton = () => {
    const input = useRef();
    const timeline = anime.timeline({
        easing: "easeOutExpo",
        autoplay: false,
        duration: 750,
    });
    useEffect(() => {
        timeline
            .add({
                targets: [".input-box"],
                width: "100%",
                duration: 1200,
                translateX: "-16rem",
            })
            .add(
                {
                    targets: ["form.example button"],
                    duration: 1200,
                },
                0
            )
            .add({
                targets: [".input-box"],
                backgroundColor: "#FFFFFF",
            })
            .add(
                {
                    targets: [".input-box", "form.example button"],
                    borderRadius: "3px",
                },
                300
            );
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        input.current.focus();
        timeline.restart();
    };
    return (
        <div className="search">
            <form className="example">
                <button onClick={handleSubmit} type="submit">
                    <FaSistrix className="search-icon" />
                </button>
                <input
                    ref={input}
                    className="input-box"
                    type="text"
                    placeholder="Search.."
                    name="search"
                />
            </form>
        </div>
    );
};

export default SearchButton;
