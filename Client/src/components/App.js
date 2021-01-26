import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./ui/Theme";

//Component import
import GenreSelection from "./GenreSelectionScreen/GenreSelection";
import MainScreen from "./MainScreen/MainScreen";
import MovieSelection from "./MovieSelectionScreen/MovieSelection";
import Login from "./Login/Login";
import axios from "./axios";
import Modal from "./Modal";
import Window from "./Window";

export const AuthContext = createContext(undefined);

const App = () => {
    const [Auth, setAuth] = useState(undefined);

    useEffect(() => {
        if (!localStorage.getItem("UserData")) {
            axios.get("getUserID").then((res) => {
                setAuth(res.data);
                localStorage.setItem("UserData", res.data);
                console.log(res.data);
            });
        } else {
            setAuth(localStorage.getItem("UserData"));
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={Auth}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={GenreSelection} />
                            <Route
                                exact
                                path="/selectmovie"
                                component={MovieSelection}
                            />
                            <Route exact path="/main" component={MainScreen} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/modal" component={Window} />
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthContext.Provider>
        </>
    );
};

export default App;
