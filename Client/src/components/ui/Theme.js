import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

export default createMuiTheme({
    typography: {
        h1: {
            fontFamily: "Abel",
            fontWeight: 300,
            fontSize: "3.5rem",
            color: "black",
            lineHeight: 1.3,
        },
        h5: {
            fontFamily: "Abel",
            fontWeight: 200,
            fontSize: "2.5rem",
            color: "black",
            lineHeight: 1.3,
        },
    },
});
