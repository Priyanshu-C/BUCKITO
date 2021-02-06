var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: "http://localhost:4000/auth/google/callback",
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
