//Essentials
import React from "react";

//Styling
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

//Icons
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

export default function Loading() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress size={"10vh"} color="inherit" />
            </Backdrop>
        </div>
    );
}
