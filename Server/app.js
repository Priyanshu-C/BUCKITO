const express = require("express");
const axios = require("axios");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schemas");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();
const passport = require("passport");
const mongodb = require("./config/mongodb");
const keys = require("./keys");
const authRoutes = require("./routes/auth");
const passportSetup = require("./config/passport-setup");
const authCheck = require("./middleware/authcheck");
const User = require("./models/User");

// allow cross-origin requests

// app.use(
//     cookieSession({
//         name: "SessionId",
//         maxAge: 8400000000000,
//         keys: [keys.session.cookieKey],
//         secure: false,
//     })
// );
const origin = { 1: "http://hashigma.com", 2: "http://localhost:3000" };
app.use(express.json());
app.use(cors());

// app.use(
//     cors({
//         origin: origin[1],
//         methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
//         credentials: true,
//     })
// );

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://hashigma.com/");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

// initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// set up routes
app.get("/", (req, res) => {
    res.send("<h1>Yeap it's Working</h1>");
});

// set up routes
app.use("/auth", authRoutes);

// get UserId
app.get("/getUserID", authCheck, (req, res) => {
    console.log("User fetching ID");
    res.json(req.user.id);
});


//Recommend on movie
app.get("/addMovieToRecommend", async (req, res) => {
    console.log("Predicting on -");
    console.log(req.query.movie);
    const id = req.query.id;
    const movieName = req.query.movie;
    var recommendResponse = await axios.post(
        `https://buckito-recommender.herokuapp.com/movie?movie=${movieName}`
    );
    recommendResponse = recommendResponse.data.data;
    console.log(recommendResponse);
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("now listening for requests on port 4000");
});
