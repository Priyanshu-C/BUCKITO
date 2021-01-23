import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        position: "fixed",
        top: "0px",
        left: "0px",
        height: "100%",
        width: "100%",
        background: "radial-gradient(at center, #3498db, #9b59b6),#9b59b6",
    },
    mainText: { fontSize: "3.3em", color: "white", textAlign: "center" },
    genreLogo: {
        width: "7rem",
        height: "7rem",
    },
    logoContainer: {
        padding: "3rem 0",
        textAlign: "center",
    },
    background: {
        position: "absolute",
        width: "100%",
        height: "100%",
        //mixBlendMode: "multiply",
        right: 0,
        bottom: 0,
    },
    polygonTop: {
        position: "absolute",
        width: "35vw",
        height: "35vw",
        //mixBlendMode: "multiply",
        top: -100,
        right: 0,
    },
    polygonBottom: {
        position: "absolute",
        width: "35vw",
        height: "35vw",
        // mixBlendMode: "multiply",
        left: -50,
        bottom: -50,
    },
    submitButton: {
        width: "100px",
        height: "100px",
    },
}));
