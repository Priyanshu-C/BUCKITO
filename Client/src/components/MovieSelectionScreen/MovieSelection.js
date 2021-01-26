import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useMemo, useEffect, useContext } from "react";
import TinderCard from "react-tinder-card";
import useStyles from "./MovieSelectionStyle";
import Loading from "../Loading";
import polytop from "../../backgrounds/Polygontop.svg";
import polybottom from "../../backgrounds/Polygontop.svg";
import anime from "animejs";
import "./MovieSelection.css";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MOVIES, SEND_SELECTED_MOVIES } from "./gql";
import { AuthContext } from "../App";
import axios from "../axios";

const db = [];
const alreadyRemoved = [];
let moviesState = db;

function MovieSelection() {
    let history = useHistory();
    const [sendSelectedMovies, { selectedData }] = useMutation(
        SEND_SELECTED_MOVIES
    );
    const Auth = useContext(AuthContext);
    useEffect(() => {
        let animated = anime
            .timeline()
            .add({
                targets: ".polyTop",
                autoplay: true,
                rotate: "720deg",
                loop: true,
                duration: 1500000,
            })
            .add(
                {
                    targets: ".polyBottom",
                    autoplay: true,
                    rotate: "-720deg",
                    loop: true,
                    duration: 1500000,
                },
                0
            );
    });

    const [selectedMovies, setSelectedMovies] = useState([]);
    const classes = useStyles();
    const [movies, setMovies] = useState([]);
    const [lastDirection, setLastDirection] = useState();
    const genres = JSON.parse(localStorage.getItem("gerneSelected"));
    //console.log(genres);
    const { loading, error, data } = useQuery(GET_MOVIES, {
        variables: { genres: genres },
    });

    useEffect(() => {
        if (data) {
            console.log(data["getMovieList"]);
            setMovies(data["getMovieList"]);
            moviesState = data["getMovieList"];
        }
    }, [data]);

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    );

    const swiped = (direction, name, id) => {
        setLastDirection(direction);
        if (direction == "right") {
            setSelectedMovies((selectedMovies) => [
                ...selectedMovies,
                `${name}#${id}`,
            ]);
            axios.get(`/addMovieToRecommend?movie=${name}&id=${Auth}`);
        }
        alreadyRemoved.push(name);
    };

    const outOfFrame = (name, id) => {
        moviesState = moviesState.filter((movie) => movie.movie_name !== name);
        setMovies(moviesState);
    };

    const swipe = (dir) => {
        const cardsLeft = movies.filter(
            (movie) => !alreadyRemoved.includes(movie.movie_name)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].movie_name; // Find the card object to be removed
            const index = moviesState
                .map((movie) => movie.movie_name)
                .indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    };
    useEffect(() => {
        console.log(selectedMovies);
        console.log(moviesState);
        if (moviesState.length == 0 && selectedMovies.length != 0) {
            console.log("Empty");
            sendSelectedMovies({
                variables: { id: Auth, movies: selectedMovies },
            });
            console.log(selectedMovies);
            history.push("/main");
        }
    }, [selectedMovies, moviesState]);
    console.log(Auth);
    if (Auth == undefined) return <></>;
    if (Auth === "") return <Redirect to="login" />;
    if (loading) {
        return (
            <>
                <Loading />
                <Grid
                    container
                    direction="column"
                    className={classes.mainContainer}
                ></Grid>
            </>
        );
    }
    return (
        <>
            <Grid
                container
                direction="column"
                className={classes.mainContainer}
            >
                <img
                    alt="Polytop"
                    className={`${classes.polygonTop} polyTop`}
                    src={polytop}
                />
                <img
                    alt="PolyBottom"
                    className={`${classes.polygonBottom} polyBottom`}
                    src={polytop}
                />
                <Grid item className={classes.mainContent}>
                    <Typography
                        variant="h1"
                        align="center"
                        className={classes.mainText}
                    >
                        Select your fav movie.
                    </Typography>
                    <Typography
                        variant="h4"
                        align="center"
                        className={classes.SubText}
                    >
                        Swipe right to like, Swipe left to dislike!
                    </Typography>
                    <Grid item>
                        <div className={classes.cardContainer}>
                            {movies.map((movie, index) => (
                                <TinderCard
                                    ref={childRefs[index]}
                                    className={classes.swipe}
                                    key={index}
                                    onSwipe={(dir) =>
                                        swiped(
                                            dir,
                                            movie.movie_name,
                                            movie.movie_id
                                        )
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(
                                            movie.movie_name,
                                            movie.movie_id
                                        )
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${movie.poster})`,
                                        }}
                                        className={classes.card}
                                    >
                                        <Typography
                                            variant="h6"
                                            align="center"
                                            className={classes.cardMovieTitle}
                                        >
                                            {movie.movie_name}
                                        </Typography>
                                    </div>
                                </TinderCard>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default MovieSelection;
