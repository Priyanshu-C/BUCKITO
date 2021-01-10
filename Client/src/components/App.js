import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./ui/Theme";

//Component import
import GenreSelection from "./GenreScreen/GenreSelection";
import MainScreen from "./MainScreen/MainScreen";
import MovieSelection from "./MovieSelectionScreen/MovieSelection";

const App = () => {
    return (
        <>
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
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
};

export default App;
