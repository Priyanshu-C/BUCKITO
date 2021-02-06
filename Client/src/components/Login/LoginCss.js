import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        minHeight: "100vh",
    },
    root: {
        backgroundColor: "transparent",
        "& > *": {
            margin: theme.spacing(1),
            width: "50ch",
        },
    },
    textFields: {
        margin: "50px 50px ",
        width: "5em",
    },
    button: {
        marginTop: "1em",
        width: "100%",
    },
}));
