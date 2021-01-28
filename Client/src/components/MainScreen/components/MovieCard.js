import React, { useEffect, useState } from "react";
import "./MovieCard.scss";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { CardActionArea } from "@material-ui/core";
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
            <div className="card-container" onClick={handleModalAndData}>
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
            </div>
        </>
    );
};

export default MovieCard;
