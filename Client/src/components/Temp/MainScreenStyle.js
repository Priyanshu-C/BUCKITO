import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        background: "#e3e3e3",
        top: "2rem",
        position: "relative",
    },
    mainHeaderTextContainer: {
        backgroundColor: "#0093E9",
        background: " linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    },
    textAndOther: {
        margin: "3rem ",
    },
    mainHeader: { margin: "3rem 0 0 3rem", color: "white" },
    mainMoviesContainer: {
        minHeight: "auto",
    },
}));
