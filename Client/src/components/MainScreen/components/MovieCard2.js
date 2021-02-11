//Essentials
import React, { useEffect, useState } from "react";

//Apollo
import { motion } from "framer-motion";

//Styling
import "./MovieCard.scss";

//Icons
import { FaStar } from "react-icons/fa";

//Movie Genre Id Mapping
const MovieCard2 = ({ data, openModal, setModalData }) => {
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
    // console.log(data);
    const handleModalAndData = () => {
        setModalData(data);
        openModal();
    };
    if (data == null || data == undefined || data.poster_path == null)
        return null;
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="card-container"
                onClick={handleModalAndData}
            >
                <div
                    className="card-container__image"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`,
                    }}
                ></div>
                <div className="card-container__details">
                    <div className="card-container__genre-and-rating">
                        <div className="card-container__genre-and-rating__genre">
                            {data.release_date.slice(0, 4)}
                            <span> , </span>
                            {data.genres ? (
                                <>
                                    {data.genres[0] && data.genres[0].name}
                                    <span>, </span>
                                    {data.genres[1] && data.genres[1].name}
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
                        <div className="card-container__genre-and-rating__rating">
                            <FaStar className="card-container__rating-icon" />
                            <FaStar className="card-container__rating-icon" />
                            <FaStar className="card-container__rating-icon" />
                            <FaStar className="card-container__rating-icon" />
                            <FaStar />
                        </div>
                    </div>
                    <div className="card-container__title">{data.title}</div>
                </div>
            </motion.div>
        </>
    );
};

export default MovieCard2;
