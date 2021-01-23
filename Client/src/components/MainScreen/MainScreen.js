import { Card, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import useStyles from "./MainScreenStyle";
import Button from "@material-ui/core/Button";
import Header from "./Header";
import MovieCard from "./imageMediaCard";
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

const MainScreen = () => {
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
    const [data, setdata] = useState([]);
    useEffect(async () => {
        let res = await axios.get(
            "https://api.themoviedb.org/3/movie/now_playing?api_key=62fd9021dbeec142016bbfc8e3888baf&language=en-US&page=1"
        );
        setdata(res.data.results);
    }, []);
    const handleRender = () => {
        animatedOn.finished.then(() => animatedOn.reverse());
        animatedOn.play();
    };
    //AuthRedirection
    const Auth = useContext(AuthContext);
    // console.log(Auth);
    if (Auth == undefined) return <></>;
    if (Auth === "") return <Redirect to="login" />;

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
                        <Typography variant="h1" className={classes.mainHeader}>
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
                            LAlalal
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
                                marginBottom: "1em",
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
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {data
                            ? data.map((data) => (
                                  <Grid
                                      key={data.title}
                                      item
                                      className="square xyz-in"
                                  >
                                      <MovieCard data={data} />
                                  </Grid>
                              ))
                            : " "}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default MainScreen;
