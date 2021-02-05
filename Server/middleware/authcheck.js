const chalk = require("chalk");
const authCheck = (req, res, next) => {
    console.log(chalk.red("Checking Authentincation"));
    if (!req.user) {
        res.status(404).send("User Not Logged in.");
    } else {
        console.log(chalk.cyan(req.user.id));
        next();
    }
};

module.exports = authCheck;
