//Essentials 
import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../App";

//Apollo and Network
import axios from "../../axios";
import { gql, useMutation } from "@apollo/client";

//Styling 
import "./Modal.scss";
import anime from "animejs";

//GQL Queries
const ADD_TO_BUCKET = gql`
    mutation addToBucketList($id: String, $movie: String) {
        addToBucketList(id: $id, movie: $movie) {
            name
        }
    }
`;

const Modal = ({ showModal, setShowModal, data }) => {
    const [addToBucketQuery, { resdata }] = useMutation(ADD_TO_BUCKET);
    const Auth = useContext(AuthContext);
    //Genres Id mapping
    const genreIdPairs = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        16: "Comedy",
        16: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie ",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };
    //Modal START
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
    //Modal END

    if (data == null || data == undefined || data.poster_path == null)
        return null;

    // Handling of watched
    const handleAlreadyWatched = () => {
        axios.get(`/addMovieToRecommend?movie=${data.title}&id=${Auth}`);
        setShowModal(false);
    };
    const handleAddToBucket = () => {
        const movieName = data.title + "#" + data.id;
        console.log(movieName);
        addToBucketQuery({
            variables: {
                id: Auth,
                movie: movieName,
            },
        });
        setShowModal(false);
    };

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
                                {data.tagline ? (
                                    <div className="modal-container__info__tagline">
                                        Tagline : {data.tagline}
                                    </div>
                                ) : null}

                                <div className="modal-container__info__release-date">
                                    Release Date : {data.release_date}
                                </div>
                                <div className="modal-container__info__genre">
                                    Genre :
                                    {data.genres ? (
                                        <>
                                            {data.genres[0] &&
                                                data.genres[0].name}
                                            <span>, </span>
                                            {data.genres[1] &&
                                                data.genres[1].name}
                                        </>
                                    ) : null}
                                    {data.genre_ids ? (
                                        <>
                                            {genreIdPairs[data.genre_ids[0]]}
                                            <span>, </span>
                                            {genreIdPairs[data.genre_ids[1]]}
                                        </>
                                    ) : null}
                                </div>
                                <div className="modal-container__info__cast"></div>
                            </div>
                            <div className="modal-container__mid-section">
                                {data.overview.slice(0, 200)} ...
                            </div>
                            <div className="modal-container__select">
                                <button
                                    onClick={handleAlreadyWatched}
                                    className="modal-container__select__already"
                                >
                                    Already Watched?
                                </button>
                                <button
                                    onClick={handleAddToBucket}
                                    className="modal-container__select__bucket"
                                >
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
