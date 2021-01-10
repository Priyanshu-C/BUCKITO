const chalk = require("chalk");
const authCheck = (req, res, next) => {
    console.log(chalk.red("Checking Authentincation"));
    console.log(chalk.cyan(req.user));
    if (!req.user) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = authCheck;
