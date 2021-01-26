const express = require("express");
const axios = require("axios");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schemas");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const passport = require("passport");
const mongodb = require("./config/mongodb");
const keys = require("./keys");
const authRoutes = require("./routes/auth");
const passportSetup = require("./config/passport-setup");
const authCheck = require("./middleware/authcheck");
const User = require("./models/User");
const getRecommendation = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});
// allow cross-origin requests
app.use(cors());

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey],
    })
);

// Used to get credentials passed
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
        res.send(200);
    } else {
        next();
    }
});
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.get("/", (req, res) => {
    res.send("<h1>Yeap it's Working</h1>");
});

// set up routes
app.use("/auth", authRoutes);

//get UserId
app.get("/getUserID", (req, res) => {
    if (!req.user) res.send(null);
    console.log("User fetching ID");
    res.json(req.user.id);
});

app.get("/addMovieToRecommend", async (req, res) => {
    console.log(req.query.movie);
    const id = req.query.id;
    const movieName = req.query.movie;
    var recommendResponse = await axios.post(
        `http://127.0.0.1:8000/movie?movie=${movieName}`
    );
    recommendResponse = recommendResponse.data.data;
    var movies = [];
    var movie = "";
    for (var i = 0; i < recommendResponse.length; i = i + 2) {
        movie = recommendResponse[i + 1] + "#" + recommendResponse[i];
        movies.push(movie);
    }
    await User.updateOne(
        { _id: id },
        {
            $addToSet: { recommendedMovies: movies },
        }
    );
    res.send("Done!");
});

// bind express with graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
