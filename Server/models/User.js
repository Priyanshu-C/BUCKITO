const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    picture: String,
    googleId: String,
    dateOfBirth: String,
    alreadyWatchedMovies: [String],
    recommendedMovies: [String],
    bucketList: [String],
    genre: [String],
});

//Export the model
module.exports = mongoose.model("User", userSchema);
