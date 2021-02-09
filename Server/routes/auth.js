const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../keys");
const User = require("../models/User");

//Signup Route
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exists" }] });
        }

        user = new User({
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            keys["jwtSecret"],
            { expiresIn: "5 days" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//SignIn Route
router.post("/signin", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }

        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            keys["jwtSecret"],
            { expiresIn: "5 days" },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback

// // auth logout
// router.get("/logout", (req, res) => {
//     console.log("logout");
//     req.logout();
//     res.send("User logged out!");
// });

// router.get(
//     "/google",
//     passport.authenticate("google", {
//         scope: ["profile"],
//     })
// );

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login" }),
//     function (req, res) {
//         // console.log(req.user.genre.length === 0);
//         if (req.user.genre.length === 0)
//             res.redirect("http://hashigma.com/genreselection");
//         else res.redirect("http://hashigma.com/main");
//     }
// );

// module.exports = router;
