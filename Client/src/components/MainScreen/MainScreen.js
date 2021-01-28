//Important Dependencies
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import anime from "animejs";

//Icons
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { GrAscend } from "react-icons/gr";
import { DiCodeigniter } from "react-icons/di";
import { HiChartBar } from "react-icons/hi";
import { TiArrowRightThick } from "react-icons/ti";

// Styling
import "./MainScreen.scss";
import vector from "./vectors/vector";
import movieSvgBack from "./vectors/movieSvgBack.svg";

//Components
import MovieCard from "./components/MovieCard";
import Modal from "./components/Modal";
import SearchButton from "./components/SearchButton";

//Auth Context
import { AuthContext } from "../App";

//GQL Apollo
import { GET_RECOMMENDATIONS, GET_MOVIES } from "./gql";
import { useQuery } from "@apollo/client";

const MainScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    //AuthRedirection
    const Auth = useContext(AuthContext);
    const [recommendedData, setRecommendedData] = useState([]);

    //Use Query for GraphQL
    const { loading, data, err } = useQuery(GET_RECOMMENDATIONS, {
        variables: { id: Auth },
    });

    const [genre, setGenre] = useState(null);
    const genreQuery = useQuery(GET_MOVIES, {
        variables: { genres: [genre], count: 20 },
    });

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    useEffect(() => {
        if (data) {
            if (data && !genre) {
                const recommendation = data.getRecommendation.recommendedMovies;
                const res = recommendation.map((movie) => {
                    return movie.split("#");
                });
                shuffle(res);
                setRecommendedData(res);
            } else {
                let array = [];
                if (genreQuery.data) {
                    const res = genreQuery.data.getMovieList;
                    array = res.map((id) => ["Ok", String(id.movie_id)]);
                    console.log(array);
                    setRecommendedData(array);
                }
            }
        }
    }, [data, genreQuery]);

    const handleGenre = (e) => {
        console.log(e.target.outerText);
        setGenre(String(e.target.outerText));
    };
    useEffect(() => {
        console.log(recommendedData);
    }, [recommendedData]);

    let animatedOn;
    let animatedOff;
    useEffect(() => {
        animatedOn = anime.timeline({
            duration: 1000,
            autoplay: false,
        });
        animatedOn.add({
            targets: ".morph",
            d: [
                {
                    value: vector[2],
                },
            ],
            easing: "easeInQuad",
        });
    });

    const handleRender = () => {
        animatedOn.finished.then(() => animatedOn.reverse());
        animatedOn.play();
    };

    // console.log(Auth);
    if (Auth == undefined) return <></>;
    if (Auth === "") return <Redirect to="login" />;
    return (
        <>
            <Modal
                data={modalData}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            <div
                style={{
                    filter: showModal ? "blur(2px)" : "",
                    position: "relative",
                }}
            >
                <div className="main-page-container">
                    <img
                        src={movieSvgBack}
                        className="background-movie-svg"
                        alt="background"
                    />
                    <div className="sidebar-and-header">
                        <div className="sidebar-and-header__header">
                            BUCKITO
                        </div>
                        <div className="sidebar-and-header__sidebar">
                            <div className="sidebar-and-header__sidebar-header">
                                Films
                            </div>
                            <div className="sidebar-and-header__sidebar-menu">
                                <ul>
                                    <li className="sidebar-and-header__sidebar-menu-items">
                                        <DiCodeigniter className="icons" />
                                        Now Playing
                                    </li>
                                    <li className="sidebar-and-header__sidebar-menu-items">
                                        <AiFillStar className="icons" />
                                        Popular
                                    </li>
                                    <li className="sidebar-and-header__sidebar-menu-items">
                                        <TiArrowRightThick className="icons" />
                                        Upcoming
                                    </li>

                                    <li className="sidebar-and-header__sidebar-menu-items">
                                        <AiFillHeart className="icons" />
                                        Made for you
                                    </li>
                                    <li className="sidebar-and-header__sidebar-menu-items">
                                        <HiChartBar className="icons" />
                                        Trending Now
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-body">
                        <div className="main-body__nav-bar">
                            <div className="main-body__nav-bar-search"></div>
                            <div className="main-body__nav-bar-right-header">
                                <SearchButton />
                                <div className="main-body__nav-bar-right-header-link">
                                    Bucket List
                                </div>
                                <div className="main-body__nav-bar-right-header-link">
                                    Sign Out
                                </div>
                            </div>
                        </div>
                        <div className="main-body__genre">
                            <div class="main-body__genre__header">Genres</div>
                            <div className="main-body__genre__genres">
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Action
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Scifi
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Drama
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Comedy
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Romance
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Thriller
                                </button>
                                <button
                                    onClick={handleGenre}
                                    class="main-body__genre__genres-genre"
                                >
                                    Horror
                                </button>
                            </div>
                        </div>
                        <div className="main-body__movies-container">
                            <div className="main-body__movies-container__movie-card">
                                {recommendedData
                                    ? recommendedData.map((movie) =>
                                          movie ? (
                                              <MovieCard
                                                  setModalData={setModalData}
                                                  openModal={openModal}
                                                  id={movie[1]}
                                                  key={movie[1]}
                                              />
                                          ) : (
                                              ""
                                          )
                                      )
                                    : " "}
                            </div>
                        </div>
                        <div className="main-body__footer"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainScreen;
