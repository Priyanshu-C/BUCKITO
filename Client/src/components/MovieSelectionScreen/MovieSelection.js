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

const db = [
    {
        name: "Richard asdasdasd",
        url: "../../backgrounds/Union.svg",
    },
];

const alreadyRemoved = [];
let charactersState = db;

function MovieSelection() {
    const classes = useStyles();
    const [characters, setCharacters] = useState(db);
    const [lastDirection, setLastDirection] = useState();
    const genres = JSON.parse(localStorage.getItem("gerneSelected"));
    console.log(genres);
    const { loading, error, data } = useQuery(GET_MOVIES, {
        variables: { genres: genres },
    });

    useEffect(() => {
        console.log(data);
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
        charactersState = charactersState.filter(
            (character) => character.name !== name
        );
        setCharacters(charactersState);
    };

    const swipe = (dir) => {
        const cardsLeft = characters.filter(
            (person) => !alreadyRemoved.includes(person.name)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name; // Find the card object to be removed
            const index = db.map((person) => person.name).indexOf(toBeRemoved); // Find the index of which to make the reference to
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
                            {characters.map((character, index) => (
                                <TinderCard
                                    ref={childRefs[index]}
                                    className={classes.swipe}
                                    key={character.name}
                                    onSwipe={(dir) =>
                                        swiped(dir, character.name)
                                    }
                                    onCardLeftScreen={() =>
                                        outOfFrame(character.name)
                                    }
                                >
                                    <div
                                        style={{
                                            backgroundImage: character.url,
                                        }}
                                        className={classes.card}
                                    >
                                        <Typography
                                            variant="h6"
                                            align="center"
                                            className={classes.mainText}
                                        >
                                            {character.name}
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
