import React, { useState, useEffect, useRef } from "react";
import "./Modal.scss";
import anime from "animejs";
import axios from "axios";

const Modal = ({ showModal, setShowModal, data }) => {
    const closeModal = (e) => {
        if (animeClose.current === e.target) {
            setShowModal(false);
        }
    };
    var animeClose = useRef();
    useEffect(() => {
        var animeOpen = anime({
            easing: "easeOutElastic(1, .6)",
            duration: 500,
            targets: ".modal-container",
            scale: [0.5, 1],
            // translateY: ["-120", "0%"],
            opacity: 1,
        });
    }, [showModal]);
    if (data == null || data == undefined || data.poster_path == null)
        return null;

    return (
        <>
            {showModal ? (
                <div
                    onClick={closeModal}
                    ref={animeClose}
                    className="modal-background"
                >
                    <div className="modal-container">
                        <div
                            className="modal-container__image"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`,
                            }}
                        ></div>
                        <div className="modal-container__modal-card">
                            <div className="modal-container__info">
                                <div className="modal-container__info__title">
                                    {data.title}
                                </div>
                                <div className="modal-container__info__tagline">
                                    Tagline : {data.tagline}
                                </div>
                                <div className="modal-container__info__release-date">
                                    Release Date : {data.release_date}
                                </div>
                                <div className="modal-container__info__genre">
                                    Genre :
                                    {data.genres[0] && data.genres[0].name}
                                    <span>, </span>
                                    {data.genres[1] && data.genres[1].name}
                                </div>
                                <div className="modal-container__info__cast"></div>
                            </div>
                            <div className="modal-container__mid-section">
                                {data.overview.slice(0, 200)} ...
                            </div>
                            <div className="modal-container__select">
                                <button className="modal-container__select__already">
                                    Already Watched?
                                </button>
                                <button className="modal-container__select__bucket">
                                    Add to bucket?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Modal;
