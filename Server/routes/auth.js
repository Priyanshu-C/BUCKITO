const User = require("../models/User");
const express = require("express");
const router = express.Router();
const passport = require("passport");
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback

//

// auth logout
router.get("/logout", (req, res) => {
    console.log("logout");
    req.logout();
    res.redirect("http://localhost:3000/login");
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("http://localhost:3000");
    }
);

module.exports = router;
