//Important Dependencies
import React, { useState, useEffect, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import anime, { set } from "animejs";

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
import MovieCard2 from "./components/MovieCard2";
import Modal from "./components/Modal";
import SearchButton from "./components/SearchButton";
import BucketList from "./components/BucketList";

//Auth Context
import { AuthContext } from "../App";

//GQL Apollo
import { GET_RECOMMENDATIONS, GET_MOVIES } from "./gql";
import { useQuery } from "@apollo/client";

//Server
import axios from "../axios";
import outerCalls from "axios";
import SideNaV from "./components/SideNaV";
import Loading from "../Loading";

const MainScreen = () => {
    //MODAL
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    //AuthRedirection
    const Auth = useContext(AuthContext);
    const [recommendedData, setRecommendedData] = useState([]);

    //Use Query for GraphQL
    const { loading, data, err, refetch } = useQuery(GET_RECOMMENDATIONS, {
        variables: { id: Auth },
    });
    //GENRE Selection
    const [genre, setGenre] = useState(null);
    const genreQuery = useQuery(GET_MOVIES, {
        variables: { genres: [genre], count: 20 },
    });
    const handleGenre = (e) => {
        // console.log(e.target.outerText);
        setGenre(String(e.target.outerText));
        setSidebarSelection(null);
        setSidebarSelectionData(null);
    };

    //Sidebar Selection
    const referenceKeys = {
        "Now Playing": "now_playing",
        Popular: "popular",
        Upcoming: "upcoming",
        "Trending Now": "latest",
    };
    const [showSidenav, setShowSidenav] = useState(false);
    const [sidebarSelection, setSidebarSelection] = useState(null);
    const [sidebarSelectionData, setSidebarSelectionData] = useState(null);
    const handleSidebarSelection = (e) => {
        setShowSidenav((select) => !select);
        setGenre(null);
        // console.log(e.target.innerText);
        const selected = e.target.innerText;
        setSidebarSelection(selected);
        outerCalls
            .get(
                `https://api.themoviedb.org/3/movie/${referenceKeys[selected]}?api_key=0d7de19eeb38007459c158729a306b4d&language=en-US&page=1`
            )
            .then((res) => {
                // console.log(res.data.results);
                setSidebarSelectionData(res.data.results);
            });
    };
    //Handle Made for you
    const handleMadeForYou = () => {
        setShowSidenav((select) => !select);
        setSidebarSelection(null);
        setGenre(null);
    };
    // Data Processing
    useEffect(() => {
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
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
                    // console.log(array);
                    setRecommendedData(array);
                }
            }
        }
    }, [data, genreQuery]);

    if (recommendedData.length === 0) {
        setTimeout(() => {
            refetch();
        }, 5000);
    }

    // MORPH START
    let animatedOn;
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

    const [bucketList, setBucketList] = useState(false);
    const handleRenderIn = () => {
        animatedOn.reverse();
        animatedOn.restart();
        setBucketList((x) => !x);
    };

    const handleRender = () => {
        animatedOn.finished.then(() => {
            animatedOn.reverse();
        });
        animatedOn.play();
        setBucketList((x) => !x);
    };

    //Handle Sign Out
    let history = useHistory();
    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("ID");
        localStorage.removeItem("gerneSelected");
        history.push("/login");
    };
    const DisplayGenres = [
        "Action",
        "Scifi",
        "Drama",
        "Comedy",
        "Romance",
        "Thriller",
        "Horror",
    ];

    // Auth Security
    // console.log(Auth);
    if (Auth == undefined) return <></>;
    if (Auth === "404") return <Redirect to="login" />;
    return (
        <>
            <div>
                <svg
                    id="morph"
                    height="100%"
                    width="100%"
                    viewBox="0 0 1920 1080"
                    preserveAspectRatio="none"
                >
                    <path className="morph" d={vector[0]} />
                </svg>
            </div>

            <BucketList
                showModal={showModal}
                bucketList={bucketList}
                handleRender={handleRenderIn}
            />

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
                                    <li
                                        onClick={handleSidebarSelection}
                                        className="sidebar-and-header__sidebar-menu-items"
                                        style={
                                            sidebarSelection === "Now Playing"
                                                ? {
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        <DiCodeigniter className="icons" />
                                        Now Playing
                                    </li>
                                    <li
                                        onClick={handleSidebarSelection}
                                        className="sidebar-and-header__sidebar-menu-items"
                                        style={
                                            sidebarSelection === "Popular"
                                                ? {
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        <AiFillStar className="icons" />
                                        Popular
                                    </li>
                                    <li
                                        onClick={handleSidebarSelection}
                                        className="sidebar-and-header__sidebar-menu-items"
                                        style={
                                            sidebarSelection === "Upcoming"
                                                ? {
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        <TiArrowRightThick className="icons" />
                                        Upcoming
                                    </li>

                                    <li
                                        onClick={handleMadeForYou}
                                        className="sidebar-and-header__sidebar-menu-items"
                                        style={
                                            sidebarSelection === "Made for you"
                                                ? {
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        <AiFillHeart className="icons" />
                                        Made for you
                                    </li>
                                    <li
                                        onClick={handleSidebarSelection}
                                        className="sidebar-and-header__sidebar-menu-items"
                                        style={
                                            sidebarSelection === "Trending Now"
                                                ? {
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        <HiChartBar className="icons" />
                                        Trending Now
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="main-body">
                        <div className="main-body__nav-bar">
                            <SideNaV
                                showSidenav={showSidenav}
                                setShowSidenav={setShowSidenav}
                                handleSidebarSelection={handleSidebarSelection}
                                handleMadeForYou={handleMadeForYou}
                                sidebarSelection={sidebarSelection}
                            />
                            <div className="main-body__nav-bar__header">
                                BUCKITO
                            </div>
                            <div className="main-body__nav-bar-right-header">
                                <div className="main-body__nav-bar-search">
                                    <SearchButton />
                                </div>
                                <div
                                    onClick={handleRender}
                                    className="main-body__nav-bar-right-header-link"
                                >
                                    Bucket List
                                </div>
                                <div
                                    onClick={handleSignOut}
                                    className="main-body__nav-bar-right-header-link"
                                >
                                    Sign Out
                                </div>
                            </div>
                        </div>

                        <div className="main-body__genre">
                            <div class="main-body__genre__header">Genres</div>
                            <div className="main-body__genre__genres">
                                {DisplayGenres.map((DGenre) => (
                                    <button
                                        onClick={handleGenre}
                                        className="main-body__genre__genres-genre"
                                        style={
                                            genre === DGenre
                                                ? {
                                                      background: "white",
                                                      color: "black",
                                                  }
                                                : null
                                        }
                                    >
                                        {DGenre}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="main-body__movies-container">
                            {recommendedData.length == 0 ? (
                                <div className="main-body__movies-container__loading">
                                    Please Explore other sections while we
                                    curate your recommendation.
                                </div>
                            ) : null}
                            <div className="main-body__movies-container__movie-card">
                                {recommendedData && !sidebarSelection
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
                                {sidebarSelection && sidebarSelectionData
                                    ? sidebarSelectionData.map((data) => (
                                          <MovieCard2
                                              setModalData={setModalData}
                                              openModal={openModal}
                                              data={data}
                                              key={data.id}
                                          />
                                      ))
                                    : ""}
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
