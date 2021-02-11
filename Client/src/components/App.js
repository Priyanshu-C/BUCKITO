//Essentials 
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Styling 
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";
 
//Fonts
import "../icons/ZeniqNano.ttf";

//Component import
import GenreSelection from "./GenreSelectionScreen/GenreSelection";
import MainScreen from "./MainScreen/MainScreen";
import MovieSelection from "./MovieSelectionScreen/MovieSelection";
import Login from "./Login/Login";
import axios from "./axios";
import LandingPage from "../components/LandingPage/LandingPage";

export const AuthContext = createContext(undefined);

const App = () => {
    const [Auth, setAuth] = useState(undefined);

    useEffect(() => {
        if (localStorage.getItem("ID")) {
            setAuth(localStorage.getItem("ID"));
        }
        axios
            .get("getUserID")
            .then((res) => {
                setAuth(res.data);
                localStorage.setItem("ID", res.data);
            })
            .catch((e) => {
                if (e.response) {
                    console.log(e);
                    if (e.response.status === 404) setAuth("404");
                }
            });
    }, []);

    useEffect(() => {
        console.log(Auth);
    }, [Auth]);

    return (
        <>
            <AuthContext.Provider value={Auth}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route
                                exact
                                path="/genreselection"
                                component={GenreSelection}
                            />
                            <Route
                                exact
                                path="/selectmovie"
                                component={MovieSelection}
                            />

                            <Route exact path="/login">
                                <Login setAuth={setAuth} />
                            </Route>
                            <Route exact path="/main" component={MainScreen} />
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthContext.Provider>
        </>
    );
};

export default App;
