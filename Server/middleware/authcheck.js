const chalk = require("chalk");
const authCheck = (req, res, next) => {
    console.log(chalk.red("Checking Authentincation"));
    console.log(chalk.cyan(req.user));
    if (!req.user) {
        res.redirect("http://localhost:3000/login");
    } else {
        next();
    }
};

module.exports = authCheck;
