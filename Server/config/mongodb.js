const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const keys = require("../keys");
// Connect MongoDB at default port 27017.
mongoose.connect(
    keys.mongodb.dbURI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log("MongoDB Connection Succeeded.");
        } else {
            console.log("Error in DB connection: " + err);
        }
    }
);

module.exports = mongoose;
