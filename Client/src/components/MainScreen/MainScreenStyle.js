import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        background: "#e3e3e3",
        top: "2rem",
        left: "0px",
        position: "relative",
    },
    mainHeaderTextContainer: {
        backgroundColor: "#0093E9",
        background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    },
    textAndOther: {
        margin: "3rem ",
    },
    mainHeader: { marginTop: "1em", margin: "0 0 0 3rem", color: "white" },
    mainMoviesContainer: {
        minHeight: "auto",
        margin: "1em 0 0 1em",
    },
}));
