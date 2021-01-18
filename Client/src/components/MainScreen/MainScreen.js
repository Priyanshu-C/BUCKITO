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

const MainScreen = () => {
    const classes = useStyles();
    const [data, setdata] = useState([]);
    useEffect(async () => {
        let res = await axios.get(
            "https://api.themoviedb.org/3/movie/now_playing?api_key=62fd9021dbeec142016bbfc8e3888baf&language=en-US&page=1"
        );
        setdata(res.data.results);
    }, []);

    //AuthRedirection
    const Auth = useContext(AuthContext);
    console.log(Auth);
    if (Auth == undefined) return <></>;
    if (Auth === "") return <Redirect to="login" />;

    return (
        <>
            <Grid
                container
                className={classes.mainContainer}
                direction="column"
            >
                <Header />
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
                            style={{ margin: "0 0 0 1.5em", color: "white" }}
                            variant="h5"
                        >
                            Subheading
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        style={{ margin: "2em 0 2em 3em" }}
                        direction="row"
                    >
                        <Button variant="outlined" color="primary">
                            Primary
                        </Button>
                        <Button variant="outlined" color="secondary">
                            True
                        </Button>
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
