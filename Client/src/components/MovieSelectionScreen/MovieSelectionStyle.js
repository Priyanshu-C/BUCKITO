import { makeStyles, useTheme } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        background: "radial-gradient(at center, #3498db, #9b59b6),#9b59b6",
        justify: "center",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        overflow: "hidden",
    },
    mainContent: {
        justify: "center",
        height: "100vh",
    },
    mainText: {
        marginTop: "10vh",
        align: "center",
        color: "white",
        alignText: "center",
    },
    SubText: {
        marginTop: "1vh",
        fontSize: "2rem",
        align: "center",
        color: "#abdef5",
        fontFamily: "Architects Daughter",
    },
    cardMovieTitle: {
        float: "bottom",
        fontSize: "1.5rem",
        fontFamily: "Abel",
        color: "black",
        background: "white",
        borderRadius: ".7rem .7rem 0 0",
        boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;",
    },

    cardContainer: {
        width: "100%",
        maxWidth: "260px",
        height: "400px",
        display: "flex",
    },
    card: {
        marginTop: "10vh",
        marginLeft: "9rem",
        position: "relative",
        backgroundColor: "white",
        width: "80vw",
        maxWidth: "20rem",
        height: "25rem",
        boxShadow:
            "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23) inset",
        borderRadius: ".7rem",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    swipe: { position: "absolute" },
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
}));
