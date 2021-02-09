var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
   return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log(id,"deserializer");
    User.findById(id).then((user) => {
       return done(null, user);
    });
});

const choice = {
    1: "https://buckito-backend.herokuapp.com/auth/google/callback",
    2: "http://localhost:4000/auth/google/callback",
};

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: choice[1],
        },
        function (token, tokenSecret, profile, done) {
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    console.log("Current user: ", currentUser.id);
                    done(null, currentUser);
                } else {
                    new User({
                        picture: profile._json.picture,
                        name: profile.displayName,
                        googleId: profile.id,
                    })
                        .save()
                        .then((newUser) => {
                            console.log("Created new user: ", newUser.id);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);
