import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const GenreIcon = ({ choosenGenre, HandleClick, classes, icon, title }) => {
    let choosen = null;
    if (choosenGenre.includes(title)) choosen = { backgroundColor: "purple" };
    return (
        <>
            <Card
                onClick={HandleClick}
                className={{ height: "1em" }}
                elevation={5}
                style={choosen}
            >
                <CardActionArea>
                    <CardContent className={classes.genreLogo}>
                        <img alt={title} src={icon} />
                    </CardContent>
                </CardActionArea>
            </Card>
            <Typography>{title}</Typography>
        </>
    );
};

export default GenreIcon;
