import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Paper,
    Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import useStyles from "./MainScreenStyle";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import MovieCard from "./MovieCard";
import Divider from "@material-ui/core/Divider";
import { AuthContext } from "../App";
import { Redirect } from "react-router-dom";
import "./MainScreen.scss";
import anime from "animejs";
import vector from "./vectors/vector";
import SearchButton from "./components/SearchButton";
import avatar from "../../icons/nav/avatar.svg";
import search from "../../icons/nav/magnifying-glass.svg";
import bucket from "../../icons/nav/shopping-bag.svg";
import { useQuery } from "@apollo/client";
import { GET_RECOMMENDATIONS } from "./gql";
import Modal from "../Modal";

const MainScreen = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const openModal = () => {
        setShowModal((prev) => !prev);
    };
    //AuthRedirection
    const Auth = useContext(AuthContext);
    const [recommendedData, setRecommendedData] = useState([]);

    const { loading, data, err } = useQuery(GET_RECOMMENDATIONS, {
        variables: { id: Auth },
    });
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    useEffect(() => {
        if (data) {
            if (data) {
                const recommendation = data.getRecommendation.recommendedMovies;
                const res = recommendation.map((movie) => {
                    return movie.split("#");
                });
                shuffle(res);
                setRecommendedData(res);
            }
        }
    }, [data]);

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

    const classes = useStyles();

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
                <div className="nav-bar">
                    <div className="nav-bar__left">
                        <img
                            className="nav-bar__left__logo"
                            src={avatar}
                            alt="avatar"
                        />
                    </div>
                    <div className="nav-bar__logo">
                        <h1 className="nav-bar__logo__logo">BUCKITO</h1>
                    </div>
                    <div className="nav-bar__right">
                        <SearchButton />
                        <img
                            onClick={handleRender}
                            className="nav-bar__right__bucket-logo"
                            src={bucket}
                            alt="avatar"
                        />
                    </div>
                </div>
                <Grid
                    container
                    className={classes.mainContainer}
                    direction="column"
                >
                    <Grid
                        container
                        direction="row"
                        className={classes.mainHeaderTextContainer}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h1"
                                className={classes.mainHeader}
                            >
                                Welcome' <br />
                                Enjoy the best Movie Recommendation Ever
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                style={{
                                    fontFamily: "Architects Daughter",
                                    margin: "0 0 2rem 3rem",
                                    color: "white",
                                }}
                                variant="h5"
                            >
                                Yes, we did it!
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        className={classes.mainMoviesContainer}
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                style={{
                                    margin: "2rem 0 1rem 3rem",
                                }}
                            >
                                Top 20 Recommended movies
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            className="square-grid"
                            xyz="fade small stagger"
                            spacing={4}
                            justify="center"
                            alignItems="flex-start"
                        >
                            {recommendedData
                                ? recommendedData.map((movie) =>
                                      movie ? (
                                          <Grid item className="square xyz-in">
                                              {/* disableRipple if needed */}
                                              <MovieCard
                                                  setModalData={setModalData}
                                                  openModal={openModal}
                                                  id={movie[1]}
                                              />
                                          </Grid>
                                      ) : (
                                          ""
                                      )
                                  )
                                : " "}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default MainScreen;
