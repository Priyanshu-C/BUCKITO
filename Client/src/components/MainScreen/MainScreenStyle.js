import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        minHeight: "100%",
        minWidth: "100%",
        background: "#e3e3e3",
        top: "0px",
        left: "0px",
    },
    mainHeaderTextContainer: {
        background: "black",
    },
    textAndOther: {
        marginLeft: "3em",
    },
    mainHeader: { marginTop: "1em", margin: "0 0 0 1em", color: "white" },
    mainMoviesContainer: {
        minHeight: "auto",
        margin: "1em 0 0 1em",
    },
}));
