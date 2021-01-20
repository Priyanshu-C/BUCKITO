import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import useStyles from "./MovieSelectionStyle";
import Loading from "../Loading";
import polytop from "../../backgrounds/Polygontop.svg";
import polybottom from "../../backgrounds/Polygontop.svg";

import "./MovieSelection.css";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "./gql";

const db = [];
const alreadyRemoved = [];
let moviesState = db;

function MovieSelection() {
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

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        setLastDirection(direction);
        alreadyRemoved.push(nameToDelete);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
        moviesState = moviesState.filter((movie) => movie.movie_name !== name);
        setMovies(moviesState);
    };

    const swipe = (dir) => {
        const cardsLeft = movies.filter(
            (person) => !alreadyRemoved.includes(person.movie_name)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].movie_name; // Find the card object to be removed
            const index = moviesState
                .map((person) => person.movie_name)
                .indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir); // Swipe the card!
        }
    };
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
                    className={classes.polygonTop}
                    src={polytop}
                />
                <img
                    alt="PolyBottom"
                    className={classes.polygonBottom}
                    src={polybottom}
                />
                <Grid item className={classes.mainContent}>
                    <Typography
                        variant="h1"
                        align="center"
                        className={classes.mainText}
                    >
                        Select your fav movie
                    </Typography>
                    <Grid container direction="column">
                        <div className={classes.cardContainer}>
                            {movies.map((movie, index) => (
                                <TinderCard
                                    ref={childRefs[index]}
                                    className={classes.swipe}
                                    key={movie.movie_id}
                                    onSwipe={(dir) =>
                                        swiped(dir, movie.movie_name)
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(movie.movie_name)
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
                        <Grid item className={classes.buttons}>
                            <Button onClick={() => swipe("left")}>
                                Swipe left!
                            </Button>
                            <Button
                                style={{ marginLeft: "5em" }}
                                onClick={() => swipe("right")}
                            >
                                Swipe right!
                            </Button>
                        </Grid>

                        {lastDirection ? (
                            <h2 key={lastDirection} className="infoText">
                                You swiped {lastDirection}
                            </h2>
                        ) : (
                            <h2 className="infoText">
                                Swipe a card or press a button to get started!
                            </h2>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default MovieSelection;
