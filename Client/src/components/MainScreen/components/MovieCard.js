//Essentials
import React, { useEffect, useState } from "react";
import axios from "axios";

//Styling
import "./MovieCard.scss";
import { motion } from "framer-motion";

//Icons
import { FaStar } from "react-icons/fa";

const MovieCard = ({ id, openModal, setModalData }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const res = axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=0d7de19eeb38007459c158729a306b4d&language=en-US`
            )
            .then((res) => setData(res.data));
    }, []);
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
                            {data.genres[0] && data.genres[0].name}
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

export default MovieCard;
