const express = require("express");
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
// allow cross-origin requests
app.use(cors());

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey],
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.get("/", (req, res) => {
    res.send("<h1>Yeap it's Working</h1>");
});

// set up routes
app.use("/auth", authRoutes);

// bind express with graphql
app.use(
    "/graphql",
    authCheck,
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
