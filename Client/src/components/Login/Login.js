//Essentials 
import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";

//Apollo
import axios from "../axios";

//Styling 
import "./Login.scss";
import "./button.css";
import useStyles from "./LoginCss";
import TextField from "@material-ui/core/TextField";
import { CssBaseline, Grid, Typography } from "@material-ui/core";

//Icons 
import logo from "./components/LogoW.svg";
import GoogleButton from "react-google-button";

//Component
import Alert from "./components/Alert";


const Login = ({ setAuth }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();
    const toggleRef = useRef();
    const Auth = useContext(AuthContext);
    const [toggleSignInSignUp, setToggleSignInSignUp] = useState(true);
    //Alert
    const [toggleAlert, setToggleAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toggleState = toggleRef.current.checked;

        //Debug
        console.log(toggleRef.current.checked);
        console.log(email, pass);

        //SignIn State
        if (!toggleState) {
            //getToken after sign in
            let res;
            try {
                res = await axios.post("/auth/signin", {
                    email: email,
                    password: pass,
                });
            } catch (e) {
                console.log(e.request.response);
                setAlertData(e.request.response);
                setToggleAlert((e) => !e);
            }
            if (res && res.data) {
                //Store token to LocalStorage
                localStorage.setItem("token", res.data["token"]);
                //Update Auth
                await axios
                    .get("getUserID", {
                        headers: {
                            token: res.data["token"],
                        },
                    })
                    .then((res) => {
                        setAuth(res.data);
                        localStorage.setItem("ID", res.data);
                    });

                history.push("/main");
            }
        } else {
            //SignUp State
            //getToken after sign Up
            let res;
            try {
                res = await axios.post("/auth/signup", {
                    email: email,
                    password: pass,
                });
            } catch (e) {
                console.log(e.request.response);
                setAlertData(e.request.response);
                setToggleAlert((e) => !e);
            }
            if (res && res.data) {
                //Store token to LocalStorage
                localStorage.setItem("token", res.data["token"]);

                // //Update Auth
                await axios
                    .get("getUserID", {
                        headers: {
                            token: res.data["token"],
                        },
                    })
                    .then((res) => {
                        setAuth(res.data);
                        localStorage.setItem("ID", res.data);
                    });
                history.push("/genreselection");
            }
        }
    };

    return (
        <>
            <Alert
                toggleAlert={toggleAlert}
                setToggleAlert={setToggleAlert}
                alertData={alertData}
            />
            <div
                style={{
                    filter: toggleAlert ? "blur(2px)" : "",
                    position: "relative",
                }}
            >
                <img
                    src={logo}
                    alt="logo"
                    className="LoginPageContainer__logo"
                />
                <div className="login-background"></div>
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
                                style={{
                                    width: "6em",
                                    textAlign: "left",
                                    fontFamily: "ZeniqNano",
                                    
                                }}
                            >
                                BUCKITO
                            </Typography>
                            <Typography
                                style={{ margin: "15px 0 0 0" }}
                                variant="subtitle2"
                            >
                                Login
                            </Typography>
                            <label className="label">
                                <div className="toggle">
                                    <input
                                        onClick={() =>
                                            setToggleSignInSignUp((pre) => !pre)
                                        }
                                        ref={toggleRef}
                                        className="toggle-state"
                                        type="checkbox"
                                        name="check"
                                        value="check"
                                    />
                                    <div className="indicator"></div>
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
                        <form onSubmit={handleSubmit}>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                            />
                            <TextField
                                onChange={(e) => setPass(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />

                            <div onClick={handleSubmit} className="box-3">
                                <div className="btn btn-three">
                                    <button
                                        style={{
                                            background: "transparent",
                                            padding: 0,
                                            border: "none",
                                            fontSize: "1.5em",
                                            fontFamily: "Ubuntu",
                                            color: "white",
                                        }}
                                    >
                                        {toggleSignInSignUp ? (
                                            <>Sign In</>
                                        ) : (
                                            <>Sign Up</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Login;
