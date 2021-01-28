import React, { useEffect, useRef } from "react";
import anime from "animejs";
import "./SearchButton.scss";
import { IconContext } from "react-icons";
import { ImSearch } from "react-icons/im";
const SearchButton = () => {
    const input = useRef();
    const handleSearch = (e) => {
        e.preventDefault();
        input.current.focus();
    };
    return (
        <div>
            <form className="search-container">
                <div className="search-container__inputbox">
                    <input ref={input} type="text" name="search" />
                </div>
                <button
                    onClick={handleSearch}
                    className="search-container__submit"
                >
                    <ImSearch />
                </button>
            </form>
        </div>
    );
};

export default SearchButton;
