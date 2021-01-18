import { React, useContext, useEffect, useState } from "react";
import _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import GenreIcon from "./GenreIcon";
import polytop from "../../backgrounds/Polygontop.svg";
import polybottom from "../../backgrounds/Polygontop.svg";

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    useHistory,
} from "react-router-dom";
import { AuthContext } from "../App";

//Importing Icons
import hamlet from "../../icons/hamlet.svg";
import puppet from "../../icons/puppet.svg";
import glasses from "../../icons/3d-glasses.svg";
import theater from "../../icons/theater.svg";
import ventriloquist from "../../icons/ventriloquist.svg";
import award from "../../icons/award-1.svg";
import shakespeare from "../../icons/shakespeare.svg";
import roses from "../../icons/roses.svg";

import useStyles from "./GenreStyle";
import { SUBMIT_GENRES } from "./gql";
import { useMutation } from "@apollo/client";

const GenreSelection = () => {
    const [choosenGenre, setchoosenGenre] = useState([]);
    const classes = useStyles();
    const [submitMutation, { submitdata }] = useMutation(SUBMIT_GENRES);
    let history = useHistory();

    useEffect(() => {
        console.log(choosenGenre);
    }, [choosenGenre]);

    const HandleClick = (event) => {
        const choosen = event.target.alt;
        if (choosen) {
            if (!choosenGenre.includes(choosen) & (choosenGenre.length < 3)) {
                setchoosenGenre((choosenGenre) => [...choosenGenre, choosen]);
            } else if (choosenGenre.includes(choosen)) {
                setchoosenGenre(
                    choosenGenre.filter((genre) => genre != choosen)
                );
            }
        }
    };

    const HandleSubmit = () => {
        console.log(choosenGenre);
        localStorage.setItem("gerneSelected", JSON.stringify(choosenGenre));
        submitMutation({ variables: { id: Auth, genre: choosenGenre } });
        history.push("/selectmovie");
    };

    //AuthRedirection
    const Auth = useContext(AuthContext);
    if (Auth == undefined) return <></>;
    if (Auth == "") return <Redirect to="login" />;

    return (
        <div>
            {/* <Loading /> */}
            <Grid
                container
                alignItems="center"
                justify="center"
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
                <Grid item className={classes.mainTextContainer}>
                    <Typography
                        variant="h1"
                        sm={12}
                        className={classes.mainText}
                    >
                        Choose your favorite genre, Any Three!
                    </Typography>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="flex-start"
                    className={classes.logoContainer}
                >
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Action"}
                            icon={hamlet}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Thriller"}
                            icon={puppet}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Scifi"}
                            icon={glasses}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Drama"}
                            icon={theater}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Horror"}
                            icon={ventriloquist}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Adventure"}
                            icon={award}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Comedy"}
                            icon={shakespeare}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <GenreIcon
                            choosenGenre={choosenGenre}
                            HandleClick={HandleClick}
                            title={"Romance"}
                            icon={roses}
                            classes={classes}
                        />
                    </Grid>
                    <Grid
                        item
                        className="xyz-in"
                        xyz="duration-20 fade small-3"
                    >
                        <div onClick={HandleSubmit}>
                            <IconButton aria-label="submit" color="primary">
                                <KeyboardArrowRightIcon
                                    className={classes.submitButton}
                                />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default GenreSelection;
