import { CssBaseline, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "./LoginCss";
import "./button.css";
import GoogleButton from "react-google-button";
import { AuthContext } from "../App";
import { Redirect } from "react-router-dom";

const Login = () => {
    const classes = useStyles();

    const Auth = useContext(AuthContext);

    if (Auth) return <Redirect to="/" />;

    return (
        <>
            <CssBaseline />
            <Grid
                className={classes.mainContainer}
                container
                justify="center"
                alignItems="center"
                direction="column"
            >
                <Grid item>
                    <Grid container>
                        <Typography
                            variant="h5"
                            style={{ width: "6em", textAlign: "left" }}
                        >
                            BUCKITO
                        </Typography>
                        <Typography
                            style={{ margin: "15px 0 0 0" }}
                            variant="subtitle2"
                        >
                            Login
                        </Typography>
                        <label class="label">
                            <div class="toggle">
                                <input
                                    class="toggle-state"
                                    type="checkbox"
                                    name="check"
                                    value="check"
                                />
                                <div class="indicator"></div>
                            </div>
                        </label>
                        <Typography
                            style={{ margin: "15px 0 0 0" }}
                            variant="subtitle2"
                        >
                            Signup
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item className={classes.root}>
                    <form autoComplete="off" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <div class="box-3">
                            <div class="btn btn-three">
                                <span>Sign In</span>
                            </div>
                        </div>
                        <Grid container justify="center">
                            <a
                                style={{ textDecoration: "none" }}
                                href="http://localhost:4000/auth/google"
                            >
                                <GoogleButton />
                            </a>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
