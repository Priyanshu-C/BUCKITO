import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MovieCard from "./MovieCard";

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        borderRadius: "5px",
        boxShadow: "20px 20px 60px #d5d5d5,-20px -20px 60px #ffffff",
    },
});

export default function ImgMediaCard({ data }) {
    const classes = useStyles();

    return (
        <CardActionArea>
            <MovieCard data={data} />
        </CardActionArea>
    );
}
