import React, { useEffect, useState } from "react";
import "./MovieCard.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { CardActionArea } from "@material-ui/core";
import { motion } from "framer-motion";
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
    const [RatingArray, setRatingArray] = useState([]);
    const [RatingArrayN, setRatingArrayN] = useState([]);

    useEffect(() => {
        if (data != undefined) {
            const lengthOfRating = data.vote_average / 2;
            for (let i = 0; i < lengthOfRating; i++) {
                setRatingArray((e) => [
                    ...e,
                    <FaStar className="card-container__rating-icon" />,
                ]);
            }
            for (let i = 0; i < 4 - lengthOfRating; i++) {
                setRatingArrayN((e) => [...e, <FaStar />]);
            }
        }
    }, [data]);

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
                            {RatingArray.map((rat) => rat)}
                            {RatingArrayN.map((rat) => rat)}
                        </div>
                    </div>
                    <div className="card-container__title">{data.title}</div>
                </div>
            </motion.div>
        </>
    );
};

export default MovieCard;
