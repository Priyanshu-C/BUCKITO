const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = authCheck;
